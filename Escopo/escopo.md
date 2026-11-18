# Escopo de Refatoração do Projeto GitCine

## 1. Visão Geral

Este documento define o escopo completo da refatoração do sistema de avaliação de filmes, com foco em:
- arquitetura hexagonal
- backend em Java com Spring Boot
- autenticação e autorização via JWT
- frontend em React com componentes reutilizáveis
- banco de dados PostgreSQL gerenciado no Neon
- automatização de testes e qualidade
- padronização de regras de negócio e validações

O objetivo principal é transformar o projeto atual em uma base mais robusta, organizada, segura e pronta para evoluir em produção.

---

## 2. Objetivo do Projeto

Refatorar o sistema para:
- separar domínio, aplicação e infraestrutura de forma clara
- garantir segurança real para usuários autenticados
- impedir regras inconsistentes de avaliação
- melhorar manutenibilidade e escalabilidade
- reduzir acoplamento entre camadas
- padronizar APIs, validações e testes
- criar uma base sustentável para novas funcionalidades

---

## 3. Contexto da Solução Atual

O sistema atual já possui:
- listagem de filmes
- paginação
- cadastro de avaliações
- autenticação simples e permissiva
- estrutura básica de frontend e backend

Mas ainda precisa de refinamento em:
- separação de responsabilidades
- segurança real
- regra de negócio de avaliação
- validações e tratamento de exceções
- organização dos componentes do frontend
- definição de banco e arquitetura persistente
- testes automatizados

---

## 4. Stack e Decisões Arquiteturais

### 4.1. Backend
- Java 25
- Spring Boot 3.x compatible com Java 25
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- Validation
- PostgreSQL
- Neon como provedor de banco em nuvem
- BCrypt / PasswordEncoder para hash de senhas
- GlobalExceptionHandler + exceptions específicas para padronização de erros

### 4.2. Frontend
- React
- TypeScript
- React Router
- Axios
- Componentização
- CSS modular ou componentes com estilo próprio
- Estrutura de hooks para estados e integrações

### 4.3. Banco de Dados
- PostgreSQL no Neon
- uso de modelo relacional, por se alinhar melhor com regras de usuários, avaliações e integridade
- evitar MongoDB no momento, pois o problema atual exige consistência, integridade e transações

### 4.4. Testes
- JUnit 5
- Mockito
- MockMvc / RestAssured
- Cucumber + Gherkin
- ArchUnit
- JaCoCo
- GitHub Actions ou pipeline equivalente
- Testcontainers opcional para ambiente de integração com banco

---

## 5. Arquitetura Proposta

A arquitetura será estruturada em camadas com foco em reorganização lógica, mantendo uma separação adequada entre domínio e infraestrutura.

### 5.1. Estrutura sugerida
- `domain`
    - entities
    - value objects
    - domain services
    - exceptions
    - rules

- `application`
    - use cases
    - ports
    - commands / queries
    - DTOs de entrada
    - mappers
    - validators

- `infrastructure`
    - persistence adapters
    - repositories
    - security adapters
    - controllers
    - external clients
    - exception handlers

- `web`
    - controllers REST
    - auth filters
    - configuration

### 5.2. Regra de arquitetura
- o domínio não deve conhecer Spring, banco, JWT, React ou HTTP
- os adapters são os responsáveis por comunicar o domínio com o mundo externo
- cada caso de uso deve ter uma responsabilidade bem definida
- regras de negócio e validação devem ficar no domínio/aplicação e não no controller
- erros da API devem ser centralizados em um handler global

---

## 6. Etapas da Refatoração

## Etapa 1 - Diagnóstico e mapeamento do sistema atual

### Objetivo
Mapear o estado atual do projeto e identificar cada responsabilidade atual de backend, frontend e banco.

### Entregáveis
- levantamento de entidades e regras existentes
- mapeamento de endpoints atualizados
- documentação das regras de negócio
- definição da estrutura de pacotes
- definição do contrato de autenticação e avaliação com `userId`

