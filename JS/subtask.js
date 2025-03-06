

/**
 * clear the task inputfields 
*/
function clearTaskTempalte() {
    let title = document.getElementById('tasktitle-main');
    let description = document.getElementById('taskdescription-main');
    let date = document.getElementById('taskdate-main');
    let category = document.getElementById('taskCategory-main');
    title.value = "";
    description.value = "";
    date.value = "";
    category.value = "";
    clearSubtasks();
    clearAssigned();
    clearPrioButtons();
    changeButtonColor('Medium', 'main');
}


/**
 * clear the List of assigned Contacts
 */
function clearAssigned() {
    for (let index = 0; index < allContacts.length; index++) {
        const CLEARCONTACT = allContacts[index];
        CLEARCONTACT.checked = false;
    }
}


/**
 * resets the Priobuttons
 */
function clearPrioButtons() {
    let urgentButton = document.getElementById('urgent-button-main');
    let mediumButton = document.getElementById('medium-button-main');
    let lowButton = document.getElementById('low-button-main');
    urgentButton.classList.remove('colorred');
    mediumButton.classList.remove('colororange');
    lowButton.classList.remove('colorgreen');
    clearSVGColor();
}


/**
 *  clear the Subtasks
 */
function clearSubtasks() {
    let subtask = document.getElementById('contactlist-dropdown-subtask');
    let subtaskInput = document.getElementById('input-subtask-main');
    subtask.innerHTML = "";
    subtaskInput.value = "";
    subtasks = [];
}


/**
 * resets the Priobuttons Color
 */
function clearSVGColor() {
    let urgentSVG = document.getElementById(`urgentsvg-main`);
    let mediumSVG = document.getElementById(`mediumsvg-main`);
    let lowSVG = document.getElementById(`lowsvg-main`);
    urgentSVG.classList.remove('svg-color-white');
    mediumSVG.classList.remove('svg-color-white');
    lowSVG.classList.remove('svg-color-white');
}


/**
 * activate the subtask inputfield
 * 
 * @param {string} idKey -get the current ID of the Object in template
 * @param {string} buttonKey -declares which button was pressed
 */
function activateSubtaskInput(idKey, buttonKey) {
    let inputRef = document.getElementById(`input-subtask-${idKey}`);
    if (buttonKey === 'activate') {
        inputRef.disabled = false;
    }
    if (buttonKey === 'sub') {
        inputRef.disabled = true;
    }
}


/**
 * add new subtask to task 
 * 
 * @param {string} idKey -get the current ID of the Object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {string} indexKey -the Index of the Task
 */
function addSubTask(idKey, taskKey, arrayKey, indexKey) {
    let subInputRef = document.getElementById(`input-subtask-${idKey}`);
    let input = subInputRef.value;
    if (input !== "") {
        getSubtask(idKey, taskKey, arrayKey, indexKey, input);
    }
    subInputRef.value = "";
}


/**
 * create the new Subtask
 * 
 * @param {string} idKey -get the current ID of the Object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @param {value} input -the Input Value
 */
function getSubtask(idKey, taskKey, arrayKey, indexKey, input) {
    let subtask = {
        'subtask': input,
        'completed': false,
    }
    if (taskKey === 'edit') {
        editSubtasks(arrayKey, indexKey, idKey, taskKey, subtask);
    }
    if (taskKey === 'add') {
        subtasks.push(subtask);
        renderSubtasks(idKey, taskKey, arrayKey, indexKey);
    }
}


/** edit subtask */
/**
 * 
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @param {string} idKey -get the current ID of the Object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {object} subtask -the new Subtask Object
 */
function editSubtasks(arrayKey, indexKey, idKey, taskKey, subtask) {
    let currentObject = getCurrentTask(arrayKey, indexKey);
    if (currentObject.subtasks === undefined) {
        currentObject.subtasks = [];
    }
    currentObject.subtasks.push(subtask)
    renderSubtasks(idKey, taskKey, arrayKey, indexKey, currentObject);
}


/**
 * render subtasks to taskboard 
 * 
 * @param {string} idKey -get the current ID of the Object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @param {object} currentObject 
 * @returns -stop the function
 */
function renderSubtasks(idKey, taskKey, arrayKey, indexKey, currentObject) {
    let subtaskContentRef = document.getElementById(`subtask-dropdown-${idKey}`);
    subtaskContentRef.innerHTML = "";
    let currentArray = getCurrentArray(taskKey, currentObject);
    if (currentArray === undefined) { return }
    for (let subIndex = 0; subIndex < currentArray.length; subIndex++) {
        const SUB = currentArray[subIndex];
        buildCurrentTemplate(idKey, taskKey, arrayKey, indexKey, subIndex, SUB, subtaskContentRef);
    }
}


/**
 * show the subtasktemplates
 * 
 * @param {string} idKey -get the current ID of the Object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {string} indexKey -the Index of the Task
 * @param {number} subIndex -the Index of the current Subtask
 * @param {object} SUB -the current Subtask Object
 * @param {element} subtaskContentRef -the curretn DOM Element
 */
