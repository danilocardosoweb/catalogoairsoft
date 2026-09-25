# FIELD OPS — Status de implementação

Última revisão: 25/09/2026  
Último commit publicado: `ae08d6e28750645f4363d6d9997e0df7d1594ec7`  
URL de produção: https://field-ops-airsoft.danilocardoso-web.chatgpt.site  
Acesso atual: privado, com login do ChatGPT.

## Resumo

O app já possui um MVP navegável de catálogo premium de Airsoft, com experiência mobile-first, carrinho, orçamento via WhatsApp, montagem de loadout e painel operacional local-first.

A publicação atual é funcional para demonstração, validação de UX e operação em um único dispositivo. As principais pendências restantes estão relacionadas a dados reais, backend, autenticação, sincronização entre dispositivos e endurecimento para produção.

## O que já foi implementado

### Experiência do cliente

- Home com hero tático, busca, categorias, marcas, destaques, briefing personalizado e itens recentemente visualizados.
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
- Lista de clientes derivada dos orçamentos locais.
- Importação de CSV e XLSX com análise, pré-visualização, validação básica e confirmação da carga.
- Configurações da operação: nome da loja, cidade, WhatsApp e limite de estoque baixo.
- Restauração dos dados demo salvos no dispositivo.
- Persistência local de produtos, carrinho, favoritos, comparação, loadout, perfil, briefing, buscas recentes, produtos recentes, orçamentos e configurações.

### Qualidade e publicação

- Código JavaScript validado com `node --check`.
- Verificação de diferenças sem erros de whitespace.
- Fluxos de estoque, preço e busca testados no navegador local.
- Preview local validado sem erros de console.
- Versão `5c01e3c` enviada para o repositório de origem e publicada em produção.
- Acesso privado preservado conforme a configuração atual do projeto.

## Pendências de desenvolvimento

### Prioridade P0 — necessária antes de operação real

- Criar backend persistente para produtos, estoque, preços, clientes e orçamentos.
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
- Permitir exportação de produtos, estoque, clientes e orçamentos.
- Criar catálogos personalizados por link, com seleção de produtos, preço e validade.
- Adicionar compartilhamento de loadout e orçamento por link.
- Integrar o pipeline de orçamento a um atendimento real, com webhook ou CRM/WhatsApp Business quando disponível; as ações atuais ainda operam localmente.
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
