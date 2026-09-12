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
    private var onExitPrompt: (() -> Unit)? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView?.canGoBack() == true) {
                    webView?.goBack()
                } else {
                    onExitPrompt?.invoke() ?: finish()
                }
            }
        })

        setContent {
            PainelUREApp(
                onWebViewCreated = { webView = it },
                onSetupExitPrompt = { callback -> onExitPrompt = callback },
                onExitApp = { finish() }
            )
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun PainelUREApp(
    onWebViewCreated: (WebView) -> Unit,
    onSetupExitPrompt: (() -> Unit) -> Unit,
    onExitApp: () -> Unit
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    var showUpdateDialog by remember { mutableStateOf(false) }
    var showExitDialog by remember { mutableStateOf(false) }
    var autoReleaseInfo by remember { mutableStateOf<AppReleaseInfo?>(null) }

    var isLoading by remember { mutableStateOf(true) }
    var loadProgress by remember { mutableFloatStateOf(0f) }

    val liveUrl = "https://painelure-cloudflare-pages.pages.dev"
    val localFallbackUrl = "file:///android_asset/web/index.html"

    val darkBackground = Color(0xFF090C15)
    val accentColor = Color(0xFF6366F1)

    LaunchedEffect(Unit) {
        onSetupExitPrompt {
            showExitDialog = true
        }
    }

    val currentVersion = remember {
        runCatching {
            context.packageManager.getPackageInfo(context.packageName, 0).versionName ?: "11.9.0"
        }.getOrDefault("11.9.0")
    }

    LaunchedEffect(Unit) {
        withContext(Dispatchers.IO) {
            val result = AppUpdateManager.checkForUpdates(currentVersion)
            result.onSuccess { info ->
                if (info.isNewer) {
                    withContext(Dispatchers.Main) {
                        autoReleaseInfo = info
                        showUpdateDialog = true
                    }
                }
            }
        }
    }

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
                    color = accentColor,
                    trackColor = Color.Transparent
                )
            }

            if (showExitDialog) {
                AlertDialog(
                    onDismissRequest = { showExitDialog = false },
                    containerColor = Color(0xFF131826),
                    titleContentColor = Color.White,
                    textContentColor = Color.White,
                    shape = RoundedCornerShape(20.dp),
                    title = {
                        Text("Sair do PainelURE?", fontWeight = FontWeight.Bold, fontSize = 18.sp)
                    },
                    text = {
                        Text("Deseja realmente fechar o aplicativo?", color = Color(0xFF9AA3B5), fontSize = 14.sp)
                    },
                    confirmButton = {
                        Button(
                            onClick = onExitApp,
                            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEF4444)),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("Sair", fontWeight = FontWeight.Bold)
                        }
                    },
                    dismissButton = {
                        TextButton(onClick = { showExitDialog = false }) {
                            Text("Cancelar", color = Color.White)
                        }
                    }
                )
            }

            if (showUpdateDialog) {
                NativeUpdateDialog(
                    initialInfo = autoReleaseInfo,
                    onDismiss = { showUpdateDialog = false }
                )
            }
        }
    }
}

@Composable
fun NativeUpdateDialog(
    initialInfo: AppReleaseInfo? = null,
    onDismiss: () -> Unit
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var checking by remember { mutableStateOf(initialInfo == null) }
    var downloading by remember { mutableStateOf(false) }
    var progress by remember { mutableFloatStateOf(0f) }
    var statusText by remember { mutableStateOf(initialInfo?.let { "Nova versão " + it.versionName + " disponível!" } ?: "Verificando atualizações...") }
    var releaseInfo by remember { mutableStateOf(initialInfo) }
    var errorMsg by remember { mutableStateOf("") }

    val currentVersion = remember {
        runCatching {
            context.packageManager.getPackageInfo(context.packageName, 0).versionName ?: "11.9.0"
        }.getOrDefault("11.9.0")
    }

    val accentColor = Color(0xFF6366F1)
    val textMuted = Color(0xFF9AA3B5)
    val darkCard = Color(0xFF131826)

    LaunchedEffect(Unit) {
        if (releaseInfo == null) {
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
                    color = accentColor.copy(alpha = 0.15f),
                    modifier = Modifier.size(34.dp)
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Icon(Icons.Default.SystemUpdate, null, tint = accentColor, modifier = Modifier.size(18.dp))
                    }
                }
                Text("Atualização Disponível", fontWeight = FontWeight.Bold, fontSize = 18.sp)
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
                        CircularProgressIndicator(modifier = Modifier.size(24.dp), strokeWidth = 2.dp, color = accentColor)
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
                            color = if (info.isNewer) accentColor else Color.White
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
                                    color = accentColor,
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
                    colors = ButtonDefaults.buttonColors(containerColor = accentColor, contentColor = Color.White)
                ) {
                    Text("Baixar e Atualizar", fontWeight = FontWeight.Bold)
                }
            } else if (!checking && !downloading) {
                TextButton(onClick = onDismiss) {
                    Text("OK", color = accentColor)
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
