
/**
 * initialze and load the used data for the login
 */
async function loginInit() {
    await loadData();
    if (responseToJson) {
        pushToArray(responseToJson.users, 'allUsers');
        pushToArray(responseToJson.contacts, 'allContacts');
        pushToArray(responseToJson.tasks, 'allTasks');
    }
    loadUserInput();
    getCheckedRememberBox();
    currentUser = {};
    let userBase = 0.1;
    saveToLocalStorage(userBase, '');
}


/**
 * validate the guest login
 * */
function guestLoginValidation() {
    userBase = 0;
    saveToLocalStorage(userBase, '', saveUser, 'login');
    window.location.href = "summery.html"
}

/**
 * check the user validation and giv feedback
 */
function checkUserValidation() {
    let emailRef = document.getElementById('login-email');
    let passwordRef = document.getElementById('login-password')
    let currentEmail = emailRef.value;
    let currentPassword = passwordRef.value;
    let currentUser = allUsers.find(user => user.email === currentEmail);
    checkUserPassword(currentUser, currentPassword);

}


/**
 * validate the User Password
 * 
 * @param {object} currentUser -the current User who who wants to log In
 * @param {string} currentPassword -the Password of the current User
 * @returns -stop the function
 */
async function checkUserPassword(currentUser, currentPassword) {
    let typeMessage = document.getElementById('typemessage');
    if (currentUser) {
        if (currentPassword !== currentUser.password) {
            typeMessage.textContent = ' Check your password. Please try again.'
            return
        };
        await createContactFromUser(currentUser, typeMessage)
    } else {
        typeMessage.textContent = 'User do not exist. Please try again.'
    }
}


/**
 * create the Contact From current User
 * 
 * @param {object} currentUser -the current User who who wants to log In
 * @param {element} typeMessage -the Element in DOM 
 */
async function createContactFromUser(currentUser, typeMessage) {
    typeMessage.textContent = "";
    getUserBase(currentUser);
    if (userBase !== 0) {
        await pushUsertoAllContacts(currentUser);
    }
    window.location.href = "summery.html"
}


/**
 * save the current userBase to local storage, so Each user sees their own data in the application
 * 
 * @param {object} currentUser -the current User who who wants to log In
 */
function getUserBase(currentUser) {
    userBase = currentUser.id;
    saveToLocalStorage(userBase, currentUser);
    getFromLocalStorage();
}


/**
 * save data to local storage
 * 
 * @param {number} userBase - every user hav its own userBase with their own Database
 * @param {object} currentUser -the current User who who wants to log In or sign Up
 * @param {boolean} saveUser -declares if the user wants to remember login dates
 * @param {string} checkKey -declares the user wants to log In or to sign Up
 * @returns -stop the function
 */
function saveToLocalStorage(userBase, currentUser, saveUser, checkKey) {
    if (checkKey === 'login') {
        localStorage.setItem('saveUser', saveUser);
        localStorage.setItem('userBase', userBase);
        return
    } else {
        localStorage.setItem('userBase', userBase);
        if (userBase !== 0 && currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }
}


/**
 * get data from local storage
 * */
function getFromLocalStorage() {
    let currentUserBase = localStorage.getItem('userBase');
    currentUserBase = JSON.parse(currentUserBase);
    userBase = currentUserBase;
    let saveUserStatus = localStorage.getItem('saveUser');
    saveUserStatus = JSON.parse(saveUserStatus);
    saveUser = saveUserStatus;
    if (userBase !== 0) {
        let savedCurrentUser = localStorage.getItem('currentUser');
        savedCurrentUser = JSON.parse(savedCurrentUser);
        currentUser = savedCurrentUser;
    }
}


/**
 * validate the inputfields and give feedback
 * 
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {number} contactIndex -the Index of the current Contact
 * @param {string} arrayKey -the current Array the new Task is
 * @param {string} idKey -get the current ID of object in template
 * @returns -stop the function
 */
function validateInputFields(taskKey, contactIndex, arrayKey, idKey,) {
    let validate = true
    let inputField = document.getElementsByClassName('required');
    removeAllError(inputField);
    for (let index = 0; index < inputField.length; index++) {
        const field = inputField[index];
        validate = checkInputValue(field, validate);
        if (validate === false) { return }
    }
    createNewTaskToBoard(taskKey, arrayKey, idKey, contactIndex);
}


/**
 * remove all error Messages from required Inputfields
 * 
 * @param {element} inputField -the current Inputfield
 */
function removeAllError(inputField) {
    for (let index = 0; index < inputField.length; index++) {
        const error = inputField[index];
        let errorMessage = document.getElementById(`${error.name}`);
        let typeMessage = document.getElementById('typemessage');
        errorMessage.textContent = "";
        if (typeMessage) {
            typeMessage.textContent = "";
        }
    }
}

/**
 * checks whether the input field has a value
 * 
 * @param {element} field -the current Inputfield
 * @param {boolean} validate -daclares if the inputfield has an value
 * @returns -returns the validate
 */
function checkInputValue(field, validate) {
    let errorMessage = document.getElementById(`${field.name}`);
    errorMessage.textContent = "";
    if (field.value.trim() === "") {
        field.classList.add('error');
        errorMessage.textContent = 'this field is required';
        validate = false;
    } else {
        field.classList.remove('error');
        validate = checkFieldType(field, validate);
    }
    return validate
}


/**
 * check if passwords and phonenumbers are correct
 * 
 * @param {element} field -the current Inputfield
 * @param {boolean} validate -daclares if the inputfield value is correct
 * @returns -returns validate
 */
function checkFieldType(field, validate) {
    if (field.type === "email") {
        validate = checkEmailValidation(field, validate)
        if (validate === false) { return validate }
    } else if (field.type === "password") {
        validate = checkPasswordValidation(field, validate);
        if (validate === false) { return validate }
    }
    validate = true;
    return validate;
}


/**
 * checks wether the email ist correct
 * 
 * @param {element} field -the current Inputfield
 * @param {boolean} validate -daclares if the inputfield value is correct
 * @returns -return validate
 */
function checkEmailValidation(field, validate) {
    let typeMessage = document.getElementById('typemessage');
    typeMessage.textContent = "";
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(field.value)) {
        field.classList.add('error');
        typeMessage.textContent = ' Check your email. Please try again.'
        validate = false
    }
    return validate
}


