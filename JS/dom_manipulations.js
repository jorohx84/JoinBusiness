let privacyAccept = false;
let saveUser = false;

/**
 * give the category element in taskcard his color
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {string} taskIndex -the current Index of the Task
 * @param {object} TASK -the current Task
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 */
function checkColorOfCategory(arrayKey, taskIndex, TASK, taskKey) {
    let category;
    if (taskKey === 'add') {
        category = document.getElementById(`${arrayKey}category${taskIndex}`);
    } else {
        category = document.getElementById(`${arrayKey}category-overlay${taskIndex}`);
    }
    if (TASK.Category === 'User Story') {
        category.classList.add('cat-blue');
    } if (TASK.Category === 'Technical Task') {
        category.classList.add('cat-green')
    }
}


/**
 * show the task template
 */
function showTaskTemplate() {
    let taskOverlayRef = document.getElementById('taskoverlay');
    taskOverlayRef.classList.remove('d_none')
}


/**
 * hide the task template
 */
function hideTaskTemplate() {
    let taskOverlayRef = document.getElementById('taskoverlay');
    taskOverlayRef.classList.add('d_none');
}


/**
 * open the task card
 */
function openTaskCard() {
    let taskCardOverlay = document.getElementById('task-card-overlay');
    taskCardOverlay.classList.remove('d_none');
    let taskCardContentOverlay = document.getElementById('task-card-overlay-content');
    taskCardContentOverlay.classList.remove('slideOut');
}


/**
 * close the task card
 */
function closeTaskCard() {
    let taskCardOverlay = document.getElementById('task-card-overlay');
    taskCardOverlay.classList.add('d_none');
    let taskCardContentOverlay = document.getElementById('task-card-overlay-content');
    taskCardContentOverlay.classList.add('slideOut')
}


/**
 * reflect the dropdown arrow Button
 * 
 * @param {string} idKey -get the current ID of object in template
 * @param {event} event -the current Click Event
 */
function refelctDropDownButton(idKey, event) {
    let dropDown = document.getElementById(`reflect-img-${idKey}`);
    if (dropDown.style.transform === 'scaleY(-1)') {
        dropDown.style.transform = 'scaleY(1)';
    } else {
        dropDown.style.transform = 'scaleY(-1)';
    }
    event.stopPropagation();
}

/**
 * toogle the Dropdown Button after close Dropwdown
 */
function refelctButtons(event) {
    let contactlist = document.getElementById(`reflect-img-contact`);
    let category = document.getElementById(`reflect-img-category`);
    contactlist.style.transform = 'scaleY(1)';
    category.style.transform = 'scaleY(1)';
    event.stopPropagation();
}


/**
 * toogle the subtask buttons
 * 
 * @param {string} idKey -get the current ID of object in template
 * @param {string} buttonKey -declares which button was pressed
 */
function changeSubtaskButtons(idKey, buttonKey) {
    let subTaskButton = document.getElementById(`subtask-buttons-${idKey}`);
    let activateButton = document.getElementById(`subtask-activate-button-${idKey}`);

    if (buttonKey === 'activate') {
        subTaskButton.classList.remove('d_none');
        activateButton.classList.add('d_none');
    }
    if (buttonKey === 'sub') {
        subTaskButton.classList.add('d_none');
        activateButton.classList.remove('d_none');
    }
}


/**
 * show the subtask row buttons
 * 
 * @param {number} subIndex -the Index of the Subtask
 * @param {string} idKey -get the current ID of object in template
 */
function showSubRowButtons(subIndex, idKey) {
    let subRowRef = document.getElementById(`${subIndex}subtasks-button-row-${idKey}`)
    subRowRef.classList.remove('d_none')
    let editButtons = document.getElementById(`${subIndex}subtask-edit-buttons-${idKey}`)
    editButtons.classList.add('d_none')
}


/**
 * show slider after added a new task
 * 
 * @param {string} slideKey -declares which slider should be displayed
 */
function showcompleteSliderBoardTask(slideKey) {
    let slideRef = document.getElementById('slideout-board-added');
    if (slideKey === 'board') {
        slideRef.classList.remove('d_none')
        setTimeout(function () {
            slideRef.classList.add('d_none')
            hideTaskTemplate();
        }, 800);
    }
    if (slideKey === 'addtask') {
        slideRef.classList.remove('slideout-board-added')
    }
}


/**
 * show slider after correctly sign up
 */
function showSignUpSlider() {
    slideRef = document.getElementById('signup-slider');
    slideRef.classList.remove('signup-slidin');
}


/**
 * toggle the chechbox img
 * 
 * @param {string} idKey -get the current ID of object in template
 */
function showVasibilitiy(idKey) {
    let showVasibilitiyRef = document.getElementById(`${idKey}-visibility`);
    let lockRef = document.getElementById(`${idKey}-lock`)
    showVasibilitiyRef.classList.toggle('d_none');
    lockRef.classList.add('d_none')
}


