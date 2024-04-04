// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
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
  const card = $(
    `<div class="card draggable task-card" data-id="${taskContent.id}"></div>`
  );
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

  const dueDate = dayjs(taskContent.date);
  const today = dayjs();
  let difference = today.diff(dueDate, `day`);

  if (difference === 0) {
    card.addClass(`due-today`);
  } else if (difference > 0) {
    card.addClass(`overdue`);
  }

  infoContainer.append(description, dueBy, delBtn);
  card.append(title, infoContainer);
  if (taskContent.state === `to-do`) {
    toDo.append(card);
  } else if (taskContent.state === `in-progress`) {
    inProgress.append(card);
  } else if (taskContent.state === `done`) {
    card.addClass(`done`);
    done.append(card);
  }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  toDo.empty();
  inProgress.empty();
  done.empty();

  /*
  switch(item.state) 
  case 'to-do':
    // what happens then?
    break;
    case 'in-progress'
    */

  console.log("Current Tasks: ", taskList);

  // Issue here is that im trying to append the object from the task list array. How do i make it append the card itself
  for (const item of taskList) {
    createTaskCard(item);
  }

  $(`.draggable`).draggable({
    snap: `#in-progress-cards, #done-cards, #todo-cards`,
    snapMode: `inner`,
    stack: `.swim-lanes`,
    appendTo: `.lane`,
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
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
  location.reload();
  return taskList;
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  //console.log("THis: ", $(this))
  console.log("ID: ", $(this).attr("data-id"));
  let dataId = $(this).attr("data-id");
  //console.log("ID: ", typeof $(this).attr('data-id'))
  // const deletable = event.target
  // console.log("Before Tasks: ", taskList)

  taskList = taskList.filter(function (taskContent) {
    // console.log("Task: ", taskContent);
    // console.log("Type: ", typeof taskContent.id);
    return taskContent.id !== dataId;
  });

  //console.log("After Tasks: ", taskList)
  // Once we Modifiy our TASK LIST we need to UPDATE the datastore
  localStorage.setItem(`tasks`, JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  console.log("UI: ", ui);
  console.log("UI object: ", ui.draggable[0]);

  const taskId = event.target.id;
  const taskClass = ui.draggable[0].classList;
  const uniqueId = ui.draggable[0].dataset.id;

  console.log("Dropping: ", taskId);
  if (taskId === `to-do`) {
    taskClass.remove(`done`, `in-progress`, `to-do`);
    taskClass.add(`to-do`);
    event.target.id = `to-do`;
  } else if (taskId === `in-progress`) {
    taskClass.remove(`done`, `in-progress`, `to-do`);
    taskClass.add(`in-progress`);
    event.target.id = `in-progress`;
  } else if (taskId === `done`) {
    taskClass.remove(`done`, `in-progress`, `to-do`, `overdue`, `due-today`);
    taskClass.add(`done`);
    event.target.id = `done`;
  }

  for (const item of taskList) {
    if (item.id === uniqueId) {
      item.state = taskId;
    }
  }

  localStorage.setItem(`tasks`, JSON.stringify(taskList));

  renderTaskList();
  //check if the state key of the object is done and if it is change the class of the object to change the color
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  submitBtn.click(handleAddTask);

  $(".lane").droppable({
    accept: ".draggable",
    drop: handleDrop,
  });

  $(function () {
    $("#datepicker").datepicker();
  });
});

function errorMessage() {
  alert("Please complete all empty forms before submitting.");
}
