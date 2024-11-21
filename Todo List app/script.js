// Select DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
const renderTasks = () => {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `todo-item ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <span>${task.description}</span>
      <div class="actions">
        <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
};

// Add a new task
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = {
    description: todoInput.value.trim(),
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  todoInput.value = '';
});

// Toggle task completion
const toggleComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
};

// Edit a task
const editTask = (index) => {
  const newDescription = prompt('Edit Task', tasks[index].description);
  if (newDescription) {
    tasks[index].description = newDescription.trim();
    saveTasks();
    renderTasks();
  }
};

// Delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};

// Save tasks to local storage
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Initial render
renderTasks();
