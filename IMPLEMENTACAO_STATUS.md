# FIELD OPS — Status de implementação

Última revisão: 26/09/2026  
Última versão publicada: restauração validada de backup local integrada ao centro de dados
URL de produção: https://field-ops-airsoft.danilocardoso-web.chatgpt.site  
Acesso atual: público para validação da experiência.

## Resumo

O app já possui um MVP navegável de catálogo premium de Airsoft, com experiência mobile-first, carrinho, orçamento via WhatsApp, montagem de loadout e painel operacional local-first.

A publicação atual é funcional para demonstração, validação de UX e operação em um único dispositivo. As principais pendências restantes estão relacionadas a dados reais, backend, autenticação, sincronização entre dispositivos e endurecimento para produção.

## O que já foi implementado

### Experiência do cliente

- Home com hero tático, busca, categorias, marcas, destaques, briefing personalizado e itens recentemente visualizados.
- Hero com vídeo pausado de operador Airsoft controlado horizontalmente pelo mouse, interpolação via `requestAnimationFrame`, retorno suave ao frame central, fallback visual e suporte a movimento reduzido/mobile.
- Hero ajustado para usar somente o vídeo do operador, removendo a imagem anterior sobreposta; MP4 reprocessado a 24 fps com quadro-chave em todos os frames e seeks serializados para uma movimentação mais fluida.
- Radar tático dinâmico no hero inspirado em HUDs de FPS: jogador com rota própria, dois contatos hostis em trajetórias independentes, varredura cônica, grid, pontos cardeais, estados de contato e pings contextuais.
- Textura vertical central removida do banner principal para não competir com o operador e com a leitura do conteúdo.
- Animação do radar calculada por `requestAnimationFrame`, com easing por ator, troca de rota não determinística, atualização de setor/coordenadas e suporte a `prefers-reduced-motion`.
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
- Airdrop no carrinho: campo para código liberado, validação de janela/valor mínimo/limite de resgates, desconto aplicado ao total e remoção do cupom.
- Bloco Airdrop na home com comunicação de drop ativo ou próximo, reforçando o acompanhamento das redes sociais da loja.
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
- Criação manual de orçamento com múltiplos produtos, quantidade por linha, adição/remoção de itens, consolidação de produtos repetidos e subtotal atualizado.
- Cópia do resumo do orçamento para colar em outros canais.
- Abertura do WhatsApp do cliente quando existe um número válido.
- Exclusão protegida por confirmação para orçamentos salvos localmente.
- Central comercial adaptada com CPF/CNPJ, CEP, origem, vendedor, validade, observação interna, desconto, frete, transportadora, modalidade, prazo e volumes.
- Central de orçamento com edição completa de cliente, produtos, quantidades, condições, logística, rastreamento e observações, com recálculo automático do subtotal/total.
- Ações do detalhe do orçamento conectadas: avanço de etapa, conversão em pedido, cópia de resumo, cópia de link, WhatsApp com número brasileiro normalizado e exclusão protegida.
- Fluxo de status ampliado: Novo, Em análise, Proposta enviada, Aguardando cliente, Aprovado, Rejeitado, Expirado, Convertido em pedido e Cancelado.
- Histórico local de mudanças de status e condições comerciais.
- Link compartilhável do orçamento usando a rota hash atual do app: `#quote/ORC-000000`.
- Página de proposta para o cliente com aceite local e contato do vendedor.
- Conversão de orçamento aprovado em pedido relacionado, sem duplicar a origem.
- Central inicial de Pedidos com filtros, timeline, avanço de status e folha de separação para impressão.
- Operação de separação por item no pedido, com marcação de item separado, contagem de linhas concluídas e registro no histórico.
- Edição local de logística do pedido: transportadora, modalidade, prazo, volumes e rastreamento.
- Lista de clientes derivada dos orçamentos locais.
- Importação de CSV e XLSX com análise, pré-visualização, validação básica, atualização por SKU, criação de novos itens e confirmação da carga.
- Histórico local das últimas cargas de catálogo com resumo de novos/atualizados e ação para desfazer a carga anterior.
- Cadastro de produtos com SKU editável e SKU exibido de forma consistente no catálogo operacional e no estoque.
- Configurações da operação: nome da loja, cidade, WhatsApp e limite de estoque baixo.
- Módulo local de frete integrado ao carrinho e ao orçamento: CEP, subtotal, peso real, peso cúbico, peso tarifável, volumes e validade da cotação.
- Cartonização local com rotações de orientação, tentativa de combinação de itens e separação automática de produtos marcados para envio separado.
- Opções de recebimento com menor preço, mais rápido e recomendado, incluindo Field Express Econômico, Expresso e retirada no local.
- Regras locais de frete grátis, frete base configurável, cache de cotações e snapshot logístico salvo no orçamento e no pedido.
- Cadastro operacional de embalagens com dimensões internas/externas, capacidade, peso da embalagem, custo, tipo e status ativo.
- Central de Expedição com fila, etapas de separação/embalagem, geração de etiqueta local, rastreamento, postagem e timeline de histórico.
- Configurações logísticas para origem, fator de cubagem, validade, frete grátis e retirada no local.
- Cadastro de produto ampliado com peso, dimensões, embalagem sugerida, fragilidade, combinação, envio separado, empilhamento e observações logísticas.
- Hero mobile com enquadramento dedicado: vídeo reposicionado para preservar o operador fora da área principal do texto, altura e escala ajustadas para telas estreitas.
- Restauração dos dados demo salvos no dispositivo.
- Persistência local de produtos, carrinho, favoritos, comparação, loadout, perfil, briefing, buscas recentes, produtos recentes, orçamentos e configurações.
- Cards de recomendação e itens recentes com abertura direta do produto, além de limpeza do histórico local.
- Exportação local de backup completo em JSON e relatórios de produtos/estoque e orçamentos/clientes em CSV.
- Centro de dados com restauração de backup JSON: validação de origem/estrutura, prévia de produtos, orçamentos, pedidos e Airdrops, aviso para arquivos parciais e confirmação visual antes de substituir os dados locais.
- Radar Airsoft integrado à home com bloco discreto, localização por cidade/estado e abertura sob demanda; nenhuma solicitação de GPS acontece automaticamente.
- Página Radar com escopos Perto de mim, Minha cidade/estado, Brasil e Internacional, raio de 25/50/100/200 km, filtros por categoria, ordenação por relevância/distância/data/categoria/popularidade e visão feed/mapa.
- Cards de eventos, campos, lojas, notícias e lançamentos com seguir/deixar de seguir, detalhes, tags e produtos relacionados ligados ao catálogo e ao loadout.
- Central de Conteúdo no painel operacional para criar, editar, revisar, publicar e arquivar sinais Radar localmente, com status Rascunho, Em revisão, Publicado e Arquivado.
- Central “Soltar Airdrop” em Configurações: agendamento ou disparo imediato, código, desconto percentual/fixo, mínimo de carrinho, validade, limite de resgates, mensagem social e encerramento manual.
- Airdrops ficam registrados localmente, entram no backup JSON e são incorporados ao resumo do orçamento e da mensagem enviada ao WhatsApp.
- Arquitetura inicial de Radar preparada para receber fontes externas e sumarização futura sem publicação automática; conteúdo demo continua separado do catálogo de produtos.

