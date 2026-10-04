# Revisão do app e plano de correções

Data: 03/10/2026. Escopo: código local, migrações, função de frete e navegação no app em localhost. Esta rodada implementou as correções prioritárias no código local sem apagar dados comerciais.

## Conclusão

O app tem uma boa base de catálogo, apresentação, carrinho e atendimento por orçamento. Entretanto, a integração operacional com o Supabase ainda é parcial. Não é recomendável considerá-lo pronto para operação comercial multiusuário antes das correções P0.

As tabelas relacionais existem nos arquivos de migração, mas sua existência não significa que os fluxos da interface já as utilizem. Parte importante da operação continua dentro de um estado JSON individual de cada usuário.

Limite da revisão: o conector não autorizou a leitura do projeto Supabase. Portanto, dados reais, políticas efetivamente publicadas, configuração do Auth, SMTP, segredos, deploy da função de frete e ambiente hospedado não foram certificados. Os riscos de banco abaixo foram identificados nas migrações locais; precisam ser conferidos no projeto antes de qualquer mudança.

## O que já foi corrigido nesta rodada

- Estado pessoal (carrinho, favoritos e preferências) separado do catálogo e da operação compartilhada; sincronização relacional passou a ser explícita e preserva reservas/limites existentes.
- Sessão restaurada/renovada no navegador, recuperação de senha adicionada ao login e bloqueio de conta reforçado na migração.
- Orçamento e conversão em pedido preparados para RPC transacional no Supabase, com snapshot de itens/preços, idempotência e reserva de estoque.
- Importação numérica corrigida para moeda, estoque e decimais; reimportação complementa o cadastro sem duplicar ou apagar descrição, imagem e especificações.
- Cotação simulada removida do fluxo; a Edge Function passou a exigir CEP/organização configurados no servidor e consultar peso, medidas e preço do catálogo oficial, além de validar validade, dados incompletos e recotação após alteração de embalagem.
- Sincronização de imagens para `product_media`, proteção de textos editáveis e limite básico de requisições na Edge Function do Melhor Envio.
- Carrinho mantém itens recolhíveis e frete/Airdrop recolhíveis, preservando espaço para vários produtos.

## O que já estava encaminhado

- Identidade visual consistente e páginas de catálogo e produto navegáveis.
- Login separado do cadastro, confirmado na interface.
- Categorias configuráveis e reconhecimento das colunas da planilha de estoque.
- Apresentação de moeda brasileira: exemplos `1.400,00` e `1.500,00` foram interpretados corretamente em teste isolado.
- Frete e cupom recolhíveis no carrinho, confirmados na interface.
- Campos de CEP e estrutura de consulta oficial no produto e carrinho.
- Estrutura de autorizações administrativas e atribuição de perfil no servidor via `ensure_account`.
- Estrutura de pesos, medidas, histórico comercial, expedição e indicadores.
- Tokens do Melhor Envio buscados no ambiente do servidor, não embutidos na função enviada ao navegador.
- Verificação de sintaxe dos dois arquivos JavaScript principais sem erro. Isso não substitui testes funcionais.

## P0 — Correções essenciais antes de operar com vendas reais

### 1. Uma base oficial compartilhada, sem regravar o catálogo inteiro

**Achado:** carregar o estado individual pode substituir o catálogo recém-carregado do banco. Cada salvamento de usuário lojista/operador/admin também envia novamente categorias, marcas, produtos, preços e estoque. A sincronização força `reserved_quantity: 0` e limite de estoque baixo igual a 3.

**Risco:** dados antigos sobrescreverem alterações de outra pessoa; reservas desaparecerem; tráfego desnecessário; telas diferentes para usuários da mesma loja.

**Correção planejada:** deixar carrinho, favoritos e preferências individuais separados da operação da loja. Usar gravações específicas por registro, IDs estáveis, controle de concorrência e confirmação do servidor. Configuração da loja e CEP de origem devem ser compartilhados por organização.

