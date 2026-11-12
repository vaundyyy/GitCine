# Histórias do Backend - GitCine

## 1. H1 - Estrutura hexagonal do backend
Como desenvolvedor, quero separar domínio, aplicação e infraestrutura, para manter o código organizado e testável.

- Requisitos:
  - criar estrutura de pacotes por responsabilidade
  - separar regras de negócio dos controllers e repositories
  - definir ports e adapters
  - isolar infraestrutura da camada de domínio
  - manter o backend compatível com Java 25 e Spring Boot 3.x
- Critérios de aceite:
  - controller não contém lógica de negócio
  - domínio não depende de framework, banco ou HTTP
  - repositories são acessados via adapters
  - casos de uso são executados por interfaces de port
  - pacotes seguem a separação: domain / application / infrastructure / web
- Resultado esperado:
  - backend organizado, escalável e fácil de testar
- Conteúdo necessário:
  - arquitetura hexagonal
  - camadas de domínio, aplicação e infraestrutura
  - injeção de dependência
  - clean architecture

## 2. H2 - Autenticação com JWT
Como usuário autenticado, quero logar na aplicação, para acessar áreas protegidas.

- Requisitos:
  - endpoint de login
  - geração de token JWT
  - filtro de autenticação
  - autenticação via email e senha
  - validação do token em cada requisição
  - armazenamento seguro da senha com BCrypt/PasswordEncoder
- Critérios de aceite:
  - usuário inválido recebe 401
  - token válido consegue acessar rota protegida
  - token expirado é recusado
  - senha é armazenada com hash
  - usuário sem token não acessa endpoints protegidos
- Resultado esperado:
  - autenticação funcional e segura
- Conteúdo necessário:
  - Spring Security
  - JWT
  - filtros
  - password encoding
  - boas práticas de autenticação

## 3. H3 - Avaliação de filmes
Como usuário autenticado, quero avaliar um filme, para registrar minha nota.

- Requisitos:
  - receber `movieId`, `userId` e `value` no payload da avaliação
  - validar dados de entrada
  - garantir autenticação
  - garantir nota válida (intervalo definido pela regra do domínio)
  - persistir avaliação de forma idempotente
  - permitir atualização quando o usuário já avaliou o mesmo filme
- Critérios de aceite:
  - nota fora do intervalo é rejeitada
  - filme inexistente retorna erro 404
  - usuário não autenticado não consegue avaliar
  - avaliação cria ou atualiza registro corretamente
  - o backend não aceita duplicidade por usuário + filme
- Resultado esperado:
  - fluxo de avaliação seguro e consistentes
- Conteúdo necessário:
  - DTOs
  - validation
  - transações
  - Spring MVC
  - tratamento de exceções

## 4. H4 - Proteção contra avaliação duplicada
Como usuário autenticado, quero avaliar um filme apenas uma vez, para manter consistência dos dados.

- Requisitos:
  - verificar se usuário já avaliou o filme
  - se sim, atualizar a nota existente
  - se não, criar nova avaliação
  - recalcular média e count do filme após cada operação
- Critérios de aceite:
  - não existe múltiplos registros para o mesmo usuário e filme
  - avaliação existente é atualizada
  - média e count do filme são recalculados corretamente
  - a regra é validada tanto na aplicação quanto no banco
- Resultado esperado:
  - regra de negócio correta e consistente
- Conteúdo necessário:
  - chaves compostas
  - regras de domínio
  - transações
  - agregação de dados

## 5. H5 - Tratamento de exceções e erros da API
Como cliente da API, quero respostas consistentes, para entender o que aconteceu e como corrigir.

- Requisitos:
  - criar exceptions específicas do domínio e da aplicação
  - centralizar o tratamento em `@ControllerAdvice`
  - definir códigos HTTP padronizados
  - retornar mensagens úteis e seguras
  - evitar expor detalhes internos do sistema
- Critérios de aceite:
  - filme não encontrado retorna 404
  - usuário não autenticado retorna 401
  - dado inválido retorna 400
  - conflito de regra de negócio retorna 409 ou 422, conforme convenção
  - erro interno não expõe dados sensíveis
- Resultado esperado:
  - API previsível e fácil de consumir
- Conteúdo necessário:
  - `@ControllerAdvice`
  - exception handling
  - status codes REST
  - boas práticas de API