/**
 * toggle the chechbox img
 * 
 * @param {string} idKey -get the current ID of object in template
 */
function showVasibilitiyOff(idKey) {
    let inputRef = document.getElementById(`${idKey}-password`);
    let showVasibilitiyRef = document.getElementById(`${idKey}-visibility`);
    let showVasibilitiyOffRef = document.getElementById(`${idKey}-visibility_off`)
    let lockRef = document.getElementById(`${idKey}-lock`)
    if (inputRef.value.length === 1) {
        lockRef.classList.remove('d_none');
        showVasibilitiyOffRef.classList.add('d_none');
    }
    else {
        showVasibilitiyOffRef.classList.remove('d_none');
        showVasibilitiyRef.classList.add('d_none')
        lockRef.classList.add('d_none')
    }
}


/**
 * change contactlist row color when hover
 * 
 * @param {number} dropDownIndex -the Index of the current Contact in Contactlist Dropdown
 * @param {string} colorKey -indicates whether the element gets the style
 */
function toggleContactlistRowColor(dropDownIndex, colorKey) {
    let rowColorRef = document.getElementById(`${dropDownIndex}contactlistrow-drop`);
    if (colorKey === 'add') {
        rowColorRef.classList.add('rowcolor');
        rowColorRef.style.color = "white";
        rowColorRef.classList.remove(':hover');
    }
    if (colorKey === 'remove') {
        rowColorRef.classList.remove('rowcolor');
        rowColorRef.style.color = "black";
    }
}


/**
 * open the categorylist in task
 * 
 * @param {event} event - the current Click Event 
 */
function openCategoryList(event) {
    let categoryRef = document.getElementById('contactlist-dropdown-category');
    categoryRef.classList.toggle('d_none')
    event.stopPropagation();
}


/**
 * close the category list in task
 */
function closeCategoryList() {
    let categoryRef = document.getElementById('contactlist-dropdown-category');
    categoryRef.classList.add('d_none')
}


/**
 * show the passord when your click on vasibility 
 * 
 * @param {string} idKey -get the current ID of object in template
 * @param {string} buttonKey -declares which button was pressed
 */
function togglePassword(idKey, buttonKey) {
    let passwordInput = document.getElementById(`${idKey}`);
    let showVasibilitiyRef = document.getElementById(`${buttonKey}-visibility`);
    let showVasibilitiyOffRef = document.getElementById(`${buttonKey}-visibility_off`);
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    showVasibilitiyRef.classList.toggle('d_none');
    showVasibilitiyOffRef.classList.toggle('d_none');
}


/**
 * toggle the checkbox privacy on signup field
 * 
 * @param {string} checkKey -declares whether the current user should be saved
 */
function changePrivacyCheckbox(checkKey) {
    let privacyMessage = document.getElementById('accept-privacy-error');
    let defaultRef = document.getElementById('default-privacy');
    let checkedRef = document.getElementById('checked-privacy');
    defaultRef.classList.toggle('d_none');
    checkedRef.classList.toggle('d_none');
    if (checkKey === 'login') {
        saveUser = !saveUser;
        saveToLocalStorage("", "", saveUser, checkKey);
    } else {
        privacyAccept = !privacyAccept;
        privacyMessage.textContent = "";
    }
}


/**
 * slide in the logout field
 */
function slideLogout() {
    let logoutRef = document.getElementById('logout');
    logoutRef.classList.toggle('slideouthelp');
}


/**
 * check if a user want to save his login data an get the correct checkbox status
 */
function getCheckedRememberBox() {
    let defaultRef = document.getElementById('default-privacy');
    let checkedRef = document.getElementById('checked-privacy');
    getFromLocalStorage();
    if (saveUser === true) {
        defaultRef.classList.toggle('d_none');
        checkedRef.classList.toggle('d_none');
    }
}


/**
 * toggle the movebutton in taskcard
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {number} indexKey -the Index of the TaskCard
 * @param {event} event -the current Click Event
 */
function toggleMoveToButtons(arrayKey, indexKey, event) {
    let moveToButtonsRef = document.getElementById(`movetobuttons-${arrayKey}${indexKey}`);
    moveToButtonsRef.classList.toggle('d_none');
    let hidebutton = document.getElementById(`button-${arrayKey}${indexKey}${arrayKey}`);
    hidebutton.classList.add('d_none');
    event.stopPropagation();
}


/**
 * toggle  the Progressbar Status
 * 
 * @param {*} arrayKey -the current Array the new Task is 
 * @param {*} indexKey -the Index of the TaskCard
 * @param {*} event -the current Click Event
 */
function showProgressBarStatus(arrayKey, indexKey, event) {
    let statusRef = document.getElementById(`${arrayKey}subtasks-done${indexKey}`);
    statusRef.classList.toggle('d_none');
    event.stopPropagation();
}