// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
const modal = document.getElementById(`myModal`);
const addBtn = document.getElementById(`myBtn`);
const closeModal = document.getElementsByClassName(`close`)[0];
const lanes = $(`.lane`);
const toDo = $(`#todo-cards`);
const inProgress = $(`#in-progress-cards`);
const done = $(`#done-cards`);
const submitBtn = $(`#submit-btn`);

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const taskId = `id` + new Date().getTime();
  return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(taskContent) {
  const card = $(`<div class="card draggable"></div>`);
  const title = $(`<h2 class="card-header"></h2>`);
  const infoContainer = $(`<div class="card-body"></div>`);
  const description = $(`<p class="card-title"></p>`);
  const dueBy = $(`<p class="card-text"></p>`);
  const delBtn = $(
    `<button class="btn btn-danger" data-id="${taskContent.id}">Delete</button>`
  );

  delBtn.click(handleDeleteTask);

  title.text(taskContent.title);
  description.text(taskContent.description);
  dueBy.text(taskContent.date);

  infoContainer.append(description, dueBy, delBtn);
  card.append(title, infoContainer);
  toDo.append(card);
  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  //Make sure to .empty the columns before I render the new elements
  // toDo.empty();
  // inProgress.empty();
  // done.empty();

  $(`.draggable`).draggabl e();

  

  for (const item in taskList) {
    if (item.state === `to-do`) {
      createTaskCard(taskContent);
    } else {
      if (item.state === `in-progress`) {
        createTaskCard(taskContent);
        inProgress.append(card);
      } else {
        if (item.state === `done`) {
          createTaskCard(taskContent);
          done.append(card);
        }
      }
    }
  }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  const taskTitle = $(`#taskTitle`);
  const dueDate = $(`#datepicker`);
  const taskDescription = $(`#taskDescription`);

  if (taskTitle.val().length == 0) {
    errorMessage();
    return;
  } else if (dueDate.val().length == 0) {
    errorMessage();
    return;
  } else if (taskDescription.val().length == 0) {
    errorMessage();
    return;
  }

  const taskContent = {
    title: taskTitle.val(),
    date: dueDate.val(),
    description: taskDescription.val(),
    id: generateTaskId(),
    state: "to-do",
  };

  taskList.push(taskContent);

  localStorage.setItem(`tasks`, JSON.stringify(taskList));

  createTaskCard(taskContent);
  return taskList;
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // const deletable = event.target
  taskList = taskList.filter(function (taskContent) {
    return taskContent.id !== id;
  });
}

// Todo: create a function to handle dropping a task into a new status lane
drop: function handleDrop(event, ui) {
  //create a if then conditional to check the event.target.id to determine which lane it was dropped in and change the state key on the object accordingly
  //check if the state key of the object is done and if it is change the class of the object to change the color
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  submitBtn.click(handleAddTask);
  // lanes.drop(handleDrop)

  $(".lanes").droppable({
    accept: ".draggable",
    classes: {
      "ui-droppable-active": "ui-state-active",
      "ui-droppable-hover": "ui-state-hover",
    },
  });

  $(function () {
    $("#datepicker").datepicker();
  });
});

function errorMessage() {
  alert("Please complete all empty forms before submitting.");
}
