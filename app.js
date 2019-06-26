// Define 
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById('task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  // Remove task 
  taskList.addEventListener('click', removeTask);
  // Clear task 
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks 
  filter.addEventListener('keyup', filterTasks);
}

// addTask
function addTask(e) {
  e.preventDefault();

  if (taskInput.value === '') {
    return alert("Add a task");
  }

  // create list element
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.innerText = taskInput.value;

  // create link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = `<i class="fas fa-trash"></i>`;

  // Append link to li
  li.appendChild(link);

  // Store in local storage
  saveTask(taskInput.value);

  // Append li to UL
  taskList.appendChild(li);

  // Clear new task input field
  taskInput.value = '';
}

// removeTask
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// clearTasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

// filterTasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent.toLowerCase();

    if (item.indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}

// saveTask
function saveTask(task) {
  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}