### Validações
- verificar se todas as entidades possuem papel claro dentro do domínio
- confirmar que cada service está fazendo apenas o que deve
- identificar acoplamentos com infraestrutura
- verificar a presença de regras duplicadas

### Regras
- não iniciar refatoração sem mapear os fluxos principais
- toda regra importante deve ser documentada antes da implementação
- qualquer regra de negócio deve ser tratada no domínio ou aplicação
- usar `userId` como identidade do usuário avaliado no backend

### Resultado esperado
- base de conhecimento clara para a refatoração
- menor risco de reescrever código sem objetivo

---

## Etapa 2 - Definição do domínio e regras de negócio

### Objetivo
Separar o núcleo da aplicação em regras de domínio, antes de criar qualquer estrutura técnica.

### Entregáveis
- entidades principais
- regras de negócio
- exceções de domínio
- contratos para casos de uso
- validadores de domínio

### Regra de negócio central
- um usuário autenticado pode avaliar um filme uma única vez
- caso já exista avaliação, o sistema deve atualizar a avaliação
- a média do filme deve ser recalculada após cada atualização
- a nota deve estar dentro de um limite válido
- a avaliação deve estar vinculada ao usuário e ao filme
- a identificação do usuário deve ser feita pelo `userId` autenticado ou informado de forma segura pelo token

### Validações
- validar email corretamente
- validar existência do filme
- validar presença do usuário autenticado
- validar valor da nota
- impedir avaliação duplicada por mesmo usuário em mesmo filme

### Resultado esperado
- domínio com regras de negócio claras e consistentes
- menos lógica espalhada em services e controllers

---

## Etapa 3 - Refatoração do backend para arquitetura hexagonal

### Objetivo
Reorganizar o backend em camadas com separação de domínio, casos de uso e infraestrutura.

### Entregáveis
- portas de entrada e saída
- adapters de persistência
- controller REST
- use cases
- serviços de domínio ou aplicação
- gerenciamento de erros
- camada de security adapter com JWT

### Validações
- confirmar que controllers não executam lógica de negócio
- confirmar que o domínio não depende de framework
- garantir que o repository seja usado apenas através de adapters
- verificar que todos os casos de uso são executados por interfaces de port
- verificar que o `GlobalExceptionHandler` padroniza todas as respostas

### Resultado esperado
- código mais testável
- fácil troca de banco ou infraestrutura
- separação clara de responsabilidades

---

## Etapa 4 - Implementação de autenticação JWT

### Objetivo
Garantir que apenas usuários autenticados possam avaliar filmes.

### Entregáveis
- cadastro de usuário
- login
- geração de token JWT
- filtro de autenticação
- autorização por roles
- endpoint protegido para avaliação
- extrator do `userId` a partir do token autenticado

### Regras
- rotas públicas:
    - listagem de filmes
    - busca por filme
    - cadastro de usuário
    - login
- rotas protegidas:
    - avaliação de filme
    - atualização de avaliação
    - endpoints do usuário
- `userId` deve ser validado com base no token do usuário autenticado

### Validações
- token inválido deve ser rejeitado
- usuário sem token não pode avaliar
- token expirado deve gerar resposta clara
- roles devem ser respeitadas
- senha deve ser armazenada com hash
- `userId` autenticado deve corresponder ao usuário que realiza a ação

### Resultado esperado
- autenticação real
- proteção dos endpoints de ação sensível
- segurança consistente com boas práticas

---

## Etapa 5 - Modelagem do banco PostgreSQL no Neon

### Objetivo
Definir a estrutura de banco compatível com o domínio e pronto para uso em nuvem.

### Entregáveis
- schema do banco
- tabelas
- constraints
- relacionamento entre usuários, filmes e avaliações
- indexação básica
- unique constraint em `(user_id, movie_id)` para avaliação

