let currentID;
let currentDraggedElement;
let zindex = 0;
let left = 0;
let searchKey = false;

/**
 * initialze and load the used data for the board
 * 
 */
async function init() {
    getUserInitials();
    hideTaskTemplate();
    getFromLocalStorage();
    await loadData();
    pushToArray(responseToJson.users, 'allUsers');
    if (responseToJson) {
        pushToArray(responseToJson.contacts, 'allContacts');
        pushToArray(responseToJson.tasks, 'allTasks');
    }
    getAllTemplates();
    initSearchInput();
}


/**
 * initialize the the addTask function
 * 
 * @param {string} arrayKey - the current Array the new Task is
 * @param {string} idKey - get the current ID of object in template
 */
async function creatNewTask(arrayKey, idKey) {
    getAssigndContact();
    await addTask(arrayKey, idKey);
    getSubtatsAndAssigndArraysEmpty();
}


/**
 * makes subtask und assignedto Array empty.
 */
function getSubtatsAndAssigndArraysEmpty() {
    subtasks = [];
    assigned = [];
}


/**
 * renderfunction tasks. sort the tasks to their status (todo, progress, feedback, done) and render the taskinfos 
 * @param {String} arrayKey -the current Array the new Task is
 * @returns - returns an array width all Task with the same task ID (todo, progress, feedback, done).
 */
function getcurrentTemplates(arrayKey) {
    let currentTaskContentRef = document.getElementById(`${arrayKey}`);
    currentTaskContentRef.innerHTML = "";
    if (searchKey === true) {
        searchTask();
        return
    }
    let currentTask = allTasks.filter(task => task['taskID'] == `${arrayKey}`);
    renderTaskColumnPlaceholder(arrayKey, currentTask, currentTaskContentRef);
    for (let taskIndex = 0; taskIndex < currentTask.length; taskIndex++) {
        const TASK = currentTask[taskIndex];
        currentTaskContentRef.innerHTML += getTaskCardTemplate(arrayKey, taskIndex, TASK);
        getTaskInformations(arrayKey, currentTask, taskIndex, TASK);
    }
}

/**
 * render the Information off every single Task in Task Card Template
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {array} currentTask - the Array of all Tasks with the current taskID
 * @param {number} taskIndex  -the current Index of the Task
 * @param {object} TASK - the current Task
 */
function getTaskInformations(arrayKey, currentTask, taskIndex, TASK) {
    renderAssignedToTaskCard(arrayKey, currentTask, taskIndex, TASK);
    renderPriority(arrayKey, taskIndex, TASK, 'main');
    checkColorOfCategory(arrayKey, taskIndex, TASK, 'add');
    checkSubtaskStatus(arrayKey, taskIndex, TASK);
}


/**
 * get the current status of completed subtasks and render to taskcard
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} taskIndex -the current Index of the Task
 * @param {object} TASK -the current Task Object
 */
function checkSubtaskStatus(arrayKey, taskIndex, TASK) {
    let subtasksRef = document.getElementById(`${arrayKey}subtasks-done${taskIndex}`);
    let progressbar = document.getElementById(`${arrayKey}progressbar${taskIndex}`);
    if (TASK.subtasks) {
        if (TASK.subtasks.length !== 0) {
            progressbar.classList.remove('d_none')
            let total = TASK.subtasks.length;
            let done = countCompletedSubtasks(TASK);
            subtasksRef.innerHTML += `${done}/${total} Subtasks`
            updateProgressbar(arrayKey, taskIndex, total, done);
        }
    } else {
        progressbar.classList.add('d_none');
    }
}


/**
 * calculate the current status of completed subtasks
 * 
 * @param {object} TASK - the current Task Object
 * @returns returns the count of completed Subtasks
 */
function countCompletedSubtasks(TASK) {
    let count = 0;
    for (let index = 0; index < TASK.subtasks.length; index++) {
        const COUNT = TASK.subtasks[index];
        if (COUNT.completed === true) {
            count++;
        }
    }
    return count
}


/**
 * render the taskoverly 
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {string} idKey -get the current ID of object in template
 */
