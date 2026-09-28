# Ponto de restauração — FIELD OPS

## Ponto mais recente — composição do hero e controles de banner

- Data: 27/09/2026
- Versão publicada: v79
- URL: https://field-ops-airsoft.danilocardoso-web.chatgpt.site
- Tag Git: `restore-v79-banner-layout`
- Commit do estado funcional: `7e36c42eae023223f5d103829477fc6ac2c75be5`
- Arquivo: `backups/field-ops-restore-v79-banner-layout.tar.gz`
- SHA-256: `028C0E7E7F20408876780B6BF5E8CDFED521649159E00CC54CF32C3D8CDDD8FB`

Este ponto remove a assinatura/logo do primeiro banner e centraliza as opções de campanha no hero, mantendo o seletor acessível e responsivo em desktop e mobile. O logo do cabeçalho e do rodapé continua abrindo o filme institucional da marca.

## Ponto mais recente — filme institucional da marca

- Data: 27/09/2026
- Versão publicada: v78
- URL: https://field-ops-airsoft.danilocardoso-web.chatgpt.site
- Tag Git: `restore-v78-brand-film`
- Commit do estado funcional: `e8453cac2f1423cec4120e9b8b7da31480c279f6`
- Arquivo: `backups/field-ops-restore-v78-brand-film.tar.gz`
- SHA-256 do vídeo sem áudio: `7F788045EEDF7955CF500727C198954EA198E82E311606FB115860EA1A116104`
- SHA-256 do arquivo de restauração: `878179C046CCBBC789D43C2401219B14F4AF424CA5870CA2E205EBABA4CC73FA`

Este ponto adiciona o filme institucional da Suprimentos Oliveira. Ao clicar em qualquer logo da loja — cabeçalho, rodapé ou assinatura da Home — o filme abre em modal, inicia sem som, repete enquanto estiver aberto e oferece replay e fechamento. O arquivo hospedado mantém apenas o vídeo, sem faixa de áudio.

## Ponto mais recente — categorias gerenciáveis pelo lojista

- Data: 27/09/2026
- Versão publicada: v76
- URL: https://field-ops-airsoft.danilocardoso-web.chatgpt.site
- Tag Git: `restore-v76-catalog-categories`
- Commit do estado funcional: `1f9a06a97833e4ed186cfc53749a908da74a3019`
- Arquivo: `backups/field-ops-restore-v76-catalog-categories.tar.gz`
- SHA-256 local: `9A7A4D22CA3963FE0A48C708C637BFE0C7B3541D1B3CFE2168141BD23B084E2E`
- Hash da versão arquivada no Sites: `sha256:e9501ec1c99a2c4ce6efc9e67e9e95ed62d1c82c5737b2561d8ac677baaae248`

Este ponto preserva o gerenciador de categorias do perfil Lojista. O lojista pode cadastrar nome, descrição e imagem opcional, ativar ou ocultar frentes e excluir categorias personalizadas sem remover produtos vinculados. “Roupas” e “Acessórios” já ficam disponíveis, e as categorias passam a alimentar a Home, os atalhos, os filtros, o cadastro/edição de produtos e o backup JSON.

## Ponto mais recente — acesso e pedidos do consumidor

- Data: 27/09/2026
- Versão publicada: v74
- URL: https://field-ops-airsoft.danilocardoso-web.chatgpt.site
- Commit do estado funcional: `8cf116fab630998b7e65677f793d6c2aee017543`
- Arquivo: `site-release-access-roles-v74.tar.gz`
- SHA-256: `8333365B0732B7FCFC63A6B375B5283F72A14C61555EF740D500C93A1B9B1DE9`

Este ponto preserva os perfis Consumidor, Lojista e Distribuidor, os menus e permissões por função, o redirecionamento de rotas protegidas e a área pública “Meus pedidos”.

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
