# Documentação de Rotas - BookFlow

Base URL: `http://localhost:3000` (ou porta definida em `PORT`)

## Rotas de Usuários (`/users`)

- **Criar Usuário**
  - **Método**: `POST`
  - **Rota**: `/users`
  - **Headers**: `Content-Type: application/json`
  - **Middlewares**: `validate(userSchema)`
  - **Descrição**: Registra um novo usuário no sistema.

- **Login**
  - **Método**: `POST`
  - **Rota**: `/users/login`
  - **Headers**: `Content-Type: application/json`
  - **Descrição**: Autentica o usuário e retorna o token de acesso.

- **Listar Usuários**
  - **Método**: `GET`
  - **Rota**: `/users`
  - **Headers**: `Authorization: Bearer <token>`
  - **Middlewares**: `authMiddleware`
  - **Descrição**: Retorna a lista de todos os usuários (Requer autenticação).

- **Buscar Usuário por ID**
  - **Método**: `GET`
  - **Rota**: `/users/:id`
  - **Headers**: `Authorization: Bearer <token>`
  - **Middlewares**: `authMiddleware`, `validateUserId`
  - **Descrição**: Retorna os detalhes de um usuário específico.

- **Atualizar Usuário**
  - **Método**: `PATCH`
  - **Rota**: `/users/:id`
  - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
  - **Middlewares**: `authMiddleware`, `validateUserId`
  - **Descrição**: Atualiza parcialmente os dados do usuário.

- **Deletar Usuário**
  - **Método**: `DELETE`
  - **Rota**: `/users/:id`
  - **Headers**: `Authorization: Bearer <token>`
  - **Middlewares**: `authMiddleware`, `validateUserId`
  - **Descrição**: Remove o usuário do sistema.

## Rotas de Livros (`/books`)

- **Listar Livros**
  - **Método**: `GET`
  - **Rota**: `/books`
  - **Headers**: `Nenhum`
  - **Descrição**: Retorna a lista de livros disponíveis.

- **Criar Livro**
  - **Método**: `POST`
  - **Rota**: `/books`
  - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
  - **Middlewares**: `authMiddleware`, `validate(bookSchema)`
  - **Descrição**: Adiciona um novo livro ao sistema (Requer autenticação).

- **Buscar Livros (Query)**
  - **Método**: `GET`
  - **Rota**: `/books/search`
  - **Headers**: `Nenhum`
  - **Descrição**: Pesquisa livros baseada em parâmetros de query.

- **Buscar Livro por ID**
  - **Método**: `GET`
  - **Rota**: `/books/:id`
  - **Headers**: `Nenhum`
  - **Middlewares**: `validateBookId`
  - **Descrição**: Retorna os detalhes de um livro específico.

- **Atualizar Livro**
  - **Método**: `PATCH`
  - **Rota**: `/books/:id`
  - **Headers**: `Authorization: Bearer <token>`, `Content-Type: application/json`
  - **Middlewares**: `authMiddleware`, `validateBookId`
  - **Descrição**: Atualiza dados de um livro.

- **Deletar Livro**
  - **Método**: `DELETE`
  - **Rota**: `/books/:id`
  - **Headers**: `Authorization: Bearer <token>`
  - **Middlewares**: `authMiddleware`, `validateBookId`
  - **Descrição**: Remove um livro do sistema.