function renderTaskOverlay(arrayKey, idKey) {
    showTaskTemplate()
    let taskOverlayRef = document.getElementById('taskoverlay');
    taskOverlayRef.innerHTML = "";
    taskOverlayRef.innerHTML += getTaskOverlayTemplate(arrayKey, idKey);
    changeButtonColor('Medium', 'main')
    getCurrentDate('task');
}


/**
 * render taskcard infos in overly
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task Card
 * @param {string} idKey -get the current ID of object in template
 */
function renderTaskCardOverlay(arrayKey, indexKey, idKey) {
    let taskCardRef = document.getElementById('task-card-overlay-content');
    taskCardRef.innerHTML = "";
    let currentTaskArray = allTasks.filter(task => task.taskID === arrayKey);
    const currentTask = currentTaskArray[indexKey];
    taskCardRef.innerHTML += getTaskCardOverlayTemplate(arrayKey, indexKey, currentTask, idKey);
    renderPriority(arrayKey, indexKey, currentTask, idKey);
    renderContactsToTaskCard(arrayKey, indexKey, currentTask);
    renderSubtaskToTaskCard(arrayKey, indexKey, currentTask);
    checkColorOfCategory(arrayKey, indexKey, currentTask, 'edit')
   
}


/**
 * render the assigned contacts to the taskcards
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {array} currentTask -array of all Tasks Cards
 * @param {number} taskIndex -the Index of the Task Card
 * @param {object} TASK -the current Task Card
 * @returns -stop the function
 */
function renderAssignedToTaskCard(arrayKey, currentTask, taskIndex, TASK) {
    let membersRef = document.getElementById(`${arrayKey}-member${taskIndex}`);
    membersRef.innerHTML = "";
    if (currentTask[taskIndex].assignedto === undefined) { return }
    for (let memberIndex = 0; memberIndex < currentTask[taskIndex].assignedto.length; memberIndex++) {
        const MEMBER = currentTask[taskIndex].assignedto[memberIndex];
        if (zindex <= 3) {
            zindex++;
            membersRef.innerHTML += `    <div class="initials-member" style="background-color: ${MEMBER.color}; position: absolute; z-index:${zindex}; left:${left}px"><p>${MEMBER.initials}</p></div>`
            left += 30;
        }
    }
    left = 0;
    zindex = 0;
    calculateMemberCount(arrayKey, currentTask, taskIndex);
}


/**
 * calcute the count of assigned Contacts
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {array} currentTask -array of all Tasks Cards
 * @param {number} taskIndex -the Index of the Task Card
 */
function calculateMemberCount(arrayKey, currentTask, taskIndex) {
    let memberCountRef = document.getElementById(`${arrayKey}memberscount${taskIndex}`);
    memberCountRef.innerHTML = "";
    let memberCount = currentTask[taskIndex].assignedto.length;
    if (memberCount > 4) {
        let overcount = memberCount - 4;
        memberCountRef.innerHTML += '+' + overcount;
    }
}


/**
 * render the current Priostatus to taskcard
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} taskIndex -the Index of the Task Card
 * @param {object} TASK -the current Task Card
 * @param {string} idKey -get the current ID of object in template
 */
function renderPriority(arrayKey, taskIndex, TASK, idKey) {
    let priorityRef = document.getElementById(`${arrayKey}-prio-status${taskIndex}-${idKey}`);
    priorityRef.innerHTML = "";
    const PRIO = TASK.Prio;
    if (PRIO === 'Urgent') {
        priorityRef.innerHTML += getUrgentSVG();
    }
    if (PRIO === 'Medium') {
        priorityRef.innerHTML += getMediumSVG();
    }
    if (PRIO === 'Low') {
        priorityRef.innerHTML += getLowSVG();
    }
}


/**
 * 
 * render the contact to taskcard info template
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} indexKey -the Index of the Task Card
 * @param {array} currentTask -array of all Tasks Cards
 * @returns -stop the function
 */