### Qualidade e publicação

- Código JavaScript validado com `node --check`.
- Verificação de diferenças sem erros de whitespace.
- Fluxos de estoque, preço e busca testados no navegador local.
- Preview local validado sem erros de console.
- Vídeo do hero validado em MP4 local, com metadata carregada, frame inicial central e reprodução mantida pausada.
- Correção validada sem `background-image` antigo, com frame central após carregamento e vídeo pausado durante a navegação.
- Alternância entre temas validada no catálogo, com retorno aos dois modos e persistência após recarregar a página.
- Contraste do hero reforçado com texto branco/lima, gradiente lateral dedicado e sombras de leitura nos modos noturno, claro e mobile.
- Versão atual publicada em produção com o hero interativo, o fluxo comercial de Orçamentos, importação operacional e a Central de Pedidos ampliada.
- Radar Airsoft validado localmente no feed, mapa tático, detalhe, localização manual, filtros e Central de Conteúdo.
- Radar do hero validado no navegador local com jogador, dois hostis, sweep, leitura de contato, atualização de coordenadas e varredura manual; o círculo decorativo anterior foi removido para evitar sobreposição visual.
- Radar do hero recalibrado para uma cadência mais lenta: deslocamento dos pontos, sweep, pings e troca dos textos foram desacelerados para reduzir a sensação de tremor/interação excessiva.
- Radar do hero calibrado em 1x: os atores agora percorrem trajetórias por progresso temporal real, com easing contínuo, microvariação menor, pausas entre rotas e varredura manual sem reposicionar todos os contatos.
- Radar do hero recebeu modo de jogo assistido em 3x: contatos e operador se movimentam em cadência mais rápida, clique/toque em hostil cria alvo de perseguição e clique em área livre cria rota priorizada com retículo de comando.
- Marcador do jogador agora usa o primeiro nome salvo no perfil e sinaliza contatos neutralizados quando o jogador cruza um hostil.
- Títulos longos dos sinais Radar recebem quebra responsiva para não cortar palavras em modais estreitos.
- Airdrop validado no fluxo local com central administrativa, ativação no carrinho, cálculo do desconto e registro do código no orçamento.
- Mini mapa do hero ficou translúcido no desktop e é ocultado em telas pequenas para preservar a leitura do operador, título e CTA.
- A segunda calibração do Radar dobrou os intervalos das rotas e pausas, deixando sweep e pulsos ainda mais lentos para reduzir estímulos visuais.
- Confirmações críticas padronizadas em modal visual do FIELD OPS, substituindo `window.confirm` em exclusões, aprovações, publicação/arquivamento, Airdrop, avanço de etapas, conversão de pedidos, rollback e restauração de dados.
- Banner de Loadout recebeu contraste dedicado: overlay tático, tipografia clara, sombra de leitura e CTA com fundo translúcido, preservando a imagem em dark e light mode.
- Hero mobile recebeu acionamento opcional de mira por giroscópio, com pedido de permissão quando necessário e fallback de visão fixa centralizada/levemente orientada para a direita.
- Acesso privado preservado conforme a configuração atual do projeto.