function buildCurrentTemplate(idKey, taskKey, arrayKey, indexKey, subIndex, SUB, subtaskContentRef) {
    if (taskKey === 'edit') {
        subtaskContentRef.innerHTML += getEditSubtaskTemplates(arrayKey, indexKey, subIndex, idKey, SUB, taskKey);
    }
    if (taskKey === 'add') {
        subtaskContentRef.innerHTML += getSubtaskTemplates(idKey, subIndex, SUB, taskKey);
    }
}


/**
 * get the current subtask
 * 
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {object} currentObject -the current Task Object
 * @returns -returns the current Task Array
 */
function getCurrentArray(taskKey, currentObject) {
    let currentArray;
    if (taskKey === 'edit') {
        currentArray = currentObject.subtasks
    }
    if (taskKey === 'add') {
        currentArray = subtasks;
    }
    return currentArray;
}


/**
 * active subtask inputfield
 * 
 * @param {number} subIndex -the Index of the Subtask
 * @param {string} idKey -get the current ID of the Object in template
 */
function ableSubtaskInput(subIndex, idKey) {
    let subInptuRef = document.getElementById(`${subIndex}input-subtask-row-${idKey}`)
    subInptuRef.disabled = false;
}


/**
 * edit Subtsasks
 * 
 * @param {string} idKey -get the current ID of the Object in template
 * @param {number} subIndex -the Index of the Subtask
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 */
function editSubtask(idKey, subIndex, taskKey, arrayKey, indexKey,) {
    let subInputRef = document.getElementById(`${subIndex}input-subtask-row-${idKey}`);
    let input = subInputRef.value;

    if (taskKey === 'edit') {
        let currentObject = getCurrentTask(arrayKey, indexKey);
        currentObject.subtasks[subIndex].subtask = input;
        renderSubtasks(idKey, taskKey, arrayKey, indexKey, currentObject);

    } if (taskKey === 'add') {
        subtasks[subIndex].subtask = input;
        renderSubtasks(idKey, taskKey);
    }
}


/**
 * delete Subtask
 * 
 * @param {string} idKey -get the current ID of the Object in template
 * @param {number} subIndex -the Index of the Subtask
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 */
function deleteSubtask(idKey, subIndex, taskKey, arrayKey, indexKey,) {
    if (taskKey === 'edit') {
        let currentObject = getCurrentTask(arrayKey, indexKey);
        currentObject.subtasks.splice(subIndex, 1);
        renderSubtasks(idKey, taskKey, arrayKey, indexKey, currentObject);
    }
    if (taskKey === 'add') {
        subtasks.splice(subIndex, 1);
        renderSubtasks(idKey, taskKey);
    }
}


/**
 * check whether the enter key was pressed in subtask inputfield
 * 
 * @param {string} idKey -get the current ID of the Object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @param {even} event -the current Click Event
 */
function checkEnter(idKey, taskKey, arrayKey, indexKey, event) {
    if (event.key == 'Enter') {
        addSubTask(idKey, taskKey, arrayKey, indexKey)
    }
}


/**
 * get the assigned Contact from current Task
 */
function getAssigndContact() {
    for (let assignedIndex = 0; assignedIndex < allContacts.length; assignedIndex++) {
        const ASSIGNED = allContacts[assignedIndex];
        let checkStatus = ASSIGNED.checked;

        if (checkStatus === true) {
            assigned.push(ASSIGNED);
            ASSIGNED.checked = false;
        }
    }
}


/**
 * get the current Taks
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @returns -returns the current Task Objekt
 */
function getCurrentTask(arrayKey, indexKey) {
    let currentCardsArray = allTasks.filter(task => task.taskID === arrayKey);
    const OBJECT = currentCardsArray[indexKey];
    return OBJECT;
}


/**
 * get the current Contact
 * 
 * @param {*} idKey -get the current ID of the Object in template
 * @param {*} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {*} arrayKey -the current Array the new Task is
 * @param {*} indexKey -the Index of the Task
 */
function searchForContact(idKey, taskKey, arrayKey, indexKey) {
    let contactListContainer = document.getElementById(`contactlist-dropdown-${idKey}`);
    contactListContainer.innerHTML = "";
    let inputRef = document.getElementById('dropdown-input');
    let input = inputRef.value;
    for (let searchIndex = 0; searchIndex < allContacts.length; searchIndex++) {
        const currentContact = allContacts[searchIndex];
        if (currentContact.name.toLowerCase().includes(input.toLowerCase())) {
            contactListContainer.innerHTML += getContactRowDropDown(searchIndex, currentContact, idKey)
            renderCheckbox(searchIndex, idKey, taskKey, arrayKey, indexKey);
        }
    }
}


/**
 * resets the Contatlist
 */
function cancelAddTask() {
    for (let index = 0; index < allContacts.length; index++) {
        const cancelContact = allContacts[index];
        cancelContact.checked = false;
    }
    subtasks = [];
}