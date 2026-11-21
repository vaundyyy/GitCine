# Atualizações no frontend do GitCine

## Visão geral

Este documento resume a refatoração realizada no frontend do GitCine pela Pull Request **#5**, cujo objetivo foi modernizar a interface, ampliar os fluxos da aplicação e introduzir autenticação e perfis de usuário no navegador.

## Principais mudanças

### 1. Nova experiência de navegação

- Substituição da navegação antiga por um novo layout de **Navbar** no padrão GitCine.
- Inclusão de links para catálogo, login, perfil, indicação de filmes e painel administrativo.
- Adição de estados visuais para usuário autenticado, visitante e administrador.
- Implementação de navegação responsiva para telas menores.

### 2. Catálogo de filmes reformulado

- Reestruturação da página `Listing` com uma identidade visual mais moderna.
- Adição de busca expansível por título de filme.
- Inclusão de estados de carregamento, erro e catálogo vazio.
- Paginação mantida para a navegação padrão do catálogo.
- Ajuste do layout para exibir os filmes em grades responsivas.

### 3. Cards de filmes renovados

- Atualização visual dos cards com imagens proporcionais, títulos, avaliação e ação principal.
- Adição de efeitos de foco, elevação e zoom suave.
- O botão principal passou a refletir o perfil autenticado:
  - Usuário comum: **Avaliar**.
  - Administrador: **Editar**.

### 4. Fluxos de avaliação e edição

- Alteração da rota de avaliação para `/movies/:movieId/rate`.
- Usuários comuns podem informar uma nota de 1 a 5 associada ao e-mail autenticado.
- A tela também passa a fornecer fluxo de edição para administradores, permitindo alterar título e imagem do filme.
- Inclusão de mensagens de sucesso, erro, envio e estados desabilitados durante requisições.

### 5. Autenticação no frontend

- Criação do `AuthContext` para centralizar o estado de autenticação.
- Autenticação persistida por `localStorage` por meio de utilitários em `utils/auth.ts`.
- Armazenamento separado de token, perfil (`user` ou `admin`) e e-mail do usuário.
- Implementação de páginas de login e cadastro.
- Login administrativo de demonstração:
  - E-mail: `admin@admin.com`
  - Senha: `admin`

> Observação: a autenticação atual é uma implementação de demonstração no frontend. A integração definitiva com o backend ainda deverá substituir os tokens fixos e validações locais.

### 6. Proteção de rotas

- Criação do componente `PrivateRoute`.
- Bloqueio de páginas privadas para visitantes.
- Restrição do painel administrativo apenas a usuários administradores.
- Redirecionamento automático de administradores que tentarem acessar o perfil comum.
- Preservação da rota original durante o redirecionamento para login.

### 7. Novas áreas da aplicação

- **Perfil:** histórico visual de avaliações e opção para encerrar a sessão.
- **Cadastro:** validação de nome, e-mail, senha e confirmação de senha.
- **Indicação de filmes:** formulário para preparar sugestões de novos títulos.
- **Painel administrativo:** interface para cadastrar novos filmes no catálogo.

### 8. Redesign visual

- Substituição da identidade visual anterior por uma interface inspirada no estilo Apple.
- Introdução de um conjunto de variáveis globais para cores, superfícies, bordas, texto e sombras.
- Uso da família tipográfica SF/Helvetica/Arial com fallback seguro.
- Padronização de cartões, campos, botões, alertas e estados vazios.
- Inclusão de responsividade para dispositivos móveis.

### 9. Organização e novos componentes

- Separação entre contexto de autenticação, componentes, páginas e utilitários.
- Criação de arquivos específicos de estilo para cada página e componente.
- Adição de declaração para suporte a módulos CSS.
- Estrutura ampliada com novas páginas:
  - `Login`
  - `Register`
  - `Profile`
  - `SuggestMovie`
  - `AdminDashboard`

### 10. Dependências atualizadas

- Atualização do `axios` para `^1.21.1`.
- Atualização do `react-router-dom` para `^7.18.5`.
- Atualização do `react-scripts` para `^5.0.1`.
- Inclusão e atualização de `package-lock.json` e `yarn.lock`.

## Arquivos com maior impacto

- `frontend/src/App.tsx` — novas rotas e integração do provedor de autenticação.
- `frontend/src/contexts/AuthContext.tsx` — gerenciamento global do usuário.
- `frontend/src/components/PrivateRoute/index.tsx` — controle de acesso às rotas.
- `frontend/src/pages/Listing/index.tsx` — catálogo com busca e estados da interface.
- `frontend/src/components/FormCard/index.tsx` — avaliação de usuários e edição administrativa.
- `frontend/src/pages/Login/index.tsx` — fluxo de entrada no sistema.
- `frontend/src/pages/AdminDashboard/index.tsx` — cadastro de filmes.
- `frontend/src/pages/Profile/index.tsx` — perfil e histórico de avaliações.
- `frontend/src/index.css` — tokens visuais e base global da interface.

## Integrações pendentes

Algumas funcionalidades estão preparadas na interface, mas ainda dependem de endpoints ou regras do backend:

- Cadastro real de usuários.
- Login por credenciais válidas no Spring Boot.
- Recuperação do token e do perfil autenticado.
- Persistência completa do histórico de avaliações.
- Endpoint `POST /movies` para cadastro administrativo.
- Endpoint `PUT /movies/{id}` para edição de filmes.
- Cadastro de sugestões enviadas pelos usuários.

## Impacto técnico

A refatoração amplia significativamente o frontend, passando de um catálogo simples para uma aplicação com autenticação, perfis, administração e diferentes níveis de acesso. Também melhora a organização visual e a experiência em dispositivos móveis, deixando integrações reais com o backend como o principal próximo passo.