## Pendências de desenvolvimento

### Prioridade P0 — necessária antes de operação real

- Criar backend persistente para produtos, estoque, preços, clientes, orçamentos, pedidos e histórico.
- Trocar o `localStorage` por uma base de dados compartilhada entre usuários e dispositivos.
- Implementar autenticação real e permissões por perfil: administrador, vendedor, lojista e distribuidor.
- Proteger o painel administrativo no servidor, não apenas pela navegação do frontend.
- Validar e sanitizar dados vindos de produtos, importações e formulários antes de renderizar HTML.
- A restauração de backup aplica normalização mínima a produtos, imagens, quantidades e seções principais; ainda é necessário centralizar a sanitização de todas as entradas do app.
- Substituir dados demo e valores padrão por catálogo, preços, imagens e estoque reais.
- Configurar o número oficial do WhatsApp fora do código e separar ambientes de desenvolvimento e produção.
- Registrar histórico de alterações de preço, estoque, produto e status de orçamento.
- Conectar um gateway real de frete (Correios, Melhor Envio, Frenet ou equivalente) para substituir o simulador local e retornar preços/prazos oficiais.
- Persistir cotações, volumes, etiquetas, rastreios e eventos de expedição em backend compartilhado, com auditoria por usuário.
- Migrar o Radar Airsoft para backend compartilhado, com entidades de conteúdo, eventos, campos, lojas, seguidores e histórico de publicação.

### Prioridade P1 — operação comercial e conteúdo

- Criar módulo de fornecedores, conforme previsto no escopo inicial.
- Melhorar a importação em lote com mapeamento persistente de colunas, relatório detalhado de erros por linha e rollback de múltiplas cargas.
- Criar catálogos personalizados por link, com seleção de produtos, preço e validade.
- Adicionar compartilhamento de loadout e orçamento por link.
- Integrar o pipeline de orçamento a um atendimento real, com webhook ou CRM/WhatsApp Business quando disponível; as ações atuais ainda operam localmente.
- Completar a operação de pedidos com localização de estoque editável por item, etiquetas, QR Code, impressão em lote e romaneio.
- Evoluir a expedição local para regras por faixa de CEP, dimensões máximas, múltiplos armazéns, seguro, adicionais e exceções por transportadora.
- Criar permissões reais para vendedor, supervisor e administrador; o painel atual ainda não aplica perfis no servidor.
- Integrar pagamento, aprovação remota persistente e atualização de status entre dispositivos.
- Permitir regras de preço por grupo: varejo, lojista e distribuidor, em vez de percentuais fixos.
- Adicionar variações de produto, SKUs, códigos de barras, marcas e campos técnicos completos.
- Implementar upload/armazenamento otimizado de imagens e fallback para imagens indisponíveis.
- Conectar fontes reais de eventos/campos/lojas e criar fluxo de ingestão → resumo assistido → revisão administrativa → publicação; o protótipo atual não coleta fontes externas nem publica automaticamente.
- Integrar geocodificação reversa opcional e um provedor de mapas quando houver necessidade operacional; a visão atual é um mapa tático local sem dependência externa e sem guardar coordenadas precisas.

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
- Radar internacional com conteúdo real, favoritos por categoria/marca/campo e notificações de novos sinais.

## Fora do escopo desta primeira fase

Conforme o prompt mestre, não são prioridades desta fase: pagamento online, emissão de NF-e, agentes de IA, inteligência artificial de recomendação, coleta automática de fornecedores e integrações complexas com ERP.

## Próxima sequência recomendada

1. Definir o modelo de dados real e escolher o backend.
2. Implementar autenticação e perfis de acesso.
3. Migrar produtos e orçamentos do `localStorage` para a API/banco.
4. Conectar estoque, preços e WhatsApp ao backend.
5. Revalidar os fluxos mobile e publicar uma versão de operação real.
