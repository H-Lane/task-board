// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const modal = document.getElementById(`myModal`);
const addBtn = document.getElementById(`myBtn`);
const closeModal = document.getElementsByClassName(`close`)[0];
const toDo = document.getElementById(`todo-cards`);
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
function createTaskCard(task) {
  const taskId = generateTaskId()
  const card = $(`<div class="card to-do"></div>`);
  const title = $(`<h2 class="card-header"></h2>`);
  const infoContainer = $(`<div class="card-body"></div>`);
  const description = $(`<p class="card-title"></p>`);
  const dueby = $(`<p class="card-text"></p>`);
  const delBtn = $(
    `<button class="btn btn-danger" id="delete-btn">Delete</button>`
  );
  card.attr(`id`, taskId)

  infoContainer.append(description, dueby, delBtn);
  card.append(title, infoContainer);
  toDo.append(card);
  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskTitle = document.getElementById(`taskTitle`);
  const dueDate = document.getElementById(`datepicker`);
  const taskDescription = document.getElementById(`taskDescription`);

  // const taskTitle = $("#taskTitle")
  // const dueDate = $("#datepicker")
  // const taskDescription = $("#taskDescription")

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
  };

  taskList.push(taskContent);

  localStorage.setItem(`tasks`, JSON.stringify(taskList));

  // const taskCard = createTaskCard();
  // taskCard.title.textContent = taskTitle.value;
  // taskCard.description.textContent = taskDescription.value;
  // taskCard.dueby.textContent = dueDate.value;

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
}
