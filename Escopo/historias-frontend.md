# Histórias do Frontend - GitCine

## 1. F1 - Login do usuário
Como usuário, quero entrar no sistema, para acessar áreas protegidas.

- Requisitos:
  - tela de login
  - envio de email e senha
  - armazenamento do token
  - redirecionamento após login
- Critérios de aceite:
  - login com dados válidos redireciona para o fluxo correto
  - erro de credenciais é exibido ao usuário
  - usuário não autenticado não acessa áreas protegidas
- Resultado esperado:
  - autenticação funcional no frontend
- Conteúdo necessário:
  - React
  - TypeScript
  - React Router
  - estados e formulários
  - client-side auth

## 2. F2 - Cadastro do usuário
Como visitante, quero me cadastrar, para criar minha conta no sistema.

- Requisitos:
  - tela de cadastro
  - campos com validação
  - envio para API
  - feedback de criação
- Critérios de aceite:
  - dados inválidos são bloqueados
  - cadastro bem-sucedido redireciona para login ou home
  - erros do backend são exibidos ao usuário
- Resultado esperado:
  - fluxo de cadastro funcional
- Conteúdo necessário:
  - React forms
  - validação de formulário
  - axios
  - feedback de UI

## 3. F3 - Listagem paginada de filmes
Como visitante, quero visualizar filmes em tela, para escolher o que avaliar.

- Requisitos:
  - listagem em cards
  - paginação
  - carregamento e mensagens de erro
  - layout responsivo
- Critérios de aceite:
  - filmes aparecem em cards organizados
  - paginação funciona corretamente
  - estados de loading e vazio são exibidos
  - layout funciona em mobile e desktop
- Resultado esperado:
  - catálogo visual e acessível
- Conteúdo necessário:
  - React hooks
  - axios
  - paginação
  - CSS responsivo
  - componentização

## 4. F4 - Card de filme
Como usuário, quero visualizar as informações essenciais do filme, para decidir se vou avaliar.

- Requisitos:
  - exibir título, imagem, nota e dados básicos
  - layout reutilizável
  - componente isolado e padronizado
- Critérios de aceite:
  - card é reutilizável em listagens e detalhes
  - informações principais aparecem sem poluição visual
  - componente funciona em diferentes tamanhos de tela
- Resultado esperado:
  - UI consistente e reaproveitável
- Conteúdo necessário:
  - componentização em React
  - props e interfaces
  - CSS modular ou styled components

## 5. F5 - Tela de avaliação do filme
Como usuário autenticado, quero avaliar o filme, para registrar minha nota.

- Requisitos:
  - formulário de avaliação
  - seleção de nota
  - envio para API
  - feedback visual de sucesso ou erro
- Critérios de aceite:
  - usuário autenticado pode avaliar
  - nota inválida não é enviada
  - feedback de sucesso aparece após operação
  - avaliação duplicada é tratada corretamente no backend
- Resultado esperado:
  - fluxo de avaliação funcional e amigável
- Conteúdo necessário:
  - formulários em React
  - validação de input
  - consumo de API
  - UX de feedback

## 6. F6 - Tela de perfil do usuário
Como usuário autenticado, quero ver minhas avaliações, para acompanhar minhas ações.

- Requisitos:
  - exibir avaliações do usuário
  - mostrar dados do perfil
  - permitir atualizar a nota
  - tratar estado vazio
- Critérios de aceite:
  - usuário visualiza apenas suas avaliações
  - atualização refletida na tela
  - interface informa quando não há registros
- Resultado esperado:
  - melhor controle e experiência do usuário
- Conteúdo necessário:
  - auth state
  - renderização condicional
  - consumo de endpoints protegidos
  - React state management

## 7. F7 - Proteção de rotas
Como usuário, quero que áreas protegidas só sejam acessadas com autenticação válida, para manter segurança no frontend.

- Requisitos:
  - bloquear acesso sem token
  - redirecionar para login
  - permitir acesso após autenticação
- Critérios de aceite:
  - rota protegida exige autenticação
  - ausência de token redireciona para login
  - usuário autenticado acessa corretamente
- Resultado esperado:
  - controle de navegação consistente
- Conteúdo necessário:
  - React Router
  - guards
  - auth context

## 8. F8 - Feedback visual e estados da aplicação
Como usuário, quero entender o estado da aplicação, para saber se a ação foi concluída ou se houve erro.

- Requisitos:
  - loading
  - error states
  - empty states
  - sucesso com mensagem clara
- Critérios de aceite:
  - toda ação assíncrona apresenta feedback útil
  - carregamento e erro estão visíveis
  - usuário recebe feedback do backend
- Resultado esperado:
  - experiência mais clara e confiável
- Conteúdo necessário:
  - React state
  - UX patterns
  - componentização

## 9. F9 - Responsividade do frontend
Como usuário, quero acessar o sistema em mobile e desktop, para utilizar em qualquer dispositivo.

- Requisitos:
  - layouts responsivos
  - componentes adaptáveis
  - navegação funcional em telas menores
- Critérios de aceite:
  - aplicação funciona corretamente em diferentes larguras de tela
  - elementos não quebram na visualização mobile
  - UX continua clara em dispositivos menores
- Resultado esperado:
  - experiência melhor em todos os aparelhos
- Conteúdo necessário:
  - CSS responsivo
  - media queries
  - flex/grid layout

## 10. F10 - Testes de frontend
Como time de desenvolvimento, quero validar a interface, para reduzir regressões e garantir UX estável.

- Requisitos:
  - testar componentes importantes
  - validar fluxo de autenticação
  - validar listagem e avaliação
- Critérios de aceite:
  - interface principal funciona conforme esperado
  - erros de renderização são detectados nos testes
  - ações críticas são validadas automaticamente
- Resultado esperado:
  - frontend mais estável
- Conteúdo necessário:
  - React Testing Library
  - Jest
  - testes de interação

## 11. Sequência recomendada para frontend
1. Implementar autenticação e rotas protegidas
2. Criar listagem e cards de filmes
3. Construir fluxo de avaliação
4. Adicionar perfil do usuário e estados de feedback
5. Melhorar responsividade e refinamento visual
6. Validar com testes de interface

## 12. Critérios finais de frontend
- autenticação funcionando corretamente
- login e cadastro com validação
- catálogo visual e responsivo
- avaliação do filme implementada com feedback claro
- rotas privadas protegidas
- interface com estados de erro, vazio e carregamento