### Estrutura sugerida
- `tb_user`
    - id
    - name
    - email
    - password
    - created_at
    - updated_at

- `tb_movie`
    - id
    - title
    - synopsis
    - image
    - score
    - count
    - created_at
    - updated_at

- `tb_rating`
    - user_id
    - movie_id
    - value
    - created_at
    - updated_at

### Regras
- email deve ser único
- rating deve ser único para cada usuário em cada filme
- cada avaliação deve pertencer a um usuário existente
- score deve representar a média do filme
- count deve refletir a quantidade total de avaliações válidas
- a operação de avaliação deve seguir a regra do `userId` e evitar duplicidade

### Validações
- verificar unicidade composta `user_id + movie_id`
- validar nota mínima e máxima
- garantir integridade referencial
- garantir que `count` e `score` sejam recalculados corretamente

### Resultado esperado
- persistência consistente
- regras de negócio refletidas no banco
- fácil manutenção e escalabilidade

---

## Etapa 6 - Implementação de regras do ScoreService

### Objetivo
Centralizar a lógica de avaliação e atualização da nota.

### Regras esperadas
- um usuário não pode avaliar o mesmo filme mais de uma vez
- se o usuário já avaliou, a operação deve atualizar a nota existente
- a operação precisa recalcular score e count do filme
- a nota deve obedecer ao intervalo definido
- a atualização deve manter coesão do histórico
- a validação da identidade do usuário deve ser tratada pelo token/JWT

### Validações
- usuário autenticado
- filme existente
- avaliação presente
- valor válido
- não duplicar registros
- `userId` do token consistente com a avaliação

### Resultado esperado
- consistência nas notas
- lógica previsível
- suporte para futuras regras como “voto moderado” ou “avaliação por comentário”

---

## Etapa 7 - Refatoração do Frontend

### Objetivo
Aprimorar a interface com componentes reutilizáveis e UX mais madura.

### Entregáveis
- página de login
- página de cadastro
- listagem de filmes
- paginação
- card do filme
- modal / formulário de avaliação
- feedback de carregamento e erro

### Validações
- login deve bloquear acesso às rotas protegidas
- feedback visual deve existir para erros e sucesso
- paginação deve funcionar corretamente
- o componente de avaliação deve representar melhor a experiência do usuário
- o frontend deve enviar `userId` de forma segura através do contexto autenticado

### Resultado esperado
- interface mais elegante
- melhor usabilidade
- experiência mais responsiva e moderna

---

## Etapa 8 - Testes e qualidade

### Objetivo
Garantir que o sistema foi refatorado sem quebrar regras de negócio.

### Cobertura mínima
- testes unitários de regras de domínio
- testes de integração de controllers
- testes de autenticação
- testes de casos de uso
- testes BDD para fluxos principais
- testes de arquitetura
- testes de validação de exceções globais

### Validações
- verificar uso correto de dependências
- garantir que os casos de uso são testados
- validar autenticação e autorização
- verificar integrações com banco e endpoints
- verificar respostas de erro consistentes via `@ControllerAdvice`

### Resultado esperado
- redução de regressão
- maior confiança na entrega
- base para evolução segura

---

## 7. Regras Gerais da Refatoração

- não misturar regra de negócio com controller
- não misturar regra de domínio com banco
- não expor entidades do banco no frontend
- sempre usar DTOs
- usar exceptions específicas
- usar mensagens padronizadas
- priorizar a clareza do código em vez de “fazer tudo em um único service”
- manter responsabilidades bem definidas
- validar dados antes de persistir
- evitar lógica duplicada
- sempre documentar regras que afetem o usuário ou sistema
- usar `@ControllerAdvice` para tratar erros globais e padronizar respostas
- preferir `userId` como referência no fluxo de avaliação autenticado

---

## 8. Critérios de Aceite Globais