## 6. H6 - Usuários e cadastro
Como visitante, quero me cadastrar na aplicação, para ter acesso ao sistema.

- Requisitos:
  - criar usuário com nome, email e senha
  - validar dados obrigatórios
  - não permitir email duplicado
  - salvar senha com hash
  - expor DTO seguro sem retornar senha
- Critérios de aceite:
  - email duplicado retorna erro
  - senha em texto puro não é persistida
  - cadastro com dados válidos é criado corretamente
  - usuário pode fazer login após o cadastro
- Resultado esperado:
  - fluxo de cadastro funcional e seguro
- Conteúdo necessário:
  - Spring Data JPA
  - validation
  - password hashing
  - regras de domínio

## 7. H7 - Busca e listagem de filmes
Como cliente da API, quero consultar filmes, para consumir o catálogo da aplicação.

- Requisitos:
  - listar filmes paginados
  - buscar filme por id
  - retornar DTOs sem expor entidades do banco
  - permitir acesso público sem autenticação
- Critérios de aceite:
  - endpoint responde corretamente com dados esperados
  - filme inexistente retorna 404
  - resposta aceita paginação
  - retorno segue o contrato do frontend
- Resultado esperado:
  - catálogo de filmes exposto de forma clara
- Conteúdo necessário:
  - Spring Web
  - paginação
  - DTOs
  - repositories

## 8. H8 - Regras de negócio do score
Como sistema, quero centralizar a lógica de avaliação, para manter coerência na nota e no count do filme.

- Requisitos:
  - validar nota mínima e máxima
  - recalcular média do filme
  - recalcular quantidade de avaliações
  - manter consistência após atualização
  - encapsular regra em um serviço de domínio ou caso de uso
- Critérios de aceite:
  - score do filme corresponde à média correta
  - count reflete quantidade de avaliações válidas
  - atualização mantém integridade do domínio
  - nota inválida é rejeitada na validação da aplicação
- Resultado esperado:
  - dados de avaliação consistentes
- Conteúdo necessário:
  - regras de domínio
  - service layer
  - transações
  - modelagem de negócio

## 9. H9 - Testes de integração do backend
Como time de desenvolvimento, quero validar os endpoints, para garantir que a API funciona corretamente.

- Requisitos:
  - testar login
  - testar cadastro
  - testar criação e atualização de avaliação
  - testar rotas protegidas
  - testar fluxos de erro e validação
- Critérios de aceite:
  - fluxo principal de autenticação funciona
  - endpoints protegidos exigem token válido
  - erros esperados são retornados corretamente
  - regras duplicadas são bloqueadas
- Resultado esperado:
  - backend confiável e com menos regressão
- Conteúdo necessário:
  - JUnit 5
  - MockMvc
  - Spring Boot Test
  - Mockito

## 10. H10 - Testes de arquitetura
Como time de desenvolvimento, quero garantir que a arquitetura permaneça consistente, para evitar regressões estruturais.

- Requisitos:
  - validar dependências entre camadas
  - impedir acoplamento indevido
  - validar regras de arquitetura
  - verificar que domínio não depende de infraestrutura
- Critérios de aceite:
  - domínio não depende de infraestrutura
  - controllers não contêm regra de negócio
  - adapters aparecem apenas nas camadas corretas
  - constraints de arquitetura permanecem estáveis
- Resultado esperado:
  - arquitetura protegida contra degradação
- Conteúdo necessário:
  - ArchUnit
  - princípios de arquitetura limpa
  - regra de dependências

## 11. Sequência recomendada para backend
1. Ajustar contrato de API e regras de negócio
2. Definir domínio e entidades centrais
3. Implementar autenticação JWT e proteção de rotas
4. Criar DTOs, validators e error handler global
5. Integrar banco e repositories
6. Implementar avaliação com atualização e recalculo de score/count
7. Testar endpoints e regras de negócio
8. Validar arquitetura e dependências

## 12. Critérios finais de backend
- arquitetura hexagonal aplicada
- autenticação implementada corretamente
- regras de negócio isoladas no domínio
- avaliação duplicada evitada
- endpoints protegidos e testados
- API com erro padronizado
- Java 25 compatível com o ambiente de build
- uso de `userId` como identidade da avaliação e da autorização
