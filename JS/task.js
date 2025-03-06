let subtasks = [];
let assigned = [];
let initials = [];
let initalscount = 0;
let changeSite = false;
let urgent;
let medium;
let low;
let priority;

/**
 * initialze and load the used data for the board 
 **/
async function taskInit() {
    getFromLocalStorage();
    getUserInitials();
    await loadData();
    pushToArray(responseToJson.users, 'allUsers');
    if (responseToJson) {
        pushToArray(responseToJson.contacts, 'allContacts');
        pushToArray(responseToJson.tasks, 'allTasks');
    }
    changeButtonColor('Medium', 'main');
    getCurrentDate();
}


/**
 * craeate new task and save in firebase
 */
async function addNewTask() {
    showcompleteSliderBoardTask('addtask');
    await new Promise(resolve => setTimeout(resolve, 800));
    changeSite = true;
    getAssigndContact();
    await addTask('todo', 'main');
    getSubtatsAndAssigndArraysEmpty();

}

function getCurrentDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("taskdate-main").setAttribute("min", today);
}

/** */
/**
 * open the Contactlist
 * 
 * @param {string} inputKey -regulates that the input field is empty
 * @param {string} idKey -get the current ID of object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @param {event} event -the current Click Event
 * @param {string} domKey -regulates the toggle of the Contactlist
 */
function openContactList(inputKey, idKey, taskKey, arrayKey, indexKey, event, domKey) {
    toggleContactList(idKey, domKey);
    let inputRef = document.getElementById('dropdown-input');
    if (inputKey === 'empty') { inputRef.value = ""; }
    let input = inputRef.value;
    renderContactsToContactsList(idKey, taskKey, arrayKey, indexKey, input, event);

}

/**
 * render the Contact to the Contactlist
 * 
 * @param {string} idKey -get the current ID of object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @param {value} input -the Value of the Inputfield
 * @param {event} event -the current Click Event
 * @returns -stop the function
 */
function renderContactsToContactsList(idKey, taskKey, arrayKey, indexKey, input, event) {
    let dropDownRef = document.getElementById(`contactlist-dropdown-${idKey}`);
    dropDownRef.innerHTML = "";
    if (input) {
        dropDownRef.classList.remove('d_none');
        searchForContact(idKey, taskKey, arrayKey, indexKey);
        renderContactlistInitials(taskKey, arrayKey, indexKey);
        return
    }
    renderContactDropDown('main', taskKey, arrayKey, indexKey);
    renderContactlistInitials(taskKey, arrayKey, indexKey);
    event.stopPropagation();
}


/**
 * toggle the contactlist when you press the button
 * 
 * @param {string} idKey -get the current ID of object in template
 * @param {string} domKey -controls the function depending on whether the contact list is activated via the open button or the search field
 */
function toggleContactList(idKey, domKey) {
    let contactListContainer = document.getElementById(`contactlist-${idKey}`);
    if (domKey === 'onclick') {
        contactListContainer.classList.add('d_none');
    } else if (domKey === 'oninput') {
        contactListContainer.classList.remove('d_none');
    } else {
        contactListContainer.classList.toggle('d_none');
    }
}


/**
 * render the contactlist in dropdownfield assigned to
 * 
 * @param {string} idKey -get the current ID of object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 */
function renderContactDropDown(idKey, taskKey, arrayKey, indexKey) {
    let dropDownRef = document.getElementById(`contactlist-dropdown-${idKey}`);
    dropDownRef.innerHTML = "";
    sortContacts();
    for (let dropDownIndex = 0; dropDownIndex < allContacts.length; dropDownIndex++) {
        const DROP = allContacts[dropDownIndex];
        dropDownRef.innerHTML += getContactRowDropDown(dropDownIndex, DROP, idKey, arrayKey, indexKey, taskKey);
        renderCheckbox(dropDownIndex, idKey, taskKey, arrayKey, indexKey);
    }
}


/**render the initials from contact zu dropdownfield assigned to */
/**
 * 
 * 
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {string} indexKey -the Index of the Task
 */
function renderContactlistInitials(taskKey, arrayKey, indexKey) {
    if (taskKey === 'add') {
        getContactListInitials();
    }
    if (taskKey === 'edit') {
        renderContactlistInitialsToEdit(arrayKey, indexKey);
    }
}


/**
 * render the Initials of the Contacts
 */
function getContactListInitials() {
    let initialsRef = document.getElementById('contactlist-initials');
    initialsRef.innerHTML = "";
    for (let initialsIndex = 0; initialsIndex < allContacts.length; initialsIndex++) {
        const INITIALS = allContacts[initialsIndex];
        if (INITIALS.checked === true) {
            initials.push(INITIALS);
            if (initalscount <= 3) {
                initialsRef.innerHTML += `<div class="initials" style="background-color: ${INITIALS.color};"><p>${INITIALS.initials}</p></div>`
                initalscount++;
            }
        }
    }
    calculateInitialsCount('', '');
}


/**
 * calculate the count of assigned Contacts more then 4.
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {string} indexKey -the Index of the Task
 */
function calculateInitialsCount(arrayKey, indexKey) {
    let memberCountRef = document.getElementById(`${arrayKey}initialscount${indexKey}`);
    memberCountRef.innerHTML = "";
    let memberCount = initials.length;
    if (memberCount > 4) {
        let overcount = memberCount - 4;
        memberCountRef.innerHTML += '+' + overcount;
    }
    initials = [];
    initalscount = 0;
}


/**
 * render Intials to edit template
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @returns -stop the function
 */
