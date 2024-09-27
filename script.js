let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let archive = JSON.parse(localStorage.getItem('archive')) || [];


// Добавление новой задачи

const form = document.getElementById('addNewTaskForm');
const newTaskInput = form.querySelector('input[type="text"');
const tasksSelector = document.querySelector('.tasks');
const archiveSelector = document.querySelector('.archive');

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

// Перемещение задачи в архив

tasksSelector.addEventListener('click', doneTask);


function addNewTaskToArchive(task){
    const archiveLi = document.createElement('li');
    archiveLi.classList.add('archive__item');
    archiveLi.prepend(task);
    return archiveLi;
}


function doneTask(e){
    if (e.target.getAttribute('data-action') == 'done'){
        let taskDone = tasks.indexOf(e.target.parentElement.parentElement.innerText);
        tasks.splice(taskDone, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        archive.push(e.target.parentElement.parentElement.innerText);
        archiveSelector.append(addNewTaskToArchive(e.target.parentElement.parentElement.innerText));
        localStorage.setItem('archive', JSON.stringify(archive));

        e.target.parentElement.parentElement.remove();
    }
}


// Удаление задач

tasksSelector.addEventListener('click', removeTask);


function removeTask(e){
    if (e.target.getAttribute('data-action') == 'delete'){
        if (confirm('Удалить задачу?')){
            let deletingTask = tasks.indexOf(e.target.parentElement.parentElement.innerText);
            tasks.splice(deletingTask, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));


            e.target.parentElement.parentElement.remove();
        }
    }
}

// Редактирование задачи

tasksSelector.addEventListener('click', editTask);


function editTask(e){
    if (e.target.getAttribute('data-action') == 'edit'){
        let editingTask = tasks.indexOf(e.target.parentElement.parentElement.innerText);
        let editedTask = prompt(`Измените задачу "${tasks[editingTask]}"`);
        if (tasks.includes(editedTask)){
            alert('У вас уже есть такая задача');
        } else {
            tasks[editingTask] = editedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            showTasksOnPage();
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

// Очищение архива

function clearArchive(){
    archiveSelector.innerHTML = "";
    archive = [];
    localStorage.setItem('archive', archive);
}

 
// Сохранение задач

function showTasksOnPage(){
    tasksSelector.innerHTML = "";
    tasks.forEach(task => tasksSelector.append(createTask(task)));

    archiveSelector.innerHTML = "";
    archive.forEach(task => archiveSelector.append(addNewTaskToArchive(task)));
}

showTasksOnPage();

