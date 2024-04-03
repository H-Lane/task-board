// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const modal = document.getElementById(`myModal`);
const addBtn = document.getElementById(`myBtn`);
const closeModal = document.getElementsByClassName(`close`)[0];
const toDo = $(`#todo-cards`);
const inProgress = document.getElementById(`in-progress-cards`);
const done = document.getElementById(`done-cards`);
const submitBtn = $(`#submit-btn`);
const deleteBtn = $(`#delete-btn`);

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const taskId = `id` + new Date().getTime();
  return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(taskContent) {
  const card = $(`<div class="card``"></div>`);
  const title = $(`<h2 class="card-header"></h2>`);
  const infoContainer = $(`<div class="card-body"></div>`);
  const description = $(`<p class="card-title"></p>`);
  const dueby = $(`<p class="card-text"></p>`);
  const delBtn = $(
    `<button class="btn btn-danger" id="delete-btn">Delete</button>`
  );
  title.text(taskContent.title);
  description.text(taskContent.description);
  dueby.text(taskContent.date);

  infoContainer.append(description, dueby, delBtn);
  card.append(title, infoContainer);
  toDo.append(card);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskTitle = document.getElementById(`taskTitle`);
  const dueDate = document.getElementById(`datepicker`);
  const taskDescription = document.getElementById(`taskDescription`);

  if (taskTitle.value.length == 0) {
    errorMessage();
    return;
  } else if (dueDate.value.length == 0) {
    errorMessage();
    return;
  } else if (taskDescription.value.length == 0) {
    errorMessage();
    return;
  }

  const taskContent = {
    title: taskTitle.value,
    date: dueDate.value,
    description: taskDescription.value,
    id: generateTaskId(),
    state: "to-do",
  };

  taskList.push(taskContent);

  localStorage.setItem(`tasks`, JSON.stringify(taskList));

  createTaskCard(taskContent);
  return taskList;
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(handleAddTask) {
  // event.preventDefault()
  // event.stopPropagation()
  // const deletable = event.target
  taskList = taskList.filter(function (taskContent) {
    return taskContent.id !== id;
  });
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  submitBtn.click(handleAddTask);
  deleteBtn.click(handleDeleteTask);

  $(function () {
    $("#datepicker").datepicker();
  });
});

function errorMessage() {
  alert("Please complete all empty forms before submitting.");
}