function renderContactsToTaskCard(arrayKey, indexKey, currentTask) {
    let assignedToRef = document.getElementById(`${arrayKey}-task-card-assignedto-${indexKey}`);
    assignedToRef.innerHTML = "";
    if (currentTask.assignedto === undefined) { return };
    for (let assignIndex = 0; assignIndex < currentTask.assignedto.length; assignIndex++) {
        const ASSIGNEDTO = currentTask.assignedto[assignIndex];
        assignedToRef.innerHTML += getAssigndContactsTemplate(arrayKey, assignIndex, ASSIGNEDTO);
    }
}


/**
 * render the current subtasks to tascardinfo template
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} indexKey -the Index of the Task Card
 * @param {array} currentTask -array of all Tasks Cards
 * @returns stop the function
 */
function renderSubtaskToTaskCard(arrayKey, indexKey, currentTask) {
    let subtaskCardContent = document.getElementById(`${arrayKey}task-card-subtasks-${indexKey}`);
    subtaskCardContent.innerHTML = "";
    if (currentTask.subtasks === undefined) { return };
    for (let subcardIndex = 0; subcardIndex < currentTask.subtasks.length; subcardIndex++) {
        const SUBCARD = currentTask.subtasks[subcardIndex];

        subtaskCardContent.innerHTML += getSubtaskCardTemplate(arrayKey, subcardIndex, SUBCARD);
        renderSubtaskCheckbox(arrayKey, subcardIndex, indexKey, SUBCARD, currentTask)
    }
}


/**
 * render the subtaskcheckox to subtask row
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} subcardIndex -the Index of the Subatask
 * @param {number} indexKey -the Index of the task Card
 * @param {object} SUBCARD -the Subtask Object
 */
function renderSubtaskCheckbox(arrayKey, subcardIndex, indexKey, SUBCARD) {
    let checkboxCoententRef = document.getElementById(`subtask-checkbox-container${subcardIndex}`);
    checkboxCoententRef.innerHTML = "";
    let checkStatus = getSubCkeckboxStatus(SUBCARD);
    checkboxCoententRef.innerHTML += `<button onclick="changeSubtaskCheckStatus('${arrayKey}',${subcardIndex}, ${indexKey})"><img src="./assets/icon/${checkStatus}.svg" alt=""></button>`;
}


/**
 * get the currnet check status
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} subcardIndex -the Index of the Subatask
 * @param {number} indexKey -the Index of the task Card
 */
async function changeSubtaskCheckStatus(arrayKey, subcardIndex, indexKey) {
    let currentCardsArray = allTasks.filter(task => task.taskID === arrayKey);
    let currentCard = currentCardsArray[indexKey];
    const CHECKBOX = currentCard.subtasks[subcardIndex];
    CHECKBOX.completed = !CHECKBOX.completed
    renderSubtaskCheckbox(arrayKey, subcardIndex, indexKey, CHECKBOX)
    await updateTasks(currentCard);
    getAllTemplates();
}


/**
 * change subtask checkbox
 * 
 * @param {object} SUBCARD -the Subtask Object
 * @returns return the current status of the checkbox and change the img
 */
function getSubCkeckboxStatus(SUBCARD) {
    let completedStatus = SUBCARD.completed;
    if (completedStatus === true) {
        return 'checked'
    } else {
        return 'default'
    }
}


/**
 * delete taskcard 
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} indexKey -the Index of the Task Card
 */
async function deleteTaskCard(arrayKey, indexKey) {
    let currentCardsArray = allTasks.filter(task => task.taskID === arrayKey);
    let currentTask = currentCardsArray[indexKey];
    const deleteTaskID = currentTask.firebaseID
    await deleteData(`tasks/${deleteTaskID}`, currentTask);
    await loadData();
    allTasks = [];
    pushToArray(responseToJson.tasks, 'allTasks')
    getAllTemplates();
    closeTaskCard();
}


/**
 * calculate the progressbar status
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} taskIndex - the Index of the Task
 * @param {number} total -the length of the Subtask Array
 * @param {number} done - the count of done Subtasks
 */
function updateProgressbar(arrayKey, taskIndex, total, done) {
    let progressbar = document.getElementById(`${arrayKey}progressbar-inner${taskIndex}`)
    let currentStatus = done / total;
    currentStatus = (currentStatus * 100).toFixed(0);
    progressbar.style = `width: ${currentStatus}%`
}









