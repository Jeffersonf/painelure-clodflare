package com.painelure.app

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.*
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.painelure.app.data.AppReleaseInfo
import com.painelure.app.data.AppUpdateManager
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : ComponentActivity() {
    private var webView: WebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView?.canGoBack() == true) {
                    webView?.goBack()
                } else {
                    isEnabled = false
                    onBackPressedDispatcher.onBackPressed()
                }
            }
        })

        setContent {
            PainelUREApp(
                onWebViewCreated = { webView = it }
            )
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun PainelUREApp(onWebViewCreated: (WebView) -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    var showUpdateDialog by remember { mutableStateOf(false) }
    var isLoading by remember { mutableStateOf(true) }
    var loadProgress by remember { mutableFloatStateOf(0f) }

    val liveUrl = "https://painelure-cloudflare-pages.pages.dev"
    val localFallbackUrl = "file:///android_asset/web/index.html"

    val darkBackground = Color(0xFF090C15)
    val limeAccent = Color(0xFF35C96F)

    MaterialTheme {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(darkBackground)
                .statusBarsPadding()
                .navigationBarsPadding()
        ) {
            AndroidView(
                modifier = Modifier.fillMaxSize(),
                factory = { ctx ->
                    WebView(ctx).apply {
                        layoutParams = ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT
                        )

                        setBackgroundColor(android.graphics.Color.parseColor("#090C15"))

                        settings.apply {
                            javaScriptEnabled = true
                            domStorageEnabled = true
                            databaseEnabled = true
                            allowFileAccess = true
                            allowContentAccess = true
                            loadWithOverviewMode = true
                            useWideViewPort = true
                            builtInZoomControls = false
                            displayZoomControls = false
                            cacheMode = WebSettings.LOAD_DEFAULT
                            userAgentString = userAgentString + " PainelURE-NativeApp/11.9.0"
                        }

                        addJavascriptInterface(object {
                            @JavascriptInterface
                            fun checkUpdates() {
                                scope.launch(Dispatchers.Main) {
                                    showUpdateDialog = true
                                }
                            }
                        }, "PainelNativeHost")

                        webViewClient = object : WebViewClient() {
                            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                                isLoading = true
                            }

                            override fun onPageFinished(view: WebView?, url: String?) {
                                isLoading = false
                            }

                            override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
                                if (request?.isForMainFrame == true && request.url.toString().startsWith("https://")) {
                                    view?.loadUrl(localFallbackUrl)
                                }
                            }

                            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                                val targetUri = request?.url ?: return false
                                val targetStr = targetUri.toString()

                                if (targetStr.endsWith(".apk", ignoreCase = true)) {
                                    showUpdateDialog = true
                                    return true
                                }

                                if (targetStr.startsWith("tel:") || targetStr.startsWith("mailto:") || targetStr.startsWith("whatsapp:")) {
                                    runCatching {
                                        ctx.startActivity(Intent(Intent.ACTION_VIEW, targetUri))
                                    }
                                    return true
                                }

                                return false
                            }
                        }

                        webChromeClient = object : WebChromeClient() {
                            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                                loadProgress = newProgress / 100f
                            }
                        }

                        loadUrl(liveUrl)
                        onWebViewCreated(this)
                    }
                }
            )

            if (isLoading && loadProgress < 1f) {
                LinearProgressIndicator(
                    progress = { loadProgress },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(3.dp)
                        .align(Alignment.TopCenter),
                    color = limeAccent,
                    trackColor = Color.Transparent
                )
            }

            FloatingActionButton(
                onClick = { showUpdateDialog = true },
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(end = 16.dp, bottom = 18.dp)
                    .size(46.dp),
                shape = RoundedCornerShape(14.dp),
                containerColor = Color(0xFF161C2C).copy(alpha = 0.92f),
                contentColor = limeAccent,
                elevation = FloatingActionButtonDefaults.elevation(defaultElevation = 4.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.SystemUpdate,
                    contentDescription = "Verificar Atualização",
                    modifier = Modifier.size(20.dp)
                )
            }

            if (showUpdateDialog) {
                NativeUpdateDialog(
                    onDismiss = { showUpdateDialog = false }
                )
            }
        }
    }
}

