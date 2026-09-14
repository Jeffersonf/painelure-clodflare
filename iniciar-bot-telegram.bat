@echo off
title PainelURE - Assistente Telegram
chcp 65001 > nul
cd /d "C:\Users\jeffe\projetos\painelure clodflare"
echo ========================================================
echo   PAINELURE ITAPEVA - ASSISTENTE TELEGRAM
echo ========================================================
echo.
node scripts\telegram-bot-runner.js
echo.
pause
