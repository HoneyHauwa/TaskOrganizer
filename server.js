// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// // Allow cross-origin requests (for development purposes)
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// // Simulating database with a JSON file
// let tasks = [];
// const tasksFilePath = './tasks.json';

// // Load tasks from file
// const loadTasks = () => {
//   if (fs.existsSync(tasksFilePath)) {
//     const data = fs.readFileSync(tasksFilePath);
//     tasks = JSON.parse(data);
//   }
// };

// // Save tasks to file
// const saveTasks = () => {
//   fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
// };

// loadTasks();

// // Get all tasks
// app.get('/tasks', (req, res) => {
//   res.json(tasks);
// });

// // Add a new task
// app.post('/tasks', (req, res) => {
//   const task = { id: Date.now(), text: req.body.text };
//   tasks.push(task);
//   saveTasks();
//   res.status(201).json(task);
// });


// app.delete('/tasks/:id', (req, res) => {
//     console.log('Delete request received for ID:', req.params.id);  // Check if this is logged
//     const taskId = Number(req.params.id);
//     tasks = tasks.filter(task => task.id !== taskId);
//     saveTasks();
//     res.status(204).send();
//   });
  

// app.listen(port, () => {
//   console.log(`Task organizer backend listening at http://localhost:${port}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');  // Import cors
// const fs = require('fs');
// const app = express();
// const port = 3000;

// // CORS configuration
// const corsOptions = {
//   origin: '*',  // Allow all origins
//   methods: ['GET', 'POST', 'DELETE'],  // Allow these methods
//   allowedHeaders: ['Content-Type'],
// };

// app.use(cors(corsOptions));  // Apply CORS middleware
// app.use(bodyParser.json());

// let tasks = [];
// const tasksFilePath = './tasks.json';

// // Load tasks from file
// const loadTasks = () => {
//     if (fs.existsSync(tasksFilePath)) {
//         const data = fs.readFileSync(tasksFilePath);
//         tasks = JSON.parse(data);
//     }
// };

// // Save tasks to file
// const saveTasks = () => {
//     fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
// };

// loadTasks();

// // Get tasks for a specific date
// app.get('/tasks', (req, res) => {
//     const date = req.query.date;
//     if (date) {
//         const tasksForDate = tasks.filter(task => task.date === date);
//         res.json(tasksForDate);
//     } else {
//         res.json([]);  // If no date is provided, return an empty array
//     }
// });

// // Add a new task
// app.post('/tasks', (req, res) => {
//     const { text, date } = req.body;
//     if (!text || !date) {
//         return res.status(400).json({ error: 'Task text and date are required' });
//     }
//     const task = { id: Date.now(), text, date };
//     tasks.push(task);
//     saveTasks();
//     res.status(201).json(task);
// });

// // Delete a task
// app.delete('/tasks/:id', (req, res) => {
//     const taskId = Number(req.params.id);
//     console.log('Task ID to delete:', taskId);
//     tasks = tasks.filter(task => task.id !== taskId);
//     saveTasks();
//     res.status(204).send();
// });

// app.listen(port, () => {
//     console.log(`Task organizer backend listening at http://localhost:${port}`);
// });




const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors
const fs = require('fs');
const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],  // Allow these methods
  allowedHeaders: ['Content-Type'],
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

// Simulated database with a JSON file
let tasks = [];
const tasksFilePath = './tasks.json';

// Load tasks from file
const loadTasks = () => {
    if (fs.existsSync(tasksFilePath)) {
        const data = fs.readFileSync(tasksFilePath);
        tasks = JSON.parse(data);
    }
};

// Save tasks to file
const saveTasks = () => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

loadTasks();

// Get tasks for a specific date
app.get('/tasks', (req, res) => {
    const date = req.query.date;
    if (date) {
        const tasksForDate = tasks.filter(task => task.date === date);
        res.json(tasksForDate);
    } else {
        res.json([]);  // If no date is provided, return an empty array
    }
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { text, date } = req.body;
    if (!text || !date) {
        return res.status(400).json({ error: 'Task text and date are required' });
    }
    const task = { id: Date.now(), text, date };
    tasks.push(task);
    saveTasks();
    res.status(201).json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);  // Convert ID to number
    console.log('Task ID to delete:', taskId);
    console.log('Existing tasks:', tasks);  // Log existing tasks before deletion
    
    const originalLength = tasks.length;
    tasks = tasks.filter(task => task.id !== taskId);  // Filter out the task by ID
    const newLength = tasks.length;
    
    if (newLength < originalLength) {
        console.log('Task deleted successfully.');
        saveTasks();
        res.status(204).send();
    } else {
        console.log('Task not found.');
        res.status(404).json({ error: 'Task not found' });
    }
});

app.listen(port, () => {
    console.log(`Task organizer backend listening at http://localhost:${port}`);
});
