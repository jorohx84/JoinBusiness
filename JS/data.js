let allUsers = [];
let allContacts = [];
let allTasks = [];
let idNumber = 1;
let contactIdNumber = 1;
let userBase;

const BASE_URL = "https://join-3a5f3-default-rtdb.europe-west1.firebasedatabase.app/";


/**
 * load data from Firebase and LocalStorage
 */
async function init() {
    getFromLocalStorage();
    await loadData();
}


/**
 * initialze and load the used data for the data
 * 
 * @param {string} path - the path in Firebase Database 
 * @returns -returns the Data JSON
 */
async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    return responseToJson = await response.json();
}



/**
 * post data to firebase
 * 
 * @param {string} path -the path in Firebase Database 
 * @param {JSON} data -the Data JSON
 * @returns -returns the Data JSON
 */
async function postData(path = "", data) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}


/**
 * create an new user and post it to firebase
 */
async function addUser() {
    const useridResponse = await loadData(`userIdNumber`);    
    let userID = useridResponse && useridResponse.userIdNumber ? useridResponse.userIdNumber : 1;
    const user = createUserObject(userID);
    await putData(`users/${userID}`, user);
    await loadData();
    userID++;
    const newUserID = { userIdNumber: userID };
    await putData('userIdNumber', newUserID)
    pushToArray(responseToJson.users, 'allUsers');
}


/**
 * create a new user object
 * 
 * @param {number} userID -the ID of the new User
 * @returns -returns the User Object
 */
function createUserObject(userID) {
    const name = document.getElementById("signup-name");
    const email = document.getElementById("signup-email");
    const password = document.getElementById("signup-password");
    let initials = findInitials(name);
    let color = getRandomColor();
    return {
        'name': name.value,
        'email': email.value,
        'password': password.value,
        'id': userID,
        'color': color,
        'initials': initials,
    };
}


/**
 * create a new contact an post it in firebase
 */
async function addContact() {
    const contactidResponse = await loadData(`contactIdNumber`);
    let contactID = contactidResponse && contactidResponse.contactIdNumber !== undefined ? contactidResponse.contactIdNumber : 1;
    const contact = createContactObject(contactID);
    await putData(`contacts/${contactID}`, contact);
    await loadData();
    contactID++;
    const newContactID = { contactIdNumber: contactID };
    await putData(`contactIdNumber`, newContactID);
    pushToArray(responseToJson.contacts, 'allContacts');
    renderContacts();
}


/**
 * create a new contact object 
 * 
 * @param {number} contactID 
 * @returns -returns the Contact Object
 */
function createContactObject(contactID) {
    const contactName = document.getElementById('contactname');
    const contactMail = document.getElementById('contactmail');
    const contactPhone = document.getElementById('contactphone');
    let initials = findInitials(contactName);
    let color = getRandomColor();
    return {
        'name': contactName.value,
        'email': contactMail.value,
        'phone': contactPhone.value,
        'initials': initials,
        'color': color,
        'checked': false,
        'id': contactID,
    }
}



/**
 * finde the initiass from new contact
 * 
 * @param {value} contactName -the Name of the new Contact 
 * @returns -returns the Intitials of the new Contact or User
 */
function findInitials(contactName) {
    let nameParts = contactName.value.split(" ");
    let initials = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
    return initials;
}


/**
 * give the new contact a fixed random color
 * 
 * @returns -returns the Color Code of the new Contact or User
 */
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}


/**
 * create a new task and save it to firebase
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {string} idKey -get the current ID of object in template
 */
async function addTask(arrayKey, idKey) {
    const idResponse = await loadData(`taskIdNumber`);
    let currentId = idResponse && idResponse.taskIdNumber ? idResponse.taskIdNumber : 1;
    const task = createTaskObject(currentId, idKey, arrayKey);
    await putData(`tasks/${currentId}`, task);
    await loadData();
    currentId++;
    const newIdData = { taskIdNumber: currentId };
    await putData(`taskIdNumber`, newIdData);
    pushToArray(responseToJson.tasks, 'allTasks')
    checkNextStep(arrayKey);
}



/**create task object */
/**
 * 
 * @param {number} currentId -the ID of the new Task
 * @param {string} idKey -get the current ID of object in template
 * @param {string} arrayKey -the current Array the new Task is
 * @returns -returns the Task Object
 */
function createTaskObject(currentId, idKey, arrayKey) {
    let taskTitle = document.getElementById(`tasktitle-${idKey}`);
    let taskDescription = document.getElementById(`taskdescription-${idKey}`);
    let taskDate = document.getElementById(`taskdate-${idKey}`);
    let taskCategory = document.getElementById(`taskCategory-${idKey}`)
    let sub = subtasks;
    let assign = assigned;
    let prio = priority;
    return {
        'Title': taskTitle.value,
        'Description': taskDescription.value,
        'Date': taskDate.value,
        'Prio': prio,
        'Category': taskCategory.value,
        'id': currentId,
        'taskID': arrayKey,
        'subtasks': sub,
        'assignedto': assign,
        'firebaseID': currentId
    }
}


/**
 * get all data from firebase and push it in local arrays
 * 
 * @param {JSON} data -the Data JSON
 * @param {string} arrayKey -the current Array the new Task is
 * @returns -stop the function
 */
function pushToArray(data, arrayKey) {
    if (data === undefined) {
        return
    }
    chooseArray(arrayKey);
    let objects = data
    if (objects === undefined) { return }
    const currentArray = Object.values(objects);
    for (let index = 0; index < currentArray.length; index++) {
        const element = currentArray[index];
        chooseArrayToPush(arrayKey, element);
    }
}


/**change to board after add Task */
/**
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @returns -stop the function
 */
function checkNextStep(arrayKey) {
    if (changeSite === true) {
        changeSite = false;
        window.location.href = "board.html"
        return;
    }
    getcurrentTemplates(arrayKey);
}


/**
 * choose the right array
 * 
 * @param {string} arrayKey -the current Array the new Task is
 */
function chooseArray(arrayKey) {
    if (arrayKey === 'allUsers') {
        allUsers = [];
    }
    if (arrayKey === 'allContacts') {
        allContacts = [];
    }
    if (arrayKey === 'allTasks') {
        allTasks = [];
    }
}


/**
 * push the new task in to the correct Array
 * 
 * @param {string} arrayKey -the current Array the new Task is
 * @param {object} element -the new Task Object
 */
function chooseArrayToPush(arrayKey, element) {
    if (arrayKey === 'allUsers') {
        allUsers.push(element);
    }
    if (arrayKey === 'allContacts') {
        allContacts.push(element);
    }
    if (arrayKey === 'allTasks') {
        allTasks.push(element);
    }
}


/**
 * substitute the current data in firebase
 * 
 * @param {string} path -the path in Firebase Database 
 * @param {JSON} data -the Data JSON
 * @returns returns the Data JSON
 */
async function putData(path = "", data) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}


/**
 * delete data in firebase
 * 
 * @param {string} path -the path in Firebase Database 
 * @returns -returns the Data JSON
 */
async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
}



/**
 * render user initials to header logo
 */
function legalinit() {
    getUserInitials();
    if (userBase !== 0.1) {
        let hide = document.getElementsByClassName('hide');
        for (let index = 0; index < hide.length; index++) {
            const element = hide[index];
            element.classList.remove('d_none')
        }
    }
}