**Aceite:** dois usuários da mesma loja enxergam o mesmo catálogo e operação; editar um produto não altera outro; salvar um favorito não envia estoque; recarregar não restaura preço antigo.

Evidências: [sincronização de catálogo](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/supabase.js:150>) e [carregamento do estado](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:720>).

### 2. Login durável e permissões efetivas no servidor

**Achado:** a sessão do adaptador atual fica em memória, sem restauração e renovação do token. A interface não oferece recuperação de senha. O bloqueio altera `access_grants`, enquanto as políticas locais consultam a situação de `organization_members`; não há sincronização imediata desses estados nesse fluxo. Políticas locais usam principalmente o perfil, não cada liberação granular. Lista vazia de permissões recebe permissões padrão.

**Correção planejada:** usar gerenciamento de sessão suportado, recuperação de senha e tratamento de links de confirmação. Centralizar autorização por organização e capacidade; bloquear acessos já conectados; distinguir “sem permissão” de “usar padrão”. Conferir se cadastro público deve ser desativado ou limitado por convite no Auth.

**Aceite:** sessão se mantém e renova de forma segura; usuário sem liberação não grava pela API; bloqueio vale imediatamente; uma loja não acessa dados de outra; admin mantém suas permissões.

Evidências: [adaptador de login](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/supabase.js:49>), [bloqueio](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:1729>) e [migração de permissões](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/supabase/migrations/20260928020000_access_control_and_admin.sql:133>).

### 3. Orçamento e pedido reais, com estoque protegido

**Achado:** orçamento, pedido e cliente são manipulados no estado individual. Converter orçamento cria um número de pedido no navegador, sem transação de reserva/baixa de estoque. O link público procura o orçamento no estado já carregado, não por consulta compartilhada segura. Visitantes não têm o estado gravado pelo adaptador, mas recebem mensagem de orçamento criado e o carrinho é limpo.

**Correção planejada:** persistir clientes, propostas, itens, pedidos e movimentos nas tabelas oficiais. Criar pedido em transação com validação de saldo e prevenção de conversão duplicada. Salvar preço unitário e desconto em cada item. Compartilhar proposta por token seguro, com validade e aprovação verificada no servidor. Só confirmar sucesso e limpar o carrinho após gravação efetiva.

**Aceite:** orçamento do cliente aparece para o vendedor; o link abre em outro navegador autorizado ao documento; mudar preço do catálogo não modifica proposta já enviada; duas vendas da última unidade não são aprovadas simultaneamente; cancelamento segue política explícita de liberação de reserva.

Evidências: [conversão em pedido](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:2002>), [proposta pública](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:2086>) e [registro do orçamento](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:2497>).

### 4. Importação complementar, precisa e sem perda de cadastro

**Achado:** o mesmo conversor interpreta `0,125` e `0.125` como `125`, e texto inválido como zero. A importação pode substituir uma descrição preenchida por descrição genérica. Quando detecta colunas logísticas, atribui valores padrão de categoria em vez de converter os valores dessas colunas. A edição comum também substitui especificações técnicas por campos vazios.

**Correção planejada:** separar interpretação de moeda, inteiro de estoque e decimal de peso/medida. Atualizar somente campos efetivamente fornecidos. Preservar descrição, imagem, categoria revisada e especificações. Identificar por ID/SKU estável; tratar código de barras repetido e nomes parecidos como conflito a revisar, não como correspondência definitiva.

**Aceite:** importar a mesma planilha duas vezes não duplica; `R$ 1.500,00` continua 1500 reais; 0,125 kg continua 0,125 kg; campo inválido gera erro de linha; cadastro enriquecido não perde conteúdo. Conferir produtos hoje publicados com a planilha antes de liberar a loja.

Evidências: [interpretação numérica](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:2675>) e [aplicação da importação](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:2716>).

### 5. Concluir o Melhor Envio e eliminar frete simulado

**Achados confirmados no código:**

