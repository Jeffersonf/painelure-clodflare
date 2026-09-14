@echo off
chcp 65001 >nul
echo Encerrando instancias do Telegram Bot Runner...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*telegram-bot-runner*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force; Write-Host \"Processo encerrado PID:\" $_.ProcessId }"
echo.
echo [OK] Concluido.
echo.
pause