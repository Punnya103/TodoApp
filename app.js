let tasks = [];
let editingIndex = null;

const taskInput = document.getElementById('taskInput');
const newTaskBtn = document.getElementById('newTask');

const addOrUpdateTask = () => {
  const text = taskInput.value.trim();

  if (!text) return;

  if (editingIndex === null) {
    tasks.push({ text, completed: false });
  } else {
    tasks[editingIndex].text = text;
    editingIndex = null;
    newTaskBtn.textContent = '+';
  }

  taskInput.value = '';
  updateTasksList();
};

const updateTasksList = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})" />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="./assets/edit.png" onclick="editTask(${index})" alt="edit" />
          <img src="./assets/bin.png" onclick="deleteTask(${index})" alt="delete" />
        </div>
      </div>
    `;

    taskList.appendChild(listItem);
  });

  updateProgress();
};

function toggleTaskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateTasksList();
}

function editTask(index) {
  taskInput.value = tasks[index].text;
  editingIndex = index;
  newTaskBtn.textContent = '✓';
}

function updateProgress() {
  const completed = tasks.filter(task => task.completed).length;
  const total = tasks.length;
  const progress = document.getElementById('progress');
  const number = document.getElementById('number');

  if (total === 0) {
    progress.style.width = '0%';
    number.textContent = '0/0';
  } else {
    const percent = (completed / total) * 100;
    progress.style.width = `${percent}%`;
    number.textContent = `${completed}/${total}`;
  }
}

newTaskBtn.addEventListener('click', function (e) {
  e.preventDefault();
  addOrUpdateTask();
});
