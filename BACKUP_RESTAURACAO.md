# Ponto de restauração — FIELD OPS

## Ponto mais recente — perfis de acesso

- Data: 27/09/2026
- Versão publicada: v72
- URL: https://field-ops-airsoft.danilocardoso-web.chatgpt.site
- Commit do estado funcional: `290421a4306468f0e403be0d943af4c94d8b7150`
- Arquivo: `site-release-access-roles-v72.tar.gz`
- SHA-256: `3986F51C5DB8CA9A5D41CA39A01AAAC606660E45DE5369B043622E07F1754B19`

Este ponto adiciona os perfis Consumidor, Lojista e Distribuidor, menus e áreas iniciais por função, mapa de permissões e redirecionamento de rotas não permitidas. O perfil de Lojista recebe a operação completa da loja; o Distribuidor fica limitado ao abastecimento; o Consumidor permanece na jornada de compra. A autenticação e a autorização de servidor continuam pendentes para transformar esta separação local-first em segurança real.

## Estado protegido

- Data: 26/09/2026
- Versão publicada: v47
- URL: https://field-ops-airsoft.danilocardoso-web.chatgpt.site
- Tag Git: `restore-v47-radar-score`
- Commit do estado funcional: `96cbc2e4d8e09ddedff85abdf28e5bb4eb4dd7dd`
- Arquivo: `backups/field-ops-restore-v47-radar-score-2026-09-26.tar.gz`
- SHA-256: `62EBB3629495BABCA157E85B5856B45FFC833AA4F890505B67CB878573A4A5A0`

## O que este ponto preserva

- Catálogo, carrinho, orçamento, loadout, favoritos e painel operacional no estado publicado.
- Radar Airsoft, Leitura de Campo, interação do operador e pontuação discreta de assistência.
- Fontes iniciais cadastradas no Radar: GhostBase, Airsoft RS, Airsoft Company, TacTov e Brasil Airsoft no YouTube.
- Fluxo de Airdrop, frete local, expedição, pedidos, importação e restauração de dados.
- Configuração do Site em `.openai/hosting.json` e documentação de implementação.

## Como restaurar o código

1. Preserve o estado atual antes de qualquer nova alteração.
2. Para voltar ao código publicado, use a tag `restore-v47-radar-score` ou extraia o arquivo de backup para uma cópia limpa do projeto.
3. Valide `dist/app.js` e `dist/styles.css` antes de publicar novamente.
4. Publique somente depois de confirmar a versão restaurada no navegador.

## Dados locais do navegador

O app ainda opera em modo local-first. Produtos, orçamentos, pedidos, perfil, fontes e pontuação salvos no `localStorage` não ficam dentro do backup de código. Antes de novas mudanças, exporte também um backup JSON pelo painel operacional em `Exportar dados → Backup completo · JSON`.

## Regra de continuidade

Antes de uma alteração estrutural, crie um novo ponto com data, versão, commit e arquivo próprios. Nunca substitua este backup; ele representa a última base validada do app.
