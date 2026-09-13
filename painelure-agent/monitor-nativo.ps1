<#
.SYNOPSIS
    PainelURE Screen Monitor - 100% Nativo em PowerShell
    Não requer Git, Node.js nem instalação de nada.
    Tira print da tela atual (onde o Chrome com Zabbix/Meraki já está aberto)
    e envia para o PainelURE.
#>

$ServerUrl = "https://painelure-cloudflare-pages.pages.dev"
$SecretToken = "ure-monitor-secret-2026"
$NormalIntervalSeconds = 3600 # 1 hora
$RealtimeIntervalSeconds = 10 # 10 segundos
$PollStatusSeconds = 5        # Checa a cada 5s se usuário pediu tempo real

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

function Capture-Screen-Base64 {
    try {
        $bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
        $bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
        
        $ms = New-Object System.IO.MemoryStream
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]75)
        
        $bitmap.Save($ms, $codec, $encoderParams)
        $bytes = $ms.ToArray()
        
        $graphics.Dispose()
        $bitmap.Dispose()
        $ms.Dispose()
        
        return [System.Convert]::ToBase64String($bytes)
    }
    catch {
        Write-Warning "Falha na captura: $($_.Exception.Message)"
        return $null
    }
}

function Send-Screenshot {
    param($base64Data)
    if (-not $base64Data) { return }
    
    $payload = @{
        image = "data:image/jpeg;base64,$base64Data"
        source = "powershell-screen-agent"
        timestamp = (Get-Date).ToString("o")
    } | ConvertTo-Json
    
    $headers = @{
        "Content-Type" = "application/json"
        "X-Monitor-Token" = $SecretToken
    }
    
    try {
        $res = Invoke-RestMethod -Uri "$ServerUrl/api/monitor/upload" -Method Post -Body $payload -Headers $headers -TimeoutSec 30
        $hora = (Get-Date).ToString("HH:mm:ss")
        $modo = if ($global:IsRealtime) { "TEMPO REAL (10s)" } else { "NORMAL (1h)" }
        Write-Host "[$hora] [OK] Print da tela enviado com sucesso! Modo: $modo" -ForegroundColor Green
        $global:LastCapture = [DateTime]::UtcNow
    }
    catch {
        Write-Host "[ERRO] Falha no upload: $($_.Exception.Message)" -ForegroundColor Red
    }
}

function Check-Realtime-Status {
    try {
        $res = Invoke-RestMethod -Uri "$ServerUrl/api/monitor/status" -Method Get -TimeoutSec 10
        $wasRealtime = $global:IsRealtime
        $global:IsRealtime = [bool]$res.realtime
        
        if (-not $wasRealtime -and $global:IsRealtime) {
            Write-Host ">> [ALERTA] MODO TEMPO REAL ATIVADO PELO USUÁRIO! Enviando prints a cada 10s..." -ForegroundColor Yellow
            $b64 = Capture-Screen-Base64
            Send-Screenshot $b64
        }
    }
    catch {}
}

Clear-Host
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "     PAINELURE MONITOR DE TELA - AGENTE NATIVO WINDOWS    " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Servidor: $ServerUrl" -ForegroundColor Gray
Write-Host "Normal: A cada 1 hora | Tempo Real: A cada 10 segundos" -ForegroundColor Gray
Write-Host "Para manter ativo, deixe esta janela minimizada." -ForegroundColor DarkGray
Write-Host "----------------------------------------------------------" -ForegroundColor Cyan

$global:IsRealtime = $false
$global:LastCapture = [DateTime]::MinValue

# Primeira captura imediata
$b64 = Capture-Screen-Base64
Send-Screenshot $b64

while ($true) {
    Start-Sleep -Seconds $PollStatusSeconds
    Check-Realtime-Status
    
    $now = [DateTime]::UtcNow
    $diffSec = ($now - $global:LastCapture).TotalSeconds
    
    $interval = if ($global:IsRealtime) { $RealtimeIntervalSeconds } else { $NormalIntervalSeconds }
    
    if ($diffSec -ge $interval) {
        $b64 = Capture-Screen-Base64
        Send-Screenshot $b64
    }
}