O projeto será considerado concluído quando:
- a arquitetura estiver dividida por camadas, com separação clara
- JWT estiver implementado corretamente
- usuários autenticados forem obrigatórios para avaliação
- avaliação duplicada por usuário para o mesmo filme estiver bloqueada
- a média e count dos filmes forem recalculados corretamente
- o banco estiver em PostgreSQL no Neon
- o frontend estiver organizado em componentes reutilizáveis
- os testes automatizados forem executados com sucesso
- a aplicação estiver pronta para evoluir com novas funcionalidades
- o `GlobalExceptionHandler` padronizar todas as respostas de erro
- o `userId` estiver validado e protegido pelo token

---

## 9. Histórias de Usuário

## 9.1. Backend

### História 1 - Estrutura hexagonal do backend
Como desenvolvedor, eu quero separar domínio, aplicação e infraestrutura para manter o código mais organizado e testável.

#### Requisitos
- criar estrutura de pacotes por responsabilidade
- separar regras de negócio de controllers e repositories
- definir ports e adapters
- manter o escopo da infraestrutura isolado

#### Critérios de aceite
- controller não contém lógica de negócio
- domínio não depende de framework
- repositorios são acessados por adapters
- uso de ports para abstrair casos de uso

#### Resultado esperado
- backend com arquitetura limpa e previsível

#### Conteúdos que o dev precisa saber
- arquitetura hexagonal
- camadas de domínio, aplicação e infraestrutura
- injeção de dependência
- clean architecture principles

---

### História 2 - Autenticação com JWT
Como usuário autenticado, eu quero logar na aplicação para ter acesso às funcionalidades protegidas.

#### Requisitos
- endpoint de login
- geração de token JWT
- filtro de autenticação
- autenticação por email e senha
- validação do token em cada requisição
- uso de `userId` autenticado a partir do token

#### Critérios de aceite
- usuário inválido recebe erro 401
- usuário com token válido consegue acessar endpoint protegido
- token expirado é recusado
- senha é armazenada com hash
- `userId` do token é usado para autorização de ações sensíveis

#### Resultado esperado
- autenticação funcional e segura

#### Conteúdos que o dev precisa saber
- Spring Security
- JWT
- filtros
- password encoding
- boas práticas de autenticação

---

### História 3 - Avaliação de filmes
Como usuário autenticado, eu quero avaliar um filme para expressar minha nota.

#### Requisitos
- receber `movieId`, `userId` e `value` no payload da avaliação
- validar dados de entrada
- garantir usuário autenticado
- garantir nota válida
- persistir avaliação
- bloquear duplicidade para o mesmo usuário e filme

#### Critérios de aceite
- nota fora do intervalo não é aceita
- filme inexistente retorna erro
- usuário não autenticado não consegue avaliar
- avaliação cria ou atualiza registro corretamente
- `userId` do payload e token devem ser consistentes

#### Resultado esperado
- fluxo de avaliação seguro e funcional

#### Conteúdos que o dev precisa saber
- DTOs
- validation
- transações
- Spring MVC
- manipulação de exceções

---

### História 4 - Proteção de avaliação duplicada
Como usuário autenticado, eu quero avaliar um filme apenas uma vez para evitar duplicidade e manter consistência.

#### Requisitos
- verificar se o usuário já avaliou o filme
- se sim, atualizar a nota
- se não, criar nova avaliação

#### Critérios de aceite
- não é possível criar múltiplos registros para o mesmo usuário e filme
- o sistema atualiza a avaliação existente
- a média do filme é recalculada
- o sistema rejeita operações inconsistentes com `userId`\

#### Resultado esperado
- regra de negócio correta e consistente

#### Conteúdos que o dev precisa saber
- chaves compostas
- regras de negócio
- transações
- agregação de dados

---

### História 5 - Tratamento de erros e exceções
Como cliente da API, eu quero receber respostas consistentes para saber o que ocorreu e como corrigir.