- A resposta OPTIONS monta corpo JSON com status 204, combinação inválida no construtor Response. Teste isolado reproduziu o erro.
- A função recebe CEP de origem, medidas e valor segurado do navegador, sem buscar esses dados na base oficial.
- O código permite requisição sem verificação de JWT e não contém limitação de uso. Cotação pública exige proteção contra abuso, não necessariamente login obrigatório de consumidores.
- Um preço inválido ou ausente da API pode ser convertido em zero.
- A validade da cotação e mudanças no CEP oficial/valor segurado não são verificadas completamente.
- Alterar embalagem do pedido ainda recalcula frete por tabela simulada, podendo substituir o valor oficial.
- Converter orçamento em pedido não recota nesse fluxo.
- O carrinho bloqueia orçamento sem cotação. Sem integração ativa ou sem medidas, isso interrompe o atendimento.
- O orçamento guarda a resposta geral, mas o prazo selecionado não é mapeado ao campo usado no resumo de WhatsApp.

**Correção planejada:** corrigir comunicação, validação e limites; consultar dados oficiais por organização/produto no servidor; salvar cotação e modalidade escolhida; invalidar/recalcular quando necessário; nunca transformar falha em frete grátis. Desativar o cálculo simulado. Propor orçamento com “frete a confirmar” e/ou retirada, com estado explícito e sem valor inventado, sujeito à aprovação da tela.

**Aceite:** teste sandbox completo produto → carrinho → escolha de modalidade → orçamento → conferência do vendedor; CEP inválido, serviço ausente, API fora do ar e medidas incompletas tratados; quantidade/CEP/embalagem alterados exigem nova análise; nenhuma compra ou etiqueta oficial automática.

Evidências: [função de cotação](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/supabase/functions/melhor-envio-quote/index.ts:4>) e [frete antigo na embalagem](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:2207>).

### 6. Cadastro e publicação de produtos confiáveis

**Achado:** o adaptador lê `product_media`, mas não grava as imagens nessa tabela na sincronização. O formulário de produto contém atributo de imagem sem fechamento correto e interpolação de nome/descrição sem proteção uniforme. Na navegação há produto chamado “PLATAFORMA TESTE” e fornecedores não informados. O carregamento público não implementa paginação.

**Correção planejada:** persistir imagens e metadados oficiais; corrigir o formulário e proteger texto, atributos e URLs. Separar demonstração de produção e revisar disponibilidade, fornecedor, categoria, imagem, descrição e logística. Adicionar paginação e verificar a leitura pública de disponibilidade com as políticas efetivamente publicadas.

**Aceite:** editar produto com aspas no nome não quebra campos; imagem aparece em outro navegador; catálogo nunca retorna dados de demonstração como se fossem oficiais; nenhuma imagem/modelo/especificação inventados; lista grande carrega integralmente por páginas.

Evidências: [formulário](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:2387>) e [adaptador de catálogo](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/supabase.js:150>).

### 7. Segurança, confirmação de gravação e recuperação

**Correção planejada:** revisar todas as renderizações HTML de conteúdo editável; validar operações e valores no servidor; registrar ações administrativas e comerciais em auditoria. Exibir “salvando/salvo/falhou” com tentativa segura, em vez de sucesso antecipado. Criar backup verificável e ensaiar restauração em ambiente de teste, sem função de restaurar demonstração em produção.

Como uma credencial administrativa foi compartilhada anteriormente na conversa, sua rotação/revogação e a verificação de exposição precisam entrar no checklist. Não reutilizar nem inserir esse segredo no navegador.

**Aceite:** falha de gravação não apaga carrinho nem indica publicação concluída; alterações têm autor e horário; segredo administrativo não consta de arquivos públicos; restauração validada em teste.

## P1 — Concluir a experiência e o controle comercial