/**
 * checks wether the password ist correct
 * 
  * @param {element} field -the current Inputfield
 * @param {boolean} validate -daclares if the inputfield value is correct
 * @returns -return validate
 */
function checkPasswordValidation(field, validate) {
    let typeMessage = document.getElementById('typemessage');
    typeMessage.textContent = "";
    if (!/^\d+$/.test(field.value)) {
        field.classList.add('error');
        typeMessage.textContent = ' Check your password. Please try again.'
        validate = false;
    }
    return validate
}


/**
 * if all inputfield are correctly filled, the appropriate element will create
 * 
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {string} arrayKey -the current Array the new Task is
 * @param {string} idKey -get the current ID of object in template
 * @param {number} contactIndex -the Index of the current Contact
 */
async function createNewTaskToBoard(taskKey, arrayKey, idKey, contactIndex) {
    if (taskKey === 'board') { creatNewTask(arrayKey, idKey); showcompleteSliderBoardTask('board'); }
    if (taskKey === 'task') { addNewTask(); }
    if (taskKey === 'login') {
        checkUserValidation();
    }
    if (taskKey === 'contact') {
        slideInSuccess();
        await addContact();
        closeContactsField();
    }
    if (taskKey === 'contactedit') { updateContactData(contactIndex); }
    if (taskKey === 'signup') { validatePasswordConfirm(); }
}



/**
 * check privacy accept
 * 
 * @param {boolean} validate -daclares wether the privacy Police ist accepted
 * @returns -return validate
 */
function checkPrivacy(validate) {
    let privacyMessage = document.getElementById('accept-privacy-error');
    if (privacyAccept === false) {
        privacyMessage.textContent = 'Accept the Privacy Police'
        validate = false;
        return validate
    } else {
        privacyMessage.textContent = "";
    }
}


/**
 * check the confirm of the user password 
 */
async function validatePasswordConfirm() {
    let validate = true;
    let privacyMessage = document.getElementById('accept-privacy-error');
    privacyMessage.textContent = "";
    let currentPassword = document.getElementById('signup-password').value;
    let currentConfirm = document.getElementById('confirm-password').value;
    if (currentConfirm === "") { return };
    await checkSignUpPassword(currentPassword, currentConfirm, validate)
}


/**
 * 
 * @param {string} currentPassword -the current Password 
 * @param {string} currentConfirm -the confirm Password
 * @param {boolean} validate --daclares whether the passwords are the same
 * @returns -return validate
 */
async function checkSignUpPassword(currentPassword, currentConfirm, validate) {
    let typeMessage = document.getElementById('typemessage');
    if (currentConfirm !== currentPassword) {
        typeMessage.textContent = ' Check your password. Please try again.'
        return
    } else {
        typeMessage.textContent = "";
        validate = checkPrivacy(validate)
        if (validate === false) { return }
        showSignUpSlider();
        await addUser();
        window.location.href = "index.html"
    }
}


/**
 * logout the user und delete data
 */
async function logoutUser() {
    if (userBase !== 0 && userBase !== 0.1) {
        resetContacts();
        let userContact = currentUser.email;
        let currentContact = allContacts.find(contact => contact.email === userContact);
        if (currentContact) {
            let contactID = currentContact.id
            userBase = 0.1;
            saveToLocalStorage(userBase, currentUser);
            await deleteData(`contacts/${contactID}`, currentContact);
        }
    }
    userBase = 0.1;
    saveToLocalStorage(userBase);
    window.location.href = "index.html"
}


/**
 * if the user save his login data, the user password will show in the inputfield
 */
function loadUserInput() {
    getFromLocalStorage();
    if (userBase === 0) {
        return
    }
    if (saveUser === true) {
        let loginRef = document.getElementById('login-email');
        let currentMail = currentUser.email
        loginRef.value = "";
        loginRef.value = currentMail;
    }
}


/**
 * reset the assigned Status of all Contacts
 */
function resetContacts() {
    for (let index = 0; index < allContacts.length; index++) {
        const contact = allContacts[index];
        contact.checked = false;
    }
}


/**
 * change the remember status after click on checkbox in the loginfield
 */
function changeRememberStatus() {
    let loginRef = document.getElementById('login-email');
    let input = loginRef.value
    if (input = "") {
        saveUser = false;
        saveToLocalStorage('', '', saveUser, 'login');
    }
}
