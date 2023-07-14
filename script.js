// getting values from id and class
const inputTask = document.querySelector('#input');
const taskList = document.getElementById('list');
const count = document.getElementById('taskCount');

// array to store the data of todolist.
let toDoList = [];

// it is event listener when ever we on the buttons in page and it do has we written in methods
document.addEventListener('click', handler);

// it is the function for function every event that we mention in html
function handler(e) {
  const target = e.target;
  if (target.className == 'fa fa-plus-circle add') {
    subButton();
  }
  if (target.className === 'fa fa-trash-o') {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  }
  else if (target.className === 'check') {
    const taskId = target.id;
    markDone(taskId);
    return;
  } else if (target.className === 'incomplete') {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = false
    }
    Data();

  } else if (target.className === 'completed') {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = true
    }
    Data();
  }
  else if (target.className === 'fa-solid fa-check-double dobCheck') {
    if (toDoList.length == 0) {
      return;
    }
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].done = true
    }
    Data();

  }
  else if (target.className === 'deltAll') {
    if (toDoList.length == 0) {
      return;
    }
    else {
      for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].done == true) {
          deleteTask(toDoList[i].id);
          return;
        }
      }
      Data();
    }
  }
}

// this button function is to add a tasks to list
function subButton() {
  let value = inputTask.value;
  if (value === '') {
    alert('Enter the task');
    return;
  }
  const task = {
    name: value,
    id: Date.now().toString(),
    done: false
  }
  addTask(task);
  inputTask.value = '';
}

// adding a task to the array
function addTask(task) {
  if (task) {
    toDoList.push(task);
    Data();
    alert("Task added.")
    return;
  }
  else {
    alert("Task Not added!");
  }
}

// to organise the data to add or delete from the list
function Data() {
  taskList.innerHTML = '';
  if (toDoList.length == 0) {
    alert("All tasks are completed")
  }
  for (let i = 0; i < toDoList.length; i++) {
    renderList(toDoList[i]);
  }
  count.innerHTML = toDoList.length;
}

// this function is to write inner html in the unordered list
function renderList(task) {
  const li = document.createElement('li');

  li.setAttribute('class', 'task');
  li.setAttribute('data-key', task.id);

  if (task.done === true) {
    li.classList.add('checked');
  }

  li.innerHTML = `<input type="checkbox" class="check" id="${task.id}" ${task.done ? 'checked' : null}>
  <label for="${task.id}">${task.name}</label>
  <button class="but">
    <i class="fa fa-trash-o" aria-hidden="true" data-id="${task.id}"></i>
  </button>`
  taskList.append(li);
}

// this is to delete the data
function deleteTask(id) {
  const newTasks = toDoList.filter(function (task) {
    return task.id !== id
  })
  toDoList = newTasks;
  Data();
}

// this does that the task is completed or not by adding the Boolean in to the data field 
function markDone(id) {
  const task = toDoList.filter(function (task) {
    return task.id === id
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    Data();
    return;
  }
}
