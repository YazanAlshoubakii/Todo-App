# Todo App

A simple Todo application built with Vite, Tailwind CSS, React, and Express.

## Features

- Add, edit, and delete tasks
- Mark tasks as completed
- Filter tasks by status (all, active, completed)
- User authentication (sign up, login, logout)
- View tasks assigned to users
- Responsive design
- Drag and Drop Functionality

## Technologies Used

- Frontend: Vite, React, Tailwind CSS, Zustand, React Hot Toast
- Backend: Express, MongoDB, Mongoose, JWT, dotenv, cookie-parser, cors

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/YazanAlshoubakii/Todo-App.git
   cd todo-app
   ```

2. Install dependencies for both frontend and backend:

   ```sh
   cd frontend
   npm install
   # or
   yarn install

   cd ../backend
   npm install
   # or
   yarn install
   ```

### Running the App

1. Start the backend server:

   ```sh
   cd backend
   npm run dev
   # or
   yarn dev
   ```

2. Start the frontend development server:

   ```sh
   cd frontend
   npm run dev
   # or
   yarn dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create a production build of the frontend, run:

```sh
cd frontend
npm run build
# or
yarn build
```

### Linting

To lint the code, run:

```sh
cd frontend
npm run lint
# or
yarn lint
```

## API Endpoints

### Auth Routes

- `POST /auth/signup` - Signup a new user
- `POST /auth/login` - Login a user
- `POST /auth/logout` - Logout a user
- `GET /auth/check` - Check if a user is authenticated

### Task Routes

- `GET /tasks/all-tasks` - Get all tasks
- `POST /tasks/new-task` - Add a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `GET /tasks/users/tasks` - Get all users with their tasks
