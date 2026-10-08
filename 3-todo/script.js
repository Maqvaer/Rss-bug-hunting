const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let nextId = 0;

function addTask() {
  const text = input.value;
  if (text === "") {
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;
  tasks.push({ id: nextId++, text: text, done: false });
  console.log(tasks);
  input.value = "";
  render(nextId);
}

function toggleTask(id) {
  if(tasks[id].done !== true){
     tasks[id].done = true; 
  } else {
    tasks[id].done = false;
  }  
  updateCounter();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  updateCounter();
}

function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);
  document.querySelectorAll('.completed').forEach(li => li.remove());
  updateCounter();
}

function getVisibleTasks() {
    return tasks; 
}

function updateCounter() {
  const counterChecked = tasks.filter((t) => t.done).length;
  counter.textContent = "Активных задач: " + (tasks.length - counterChecked);
}

function render(id) {
  const visible = getVisibleTasks();
  for (let i = id ? id - 1 : 0; i < visible.length; i++) {
    const task = visible[i];
    const li = document.createElement("li");
    li.className = "task";
    
    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", function() {
      toggleTask(i); 
      li.classList.toggle("completed");
});

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", function() {
      deleteTask(i);
      li.remove();
    });
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    if (btn.dataset.filter === "active") {
      document.querySelectorAll('.task').forEach((elem) => 
        elem.classList.contains('completed') ? elem.style.display = 'none' : elem.style.display = 'flex'
  );
    } else if (btn.dataset.filter === "done") {
      document.querySelectorAll('.task').forEach((elem) => 
        elem.classList.contains('completed') ? elem.style.display = 'flex' : elem.style.display = 'none'
      );
    } else if (btn.dataset.filter === "all") {
      document.querySelectorAll('.task').forEach(item => item.style.display = 'flex');
    }
  });
});

render();
