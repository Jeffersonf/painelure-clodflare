@echo off
title Abrir Chrome Monitoramento PainelURE
echo ====================================================
echo   Abrindo Chrome na Porta de Depuracao (9222)
echo ====================================================
echo.
echo FECHANDO processos zumbis do Chrome para liberar a porta 9222...
taskkill /F /IM chrome.exe >nul 2>&1
timeout /t 2 >nul

set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist %CHROME_PATH% set CHROME_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if not exist %CHROME_PATH% set CHROME_PATH="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

echo Iniciando o Chrome com porta 9222 habilitada...
start "" %CHROME_PATH% --remote-debugging-port=9222 "https://n672.dashboard.meraki.com" "https://zabbix-escolas.educacao.intragov"

echo.
echo [OK] Chrome iniciado! Faça login nas duas abas (Meraki e Zabbix).
echo Depois inicie o agente com "iniciar-monitor.bat".
timeout /t 6
