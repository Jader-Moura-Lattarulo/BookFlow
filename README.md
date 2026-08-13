# BookFlow: P2P Book-Sharing Platform & Analytics (API)

*Read this in [English](#english-version).*

![Node.js](https://img.shields.io/badge/Node.js-Backend-43853D?style=flat-square&logo=node.js)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)

## Visão Geral
BookFlow é uma API de backend finalizada para uma plataforma de compartilhamento de livros peer-to-peer (P2P). O projeto tem foco puramente estrutural, operando apenas como backend, sem interface frontend. Permite o compartilhamento de livros, gerenciamento de empréstimos e monitoramento de hábitos de leitura.

O sistema implementa regras de negócio como filas de espera, pontuação de reputação de usuários e um módulo de Business Intelligence (BI) focado em SQL avançado.

## Arquitetura
*   **BookFlow API:** API RESTful robusta construída com Node.js e Express. Gerencia autenticação (JWT), validação de dados, lógica complexa de empréstimos e fornece dados analíticos. 

## Principais Funcionalidades
*   **Gerenciamento Descentralizado de Empréstimos:** Aplica regras de máquina de estado estritas (Disponível ➔ Pendente Aprovação ➔ Empréstimo Ativo ➔ Devolvido).
*   **Fila de Espera Inteligente:** Usuários podem entrar na fila de espera para livros emprestados.
*   **Pontuação de Reputação:** Score de confiança baseado na pontualidade das devoluções que afeta os limites de empréstimo.

## Dados e Analytics
Módulo de analytics dedicado usando **SQL Puro** (`src/database/queries/`):
*   **Common Table Expressions (CTEs):** Motor de recomendação.
*   **Window Functions (`RANK()`, `PARTITION BY`):** Leaderboards dinâmicos e ranqueamento de leitores.
*   **Materialized Views:** Visões pré-calculadas para métricas de volume e tempo médio de retenção.

## Como Começar

### Pré-requisitos
*   Node.js (v18+)
*   Docker (Opcional)
*   *Nota: Utiliza SQLite, dispensando instalação de servidor de banco de dados externo.*

### Configuração
1. Clone o repositório:
   ```bash
   git clone https://github.com/jader-moura-lattarulo/bookflow-api.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie o arquivo de ambiente:
   ```bash
   cp .env.example .env
   ```

### Banco de Dados
Para rodar migrations e seeders:
```bash
npm run db:migrate
npm run db:seed
```
*O arquivo `library.db.sqlite` está versionado no repositório para facilitar a avaliação do portfólio, permitindo testar a aplicação e as consultas BI imediatamente.*

### Executando a API
```bash
npm run dev
```
A API ficará disponível em http://localhost:3000.

## Estrutura do Projeto
```plaintext
src/
├── config/           # Configurações de ambiente e DB
├── controllers/      # Handlers de rotas e processamento de requests
├── database/         
│   ├── migrations/   # Definições de schema
│   └── queries/      # Scripts SQL puro para analytics e relatórios
├── middlewares/      # Auth JWT, tratamento de erros, validação
├── models/           # Camada de acesso aos dados
├── routes/           # Definições de roteamento Express
└── services/         # Lógica de negócio isolada
```

---

<a name="english-version"></a>
# English Version

## Overview
BookFlow is a finalized backend API for a peer-to-peer (P2P) book-sharing platform. The project has a purely structural focus, operating solely as a backend without a frontend interface. It enables book sharing, loan management, and reading habits tracking.

The system implements complex business rules such as waitlist queues, user reputation scoring, and a Business Intelligence (BI) module powered by advanced SQL.

## Architecture
*   **BookFlow API:** A robust RESTful API built with Node.js and Express. It handles authentication (JWT), data validation, complex loan logic, and serves analytical data.

## Core Features
*   **Decentralized Loan Management:** Enforces strict state machine rules (Available ➔ Pending Approval ➔ Active Loan ➔ Returned).
*   **Smart Waitlist Queue:** Users can join a waitlist for currently loaned books.
*   **Reputation Scoring:** A trust score based on return punctuality that affects borrowing limits.

## Data & Analytics
Dedicated analytics module using **Raw SQL** (`src/database/queries/`):
*   **Common Table Expressions (CTEs):** Recommendation engine.
*   **Window Functions (`RANK()`, `PARTITION BY`):** Dynamic leaderboards and reader rankings.
*   **Materialized Views:** Pre-calculated views for volume metrics and average retention times.

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   Docker (Optional)
*   *Note: Uses SQLite, requiring no standalone database server installation.*

### Environment Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/jader-moura-lattarulo/bookflow-api.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

### Database Initialization
Run the migrations and seeders:
```bash
npm run db:migrate
npm run db:seed
```
*The `library.db.sqlite` file is versioned in the repository to ease portfolio evaluation, allowing immediate testing of the application and BI queries.*

### Running the API
```bash
npm run dev
```
The API will be available at http://localhost:3000.

## Project Structure
```plaintext
src/
├── config/           # Environment and DB configurations
├── controllers/      # Route handlers and request parsing
├── database/         
│   ├── migrations/   # Schema definitions
│   └── queries/      # Raw SQL scripts for analytics and reports
├── middlewares/      # JWT auth, error handling, validation
├── models/           # Data access layer
├── routes/           # Express router definitions
└── services/         # Isolated business logic
```