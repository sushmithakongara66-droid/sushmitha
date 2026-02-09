const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user' }
];

let tasks = [
  { id: 1, title: 'Complete project documentation', description: 'Write comprehensive API docs', status: 'in-progress', userId: 1 },
  { id: 2, title: 'Review pull requests', description: 'Review pending PRs', status: 'pending', userId: 2 }
];

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sushmitha API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      tasks: '/api/tasks',
      health: '/api/health',
      docs: '/api/docs'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'Sushmitha API',
      version: '1.0.0',
      description: 'A RESTful API for managing users and tasks'
    },
    paths: {
      '/api/users': {
        get: { summary: 'Get all users', tags: ['Users'] },
        post: { summary: 'Create a new user', tags: ['Users'] }
      },
      '/api/users/{id}': {
        get: { summary: 'Get user by ID', tags: ['Users'] },
        put: { summary: 'Update user', tags: ['Users'] },
        delete: { summary: 'Delete user', tags: ['Users'] }
      },
      '/api/tasks': {
        get: { summary: 'Get all tasks', tags: ['Tasks'] },
        post: { summary: 'Create a new task', tags: ['Tasks'] }
      },
      '/api/tasks/{id}': {
        get: { summary: 'Get task by ID', tags: ['Tasks'] },
        put: { summary: 'Update task', tags: ['Tasks'] },
        delete: { summary: 'Delete task', tags: ['Tasks'] }
      }
    }
  });
});

// ===== USER ENDPOINTS =====

// GET all users
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  res.json({
    success: true,
    data: user
  });
});

// POST create new user
app.post('/api/users', (req, res) => {
  const { name, email, role } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email,
    role: role || 'user'
  };

  users.push(newUser);
  res.status(201).json({
    success: true,
    data: newUser
  });
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  const { name, email, role } = req.body;
  users[userIndex] = {
    ...users[userIndex],
    ...(name && { name }),
    ...(email && { email }),
    ...(role && { role })
  };

  res.json({
    success: true,
    data: users[userIndex]
  });
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  users.splice(userIndex, 1);
  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// ===== TASK ENDPOINTS =====

// GET all tasks
app.get('/api/tasks', (req, res) => {
  const { status, userId } = req.query;
  let filteredTasks = tasks;

  if (status) {
    filteredTasks = filteredTasks.filter(t => t.status === status);
  }
  if (userId) {
    filteredTasks = filteredTasks.filter(t => t.userId === parseInt(userId));
  }

  res.json({
    success: true,
    count: filteredTasks.length,
    data: filteredTasks
  });
});

// GET task by ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }
  res.json({
    success: true,
    data: task
  });
});

// POST create new task
app.post('/api/tasks', (req, res) => {
  const { title, description, status, userId } = req.body;
  
  if (!title || !userId) {
    return res.status(400).json({
      success: false,
      error: 'Title and userId are required'
    });
  }

  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title,
    description: description || '',
    status: status || 'pending',
    userId
  };

  tasks.push(newTask);
  res.status(201).json({
    success: true,
    data: newTask
  });
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  const { title, description, status, userId } = req.body;
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...(title && { title }),
    ...(description !== undefined && { description }),
    ...(status && { status }),
    ...(userId && { userId })
  };

  res.json({
    success: true,
    data: tasks[taskIndex]
  });
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  tasks.splice(taskIndex, 1);
  res.json({
    success: true,
    message: 'Task deleted successfully'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api/docs`);
});
