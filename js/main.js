const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const pushInput = document.querySelector(".btn-primary");
const taskList = document.querySelector("#tasksList");
const emptyListTitle = document.querySelector(".empty-list__title");
form.addEventListener("submit", addTask);
let tasks = [];
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", doneTask);
// дабвление задачи
function addTask(event) {
  event.preventDefault();

  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  tasks.push(newTask);

  console.log(tasks);

  const taskHTML = `
   
   <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                <span class="${cssClass}">${taskText}</span>
                <div class="task-item__buttons">
                   <button type="button" data-action="done" class="btn-action">
                      <img src="./img/tick.svg" alt="Done" width="18" height="18">
                   </button>
                   <button type="button" data-action="delete" class="btn-action">
                      <img src="./img/cross.svg" alt="Done" width="18" height="18">
                   </button>
                </div>
             </li>
   
   `;
  taskList.insertAdjacentHTML("beforeend", taskHTML);
  taskInput.value = "";
  taskInput.focus();

  TaskListEmpty();
}
// удаляю задачу
function deleteTask(event) {
  event.preventDefault;

  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".list-group-item ");
    parentNode.remove();

    TaskListEmpty();
  }
}
// завершаю задачу
function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".list-group-item");
    const taskTitle = parentNode.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");
  }
}
// проверяю если у нас нету дел
function TaskListEmpty() {
  if (taskList.children.length > 1) {
    emptyListTitle.classList.add("none");
  }
}
