package com.painelure.app.data

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.core.content.FileProvider
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL

data class AppReleaseInfo(
    val tagName: String,
    val versionName: String,
    val releaseNotes: String,
    val apkDownloadUrl: String,
    val apkSize: Long,
    val isNewer: Boolean
)

object AppUpdateManager {
    private const val CLOUDFLARE_VERSION_URL = "https://painelure.pages.dev/version.json"
    private const val GITHUB_REPO = "Jeffersonf/painelure-clodflare"
    private const val GITHUB_API = "https://api.github.com/repos/$GITHUB_REPO/releases/latest"

    suspend fun checkForUpdates(currentVersionName: String): Result<AppReleaseInfo> = withContext(Dispatchers.IO) {
        runCatching {
            // 1. Tentar primeiro o endpoint direto do Cloudflare Pages (rápido, sem 404 e público)
            val cfResult = runCatching {
                val url = URL(CLOUDFLARE_VERSION_URL)
                val conn = (url.openConnection() as HttpURLConnection).apply {
                    requestMethod = "GET"
                    setRequestProperty("User-Agent", "PainelURE-Android-App")
                    connectTimeout = 8000
                    readTimeout = 8000
                }
                if (conn.responseCode == 200) {
                    val body = conn.inputStream.bufferedReader().use { it.readText() }
                    val json = JSONObject(body)
                    val tagName = json.optString("tagName", json.optString("versionName", "11.10.0")).removePrefix("v").trim()
                    val notes = json.optString("notes", "Nova versão disponível.").trim()
                    val apkUrl = json.optString("apkUrl", "https://painelure.pages.dev/apk")
                    val isNewer = compareVersions(tagName, currentVersionName) > 0
                    AppReleaseInfo(
                        tagName = tagName,
                        versionName = tagName,
                        releaseNotes = notes,
                        apkDownloadUrl = apkUrl,
                        apkSize = 0L,
                        isNewer = isNewer
                    )
                } else null
            }.getOrNull()

            if (cfResult != null) {
                return@runCatching cfResult
            }

            // 2. Fallback para a API do GitHub Releases
            val url = URL(GITHUB_API)
            val conn = (url.openConnection() as HttpURLConnection).apply {
                requestMethod = "GET"
                setRequestProperty("Accept", "application/vnd.github.v3+json")
                setRequestProperty("User-Agent", "PainelURE-Android-App")
                connectTimeout = 8000
                readTimeout = 8000
            }

            if (conn.responseCode != 200) {
                error("Verificação retornou código " + conn.responseCode)
            }

            val responseBody = conn.inputStream.bufferedReader().use { it.readText() }
            val json = JSONObject(responseBody)
            val tagName = json.optString("tag_name", "").removePrefix("v").trim()
            val releaseNotes = json.optString("body", "").trim()
            val assets = json.optJSONArray("assets") ?: error("Nenhum arquivo no release")

            var downloadUrl = ""
            var size = 0L

            for (i in 0 until assets.length()) {
                val asset = assets.optJSONObject(i) ?: continue
                val name = asset.optString("name", "")
                if (name.endsWith(".apk", ignoreCase = true)) {
                    downloadUrl = asset.optString("browser_download_url", "")
                    size = asset.optLong("size", 0L)
                    break
                }
            }

            if (downloadUrl.isBlank()) {
                downloadUrl = "https://painelure.pages.dev/apk"
            }

            val isNewer = compareVersions(tagName, currentVersionName) > 0

            AppReleaseInfo(
                tagName = tagName,
                versionName = tagName,
                releaseNotes = releaseNotes,
                apkDownloadUrl = downloadUrl,
                apkSize = size,
                isNewer = isNewer
            )
        }
    }

    suspend fun downloadAndInstallApk(
        context: Context,
        downloadUrl: String,
        onProgress: (Float) -> Unit
    ): Result<Unit> = withContext(Dispatchers.IO) {
        runCatching {
            val url = URL(downloadUrl)
            val conn = (url.openConnection() as HttpURLConnection).apply {
                requestMethod = "GET"
                setRequestProperty("User-Agent", "PainelURE-Android-App")
                connectTimeout = 15000
                readTimeout = 30000
                instanceFollowRedirects = true
            }

            val totalBytes = conn.contentLength.toFloat()
            val updatesDir = File(context.getExternalFilesDir(null) ?: context.filesDir, "updates").apply {
                if (!exists()) mkdirs()
            }
            val apkFile = File(updatesDir, "PainelURE-update.apk")
            if (apkFile.exists()) apkFile.delete()

            conn.inputStream.use { input ->
                FileOutputStream(apkFile).use { output ->
                    val buffer = ByteArray(8192)
                    var bytesRead: Int
                    var totalRead = 0L

                    while (input.read(buffer).also { bytesRead = it } != -1) {
                        output.write(buffer, 0, bytesRead)
                        totalRead += bytesRead
                        if (totalBytes > 0) {
                            onProgress(totalRead / totalBytes)
                        }
                    }
                    output.flush()
                }
            }

            withContext(Dispatchers.Main) {
                installApk(context, apkFile)
            }
        }
    }

    private fun installApk(context: Context, apkFile: File) {
        val apkUri: Uri = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            FileProvider.getUriForFile(
                context,
                context.packageName + ".fileprovider",
                apkFile
            )
        } else {
            Uri.fromFile(apkFile)
        }

        val intent = Intent(Intent.ACTION_VIEW).apply {
            setDataAndType(apkUri, "application/vnd.android.package-archive")
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }

        context.startActivity(intent)
    }

    private fun compareVersions(v1: String, v2: String): Int {
        val parts1 = v1.split(".").mapNotNull { it.toIntOrNull() }
        val parts2 = v2.split(".").mapNotNull { it.toIntOrNull() }
        val maxLen = maxOf(parts1.size, parts2.size)

        for (i in 0 until maxLen) {
            val num1 = parts1.getOrElse(i) { 0 }
            val num2 = parts2.getOrElse(i) { 0 }
            if (num1 != num2) {
                return num1.compareTo(num2)
            }
        }
        return 0
    }
}
