const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const quoteDisplay = document.getElementById('quote-display');
const dateInput = document.getElementById('date-input');
fetchQuote();
loadData();

async function fetchQuote() {
    try {
        const response = await fetch('https://api.allorigins.win/raw?url=https://zenquotes.io/api/random');
        const data = await response.json();
        quoteDisplay.innerText = `"${data[0].q}" - ${data[0].a}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

function addTask() {
    const text = taskInput.value;
    const date = dateInput.value;
    const priority = document.getElementById('priority-input').value;

    if (text === '') return;

    const li = document.createElement('li');
    let priorityColor;
    if (priority === 'High'){
        priorityColor = '#ff4b2b';
    } else if (priority === 'Medium') {
        priorityColor = '#ffb400';
    } else {
        priorityColor = '#bb86fc';
    }
    li.style.borderLeft = `6px solid ${priorityColor}`;

    li.innerHTML = `
    <div class="task-content">
    <span class="task-text">${text}</span>
    <br>
    <small class="task-date" style="color: #bb86fc; display: block;">Due: ${date}</small>
    </div>
    <button class="delete-btn">X</button
    `;

    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        saveData();
    });

    li.addEventListener('click', () => {
        li.classList.toggle('completed-task');
        saveData();
    });

    taskList.appendChild(li);
    taskInput.value = '';
    saveData();
}

function saveData() {s
    localStorage.setItem('task', taskList.innerHTML);
}

function loadData() {
    taskList.innerHTML = localStorage.getItem('task') || '';
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function clearCompleted() {
    const completedTasks = document.querySelectorAll('.completed-task');

    completedTasks.forEach(task => {
        task.remove();
    });

    saveData();
}
