var records = [
    // { title: 'Create ATM', description: 'create a ATM machine', dueDate: '23/2/2024', priority: 'low' },
];
window.onload = function () {
    records.push();
    updateTable();
}
var edit_id;

function addRecord() {
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const dueDate = document.getElementById('dueDateInput').value;
    const priority = document.getElementById('priorityInput').value;

    if (title === "" || description === "" || dueDate === "" || priority === "") {
        document.getElementById('completeError').innerHTML = 'complete the Information !';
        return;
    }

    const record = { title, description, dueDate, priority };
    records.push(record);

    updateTable();
    saveToLocalStorage();
    clearForm();
}
function updateInfo() {
    const Usertitle = document.getElementById('titleInput').value;
    const Userdescription = document.getElementById('descriptionInput').value;
    const UserdueDate = document.getElementById('dueDateInput').value;
    const Userpriority = document.getElementById('priorityInput').value;

    let recordObject = { Usertitle, Userdescription, UserdueDate, Userpriority };

    records[edit_id].title = Usertitle;
    records[edit_id].description = Userdescription;
    records[edit_id].dueDate = UserdueDate;
    records[edit_id].priority = Userpriority;
    updateTable();
    saveToLocalStorage();
    clearForm();
}
function updateTable() {
    const tableBody = document.getElementById('recordsTableBody');
    tableBody.innerHTML = '';

    records.forEach((record, id) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${record.title}</h5>
                <p class="card-text"><strong class="d-table">Description :</strong> ${record.description}</p>
                <p class="card-text"><strong>Due Date:</strong> ${record.dueDate}</p>
                <p class="card-text"><strong>Priority:</strong> ${record.priority}</p>
                <button class="btn btn-warning btn-sm" onclick="editRecord(${id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteRecord(${record.id})">Delete</button>
            </div>
        </div>`;
    });

}
function editRecord(id) {
    console.log(id)
    edit_id = id
    const record = records[id];
    document.getElementById('titleInput').value = record.title;
    document.getElementById('descriptionInput').value = record.description;
    document.getElementById('dueDateInput').value = record.dueDate;
    document.getElementById('priorityInput').value = record.priority;

    updateTable();
    saveToLocalStorage();
}
function deleteRecord(id) {
    records = records.filter(record => record.id !== id);

    updateTable();
    saveToLocalStorage();
}
function clearForm() {
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('dueDateInput').innerHTML = '';
    // document.getElementById('priorityInput').innerHTML = '';

}
function saveToLocalStorage() {
    localStorage.setItem('records', JSON.stringify(records));
}
function loadFromLocalStorage() {
    const storedRecords = localStorage.getItem('records');
    if (storedRecords) {
        records = JSON.parse(storedRecords);
        updateTable();
    }
}
loadFromLocalStorage();