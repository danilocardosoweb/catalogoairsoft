# E-mails do Supabase Auth

O arquivo `confirmation.html` é o modelo visual da confirmação de cadastro.

No painel do Supabase, abra **Authentication → Email Templates → Confirm signup** e copie o conteúdo do arquivo para o campo de mensagem. Use o assunto:

`Confirme seu acesso à Suprimentos Oliveira`

Para produção, configure também um SMTP próprio com remetente da loja. O SMTP padrão do Supabase é destinado a testes e pode limitar os destinatários e a quantidade de envios.
