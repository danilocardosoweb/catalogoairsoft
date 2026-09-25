# FIELD OPS — Status de implementação

Última revisão: 25/09/2026  
Última versão publicada: hero interativo + fluxo comercial de Orçamentos + Central de Pedidos
URL de produção: https://field-ops-airsoft.danilocardoso-web.chatgpt.site  
Acesso atual: privado, com login do ChatGPT.

## Resumo

O app já possui um MVP navegável de catálogo premium de Airsoft, com experiência mobile-first, carrinho, orçamento via WhatsApp, montagem de loadout e painel operacional local-first.

A publicação atual é funcional para demonstração, validação de UX e operação em um único dispositivo. As principais pendências restantes estão relacionadas a dados reais, backend, autenticação, sincronização entre dispositivos e endurecimento para produção.

## O que já foi implementado

### Experiência do cliente

- Home com hero tático, busca, categorias, marcas, destaques, briefing personalizado e itens recentemente visualizados.
- Hero com vídeo pausado de operador Airsoft controlado horizontalmente pelo mouse, interpolação via `requestAnimationFrame`, retorno suave ao frame central, fallback visual e suporte a movimento reduzido/mobile.
- Hero ajustado para usar somente o vídeo do operador, removendo a imagem anterior sobreposta; MP4 reprocessado com pontos de busca frequentes e seeks limitados para uma movimentação mais fluida.
- Sistema visual com modo noturno `NVG / NIGHT` e modo claro `DAY OPS / LIGHT`, preferência persistida no dispositivo e transição radial inspirada em troca de visor/HUD.
- Contraste revisado em textos de filtro, metadados, descrições, cabeçalho e superfícies claras para melhorar leitura em telas menores.
- Catálogo com busca por produto, marca ou categoria.
- Filtros por categoria, sistema, disponibilidade e preço máximo.
- Ordenação por relevância, menor preço, maior preço e novidades.
- Cards de produto com imagem, preço, estoque, favoritos, comparação e adição ao carrinho.
- Página de detalhe com especificações técnicas, descrição, produtos relacionados e montagem de loadout.
- Navegação por categorias, marcas, favoritos e produtos relacionados.
- Comparação de até três produtos.
- Loadout builder com rifle, óptica, magazine, munição e proteção.
- Carrinho lateral com alteração de quantidade, remoção de item e limite pelo estoque.
- Solicitação de orçamento com dados do cliente, resumo dos itens e abertura do WhatsApp.
- Perfil local do cliente, sem obrigar cadastro para navegar.
- Briefing personalizado por estilo de jogo e faixa de investimento.
- Command palette para busca rápida e atalhos de navegação.
- Navegação inferior para uso em telas pequenas.
- Estados vazios, mensagens de confirmação e toasts para as principais ações.

### Painel operacional

- Dashboard com indicadores dinâmicos de produtos ativos, orçamentos, estoque baixo e itens sem estoque.
- Gerenciamento de produtos: criar, editar, duplicar, pesquisar e desativar.
- Ajuste individual de estoque com atualização imediata dos indicadores.
- Ajuste individual de preço com atualização no catálogo, loadout e orçamentos.
- Pipeline de orçamentos com contagem por status e avanço de status para registros salvos.
- Busca por número, cliente ou WhatsApp e filtro por status.
- Visualização detalhada do cliente, itens, observação, status e total estimado.
- Criação manual de orçamento pelo painel para atendimentos recebidos fora do catálogo.
- Cópia do resumo do orçamento para colar em outros canais.
- Abertura do WhatsApp do cliente quando existe um número válido.
- Exclusão protegida por confirmação para orçamentos salvos localmente.
- Central comercial adaptada com CPF/CNPJ, CEP, origem, vendedor, validade, observação interna, desconto, frete, transportadora, modalidade, prazo e volumes.
- Fluxo de status ampliado: Novo, Em análise, Proposta enviada, Aguardando cliente, Aprovado, Rejeitado, Expirado, Convertido em pedido e Cancelado.
- Histórico local de mudanças de status e condições comerciais.
- Link compartilhável do orçamento usando a rota hash atual do app: `#quote/ORC-000000`.
- Página de proposta para o cliente com aceite local e contato do vendedor.
- Conversão de orçamento aprovado em pedido relacionado, sem duplicar a origem.
- Central inicial de Pedidos com filtros, timeline, avanço de status e folha de separação para impressão.
- Lista de clientes derivada dos orçamentos locais.
- Importação de CSV e XLSX com análise, pré-visualização, validação básica e confirmação da carga.
- Configurações da operação: nome da loja, cidade, WhatsApp e limite de estoque baixo.
- Restauração dos dados demo salvos no dispositivo.
- Persistência local de produtos, carrinho, favoritos, comparação, loadout, perfil, briefing, buscas recentes, produtos recentes, orçamentos e configurações.
- Cards de recomendação e itens recentes com abertura direta do produto, além de limpeza do histórico local.
- Exportação local de backup completo em JSON e relatórios de produtos/estoque e orçamentos/clientes em CSV.

