Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\jeffe\projetos\painelure clodflare"
WshShell.Run "node scripts/telegram-bot-runner.js", 0, False
