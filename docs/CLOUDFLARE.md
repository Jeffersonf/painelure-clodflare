# PainelURE no Cloudflare

Esta cópia é a versão Cloudflare do PainelURE. O projeto original `painelure2` não é alterado.

## Arquitetura

- Cloudflare Pages publica a interface e o Pages Worker.
- Cloudflare Worker publica os mesmos arquivos e encaminha todas as rotas `/api/*` para a API atual.
- A API atual continua no endereço `https://painelure2-api.onrender.com` nesta primeira etapa, para preservar autenticação, permissões e dados já existentes.

## Publicação

1. Crie os projetos Pages `painelure-cloudflare-pages` e Worker `painelure-cloudflare` na conta Cloudflare.
2. Configure no GitHub os secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID`.
3. Faça o push deste projeto para o repositório GitHub destinado ao clone.
4. O workflow executa `npm run build:cloudflare` e publica Pages e Worker.

Para testar localmente os arquivos públicos:

```bash
npm run build:cloudflare
npx wrangler pages dev .cloudflare-public
```

## Próxima etapa: D1

O uso de D1 para substituir o Postgres/Render exige migrar o estado do app, sessões, usuários, auditoria, snapshots e as regras de acesso do backend. Essa migração deve ser feita depois de validar esta camada Cloudflare, sem apagar a API atual.
