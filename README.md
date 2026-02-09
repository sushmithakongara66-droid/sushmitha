# Sushmitha API

A RESTful API built with Node.js and Express for managing users and tasks with comprehensive documentation.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
  - [Root & Utility Endpoints](#root--utility-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Task Endpoints](#task-endpoints)
- [API Response Format](#api-response-format)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Features

- ✅ RESTful API design
- ✅ User management (CRUD operations)
- ✅ Task management (CRUD operations)
- ✅ Query filtering for tasks
- ✅ Health check endpoint
- ✅ Built-in API documentation endpoint
- ✅ CORS enabled
- ✅ JSON request/response format

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sushmithakongara66-droid/sushmitha.git
cd sushmitha
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file for environment variables:
```bash
PORT=3000
```

## Running the API

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your environment).

## API Endpoints

### Root & Utility Endpoints

#### GET /
Get API information and available endpoints.

**Response:**
```json
{
  "message": "Welcome to Sushmitha API",
  "version": "1.0.0",
  "endpoints": {
    "users": "/api/users",
    "tasks": "/api/tasks",
    "health": "/api/health",
    "docs": "/api/docs"
  }
}
```

#### GET /api/health
Health check endpoint to verify API status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-09T08:50:00.000Z",
  "uptime": 123.456
}
```

#### GET /api/docs
Get OpenAPI specification for the API.

**Response:** OpenAPI 3.0 JSON specification

---

### User Endpoints

#### GET /api/users
Get all users.

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "email": "bob@example.com",
      "role": "user"
    }
  ]
}
```

#### GET /api/users/:id
Get a specific user by ID.

**Parameters:**
- `id` (path parameter): User ID

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "admin"
  }
}
```

**Response (Not Found - 404):**
```json
{
  "success": false,
  "error": "User not found"
}
```

#### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "Charlie Brown",
  "email": "charlie@example.com",
  "role": "user"
}
```

**Required fields:** `name`, `email`  
**Optional fields:** `role` (defaults to "user")

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Charlie Brown",
    "email": "charlie@example.com",
    "role": "user"
  }
}
```

#### PUT /api/users/:id
Update an existing user.

**Parameters:**
- `id` (path parameter): User ID

**Request Body (all fields optional):**
```json
{
  "name": "Alice Johnson Updated",
  "email": "alice.new@example.com",
  "role": "superadmin"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice Johnson Updated",
    "email": "alice.new@example.com",
    "role": "superadmin"
  }
}
```

#### DELETE /api/users/:id
Delete a user.

**Parameters:**
- `id` (path parameter): User ID

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### Task Endpoints

#### GET /api/tasks
Get all tasks with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by task status (e.g., "pending", "in-progress", "completed")
- `userId` (optional): Filter by user ID

**Examples:**
- `/api/tasks` - Get all tasks
- `/api/tasks?status=pending` - Get all pending tasks
- `/api/tasks?userId=1` - Get all tasks for user ID 1
- `/api/tasks?status=in-progress&userId=1` - Get in-progress tasks for user ID 1

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "status": "in-progress",
      "userId": 1
    },
    {
      "id": 2,
      "title": "Review pull requests",
      "description": "Review pending PRs",
      "status": "pending",
      "userId": 2
    }
  ]
}
```

#### GET /api/tasks/:id
Get a specific task by ID.

**Parameters:**
- `id` (path parameter): Task ID

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "in-progress",
    "userId": 1
  }
}
```

**Response (Not Found - 404):**
```json
{
  "success": false,
  "error": "Task not found"
}
```

#### POST /api/tasks
Create a new task.

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description here",
  "status": "pending",
  "userId": 1
}
```

**Required fields:** `title`, `userId`  
**Optional fields:** `description`, `status` (defaults to "pending")

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "New Task",
    "description": "Task description here",
    "status": "pending",
    "userId": 1
  }
}
```

#### PUT /api/tasks/:id
Update an existing task.

**Parameters:**
- `id` (path parameter): Task ID

**Request Body (all fields optional):**
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "completed",
  "userId": 2
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Task Title",
    "description": "Updated description",
    "status": "completed",
    "userId": 2
  }
}
```

#### DELETE /api/tasks/:id
Delete a task.

**Parameters:**
- `id` (path parameter): Task ID

**Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

or for lists:

```json
{
  "success": true,
  "count": 10,
  "data": [ /* array of items */ ]
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200 OK` - Successful GET, PUT, or DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Examples

### Using cURL

#### Get all users:
```bash
curl http://localhost:3000/api/users
```

#### Create a new user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"user"}'
```

#### Update a user:
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson Updated"}'
```

#### Delete a user:
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

#### Get tasks filtered by status:
```bash
curl "http://localhost:3000/api/tasks?status=pending"
```

### Using JavaScript (Fetch API)

```javascript
// Get all users
fetch('http://localhost:3000/api/users')
  .then(response => response.json())
  .then(data => console.log(data));

// Create a new task
fetch('http://localhost:3000/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'New Task',
    description: 'Task description',
    userId: 1
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

## License

MIT
