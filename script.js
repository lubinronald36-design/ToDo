body {
  background-color: #f2f2f2;
  font-family: Arial, sans-serif;
}

h1 {
  color: #00698f;
}
// Get the list from Local Storage
const storedList = localStorage.getItem('todoList');
const todoList = storedList ? JSON.parse(storedList) : [];

// Update the list in Local Storage when items are added or removed
function addTask(task) {
  todoList.push(task);
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function deleteTask(index) {
  todoList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
}// Get the task input and list elements
const taskInput = document.getElementById('task');
const taskList = document.getElementById('tasks');

// Initialize an empty array to store tasks
let tasks = [];

// Function to add task to the list
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const task = {
      text: taskText,
      completed: false
    };
    tasks.push(task);
    renderTaskList();
    taskInput.value = '';
    saveTasks();
  }
}

// Function to render the task list
function renderTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.innerHTML = `
      <input type="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
      <span>${task.text}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(taskElement);
  });
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTaskList();
  }
}

// Add event listener to the add button
document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault();
  addTask();
});

// Add event listener to the task list for deletion and completion
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    renderTaskList();
    saveTasks();
  } else if (e.target.type === 'checkbox') {
    const index = e.target.dataset.index;
    tasks[index].completed = e.target.checked;
    renderTaskList();
    saveTasks();
  }
});

// Load tasks from local storage
loadTasks()
