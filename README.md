# Todo Manager

A simple yet powerful Angular Todo Manager built with Standalone Components, Angular Signals, Reactive Forms, and HttpClient.
Tasks are stored in a JSON API (json-server) with localStorage persistence for fallback.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

# Features

✅ Add, Edit, Delete tasks
✅ Set Due Date & Priority (High, Medium, Low)
✅ Mark tasks as Completed / Active
✅ Filter by All / Active / Completed
✅ Drag & Drop Reorder (Angular CDK)
✅ Double-click Edit + Save/Cancel
✅ Clear all tasks in one click
✅ Uses json-server API (http://localhost:3000/tasks)
✅ Data also cached in localStorage
✅ Responsive UI with Bootstrap 5

# Technologies Used

Angular 17+ (Standalone Components + Signals)

TypeScript

Angular CDK (DragDrop)

Bootstrap 5

JSON Server (Fake REST API)

LocalStorage

# Project Structure

```bash
src/
 ├─ app/
 │  ├─ todo/                       # Standalone Todo UI
 │  │   ├─ todo.component.ts
 │  │   ├─ todo.component.html
 │  │   └─ todo.component.css
 │  ├─ services/
 │  │   └─ todoapi.service.ts      # HttpClient + Signals + localStorage
 │  ├─ app.component.ts
 │  └─ app.component.html
 ├─ assets/
 ├─ index.html
 └─ main.ts
```

# Setup & Installation

Clone Repo

```bash
git clone https://github.com/<your-username>/todo-manager.git
cd todo-manager
```
Install Dependencies

```bash
npm install
```
Start JSON Server (Fake API)

Create a file db.json in root:
```bash
{
  "tasks": []
}
```
Run server:
```bash
npx json-server --watch db.json --port 3000
```

API available at 👉 http://localhost:3000/tasks

Run Angular App

```bash
ng serve
```

Open in browser: 👉 http://localhost:4200/

# Live Demo Link

https://todolist-45.web.app

# Notes

Double-click on a task to edit inline.

Tasks can be reordered by drag & drop.

Priority badges: 🔥 High | ⚡ Medium | 🌿 Low.

API operations (add, update, delete, clear) are synced with json-server.

LocalStorage keeps a backup of your tasks.
