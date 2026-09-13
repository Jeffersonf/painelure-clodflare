<# PainelURE Monitor Nativo (Tira print das janelas App do Chrome: Meraki e Zabbix) #>
$ServerUrl = "https://painelure-cloudflare-pages.pages.dev"
$SecretToken = "ure-monitor-secret-2026"
$NormalIntervalSeconds = 3600
$RealtimeIntervalSeconds = 10
$PollStatusSeconds = 5

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

function Capture-And-Send {
    try {
        $bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
        $bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
        
        $ms = New-Object System.IO.MemoryStream
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $p = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]75)
        $bitmap.Save($ms, $codec, $p)
        $b64 = [System.Convert]::ToBase64String($ms.ToArray())
        $graphics.Dispose(); $bitmap.Dispose(); $ms.Dispose()
        
        $body = @{ 
            image = "data:image/jpeg;base64,$b64"
            source = "zabbix-meraki-screen"
            timestamp = (Get-Date).ToString("o") 
        } | ConvertTo-Json
        
        $headers = @{ "Content-Type" = "application/json"; "X-Monitor-Token" = $SecretToken }
        Invoke-RestMethod -Uri "$ServerUrl/api/monitor/upload" -Method Post -Body $body -Headers $headers -TimeoutSec 30 | Out-Null
        
        $modo = if ($global:IsRealtime) { "TEMPO REAL (10s)" } else { "NORMAL (1h)" }
        Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] [OK] Print de tela (Meraki + Zabbix) enviado! ($modo)" -ForegroundColor Green
        $global:LastCapture = [DateTime]::UtcNow
    } catch {
        Write-Host "[ERRO] $($_.Exception.Message)" -ForegroundColor Red
    }
}

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "    PAINELURE MONITOR DE TELA (MERAKI + ZABBIX ABERTOS)   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Capturando as janelas em modo app do Chrome ativas." -ForegroundColor Gray
Write-Host "Pode minimizar esta janela. Nao a feche." -ForegroundColor DarkGray
Write-Host "----------------------------------------------------------" -ForegroundColor Cyan

$global:IsRealtime = $false
$global:LastCapture = [DateTime]::MinValue
Capture-And-Send

while ($true) {
    Start-Sleep -Seconds $PollStatusSeconds
    try {
        $st = Invoke-RestMethod -Uri "$ServerUrl/api/monitor/status" -Method Get -TimeoutSec 10
        $wasRt = $global:IsRealtime
        $global:IsRealtime = [bool]$st.realtime
        if (-not $wasRt -and $global:IsRealtime) {
            Write-Host ">> [ALERTA] MODO TEMPO REAL ACIONADO! Enviando a cada 10s..." -ForegroundColor Yellow
            Capture-And-Send
        }
    } catch {}
    
    $diff = ([DateTime]::UtcNow - $global:LastCapture).TotalSeconds
    $limit = if ($global:IsRealtime) { $RealtimeIntervalSeconds } else { $NormalIntervalSeconds }
    if ($diff -ge $limit) { Capture-And-Send }
}
