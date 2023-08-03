document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    const todoLayout = document.getElementById('part2__loadingCard1');
    const inProgressLayout = document.getElementById('part2__loadingCard2');
    const completedLayout = document.getElementById('part2__loadingCard3');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    todoLayout.innerHTML = '';
    inProgressLayout.innerHTML = '';
    completedLayout.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        if (task.status === 0) {
            todoLayout.appendChild(taskElement);
        } else if (task.status === 1) {
            inProgressLayout.appendChild(taskElement);
        } else if (task.status === 2) {
            completedLayout.appendChild(taskElement);
        }
    });
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.id="bigDiv";
    div.className ="BigDiv";

    const LitDiv = document.createElement('div');
    LitDiv.id="littleDiv";
    LitDiv.className ="LittleDiv";
    div.appendChild(LitDiv);

    const title = document.createElement('h3');
    title.textContent = task.title;
    LitDiv.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = task.description;
    LitDiv.appendChild(description);

    const shouldHaveForwardButton = [0, 1].includes(task.status);
    const shouldHaveBackButton = [1, 2].includes(task.status);

    if (shouldHaveBackButton) {
        const arrowLeftIcon = document.createElement('button');
        arrowLeftIcon.className = "leftButton"
        arrowLeftIcon.textContent = 'Back';
        arrowLeftIcon.style.cursor = 'pointer';
        arrowLeftIcon.addEventListener('click', () => {
            updateTaskStatus(task,task.status-1 );
        });
        LitDiv.appendChild(arrowLeftIcon);
    }
    if (shouldHaveForwardButton) {
        const arrowRightIcon = document.createElement('button');
        arrowRightIcon.className = "rightbutton"
        arrowRightIcon.textContent = 'Forward';
        arrowRightIcon.style.cursor = 'pointer';
        arrowRightIcon.style.justifyContent ='space-between';
        arrowRightIcon.addEventListener('click', () => {
            updateTaskStatus(task,task.status+1 );
        });
        LitDiv.appendChild(arrowRightIcon);
    }
    return LitDiv;
}


    function addTask() {
        const part1_input = document.getElementById('part1__input1');
        const taskTitle = part1_input.value.trim();
        const description = document.getElementById('part1__input2');
        const taskDescription = description.value.trim();
        
        if (taskTitle !== '') {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const Tasks = {
                id: Date.now(),
                title: taskTitle,
                description: taskDescription,
                status: 0,
            };
            tasks.push(Tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            part1_input.value = '';
            description.value = '';
            loadTasks();
        }
    }

    function updateTaskStatus(taskObj, newStatus) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
        const task = tasks.find(ele => ele.id === taskObj.id);
        if (task) {
            task.status = newStatus;
            localStorage.setItem('tasks', JSON.stringify(tasks));
    
            loadTasks();
        }
    }