@echo off
title Abrir Chrome para Monitoramento PainelURE
echo ====================================================
echo   Abrindo Chrome com Porta de Depuracao (9222)
echo ====================================================
echo.
echo Este script abre o Chrome permitindo que o PainelURE leia
echo os incidentes do Zabbix e Meraki em tempo real.
echo.

set CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
if not exist %CHROME_PATH% set CHROME_PATH="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if not exist %CHROME_PATH% set CHROME_PATH="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

start "" %CHROME_PATH% --remote-debugging-port=9222 --user-data-dir="%LOCALAPPDATA%\Google\Chrome\MonitorProfile" "https://n672.dashboard.meraki.com" "https://zabbix-escolas.educacao.intragov"

echo Chrome aberto com sucesso na porta 9222!
echo Agora voce pode dar dois cliques em "iniciar-monitor.bat".
timeout /t 5
