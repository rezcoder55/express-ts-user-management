# User Management System (Express + TypeScript + MVC)

A full-stack User Management web application built with **Node.js**, **Express**, **TypeScript**, and an **MVC (Model-View-Controller)** architecture. It features a complete RESTful API and an interactive frontend with live search, region filtering, and modal dialogs for CRUD operations.

---

## 🚀 Features

- **Architecture**: Clean MVC (Model-View-Controller) pattern with strict TypeScript typings.
- **RESTful API**: Standardized HTTP endpoints for user CRUD operations (`GET`, `POST`, `PUT`, `DELETE`).
- **Live Search & Filter**:
  - Real-time debounced search by name, email, or region.
  - Region-based filtering.
  - Result count indicators.
- **Interactive Web Client**:
  - **Two-Tab Interface**: Tab to register a new user and Tab to explore all registered users.
  - **CRUD Operations via Modals**: Native HTML5 `<dialog>` modals for editing user details and confirming deletion.
  - **Responsive UI**: Built with modern CSS (Inter typography, CSS grid, micro-animations, and alert feedback).

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

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Dev Runner**: [tsx](https://github.com/privatenumber/tsx) (Fast TypeScript execute & watch)
- **HTTP Client**: [Axios](https://axios-http.com/)

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