@Composable
fun NativeUpdateDialog(onDismiss: () -> Unit) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var checking by remember { mutableStateOf(true) }
    var downloading by remember { mutableStateOf(false) }
    var progress by remember { mutableFloatStateOf(0f) }
    var statusText by remember { mutableStateOf("Verificando atualizações...") }
    var releaseInfo by remember { mutableStateOf<AppReleaseInfo?>(null) }
    var errorMsg by remember { mutableStateOf("") }

    val currentVersion = remember {
        runCatching {
            context.packageManager.getPackageInfo(context.packageName, 0).versionName ?: "11.9.0"
        }.getOrDefault("11.9.0")
    }

    val limeAccent = Color(0xFF35C96F)
    val textMuted = Color(0xFF9AA3B5)
    val darkCard = Color(0xFF131826)

    LaunchedEffect(Unit) {
        val result = AppUpdateManager.checkForUpdates(currentVersion)
        checking = false
        result.fold(
            onSuccess = { info ->
                releaseInfo = info
                if (info.isNewer) {
                    statusText = "Nova versão " + info.versionName + " disponível!"
                } else {
                    statusText = "Seu aplicativo já está na versão mais recente (v" + currentVersion + ")."
                }
            },
            onFailure = { err ->
                errorMsg = err.message ?: "Não foi possível verificar atualizações no momento."
            }
        )
    }

    AlertDialog(
        onDismissRequest = { if (!downloading) onDismiss() },
        containerColor = darkCard,
        titleContentColor = Color.White,
        textContentColor = Color.White,
        shape = RoundedCornerShape(22.dp),
        title = {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                Surface(
                    shape = RoundedCornerShape(10.dp),
                    color = limeAccent.copy(alpha = 0.15f),
                    modifier = Modifier.size(34.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Icon(Icons.Default.SystemUpdate, null, tint = limeAccent, modifier = Modifier.size(18.dp))
                    }
                }
                Text("Atualização do App", fontWeight = FontWeight.Bold, fontSize = 18.sp)
            }
        },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("Versão instalada: v" + currentVersion, color = textMuted, style = MaterialTheme.typography.bodySmall)

                if (checking) {
                    Row(
                        modifier = Modifier.fillMaxWidth().padding(vertical = 12.dp),
                        horizontalArrangement = Arrangement.Center,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        CircularProgressIndicator(modifier = Modifier.size(24.dp), strokeWidth = 2.dp, color = limeAccent)
                        Spacer(Modifier.width(12.dp))
                        Text(statusText, style = MaterialTheme.typography.bodyMedium, color = Color.White)
                    }
                } else if (errorMsg.isNotBlank()) {
                    Text(errorMsg, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodyMedium)
                } else {
                    releaseInfo?.let { info ->
                        Text(
                            statusText,
                            fontWeight = FontWeight.SemiBold,
                            color = if (info.isNewer) limeAccent else Color.White
                        )

                        if (info.releaseNotes.isNotBlank()) {
                            Surface(
                                shape = RoundedCornerShape(10.dp),
                                color = Color.White.copy(alpha = 0.06f),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .heightIn(max = 130.dp)
                                    .verticalScroll(rememberScrollState())
                            ) {
                                Text(
                                    info.releaseNotes,
                                    style = MaterialTheme.typography.bodySmall,
                                    color = textMuted,
                                    modifier = Modifier.padding(10.dp)
                                )
                            }
                        }

                        if (downloading) {
                            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                LinearProgressIndicator(
                                    progress = { progress },
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .height(8.dp)
                                        .clip(RoundedCornerShape(4.dp)),
                                    color = limeAccent,
                                    trackColor = Color.White.copy(alpha = 0.1f)
                                )
                                Text(
                                    "Baixando atualização: " + (progress * 100).toInt() + "%",
                                    style = MaterialTheme.typography.labelSmall,
                                    color = textMuted
                                )
                            }
                        }
                    }
                }
            }
        },
        confirmButton = {
            if (releaseInfo?.isNewer == true && !downloading) {
                Button(
                    onClick = {
                        downloading = true
                        statusText = "Baixando nova versão..."
                        scope.launch {
                            val res = AppUpdateManager.downloadAndInstallApk(context, releaseInfo!!.apkDownloadUrl) { p ->
                                progress = p
                            }
                            downloading = false
                            res.onFailure { e ->
                                errorMsg = e.message ?: "Falha ao baixar ou instalar o APK."
                            }
                        }
                    },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = limeAccent, contentColor = Color(0xFF090C15))
                ) {
                    Text("Baixar e Atualizar", fontWeight = FontWeight.Bold)
                }
            } else if (!checking && !downloading) {
                TextButton(onClick = onDismiss) {
                    Text("OK", color = limeAccent)
                }
            }
        },
        dismissButton = {
            if (!downloading) {
                TextButton(onClick = onDismiss) {
                    Text("Fechar", color = textMuted)
                }
            }
        }
    )
}
