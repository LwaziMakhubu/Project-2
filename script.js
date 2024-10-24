document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskButton').addEventListener('click', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText) {
        createTaskElement(taskText, false);
        saveTaskToLocalStorage(taskText, false);
        taskInput.value = '';
    }
}

function createTaskElement(taskText, completed) {
    const li = document.createElement('li');
    li.textContent = taskText;
    if (completed) {
        li.classList.add('completed');
    }

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove');
    removeButton.onclick = function() {
        li.remove();
        removeTaskFromLocalStorage(taskText);
    };

    li.onclick = function() {
        li.classList.toggle('completed');
        toggleTaskCompletionInLocalStorage(taskText);
    };

    li.appendChild(removeButton);
    document.getElementById('taskList').appendChild(li);
}

function saveTaskToLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
}