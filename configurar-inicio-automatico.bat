@echo off
chcp 65001 >nul
echo ========================================================
echo CONFIGURANDO INICIALIZACAO AUTOMATICA DO BOT PAINELURE
echo ========================================================
echo.
set "STARTUP_DIR=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "TARGET_FILE=C:\Users\jeffe\projetos\painelure clodflare\iniciar-silencioso.vbs"
set "LNK_FILE=%STARTUP_DIR%\PainelURE_Bot_Silencioso.lnk"
echo Criando atalho...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$w = New-Object -ComObject WScript.Shell; $s = $w.CreateShortcut(\"$env:LNK_FILE\"); $s.TargetPath = \"$env:TARGET_FILE\"; $s.WorkingDirectory = \"C:\Users\jeffe\projetos\painelure clodflare\"; $s.Description = \"PainelURE Bot Silencioso\"; $s.Save()"
echo.
echo [OK] Atalho configurado com sucesso na pasta Inicializar do Windows!
echo O bot agora iniciara em segundo plano ao ligar o computador.
echo.
pause