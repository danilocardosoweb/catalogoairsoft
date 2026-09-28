# FIELD OPS — base Supabase

## Estado

Foi preparada e executada no projeto a migração `supabase/migrations/20260928000000_initial_field_ops_schema.sql`. A migração complementar `supabase/migrations/20260928010000_app_state_and_account_bootstrap.sql` completa o primeiro vínculo do app com a base compartilhada.

O projeto informado (`wkvhglnfugbcgirhfbgt`) não está autorizado na conexão Supabase MCP desta sessão, por isso a aplicação da migração complementar deve ser feita no SQL Editor do próprio projeto.

## Segurança imediata

- A chave `service_role` enviada na conversa deve ser revogada e recriada no painel Supabase.
- A chave publicável/anon está no arquivo de configuração público do frontend, como permitido pelo Supabase, com RLS ativo.
- O frontend usa apenas a chave publicável/anon, nunca a `service_role`.
- A `service_role` deve ficar somente em Edge Functions, servidor ou jobs protegidos.

## Estrutura inicial

### Identidade e organizações

- `organizations`: lojas, distribuidores e a plataforma.
- `profiles`: dados básicos ligados a `auth.users`.
- `organization_members`: vínculo usuário → organização → perfil (`consumer`, `retailer`, `distributor`, `operator`, `admin`).

### Catálogo

- `brands`, `categories`, `products`, `product_media`.
- `product_prices` separa varejo, lojista e distribuidor.
- `inventory` controla disponível, reservado e alerta de estoque baixo.

### Operação comercial

- `customers`, `quotes`, `quote_items`.
- `orders`, `order_items`, `shipments`.
- Os itens guardam nome, SKU e preço no momento da operação para preservar o histórico mesmo quando o produto mudar.

### Conteúdo e aquisição

- `banners` para campanhas da Home.
- `radar_sources` e `radar_content` para captação, revisão e publicação.
- `airdrops` e `airdrop_redemptions` para campanhas promocionais.
- `audit_events` para futuras trilhas de alteração.

## Regras de acesso

- Catálogo ativo, banners ativos, conteúdo publicado e Airdrops válidos podem ser lidos publicamente.
- Cliente autenticado vê seus próprios perfil, orçamentos, pedidos, remessas e resgates.
- Lojista, operador e administrador gerenciam a operação da própria organização.
- Distribuidor possui leitura operacional, sem administrar clientes ou campanhas.
- Todas as tabelas ficam com RLS ativo; as permissões de linha são aplicadas no banco, não apenas no frontend.

## Migração do app atual

1. Criar a organização `Suprimentos Oliveira`.
2. Criar o usuário administrativo e seu vínculo em `organization_members`.
3. Migrar produtos, categorias e preços do backup JSON/planilha para o catálogo relacional.
4. Migrar orçamentos e pedidos locais com os snapshots dos itens.
5. O frontend já não lê nem grava `localStorage`; o estado autenticado é sincronizado no `user_app_state` pela Data API do Supabase, usando a chave publicável e RLS.
6. Mover criação de pedidos, reserva de estoque, Airdrops e integrações externas para Edge Functions autenticadas.
7. Validar RLS com consumidor, lojista, distribuidor e administrador antes da publicação.

## Próximo passo para aplicar

Autorize o projeto Supabase correto na conexão da sessão ou execute o arquivo pelo SQL Editor do próprio projeto. Depois disso, a migração deve ser aplicada em ambiente de teste, validada com os advisors de segurança e só então usada para conectar o app publicado.