1. **Carrinho móvel:** uma rolagem principal clara; área de itens com prioridade; frete/cupom inicialmente recolhidos; indicação de quantidade total; resumo compacto; ação final acessível sem esconder produtos.
2. **Acessibilidade:** foco ao abrir/fechar janelas, navegação por teclado, Escape, contraste, mensagens de erro junto ao campo e estados de carregamento.
3. **Indicadores corretos:** separar consultas, propostas enviadas, aprovadas, pedidos abertos, vendas confirmadas/pagas, entregas, cancelamentos e devoluções. O cálculo atual soma pedidos não cancelados como vendas e pode contar a mesma perda em proposta e pedido.
4. **Filtros de gestão:** período, vendedor, canal, categoria e região por município/UF normalizados; comparação com período anterior; clientes por ID, não apenas nome; motivos de perda e tempo de atendimento.
5. **Expedição honesta:** o gerador atual cria etiqueta interna e rastreamento `FO...`, não etiqueta comprada da transportadora. Identificar como documento interno e exigir rastreamento real; não anunciar postagem a partir de um código simulado.
6. **Cadastro de fornecedor:** fornecedor como entidade própria, contatos e vínculo ao produto; marca separada do fornecedor; histórico de atualização e custo de compra quando disponível.
7. **Português comercial:** substituir textos como FIELD READY, PISTOL e DELIVERY por rótulos claros. Padronizar preço com duas casas, kg/cm explícitos e “não informado” sem falsas especificações.
8. **Conteúdo oficial:** perfis reais das redes, contato e endereço confirmados; remover transportadora fictícia do rodapé; gerenciar política de trocas, frete e privacidade; não apresentar integração de pagamento não existente como concluída.
9. **Banners/Radar/cupons:** gravação compartilhada; ativação e datas verificadas; imagens adequadas; validade/limite de cupom aplicados no servidor, não contador individual. Distinguir sincronização simulada de fonte real.

Evidências de indicadores: [dashboard comercial](</C:/Users/Danilo/Desktop/apps/Catalogo 2.0/dist/app.js:1412>). O perfil distribuidor ainda usa `orders.length || 1`, mostrando um pedido quando não há nenhum nesse estado.

## P2 — Evolução depois da operação confiável

## Pacote de experiência e gestão aplicado nesta etapa

- **Carrinho:** itens permanecem em uma área de rolagem própria; frete e Airdrop continuam recolhíveis; o resumo fica compacto e acessível no celular.
- **Dados comerciais:** nomes, descrições, imagens, URLs e valores são tratados com escape e validação antes da exibição ou gravação.
- **Fornecedores:** cadastro próprio, contatos, status e vínculo por identificador ao produto; marca e fornecedor não são mais tratados como a mesma informação.
- **Rodapé:** redes, e-mail, telefone e endereço passam a ser configuráveis. Link não confirmado não vira busca genérica nem informação oficial.
- **Indicadores:** filtros por período, vendedor, canal, município/UF, produto e motivo da perda, com consultas, pipeline, pedidos, vendas, conversão, ticket, clientes e estoque baixo.
- **Auditoria:** alterações de produto, preço, estoque, orçamento, pedido, acesso e fornecedor entram no histórico local e, após a migração, nos eventos oficiais do Supabase.
- **Estados de gravação:** a interface diferencia “Salvando…”, “Salvo na base oficial”, “Salvo localmente” e “Falha ao salvar”.
- **Expedição:** referências internas são identificadas como internas; rastreamento só é exibido como oficial quando o operador confirma o código real da transportadora.

### Próximo passo operacional

Aplicar a migração `20261003010000_management_improvements.sql` no projeto Supabase autorizado, validar as políticas RLS e repetir o teste com um usuário operador e um lojista. A publicação remota ainda não foi confirmada porque o projeto bloqueou a operação de migração por falta de permissão.