#### Requisitos
- criar exceptions específicas
- definir códigos HTTP padronizados
- retornar mensagem útil
- centralizar o tratamento de erros em um `@ControllerAdvice`
- padronizar payload de erro da API

#### Critérios de aceite
- filme não encontrado retorna 404
- usuário não autenticado retorna 401
- dado inválido retorna 400
- regra de negócio conflitante retorna 409 ou 422
- erro interno não expõe detalhes sensíveis

#### Resultado esperado
- API previsível e fácil de consumir

#### Conteúdos que o dev precisa saber
- `@ControllerAdvice`
- exception handling
- REST status codes
- boas práticas de API

---

## 9.2. Frontend

### História 6 - Login do usuário
Como usuário, eu quero entrar no sistema para acessar minhas ações.

#### Requisitos
- tela de login
- enviar email e senha
- salvar token no frontend
- redirecionar para fluxo protegido

#### Critérios de aceite
- login com dados válidos redireciona para a página principal
- login inválido mostra mensagem de erro
- token é armazenado de forma segura
- usuário sem autenticação não acessa áreas protegidas

#### Resultado esperado
- experiência de autenticação fluida

#### Conteúdos que o dev precisa saber
- React
- React Router
- localStorage/sessionStorage
- estado e formulários
- autenticação client-side

---

### História 7 - Listagem paginada de filmes
Como visitante, eu quero visualizar filmes para escolher qual filme avaliar.

#### Requisitos
- listar filmes em cards
- paginação
- carregamento dinâmico
- mensagens de erro e vazio

#### Critérios de aceite
- deve exibir cards com título, imagem e nota
- paginação deve funcionar corretamente
- estados de loading e erro devem ser exibidos
- layout deve ser responsivo

#### Resultado esperado
- visual agradável e navegável

#### Conteúdos que o dev precisa saber
- React hooks
- axios
- paginação
- layout responsivo
- componentização

---

### História 8 - Avaliação do filme pela UI
Como usuário autenticado, eu quero avaliar um filme para enviar minha nota.

#### Requisitos
- formulário de avaliação
- seleção de nota
- envio da avaliação
- feedback de sucesso ou erro

#### Critérios de aceite
- usuário autenticado pode enviar avaliação
- nota inválida é bloqueada na UI
- após envio, a pontuação do filme é atualizada
- o sistema evita avaliação duplicada

#### Resultado esperado
- UX clara e funcional

#### Conteúdos que o dev precisa saber
- estados de formulário
- validação de formulário
- consumo de APIs
- UX e feedback visual
- React components

---

### História 9 - Tela de perfil do usuário
Como usuário autenticado, eu quero visualizar minhas avaliações para acompanhar minhas ações no sistema.

#### Requisitos
- listar avaliações do usuário
- mostrar última nota
- separar estado de carregamento e erro
- permitir atualização de avaliação

#### Critérios de aceite
- usuário vê apenas as avaliações do próprio perfil
- atualização de avaliação é refletida na tela
- interface informa quando não há registros

#### Resultado esperado
- melhor experiência e maior controle do usuário

#### Conteúdos que o dev precisa saber
- auth state
- perfil e dados do usuário
- consumo de endpoints protegidos
- renderização condicional

---

## 9.3. Banco de Dados

### História 10 - Schema PostgreSQL no Neon
Como time de desenvolvimento, eu quero um banco PostgreSQL em nuvem para remover dependência local e ganhar consistência e produtividade.

#### Requisitos
- criar database no Neon
- configurar conexão com aplicação
- definir schema
- aplicar constraints e relacionamentos

#### Critérios de aceite
- conexão com aplicação funcionando
- tabela de usuários criada com constraints
- tabela de filmes criada
- tabela de avaliações criada com chave composta
- banco acessível em ambiente de desenvolvimento

#### Resultado esperado
- ambiente persistente e confiável

#### Conteúdos que o dev precisa saber
- PostgreSQL
- schema e migrations
- relacionamento 1:N e N:N
- constraints
- conexão com Spring Data JPA

