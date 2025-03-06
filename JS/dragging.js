/**
 * render the placeholder, if the taskcolumn is empty
 * 
 * @param {array} currentTask -the Array of all Tasks with the current taskID
 * @param {element} currentTaskContentRef - the current DOM-Element
 */
function renderTaskColumnPlaceholder(arrayKey, currentTask, currentTaskContentRef) {
    if (currentTask.length === 0) {
        currentTaskContentRef.innerHTML += ` <div class="column-content-placeholder" id="column-content-placeholder-${arrayKey}">
                            <p>No tasks To do</p>
                        </div>`
    }
}


/**
 * render the task placeholder 
 */
function renderTaskPlaceholder() {
    let placeholderRef = document.getElementById('todo');
    placeholderRef.innerHTML = "";
    placeholderRef.innerHTML += '<div class="dragover-placeholder" id="dragover-placeholder"></div>';
}


/**
 * save the current Task ID in a variable
 * 
 * @param {number} id -this is the ID-Number of the current dragged Task
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * drag the task to another Task Column and change the TaskID 
 * 
 * @param {string} category -This is the category of the target element into which the task should be moved
 * @returns - stop the function
 */
async function moveTo(category) {
    const task = allTasks.find(task => task.id === currentDraggedElement);
    if (category === task.taskID) { return }
    if (task) {
        await getNewIdToTask(task, category);
        await updateTasks(task);
        getAllTemplates();
    }
}


/**
 * after every drag move, the task get a new id
 * 
 * @param {object} task - the current dragged Task
 * @param {string} category - This is the category of the target element into which the task should be moved
 * @returns -returns the current ID of the Task after dragging
 */
async function getNewIdToTask(task, category) {
    const idResponse = await loadData('idNumber');
    let currentId = idResponse && idResponse.idNumber ? idResponse.idNumber : 1;
    task.id = currentId;
    task.taskID = category;
    currentId++;
    const newIdData = { idNumber: currentId };
    await putData('idNumber', newIdData);
    return currentId;
}


/**
 * update Tasks in Firebase 
 * 
 * @param {object} currentTask -the current TaskCard
 */
async function updateTasks(currentTask) {
    const TASKID = currentTask.firebaseID;
    await putData(`tasks/${TASKID}`, currentTask);
    await loadData();
    pushToArray(responseToJson.tasks, 'allTasks');
    allTasks.sort((a, b) => a.id - b.id);
}


/**
 * prevent default behavior of the browser during dragging the task
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * change task status (todo, progress, feedbac, done) for mobile devices
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} id -this is the ID-Number of the current dragged Task
 */
function movingTaskCardWithoutDragging(arrayKey, id, event) {
    startDragging(id);
    moveTo(arrayKey);
    event.stopPropagation();
}


/**
 * remove all style from task task column 
 */
function removeAllHighlights() {
    removeHighlight('todo');
    removeHighlight('progress');
    removeHighlight('feedback');
    removeHighlight('done')
}


/**
 * after drag move, render all task columns 
 */
function getAllTemplates() {
    getcurrentTemplates('todo');
    getcurrentTemplates('progress');
    getcurrentTemplates('feedback');
    getcurrentTemplates('done');
}


/**
 * change style of taskcard template during the drag move
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @returns -stop the function
 */
function giveHighlight(arrayKey) {
    removeAllHighlights();
    let highlightContentRef = document.getElementById(`dragover-placeholder-${arrayKey}`);
    let placeholderRef = document.getElementById(`column-content-placeholder-${arrayKey}`);
    const task = allTasks.find(task => task.id === currentDraggedElement);
    if (task.taskID === arrayKey) {
        return
    } else {
        highlightContentRef.classList.remove('d_none');
        if (placeholderRef) {
            placeholderRef.classList.add('d_none');
        }
    }
}


/**
 * remove style of taskcolumn after drag move
 * 
 * @param {string} arrayKey -the current Array the new Task is
 */
function removeHighlight(arrayKey) {
    let highlightContentRef = document.getElementById(`dragover-placeholder-${arrayKey}`);
    let placeholderRef = document.getElementById(`column-content-placeholder-${arrayKey}`);
    highlightContentRef.classList.add('d_none');
}


/**
 * eventListener to perceive the searchinputfield onkeydown  
 */
function initSearchInput() {
    const searchInput = document.getElementById('input-field-searchtask');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            let input = searchInput.value.trim().toLowerCase();
            if (input === "") {
                searchKey = false;
                getAllTemplates();
            } else
                searchKey = true;
            makeArraysEmpty();
            searchInAllArray(input);
        })
    }
}


/**
 * filters all tasks according to the task you are looking for 
 */
