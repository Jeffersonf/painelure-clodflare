# PainelURE no Cloudflare

Esta cópia é a versão Cloudflare do PainelURE. O projeto original `painelure2` não é alterado.

## Arquitetura

- Cloudflare Pages publica a interface e o Pages Worker.
- Cloudflare Worker executa as rotas `/api/*` nativamente.
- Cloudflare D1 armazena estado do painel, usuários, sessões, fontes oficiais, snapshots, auditoria e importações.
- O Postgres/Render fica somente como origem temporária para a migração inicial.

## Publicação

1. Crie o D1 `painelure-cloudflare` e copie o UUID para `database_id` nos dois arquivos Wrangler.
2. Crie os projetos Pages `painelure-cloudflare-pages` e Worker `painelure-cloudflare` na conta Cloudflare.
3. Configure os secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` no GitHub.
4. Configure a chave administrativa no Worker: `npx wrangler secret put PAINELURE_ADMIN_KEY --config=wrangler.worker.toml`.
5. Rode `npm run migrate:d1` uma vez, com acesso administrativo à API atual.
6. Faça o push deste projeto para o repositório GitHub destinado ao clone.
7. O workflow aplica as migrations, gera os assets e publica Worker e Pages.

Para testar localmente os arquivos públicos:

```bash
npm run build:cloudflare
npx wrangler d1 migrations apply painelure-cloudflare --local --config=wrangler.worker.toml
npx wrangler dev --config=wrangler.worker.toml
```

## Migração dos dados

O script `npm run migrate:d1` lê `/api/data`, `/api/users` e `/api/sources` da API atual, gera um SQL temporário ignorado pelo Git e executa a carga no D1. Usuários migrados recebem o PIN existente retornado pela API; se ele não estiver disponível, o PIN inicial é `1234` ou o valor de `PAINELURE_INITIAL_PIN`.

Depois de validar o domínio Cloudflare, a API Render pode ser desligada. O código original continua preservado em `painelure2`.
