# Histórias do Banco de Dados - GitCine

## 1. B1 - Criação do schema no Neon
Como time de desenvolvimento, quero criar o banco em nuvem, para remover dependência local.

- Requisitos:
  - provisionar banco PostgreSQL no Neon
  - configurar conexão com a aplicação
  - criar schema inicial
- Critérios de aceite:
  - banco acessível pela aplicação
  - conexão testada com sucesso
  - estrutura inicial criada corretamente
- Resultado esperado:
  - ambiente persistente e funcional
- Conteúdo necessário:
  - PostgreSQL
  - Neon
  - env vars
  - connection strings

## 2. B2 - Tabela de usuários
Como sistema, quero persistir usuários, para autenticar e controlar avaliações.

- Requisitos:
  - tabela `users`
  - campos básicos de cadastro
  - email único
  - senha criptografada
- Critérios de aceite:
  - email não pode se repetir
  - dados obrigatórios são validados
  - senha não fica em texto puro
- Resultado esperado:
  - dados de usuários seguros e persistidos corretamente
- Conteúdo necessário:
  - modelagem relacional
  - unique constraints
  - hashing de senha

## 3. B3 - Tabela de filmes
Como sistema, quero persistir filmes, para disponibilizar catálogo ao usuário.

- Requisitos:
  - tabela de filmes
  - campos de identificação e dados básicos
  - média e quantidade de avaliações
- Critérios de aceite:
  - filmes são armazenados corretamente
  - dados calculados são atualizados conforme regras de negócio
  - campos essenciais nunca ficam nulos
- Resultado esperado:
  - catálogo confiável e consistente
- Conteúdo necessário:
  - modelagem relacional
  - constraints
  - campos derivados

## 4. B4 - Tabela de avaliações
Como sistema, quero guardar notas dos usuários, para manter histórico e média dos filmes.

- Requisitos:
  - tabela de avaliação
  - relacionamento com usuário e filme
  - nota válida
  - chave composta para evitar duplicidade
- Critérios de aceite:
  - não existe mais de uma avaliação por usuário por filme
  - cada avaliação pertence ao usuário correto
  - utilização da tabela correta para histórico e média
- Resultado esperado:
  - consistência dos dados de avaliação
- Conteúdo necessário:
  - PostgreSQL
  - chaves compostas
  - integridade referencial

## 5. B5 - Regras de integridade e validação no banco
Como sistema, quero garantir consistência dos dados, para evitar corrupção e inconsistências.

- Requisitos:
  - constraints de integridade
  - unicidade
  - valores válidos
  - relação correta entre entidades
- Critérios de aceite:
  - dados inválidos não são persistidos
  - registros duplicados são rejeitados
  - regras críticas são aplicadas no banco
- Resultado esperado:
  - banco seguro e confiável
- Conteúdo necessário:
  - SQL
  - constraints
  - foreign keys
  - transactional rules

## 6. B6 - Ajuste de dados derivados
Como sistema, quero recalcular score e count, para refletir a realidade do conteúdo e da avaliação.

- Requisitos:
  - atualizar score após avaliação
  - atualizar count após criação/alteração
  - manter dados consistentes
- Critérios de aceite:
  - média e quantidade são calculadas corretamente
  - atualização de avaliação impacta o filme
  - dados derivados responsivos às mudanças
- Resultado esperado:
  - catálogo de filmes sempre coerente
- Conteúdo necessário:
  - SQL e regras de agregação
  - modelagem derivada
  - transações

## 7. B7 - Organização de migrations e versionamento
Como time, quero versionar o banco, para controlar mudanças e manter ambiente consistente.

- Requisitos:
  - versionar alterações do schema
  - garantir estrutura reproduzível
  - manter controle de mudanças por ambiente
- Critérios de aceite:
  - cada mudança tem versão clara
  - banco pode ser recriado ou migrado sem perda de contexto
  - ambiente de desenvolvimento e produção seguem padrão
- Resultado esperado:
  - controle mais seguro do banco
- Conteúdo necessário:
  - migrations
  - versionamento de schema
  - estratégia de deploy

## 8. Sequência recomendada para o banco
1. Criar banco no Neon
2. Definir modelagem inicial de usuários, filmes e avaliações
3. Aplicar constraints e relacionamentos
4. Validar regras de unicidade e integridade
5. Ajustar score e count
6. Versionar schema e manter ambiente consistente

## 9. Critérios finais de banco
- PostgreSQL no Neon funcionando corretamente
- schema modelado e versionado
- unicidade da avaliação protegida
- integridade e relacionamentos consistentes
- score e count recalculados corretamente
- ambiente pronto para integração com backend

