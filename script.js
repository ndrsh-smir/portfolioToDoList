let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Добавление новой задачи

const form = document.getElementById('addNewTaskForm');
const newTaskInput = form.querySelector('input[type="text"');
const tasksSelector = document.querySelector('.tasks');

form.addEventListener('submit', addNewTask);

function createTask(value){
    const task = document.createElement('li');
    task.classList.add('tasks__item');
    task.innerHTML = `<div class="tasks__item-btns">
            <input type="button" data-action="done" class="tasks__btn" value="Готово">
            <input type="button" data-action="edit" class="tasks__btn" value="Редактировать">
            <input type="button" data-action="delete" class="tasks__btn" value="Удалить">
          </div>`;
    task.prepend(value);
    return task;
}

function addNewTask(e){
    e.preventDefault();

    if (tasks.includes(newTaskInput.value)) return alert('У вас уже есть такая задача');
    if (!newTaskInput.value) return;
    const newTask = createTask(newTaskInput.value);


    tasks.push(`${newTaskInput.value}`);
    localStorage.setItem('tasks', JSON.stringify(tasks));


    newTaskInput.value = '';
    newTaskInput.focus();

    tasksSelector.append(newTask);
}


// Удаление задач

tasksSelector.addEventListener('click', removeTask);


function removeTask(e){
    if (e.target.getAttribute('data-action') == 'delete'){
        if (confirm('Удалить задачу?')){
            let deletingTask = tasks.indexOf(e.target.parentElement.innerText);
            tasks.splice(deletingTask, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));


            e.target.parentElement.parentElement.remove();
        }
    }
}

// Фильтрация задач

const filterSelector = document.querySelector('input[type="search"');

filterSelector.addEventListener('input', filterTasks);

function filterTasks() {
    const searchedText = filterSelector.value.toLowerCase();
    
    const tasks = tasksSelector.querySelectorAll('.tasks__item');

    tasks.forEach(function(element){
        if (element.innerText.toLowerCase().includes(searchedText)) element.style.display = 'flex';
        else element.style.display = 'none';
    });
}

 
// Сохранение задач

function showTasksOnPage(){
    tasksSelector.innerHTML = "";
    tasks.forEach(task => {
    console.log(createTask(task));
    tasksSelector.append(createTask(task));
})
}

showTasksOnPage();

