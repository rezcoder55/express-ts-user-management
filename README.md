# User Management System (Express + TypeScript + MVC)

A full-stack User Management application built with **Node.js**, **Express**, **TypeScript**, and the **MVC (Model-View-Controller)** pattern.

> 🎯 **Project Purpose**:  
> This project was developed as a hands-on learning lab to practice and master core backend development concepts with **Node.js & Express**, implement clean architecture (**MVC** and **RESTful API design**), and prepare for integrating relational databases with **PostgreSQL** and **Prisma ORM**.

---

## 🚀 Current Features

- **MVC Architecture**: Clean separation of concerns between Models, Controllers, and Routes.
- **RESTful API**: Standardized HTTP endpoints for user CRUD operations (`GET`, `POST`, `PUT`, `DELETE`).
- **Live Search & Filter**:
  - Real-time debounced search by name, email, or region.
  - Region-based filtering.
  - Dynamic result counter.
- **Interactive Web Client**:
  - **Two-Tab Interface**: Tab to register a new user and Tab to explore all registered users.
  - **CRUD Modals**: Native HTML5 `<dialog>` modals for updating user details and confirming deletion.
  - **Responsive UI**: Built with modern CSS (Inter typography, CSS grid, micro-animations, and alert feedback).

---

## 🗺️ Roadmap (In Progress & Upcoming)

- [x] **Node.js & Express Fundamentals**: Server setup, middlewares, routing, and static file serving.
- [x] **TypeScript Integration**: Strong typing across models, controllers, and routes.
- [x] **MVC Pattern Refactoring**: Decoupling business logic from routing.
- [x] **Interactive Frontend**: Tabbed navigation, live search, and modal interactions.
- [x] **Database Integration with PostgreSQL**: Connected to `mydb2` using `pg` (node-postgres) with automatic table creation & seeding.
- [ ] **Prisma ORM**: Schema definitions, database migrations, and type-safe database queries.
- [ ] **Validation & Error Handling**: Adding schema validation (e.g. Zod or Joi) and centralized error handling middleware.

---

## 🛠️ Tech Stack

### Current
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **DB Driver**: [pg (node-postgres)](https://node-postgres.com/)
- **Dev Runner**: [tsx](https://github.com/privatenumber/tsx) (Fast TypeScript execution with watch mode)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Planned / In Roadmap
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)

---

## 📁 Project Structure

```
project01/
├── src/
│   ├── controllers/
│   │   └── user.controller.ts  # Handles HTTP request validation and responses
│   ├── models/
│   │   └── user.model.ts       # Data schema & business/storage access methods
│   ├── routes/
│   │   └── users.ts            # RESTful route definitions mapped to controllers
│   ├── forms/
│   │   └── index.html          # Frontend presentation view (static client)
│   ├── my-data.ts              # Initial mock data and interfaces
│   └── index.ts                # Application entry point and server setup
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📡 API Reference

Base URL: `http://localhost:3000`

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Fetch all users or search/filter users | `?q=name` (keyword search), `?region=usa` (region filter) |
| `GET` | `/api/users/:id` | Fetch a single user by ID | - |
| `POST` | `/api/users` | Create a new user | Request body: `{ firstName, lastName, region }` |
| `PUT` | `/api/users/:id` | Update an existing user | Request body: `{ firstName, lastName, region }` |
| `DELETE`| `/api/users/:id` | Delete a user by ID | - |

---

## 💻 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm**

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Development Mode
Start the development server with live reload:
```bash
npm run dev
```
The server will start at: **`http://localhost:3000`**

### 4. Production Build
Compile TypeScript to JavaScript:
```bash
npm run build
npm start
```

---

## 📝 License
This project is open-source and available under the ISC License.