---

### História 11 - Unicidade da avaliação por usuário e filme
Como sistema, eu quero garantir que um usuário não tenha mais de uma avaliação por filme para manter consistência dos dados.

#### Requisitos
- criar chave composta em avaliação
- validar a regra no banco e na aplicação
- garantir atualização em vez de duplicação

#### Critérios de aceite
- não é permitido inserir duas avaliações iguais para o mesmo usuário e filme
- erro de integridade é tratado corretamente
- aplicação responde ao usuário com feedback claro

#### Resultado esperado
- consistência dos dados no banco

#### Conteúdos que o dev precisa saber
- unique constraints
- chaves compostas
- integridade referencial
- tratamento de exceções do banco

---

### História 12 - Recalculo de score e count
Como sistema, eu quero recalcular a nota média e a quantidade de avaliações para manter as informações do filme sempre corretas.

#### Requisitos
- calcular média após cada avaliação
- calcular count após inc/alt
- manter os dados atualizados no banco

#### Critérios de aceite
- score do filme reflete a média correta
- count aumenta ou mantém diferença correta
- a ação é consistente após atualização

#### Resultado esperado
- dados do filme sempre coerentes

#### Conteúdos que o dev precisa saber
- agregação
- cálculos em transação
- atualização de dados derivados
- modelagem de domínio

---

## 10. Validações Técnicas e de Qualidade

### Validações obrigatórias por etapa
- checar se regra de negócio está no domínio e não no controller
- checar se DTOs estão desacoplados das entidades
- verificar uso de exceptions padronizadas
- garantir que todas as ações sensíveis exijam autenticação
- garantir que o frontend não acessa dados protegidos sem token
- garantir que o banco no Neon está configurado e funcional
- garantir que os testes executam com sucesso em pipeline
- garantir que erros da API são tratatos por `GlobalExceptionHandler`

### Checklist final
- [ ] Arquitetura hexagonal aplicada
- [ ] JWT implementado corretamente
- [ ] Usuários autenticados podem avaliar
- [ ] Um usuário não pode avaliar o mesmo filme mais de uma vez
- [ ] Atualização da nota implementada
- [ ] Banco PostgreSQL validado no Neon
- [ ] Frontend com componentes organizados
- [ ] Testes automatizados criados
- [ ] CI/CD funcionando
- [ ] Documentação da API atualizada
- [ ] GlobalExceptionHandler padronizando respostas
- [ ] userId validado via token

---

## 11. Recomendação Final

A melhor forma de executar essa refatoração é em sequência lógica e incremental:
1. mapear e documentar o que já existe
2. criar o domínio e regras de negócio
3. implementar autenticação com JWT
4. refatorar backend para arquitetura hexagonal
5. modelar banco PostgreSQL no Neon
6. reescrever os fluxos principais do frontend
7. criar testes de integração e BDD
8. validar e ajustar o comportamento final

Essa abordagem reduz risco, melhora a qualidade e torna o projeto mais fácil de evoluir.

---

## 12. Observações Finais

A decisão de usar Neon com PostgreSQL é adequada ao contexto do projeto, porque:
- o sistema tem regras transacionais relevantes
- a integridade dos dados é importante
- o domínio exige controle de usuários e avaliações
- o Java/Spring Boot funciona muito bem com PostgreSQL
- o Neon reduz a sobrecarga operacional da infraestrutura

A autenticação via JWT também é uma decisão correta, pois:
- o sistema precisa de usuário validado para avaliar
- as ações de avaliação exigem autorização
- o backend precisa de segurança real e não apenas uma camada permissiva
- o `userId` autenticado permite validar de forma segura ações e permissões

Em conjunto, a arquitetura hexagonal + PostgreSQL + JWT + frontend componentizado produz uma base sólida para evoluir de um MVP para um projeto com boa qualidade de engenharia e potencial de produção.