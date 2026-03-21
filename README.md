# Task Manager API

A RESTful API for managing tasks built with Node.js and Express.js using in-memory data storage.

## Setup

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks?completed=true | Filter tasks by completion status |
| GET | /tasks/:id | Get a task by ID |
| POST | /tasks | Create a new task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

## Request Body (POST / PUT)

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

- `title` (string, required) — must be a non-empty string
- `description` (string, required) — task description
- `completed` (boolean, required) — task completion status

## Error Handling

- `400` — Invalid input (missing required fields, wrong types)
- `404` — Task not found
- `201` — Task created successfully
- `200` — Task retrieved, updated, or deleted successfully

## Project Structure

```
task-manager-api/
├── test/
│   └── server.test.js
├── app.js
├── task.json
├── package.json
└── README.md
```

## Running Tests

```bash
npm run test
```