### Qualidade e publicação

- Código JavaScript validado com `node --check`.
- Verificação de diferenças sem erros de whitespace.
- Fluxos de estoque, preço e busca testados no navegador local.
- Preview local validado sem erros de console.
- Vídeo do hero validado em MP4 local, com metadata carregada, frame inicial central e reprodução mantida pausada.
- Correção validada sem `background-image` antigo, com frame central após carregamento e vídeo pausado durante a navegação.
- Alternância entre temas validada no catálogo, com retorno aos dois modos e persistência após recarregar a página.
- Contraste do hero reforçado com texto branco/lima, gradiente lateral dedicado e sombras de leitura nos modos noturno, claro e mobile.
- Versão atual publicada em produção com o hero interativo, o fluxo comercial de Orçamentos e a Central inicial de Pedidos.
- Acesso privado preservado conforme a configuração atual do projeto.

## Pendências de desenvolvimento

### Prioridade P0 — necessária antes de operação real

- Criar backend persistente para produtos, estoque, preços, clientes, orçamentos, pedidos e histórico.
- Trocar o `localStorage` por uma base de dados compartilhada entre usuários e dispositivos.
- Implementar autenticação real e permissões por perfil: administrador, vendedor, lojista e distribuidor.
- Proteger o painel administrativo no servidor, não apenas pela navegação do frontend.
- Validar e sanitizar dados vindos de produtos, importações e formulários antes de renderizar HTML.
- Substituir dados demo e valores padrão por catálogo, preços, imagens e estoque reais.
- Configurar o número oficial do WhatsApp fora do código e separar ambientes de desenvolvimento e produção.
- Registrar histórico de alterações de preço, estoque, produto e status de orçamento.

### Prioridade P1 — operação comercial e conteúdo

- Criar módulo de fornecedores, conforme previsto no escopo inicial.
- Melhorar a importação em lote com mapeamento persistente de colunas, atualização por SKU, relatório de erros e rollback.
- Criar catálogos personalizados por link, com seleção de produtos, preço e validade.
- Adicionar compartilhamento de loadout e orçamento por link.
- Integrar o pipeline de orçamento a um atendimento real, com webhook ou CRM/WhatsApp Business quando disponível; as ações atuais ainda operam localmente.
- Completar a operação de pedidos com separação por item, localização de estoque, etiquetas, QR Code, impressão em lote e romaneio.
- Criar permissões reais para vendedor, supervisor e administrador; o painel atual ainda não aplica perfis no servidor.
- Integrar pagamento, aprovação remota persistente e atualização de status entre dispositivos.
- Permitir regras de preço por grupo: varejo, lojista e distribuidor, em vez de percentuais fixos.
- Adicionar variações de produto, SKUs, códigos de barras, marcas e campos técnicos completos.
- Implementar upload/armazenamento otimizado de imagens e fallback para imagens indisponíveis.

### Prioridade P1 — experiência, acessibilidade e confiabilidade

- Validar visualmente todos os fluxos nos tamanhos 360, 390, 430, 768, 1024, 1440 e 1920 px.
- Adicionar testes automatizados de navegação, filtros, carrinho, orçamento, importação e painel.
- Criar estados dedicados de carregamento, erro de rede, produto não encontrado e falha de importação.
- Revisar contraste, foco por teclado, labels, semântica e navegação por leitor de tela.
- Otimizar imagens, fontes e carregamento inicial para melhorar desempenho mobile.
- Adicionar monitoramento de erros e métricas de uso após a entrada em operação.
- Remover funções antigas duplicadas do arquivo principal e separar o app em módulos menores para facilitar manutenção.

### Prioridade P2 — expansões futuras

- Integração com ERP, estoque externo e transportadoras.
- Analytics de produtos vistos, conversão de orçamento e desempenho por categoria.
- Notificações de estoque baixo e acompanhamento de orçamento.
- Pagamento online, emissão de NF-e e checkout completo.
- Recomendações inteligentes e agentes de IA.

## Fora do escopo desta primeira fase

Conforme o prompt mestre, não são prioridades desta fase: pagamento online, emissão de NF-e, agentes de IA, inteligência artificial de recomendação, coleta automática de fornecedores e integrações complexas com ERP.

## Próxima sequência recomendada

1. Definir o modelo de dados real e escolher o backend.
2. Implementar autenticação e perfis de acesso.
3. Migrar produtos e orçamentos do `localStorage` para a API/banco.
4. Conectar estoque, preços e WhatsApp ao backend.
5. Revalidar os fluxos mobile e publicar uma versão de operação real.
