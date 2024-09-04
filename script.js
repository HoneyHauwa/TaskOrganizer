document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
});

let selectedDate = null;
let tasks = {};

function generateCalendar() {
    const calendar = document.querySelector('.calendar');
    calendar.innerHTML = ''; // Clear existing calendar days

    for (let day = 1; day <= 31; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;

        dayElement.addEventListener('click', () => {
            if (selectedDate) {
                selectedDate.classList.remove('selected');
            }
            selectedDate = dayElement;
            selectedDate.classList.add('selected');
            document.getElementById('selected-date').textContent = `Tasks for ${day}`;
            loadTasks(day);
        });

        calendar.appendChild(dayElement);
    }
}

function addTask() {
    if (!selectedDate) {
        alert('Please select a day first.');
        return;
    }

    const day = selectedDate.textContent;
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Task cannot be empty.');
        return;
    }

    if (!tasks[day]) {
        tasks[day] = [];
    }

    tasks[day].push(taskText);
    taskInput.value = '';
    loadTasks(day);
}

function loadTasks(day) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks

    if (tasks[day]) {
        tasks[day].forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task;
            const deleteButton = document.createElement('span');
            deleteButton.textContent = 'X';
            deleteButton.onclick = () => deleteTask(day, index);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
        });
    }
}

function deleteTask(day, index) {
    tasks[day].splice(index, 1);
    loadTasks(day);
}
