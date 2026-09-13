@echo off
title PainelURE Monitor Agent
echo ====================================================
echo   Iniciando Agente de Monitoramento do PainelURE
echo ====================================================
cd /d "%~dp0"
if not exist node_modules (
    echo Instalando dependencias necessarias...
    call npm install
)
echo Iniciando agente em background...
node agent.js
pause