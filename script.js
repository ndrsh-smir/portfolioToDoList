// Добавление новой задачи

const form = document.getElementById('addNewTaskForm');
const newTaskInput = form.querySelector('input[type="text"');
const tasksSelector = document.querySelector('.tasks');

form.addEventListener('submit', addNewTask);

function addNewTask(e){
    e.preventDefault();
     
    const newTask = document.createElement('li');
    newTask.classList.add('tasks__item');

    if (!newTaskInput.value) return;
    newTask.textContent = newTaskInput.value;

    const newTaskDelBtn = document.createElement('input');
    newTaskDelBtn.type = 'button';
    newTaskDelBtn.setAttribute('data-action', 'delete');
    newTaskDelBtn.classList.add('tasks__btn');
    newTaskDelBtn.value = 'Удалить';
    newTask.append(newTaskDelBtn);

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
            // При одинаковых задачах будет при перезагрузке меняться последовательность, можно конечно добавить проверку на уникальность при добавлении

            e.target.parentElement.remove();
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
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function showTasksOnPage(){
    tasksSelector.innerHTML = "";
    tasks.forEach(function(task){
    tasksSelector.innerHTML += `<li class="tasks__item">${task}
<input type="button" data-action="delete" class="tasks__btn" value="Удалить">
</li>`
})
}

showTasksOnPage();

