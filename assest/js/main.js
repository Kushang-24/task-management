function addTask(event) {
    event.preventDefault();

    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const dueDate = document.getElementById('dueDateInput').value;
    const priority = document.getElementById('priorityInput').value;

    if (!title || !dueDate) {
        alert('Please provide a title and due date for the task.');
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        priority
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById('taskForm').reset();
    displayTasks();
}
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><strong>Title :</strong> ${task.title}</h5>
                    <p class="card-text d-grid"><strong>Description :</strong> ${task.description}</p>
                    <p class="card-text"><strong>Due Date:</strong> ${task.dueDate}</p>
                    <p class="card-text"><strong>Priority:</strong> ${task.priority}</p>
                    <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}
function updateInfo() {
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('descriptionInput').value;
    let dueDate = document.getElementById('dueDateInput').value;
    let priority = document.getElementById('priorityInput').value;

    let recordObject = { title, description, dueDate, priority };
    let upadtew = tasks.findIndex((val) => {
        return val.title == recordObject.title;

    })
    tasks[upadtew]=recordObject;
    // let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasks();
    // records[edit_id].name = Username;
    // records[edit_id].age = Userage;
    // records[edit_id].email = Useremail;
    // updateTable();
    // saveToLocalStorage();
}
function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id === id);
    // console.log(taskIndex);
    document.getElementById('titleInput').value = tasks[taskIndex].title;
    document.getElementById('descriptionInput').value = tasks[taskIndex].description;
    document.getElementById('dueDateInput').value = tasks[taskIndex].dueDate;
    document.getElementById('priorityInput').value = tasks[taskIndex].priority;
    // if (taskIndex !== -1) {
    //     const editedTask = tasks[taskIndex];
    //     console.log(editedTask);
    // }
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function filterTasks(priority) {
    let filteredTasks = [];
    if (priority === 'all') {
        filteredTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    } else {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        filteredTasks = tasks.filter(task => task.priority === priority);
    }
    displayFilteredTasks(filteredTasks);
}

function displayFilteredTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.description}</p>
                    <p class="card-text"><strong>Due Date:</strong> ${task.dueDate}</p>
                    <p class="card-text"><strong>Priority:</strong> ${task.priority}</p>
                    <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

document.getElementById('taskForm').addEventListener('submit', addTask);
displayTasks();