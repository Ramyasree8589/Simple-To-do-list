/*const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  // Create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");

  // Task text
  const span = document.createElement("span");
  span.textContent = taskText;

  // Delete button
  //const deleteBtn = document.createElement("button");
  //deleteBtn.innerHTML = "🗑️"; // ✅ trash icon
  //deleteBtn.classList.add("delete-btn");
  //deleteBtn.addEventListener("click", () => li.remove());
  // Delete icon
  const deleteIcon = document.createElement("span");
  deleteIcon.innerHTML = "🗑️"; 
  deleteIcon.classList.add("delete-icon");
  deleteIcon.style.cursor = "pointer";
  deleteIcon.addEventListener("click", () => li.remove());

  // Append checkbox + text + delete button
  li.appendChild(checkbox);
  li.appendChild(span);
  //li.appendChild(deleteBtn);
  li.appendChild(deleteIcon);
  taskList.appendChild(li);

  // ✅ Clear & refocus input
  taskInput.value = "";
  taskInput.focus();

}



function clearAll() {
  const taskList = document.getElementById("taskList");

  if (taskList.children.length === 0) {
    alert("No tasks to clear!");
    return;
  }

  const confirmClear = confirm("Are you sure you want to clear all tasks?");
  if (confirmClear) {
    taskList.innerHTML = ""; // remove all tasks
  }
}

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});*/

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks when page loads
window.onload = loadTasks;

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = { text: taskText, completed: false };
  addTaskToDOM(task);
  saveTask(task);

  taskInput.value = "";
  taskInput.focus();
}

function addTaskToDOM(task) {
  const li = document.createElement("li");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.completed;

  // Text
  const span = document.createElement("span");
  span.textContent = task.text;
  if (task.completed) {
    span.style.textDecoration = "line-through";
    span.style.color = "gray";
  }

  // Delete icon (Font Awesome)
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash", "delete-icon");

  // ✅ Events
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "#000";
    }
    updateTaskInStorage(task.text, task.completed);
  });

  deleteIcon.addEventListener("click", () => {
    li.remove();
    removeTask(task.text);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteIcon);
  taskList.appendChild(li);
}

// Save a task
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove a task
function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task status
function updateTaskInStorage(taskText, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) =>
    t.text === taskText ? { ...t, completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from storage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task));
}

// Clear all tasks
function clearAll() {
  if (taskList.children.length === 0) {
    alert("No tasks to clear!");
    return;
  }
  const confirmClear = confirm("Are you sure you want to clear all tasks?");
  if (confirmClear) {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
  }
}

// ✅ Add task when pressing Enter
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});


