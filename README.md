# Pilot - React Onboarding Application

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Third-party Integrations](#third-party-integrations)
5. [Scripts in `package.json`](#scripts-in-packagejson)
6. [Installation Instructions](#installation-instructions)

---

## Project Overview

The **Pilot** project is a React-based onboarding app that simplifies restaurant management. It offers an intuitive interface for managing menu items, categories, and ingredients, built with a modular architecture for scalability, maintainability, and performance.

---

## Features

- **User Authentication**: Secure login and logout functionality.
- **Menu Management**: Add, edit, and delete menu items with categories and ingredients.
- **Dynamic Forms**: Customizable forms for menu items with validation.
- **State Management**: Efficient state handling using Redux Toolkit and `redux-persist`.
- **Responsive Design**: Fully optimized for mobile and desktop devices.
- **Notifications**: Context-based notification system for success, error, and info messages.
- **Charts and Tables**: Interactive charts and tables for visualizing menu data.
- **File Uploads**: Image upload and preview functionality for menu items.
- **SonarQube Integration**: Code quality analysis using SonarQube.

---

## Tech Stack

The project is built using the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Vite**: A fast build tool and development server.
- **Redux Toolkit**: For state management and `redux-persist` for persistence.
- **Ant Design**: A UI library for React with pre-built components.
- **Jest**: For unit testing.
- **SonarQube**: For static code analysis and quality checks.
- **Prettier**: For code formatting.
- **ESLint**: For linting and maintaining code quality.

---

## Third-party Integrations

### 1. **Ant Design**

- Used for UI components like tables, forms, modals, and buttons.
- [Ant Design Documentation](https://ant.design/)

### 2. **Redux Toolkit**

- Used for state management with slices for authentication and menu data.
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

### 3. **SonarQube**

- Integrated for static code analysis and quality checks.
- **Setup**:

  - Install and configure SonarQube locally or use a hosted instance.
  - Make sure to update the `sonarscan.js` file with your SonarQube server URL, token, project API key, and project name.

- Run the scanner:
  ```bash
  npm run sonarscan
  ```

### 4. **React Router**

- Used for routing and protected routes.
- [React Router Documentation](https://reactrouter.com/)

### 5. **Prettier and ESLint**

- Used for code formatting and linting.
- Pre-configured with rules for TypeScript and React.

---

## Scripts in `package.json`

| Script              | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Starts the development server using Vite.             |
| `npm run build`     | Builds the project for production.                    |
| `npm run preview`   | Previews the production build locally.                |
| `npm run lint`      | Runs ESLint to check for linting issues.              |
| `npm run lint:fix`  | Fixes linting issues automatically.                   |
| `npm run format`    | Formats the codebase using Prettier.                  |
| `npm run sonarscan` | Runs the SonarQube scanner for code quality analysis. |

---

## Installation Instructions

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Pilot.git
   cd Pilot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

Feel free to reach out with any questions or suggestions!