- Tabelas reais de preço consumidor/lojista/distribuidor, quantidade mínima e condições autorizadas. O adaptador atual trabalha apenas com o preço `retail`.
- Variações de tamanho/cor/modelo com estoque por SKU, especialmente roupas e acessórios.
- Custos, margem e lucro somente com dados reais de compra, descontos, devoluções e despesas.
- Alertas de estoque mínimo, tarefas de atendimento, propostas vencendo e follow-up autorizado.
- Relatórios de recompra, produtos mais vendidos, estoque parado, giro e cobertura.
- Pagamento e conciliação, caso o objetivo passe de orçamento assistido para venda online completa.
- Separar o arquivo principal em módulos de acesso, catálogo, importação, carrinho, comercial e logística; eliminar funções duplicadas e atualizar a documentação.
- Testes automatizados dos fluxos críticos, monitoramento de erros e publicação com versão identificável e possibilidade de retorno.

## Plano de execução e ordem de dependência

| Etapa | Entrega | Condição para avançar |
| --- | --- | --- |
| 0. Conferência e proteção | Inventário da base e das migrações publicadas; backup; mapa de acessos; separar teste/produção | Dados preservados e acesso ao projeto autorizado |
| 1. Base e acesso | Persistência por entidade; permissões no servidor; sessão; bloqueio; salvamento confirmado | Dois usuários operam com dados corretos e isolamento entre lojas |
| 2. Catálogo e planilha | Valores corretos; importação complementar; imagens; fornecedores; logística real | Reimportação sem duplicatas e sem perda de cadastro |
| 3. Operação de venda | Orçamento compartilhado; preços congelados; pedido/estoque transacionais; frete sandbox | Fluxo ponta a ponta e concorrência de estoque aprovados |
| 4. Experiência e gestão | Carrinho/acessibilidade; textos; indicadores; conteúdo e expedição revisados | Testes móvel/desktop e números conferidos |
| 5. Publicação piloto | Publicar versão testada; operar com grupo reduzido; observar falhas; testar recuperação | Nenhum P0 aberto e dados/regras reais conferidos |

Não definir prazo fechado antes da conferência remota e do escopo das correções. Mudanças de tela serão apresentadas para aprovação antes da implementação, preservando a identidade visual e as funções existentes.

## Checklist mínimo de liberação

- [ ] Admin, lojista, distribuidor e consumidor têm acessos coerentes, verificados diretamente na API.
- [ ] Bloqueio imediato e isolamento entre duas organizações.
- [ ] Login, recarga, renovação, confirmação de e-mail e recuperação de senha testados.
- [ ] Preços da planilha conferidos por amostra e relatório de divergências.
- [ ] Reimportação não duplica nem apaga enriquecimento.
- [ ] Imagens/fornecedores/medidas reais; nenhum produto de teste publicado.
- [ ] Última unidade disputada por dois usuários sem venda duplicada.
- [ ] Proposta abre em outro navegador, preserva valores e respeita validade.
- [ ] Falha de gravação não produz sucesso falso ou perda do carrinho.
- [ ] Frete sandbox sem estimativas inventadas; falhas e recotação testadas.
- [ ] Etiqueta interna não confundida com etiqueta oficial; rastreamento real.
- [ ] Indicadores conferem com pedidos e estados comerciais.
- [ ] Carrinho com muitos itens e teclado funciona no celular e desktop.
- [ ] Backup restaurado em teste e versão publicada corresponde à versão aprovada.

## Dependências e decisões pendentes

- Autorizar acesso técnico ao projeto Supabase para leitura e, depois, alterações aprovadas.
- Confirmar se catálogo será público e área operacional privada, ou se todo o app será restrito. A restrição não deve depender apenas de ocultar menus.
- Confirmar dados oficiais da loja e CEP de origem.
- Configurar credencial sandbox do Melhor Envio como segredo no servidor; não colar no código público.
- Confirmar pesos/medidas dos produtos e embalagem.
- Confirmar regras de preço, validade de proposta, reserva/cancelamento e o que caracteriza uma venda concluída.
- Conferir SMTP, remetente, template e destinos dos links de autenticação no painel real.

Referências oficiais consultadas: [sessões do Supabase](https://supabase.com/docs/guides/auth/sessions) e [segurança por linha no banco](https://supabase.com/docs/guides/database/postgres/row-level-security). A documentação recomenda tratar autorização no banco e gerenciamento da sessão, não apenas na interface.
