// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const modal = document.getElementById(`myModal`);
const addBtn = document.getElementById(`myBtn`);
const closeModal = document.getElementsByClassName(`close`)[0];
const toDo = document.getElementById(`todo-cards`);
const inProgress = document.getElementById(`in-progress-cards`);
const done = document.getElementById(`done-cards`);
const submitBtn = document.getElementById(`submit-btn`);
const deleteBtn = document.getElementById(`delete-btn`);

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const taskId = `id` + new Date().getTime();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const card = $(`<div class="card"></div>`);
  const title = $(`<h2 class="card-header"></h2>`);
  const infoContainer = $(`<div class="card-body"></div>`);
  const description = $(`<p class="card-title"></p>`);
  const dueby = $(`<p class="card-text"></p>`);
  const delBtn = $(`<button class="btn btn-danger" id="delete-btn">Delete</button>`);

  infoContainer.append(description, dueby, delBtn);
  card.append(title, infoContainer);
  toDo.append(card);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  const taskTitle = $(`#taskTitle`).value
  const dueDate = $(`#datepicker`).value
  const taskDescription = $(`#taskDescription`).value
  event.preventDefault()

  if (taskTitle.length == 0) {
    errorMessage();
    return;
  } else if (dueDate.length == 0) {
    errorMessage();
    return;
  } else if (taskDescription.length == 0) {
    errorMessage();
    return;
  }

  const taskContent = {
    title: taskTitle,
    date: dueDate,
    description: taskDescription,
  };

  let taskArray = [];

  taskArray.push(taskContent);

  localStorage.setItem(`taskArray`, JSON.stringify(taskArray))

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

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
  
};
