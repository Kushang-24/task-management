document.addEventListener('DOMContentLoaded', () => {
    displayTasks();
});

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if (title && description && dueDate && priority) {
        const task = new Task(title, description, dueDate, priority);
        addTask(task);
        document.getElementById('taskForm').reset();
    } else {
        alert("All fields are required!");
    }
});

function addTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const card = `
  <div class="card mb-3 me-3 col-3">
    <div class="card-body">
      <h5 class="fw-bold text-uppercase card-title ${isSearchedTask(task.title) ? 'task-title-searched' : ''}">${task.title}</h5>
      <p class="card-text"><strong>Description : </strong> ${task.description}</p>
      <h6 class="card-subtitle mb-2"><strong> Due Date :</strong> ${task.dueDate}</h6>
      <p class="card-text"><strong> Priority :</strong> ${task.priority}</p>
      <button class="btn btn-warning" onclick="editTask(${index})">Edit</button>
      <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
    </div>
  </div>
`;
        taskList.innerHTML += card;
    });
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks[index];
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('priority').value = task.priority;
    deleteTask(index);
}

function isSearchedTask(title) {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    return title.toLowerCase().includes(searchInput);
}

function searchTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchInput));
    if (filteredTasks.length > 0) {
        filteredTasks.forEach(task => {
            const card = `
    <div class="card mb-3 col-3">
      <div class="card-body">
        <h5 class="card-title task-title-searched">${task.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Due Date: ${task.dueDate}</h6>
        <p class="card-text">Description: ${task.description}</p>
        <p class="card-text">Priority: ${task.priority}</p>
      </div>
    </div>
  `;
            taskList.innerHTML += card;
        });
    } else {
        alert("No tasks found with the given title.");
    }
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    displayTasks();
}