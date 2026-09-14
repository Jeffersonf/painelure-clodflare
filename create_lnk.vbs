
Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = "C:\Users\jeffe\Desktop\PainelURE Bot Telegram.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "C:\Users\jeffe\Desktop\Iniciar_PainelURE_Bot.bat"
oLink.WorkingDirectory = "C:\Users\jeffe\projetos\painelure clodflare"
oLink.Description = "Iniciar PainelURE Bot Telegram"
oLink.Save
