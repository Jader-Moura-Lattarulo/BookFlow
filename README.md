# BookFlow: P2P Book-Sharing Platform & Analytics

![Node.js](https://img.shields.io/badge/Node.js-Backend-43853D?style=flat-square&logo=node.js)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)

## Overview
BookFlow is a fully decoupled, peer-to-peer (P2P) book-sharing platform. Instead of a centralized library inventory, it empowers users to share their own books, manage loans, and track their reading habits. 

This project goes beyond standard CRUD operations by implementing complex business rules such as smart waitlists, dynamic user reputation scoring, and a dedicated Business Intelligence (BI) module powered by advanced SQL.

## Architecture
The system is designed with a strict separation of concerns:
*   **BookFlow API (This Repo):** A robust RESTful API built with Node.js and Express. It handles authentication (JWT), data validation, complex loan logic, and serves analytical data.
*   **BookFlow Web:** A Single Page Application (SPA) built with React and Tailwind CSS, consuming the API to deliver a seamless user experience.

## Core Features
*   **Decentralized Loan Management:** Users can lend and borrow books directly. The system enforces strict state machine rules (Available ➔ Pending Approval ➔ Active Loan ➔ Returned).
*   **Smart Waitlist Queue:** If a book is currently loaned out, users can join a waitlist. The system automatically notifies the next in line upon return.
*   **Reputation Scoring:** Users build a trust score based on their return punctuality, which dictates their concurrent borrowing limits.

## Data & Analytics Spotlight
To extract actionable business intelligence from the platform, this project includes a dedicated analytics module using **Raw SQL**, bypassing the ORM for complex queries. 

Located in `src/database/queries/`, you will find scripts demonstrating:
*   **Common Table Expressions (CTEs):** Used for the recommendation engine (*"Users who read X also read..."*).
*   **Window Functions (`RANK()`, `PARTITION BY`):** Used to generate dynamic leaderboards of top readers per book category over rolling 30-day periods.
*   **Materialized Views:** Pre-calculated views for the Admin Dashboard, aggregating monthly loan volumes and average retention times.

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   Docker (Optional, but recommended)
*   *Note: This project uses SQLite, so no standalone database server installation is required.*

### Environment Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/jader-moura-lattarulo/bookflow-api.git](https://github.com/jader-moura-lattarulo/bookflow-api.git)

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

Run the migrations and seeders to set up the schema and populate mock data (if starting from scratch):

```bash
npm run db:migrate
npm run db:seed

```

#### Note on Database Versioning (`library.db.sqlite`)

You might notice that the `library.db.sqlite` file is committed to this repository. While versioning database files is a known anti-pattern in real-world production environments, it was intentionally included here for demonstration and portfolio review purposes. This decision allows reviewers to immediately run the application, test the BI queries, and view populated data without needing to configure a local database instance or run seeders.

### Running the Application

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
│   └── queries/      # Raw SQL files for analytics and reports
├── middlewares/      # JWT auth, error handling, input validation
├── models/           # Data access layer
├── routes/           # Express router definitions
└── services/         # Isolated business logic

```