function searchTask() {
    let inputRef = document.getElementById('input-field-searchtask');
    let input = inputRef.value.trim();
    if (inputRef !== "") {
        if (input.length >= 3) {
            searchKey = true;
            makeArraysEmpty();
            searchInAllArray(input);
        }
    } else {
        searchKey = false;
        getAllTemplates();
    }
}


/**
 * make all taskcloumns at the board empty 
 */
function makeArraysEmpty() {
    document.getElementById('todo').innerHTML = "";
    document.getElementById('progress').innerHTML = "";
    document.getElementById('feedback').innerHTML = "";
    document.getElementById('done').innerHTML = "";
}


/**
 * 
 * @param {value} input -the value of the Inputfield
 */
function searchInAllArray(input) {
    findCurrentTaskArray('todo', input);
    findCurrentTaskArray('progress', input);
    findCurrentTaskArray('feedback', input);
    findCurrentTaskArray('done', input);
}


/**
 * is searching for the Array of the current Task which includes the Task with the searched word
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {value} input -the value of the Inputfield
 */
function findCurrentTaskArray(arrayKey, input) {
    let currentTask = allTasks.filter(task => task['taskID'] == `${arrayKey}`);
    for (let index = 0; index < currentTask.length; index++) {
        const SEARCH = currentTask[index];
        const title = SEARCH.Title.toLowerCase();
        const description = SEARCH.Description.toLowerCase();
        if (title.includes(input) || description.includes(input)) {
            renderSearchedTask(arrayKey, index, SEARCH, currentTask);
        }
    }
}


/**
 * render the searched Tasks
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} searchIndex - the Index of the task
 * @param {object} SEARCH -the current Task Object
 * @param {array} currentTask -array of all Tasks Objects
 */
function renderSearchedTask(arrayKey, searchIndex, SEARCH, currentTask) {
    let currentTaskContentRef = document.getElementById(`${arrayKey}`);
    currentTaskContentRef.innerHTML += getTaskCardTemplate(arrayKey, searchIndex, SEARCH);
    renderAssignedToTaskCard(arrayKey, currentTask, searchIndex, SEARCH);
    renderPriority(arrayKey, searchIndex, SEARCH, 'main');
    checkColorOfCategory(arrayKey, searchIndex, SEARCH, 'add');
    checkSubtaskStatus(arrayKey, searchIndex, SEARCH);
}


/**
 * show current taskinfos to edit
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} indexKey -the Index of the Task Card
 * @param {string} idKey -get the current ID of object in template
 */
function editTask(arrayKey, indexKey, idKey) {
    let taskEditRef = document.getElementById('taskoverlay');
    taskEditRef.innerHTML = "";
    const EDIT = getCurrentTask(arrayKey, indexKey);
    let buttonKey = EDIT.Prio;
    closeTaskCard();
    showTaskTemplate();
    taskEditRef.innerHTML += getEditTaskTemplate(arrayKey, indexKey, idKey, EDIT);
    renderContactlistInitialsToEdit(arrayKey, indexKey);
    changeButtonColor(buttonKey, idKey)
    renderSubtasks(idKey, 'edit', arrayKey, indexKey, EDIT);
    getCurrentDate();
}


/**
 * save task changes 
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {string} indexKey -the Index of the Task Card
 */
async function createEditedTask(arrayKey, indexKey) {
    let newTitel = document.getElementById('tasktitle-main').value;
    let newDescription = document.getElementById('taskdescription-main').value;
    let newDate = document.getElementById('taskdate-main').value;
    let newCategory = document.getElementById('taskCategory-main').value;
    let currentTask = getCurrentTask(arrayKey, indexKey);
    changeTaskValues(arrayKey, indexKey, newTitel, newDescription, newDate, newCategory);
    getAssigndContact();
    await updateTasks(currentTask);
    getcurrentTemplates(arrayKey);
}


/**
 * change Taskvalues
 * 
 * @param {string} arrayKey -the current Array the new Task Card is
 * @param {number} indexKey -the Index of the Task Card
 * @param {string} newTitel -the new Tasktitel
 * @param {string} newDescription -the newTaskdescription
 * @param {string} newDate -the new TaskDate
 * @param {string} newCategory -the new TaskCategory
 */
function changeTaskValues(arrayKey, indexKey, newTitel, newDescription, newDate, newCategory) {
    let currentCardsArray = allTasks.filter(task => task.taskID === arrayKey);
    const EDITEDTASK = currentCardsArray[indexKey];
    EDITEDTASK.Title = newTitel;
    EDITEDTASK.Description = newDescription;
    EDITEDTASK.Date = newDate;
    EDITEDTASK.Category = newCategory;
    EDITEDTASK.Prio = priority;
}