/**
 * initialze and load the used data for contacts 
 */
async function summaryInit() {
    showGreetingsMobile();
    getUserInitials();
    setGreeting();
    await loadData();
    pushToArray(responseToJson.users, 'allUsers');
    if (responseToJson) {
        pushToArray(responseToJson.contacts, 'allContacts');
        pushToArray(responseToJson.tasks, 'allTasks');
    }
    loadBoardInfos();
}


/**
 * hide the greetings 
 */
window.addEventListener('resize', function () {
    hideGreetings();
});


/**
 * load the current board
 */
function loadBoardInfos() {
    getKeyMetrics('todo');
    getKeyMetrics('progress');
    getKeyMetrics('feedback');
    getKeyMetrics('done');
}


/**
 * greet the current user
 */
function setGreeting() {
    let greetings = document.getElementById('greetings');
    let greetingsUser = document.getElementById('greetings-user');
    let greeting = '';
    greeting = getcurrentTime();
    greetings.textContent = greeting;
    getFromLocalStorage();
    if (userBase === 0) {
        greetingsUser.innerHTML = "";
        return
    }
    greetingsUser.innerHTML += currentUser.name;
}


/**
 * determine the current time 
 */
function getcurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 5 && hours < 12) {
        greeting = 'Good morning,';
    } else if (hours >= 12 && hours < 18) {
        greeting = 'Good day,';
    } else {
        greeting = 'Good evening,';
    }
    return greeting
}


/**
 * show the greeting in mobile version 
 */
function showGreetingsMobile() {
    let greetingBoard = document.getElementById('board-right');
    if (window.innerWidth <= 1280) {
        setTimeout(function () {
            greetingBoard.classList.add('d_none');
        }, 1500);
    }
}


/**
 * hide greetings 
 */
function hideGreetings() {
    let greetingBoard = document.getElementById('board-right');
    if (window.innerWidth <= 1280) {
        greetingBoard.classList.add('d_none')
    }
    if (window.innerWidth > 1280) {
        greetingBoard.classList.remove('d_none');
    }
}


/**
 * put the keymetrics into summary board
 * 
 * @param {string} arrayKey -the current Array the new Task is
 */
function getKeyMetrics(arrayKey) {
    let boardCard = document.getElementById(arrayKey);
    boardCard.innerHTML = "";
    let currentTasks = allTasks.filter(task => task.taskID === arrayKey)

    numberOfTasks = currentTasks.length
    boardCard.innerHTML += numberOfTasks;
    getallTasksNumber();
    if (arrayKey === 'todo') {
        getUpcomingTask(currentTasks);
    }
}


/**
 * get the number of all tasks in kanbanbaord
 */
function getallTasksNumber() {
    let totalNumberOfTasks = allTasks.length;
    let allTasksCard = document.getElementById('task');
    allTasksCard.innerHTML = "";
    allTasksCard.innerHTML += totalNumberOfTasks;
}


/**
 * find the upcoming task in todos
 * 
 * @param {array} currentTasks -the current Task Array
 */
function getUpcomingTask(currentTasks) {
    let upcomingTask = document.getElementById('upcomingtask');
    upcomingTask.innerHTML = "";
    upcomingTask.innerHTML += currentTasks.length;

    getNextTodo(currentTasks);
}


/**
 * find the upcoming task in todos
 * 
 * @param {*} currentTasks -the current Task Array
 * @returns -stop the function
 */
function getNextTodo(currentTasks) {
    if (currentTasks.length===0) {
        return
    }
    currentTasks.sort((a, b) => new Date(a.Date) - new Date(b.Date));
    upComingTodo = currentTasks[0];
    currentPrio = upComingTodo.Prio;
    getPrioSVG(currentPrio);
    getUpcomingDate(upComingTodo);
}


/**
 * get the date of upcoming todo
 * 
 * @param {object} upComingTodo -declares the upcoming todo
 */
function getUpcomingDate(upComingTodo) {
    let dateRef = document.getElementById('summarydate');
    dateRef.innerHTML = "";
    let upcomingDate = upComingTodo.Date;
    const DATE = new Date(upcomingDate)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = DATE.toLocaleDateString('en-US', options);
    dateRef.innerHTML += formattedDate;
}


/**
 * get the priostatus for upcoming todo
 * 
 * @param {string} currentPrio -declares the curretn Prio Status
 */
function getPrioSVG(currentPrio) {
    let prioRef = document.getElementById('summaryprio');
    prioRef.innerHTML = "";
    if (currentPrio === 'Urgent') {
        prioRef.innerHTML += getUrgentSVG();
        prioRef.style.backgroundColor = "#FF3D00"
    }
    if (currentPrio === 'Medium') {
        prioRef.innerHTML += getMediumSVG();
        prioRef.style.backgroundColor = "#FFA800"
    }
    if (currentPrio === 'Low') {
        prioRef.innerHTML += getLowSVG();
        prioRef.style.backgroundColor = "#7AE229"
    }
}


/**
 * after click on the summary cards you go forward to the board 
 */
function goToBoard(){
    window.location.href="board.html"
}