function renderContactlistInitialsToEdit(arrayKey, indexKey) {
    let editInitialsRef = document.getElementById(`${arrayKey}contactlist-initials${indexKey}`);
    editInitialsRef.innerHTML = "";
    let currenTask = getCurrentTask(arrayKey, indexKey);
    if (currenTask.assignedto === undefined) { return };
    for (let editIndex = 0; editIndex < currenTask.assignedto.length; editIndex++) {
        const EDITINITIALS = currenTask.assignedto[editIndex];
        initials.push(EDITINITIALS);
        if (initalscount <= 3) {
            editInitialsRef.innerHTML += `<div class="initials" style="background-color: ${EDITINITIALS.color};"><p>${EDITINITIALS.initials}</p></div>`
            initalscount++;
        }
    }
    calculateInitialsCount(arrayKey, indexKey);
}


/**
 * render the checkbox to contactlist
 * 
 * @param {number} dropDownIndex -the Index of the current Contact 
 * @param {string} idKey -get the current ID of object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 */
function renderCheckbox(dropDownIndex, idKey, taskKey, arrayKey, indexKey) {
    let checkboxContainer = document.getElementById(`${idKey}-checkbox-${dropDownIndex}`);
    checkboxContainer.innerHTML = "";
    let status;
    if (taskKey === 'edit') {
        status = getCurrentAssigndContactFromTask(arrayKey, indexKey, dropDownIndex);
    } if (taskKey === 'add') {
        status = getCkeckboxStatus(dropDownIndex);
    }
    checkboxContainer.innerHTML += `<button onclick="changeCheckStatus(event, ${dropDownIndex}, '${idKey}', '${taskKey}', '${arrayKey}', ${indexKey})"><img class="${status}" src="./assets/icon/${status}.svg" alt=""></button>`;
}


/**
 * get the current assigned status from every contact in the list
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @param {number} dropDownIndex -the Index of the current Contact 
 * @returns -returns the Status of the Contactlist Checkbox
 */
function getCurrentAssigndContactFromTask(arrayKey, indexKey, dropDownIndex) {
    let currentObject = getCurrentTask(arrayKey, indexKey);
    let currentContactID = allContacts[dropDownIndex].id
    if (currentObject.assignedto === undefined) { return 'default' }
    const findContact = currentObject.assignedto.find(toFind => toFind.id === currentContactID);
    if (findContact) {
        toggleContactlistRowColor(dropDownIndex, 'add');
        return 'checked'
    } else {
        toggleContactlistRowColor(dropDownIndex, 'remove');
        return 'default'
    }
}


/**
 * change the assigned status after click the checkbox
 * 
 * @param {event} event -the current Click Event
 * @param {number} dropDownIndex -the Index of the current Contact 
 * @param {string} idKey -get the current ID of object in template
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 */
function changeCheckStatus(event, dropDownIndex, idKey, taskKey, arrayKey, indexKey) {
    let currentContact = allContacts[dropDownIndex];
    let currentStatus = currentContact.checked;
    let currentContactID = currentContact.id;
    if (taskKey === 'edit') {
        editAssigndContactsInTask(arrayKey, indexKey, currentContact, currentContactID);
    }
    if (taskKey === 'add') {
        changeContactsCheckStatus(currentContact, currentStatus);
    }
    renderCheckbox(dropDownIndex, idKey, taskKey, arrayKey, indexKey);
    event.stopPropagation();
}


/**
 * change the Assigned Status of the current Contact
 * 
 * @param {object} currentContact -the current Contact Object
 * @param {boolean} currentStatus -the current Assigned Status
 */
function changeContactsCheckStatus(currentContact, currentStatus) {
    if (currentStatus === true) {
        currentContact.checked = false;
    }
    if (currentStatus === false) {
        currentContact.checked = true;
    }
}


/**
 * edit the assigend contacts in taskboard
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the Task
 * @param {object} currentContact -the current Contact Object
 * @param {number} currentContactID -the ID of the current Contact
 */
function editAssigndContactsInTask(arrayKey, indexKey, currentContact, currentContactID) {
    let currentObject = getCurrentTask(arrayKey, indexKey);
    if (currentObject.assignedto === undefined) {
        currentObject.assignedto = [];
    }
    let toEditContact = currentObject.assignedto.find(toFind => toFind.id === currentContactID);
    let toEditContactIndex = currentObject.assignedto.findIndex(toFind => toFind.id === currentContactID);
    if (toEditContact) {
        currentObject.assignedto.splice(toEditContactIndex, 1)
    } else {
        currentObject.assignedto.push(currentContact);
    }
}


/**
 * give the current checkboxstatus
 * 
 * @param {number} dropDownIndex -the Index of the current Contact 
 * @returns -returns the Status of the Contactlist Checkbox
 */
function getCkeckboxStatus(dropDownIndex) {
    let checkboxStatus = allContacts[dropDownIndex].checked;
    if (checkboxStatus === true) {
        toggleContactlistRowColor(dropDownIndex, 'add');
        return 'checked'
    } else {
        toggleContactlistRowColor(dropDownIndex, 'remove');
        return 'default'
    }
}


/**
 * put the current categrory from dropdown into inputfield
 * 
 * @param {string} valueKey -controls which category is included in the input field
 * @param {string} inputKey -get the current ID of Input Object in template
 */
function putToInputCategory(valueKey, inputKey) {
    let category = document.getElementById(`${valueKey}`).innerHTML;
    let inputfield = document.getElementById(`taskCategory-${inputKey}`);
    inputfield.value = ""
    inputfield.value += category;
}



