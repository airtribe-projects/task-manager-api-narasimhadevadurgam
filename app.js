const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load tasks from task.json
const data = require('./task.json');
let tasks = data.tasks;
let nextId = 16;

// GET all tasks
app.get('/tasks', (req, res) => {
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === 'true';
    const filtered = tasks.filter(function (task) {
      return task.completed === completed;
    });
    return res.json(filtered);
  }
  res.json(tasks);
});

// GET task by id
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(function (task) {
    return task.id === id;
  });

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// CREATE a new task
app.post('/tasks', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const completed = req.body.completed;

  if (!title || description === undefined || completed === undefined) {
    return res.status(400).json({ error: 'title, description, and completed are required' });
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be true or false' });
  }

  const newTask = {
    id: nextId,
    title: title,
    description: description,
    completed: completed
  };
  nextId = nextId + 1;

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// UPDATE a task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(function (task) {
    return task.id === id;
  });

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const title = req.body.title;
  const description = req.body.description;
  const completed = req.body.completed;

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be true or false' });
  }

  if (title !== undefined) {
    task.title = title;
  }
  if (description !== undefined) {
    task.description = description;
  }
  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json(task);
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(function (task) {
    return task.id === id;
  });

  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

if (require.main === module) {
  app.listen(port, (err) => {
    if (err) {
      return console.log('Something bad happened', err);
    }
    console.log('Server is listening on ' + port);
  });
}

module.exports = app;
