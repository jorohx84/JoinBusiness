const colors = [
    "#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8",
    "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701",
    "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"
];

/**
 * initialze and load the used data for contacts 
 */
async function contactsInit() {
    getUserInitials();
    changeHTML();
    getFromLocalStorage();
    await loadData();
    closeContactsField();
    if (responseToJson) {
        pushToArray(responseToJson.contacts, 'allContacts');
        pushToArray(responseToJson.tasks, 'allTasks');
    }
    renderContacts();
}


/**
 * responive DOM manipulation 
 */
window.addEventListener('resize', function () {
    changeHTML();
});


/**
 * close the contactfield
*/
function closeContactsField() {
    let contactOverlayRef = document.getElementById('contactsoverlay');
    contactOverlayRef.classList.add('d_none')
}


/**
 * make innerHTML of contactdata empty 
 */
function closeContactsData() {
    let contactOverlayRef = document.getElementById('contact-data');
    contactOverlayRef.innerHTML = "";
}


/**render the inputfield to create a new contact */
/**
 * 
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @param {number} contactIndex -the Index of the Contact
 */
function showContactsField(taskKey, contactIndex) {
    let contactOverlayRef = document.getElementById('contactsoverlay');
    contactOverlayRef.classList.remove('d_none');
    renderContactInputField(taskKey, contactIndex);
}


/** 
 * show the responive version of contact infos 
 */
function showContactInfosResponsive() {
    let contentRef = document.getElementById('contact-infos');
    contentRef.classList.remove('d_none');
}


/**
 * let the edit and delete button slide in
*/
function slidInEditButtons() {
    let slideInRef = document.getElementById('edit-buttons-responisve-container');
    slideInRef.classList.remove('slideInEdit');
}


/**
 * let the edit and delete button slide out 
 */
function slidOutEditButtons() {
    let slideInRef = document.getElementById('edit-buttons-responisve-container');
    slideInRef.classList.add('slideInEdit');
}


/**
 * hide the contact infos in mobile version 
 */
function hideContactInfosResponsive() {
    let contentRef = document.getElementById('contact-infos');
    contentRef.classList.add('d_none');
}


/**
 * hide the contactinfos, if the screen width is smaller then 1300px
 */
function changeHTML() {
    if (window.innerWidth <= 1300) {
        let contactDataRef = document.getElementById('contact-infos');
        if (contactDataRef === null) { return };
        contactDataRef.classList.add('d_none');
    }
}


/**
 * show feedback slider after create a new contact 
 */
function slideInSuccess() {
    let slideContact = document.getElementById('slideincontact');
    slideContact.classList.remove('slideoutcontact');
    setTimeout(() => {
        slideContact.classList.add('slideoutcontact');
    }, 1000);
}


/**
 * render contacts to the contactlist 
 */
function renderContacts() {
    let contactsRef = document.getElementById('contactlist');
    contactsRef.innerHTML = "";
    sortContacts();
    let currentLetter = "";
    for (let contactIndex = 0; contactIndex < allContacts.length; contactIndex++) {
        const CONTACT = allContacts[contactIndex];
        let firstLetter = CONTACT.name[0].toUpperCase();
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            contactsRef.innerHTML += getLetterTemplate(currentLetter);
        }
        contactsRef.innerHTML += getContactListTemplate(contactIndex, CONTACT);
    }
}


/**
 * render the contactinputfield or editfield 
 */
function renderContactInputField(taskKey, contactIndex) {
    let contactOverlayRef = document.getElementById('contactsoverlay');
    contactOverlayRef.innerHTML = "";
    if (taskKey === 'add') {
        contactOverlayRef.innerHTML += getContactsInputField();
    } if (taskKey === 'edit') {
        renderContactEditField(contactIndex);
    }
}


/**
 * render contact edit field
 * 
 * @param {number} contactIndex -the Index of the Contact
 */
function renderContactEditField(contactIndex) {
    let contactOverlayRef = document.getElementById('contactsoverlay');
    contactOverlayRef.innerHTML = "";
    const EDITCONTACT = allContacts[contactIndex];
    contactOverlayRef.innerHTML += getContactsEditField(contactIndex, EDITCONTACT);
}


/**
 * sort the contacts alphabetical from a to z 
 */
function sortContacts() {
    allContacts.sort((a, b) => {
        let firstNameA = a.name.split(" ")[0].toLowerCase();
        let firstNameB = b.name.split(" ")[0].toLowerCase();
        if (firstNameA < firstNameB) return -1;
        if (firstNameA > firstNameB) return 1;
        return 0;
    });
}


/**
 * rendert contactdata after click an contactcard
 * 
 * @param {number} contactIndex -the Index of the Contact
 */
function renderContactData(contactIndex) {
    changeContactListRowStyle(contactIndex);
    let contactDataRef = document.getElementById('contact-data');
    contactDataRef.innerHTML = "";
    contactDataRef.innerHTML += getContactDataTemplate(contactIndex);
}


/**
 * change contact style when click on it 
 * 
 * @param {number} contactIndex -the Index of the Contact
 */
function changeContactListRowStyle(contactIndex) {
    let contactRowRef = document.getElementById(`contactlistrow${contactIndex}`);
    for (let index = 0; index < allContacts.length; index++) {
        let contactRowRef = document.getElementById(`contactlistrow${index}`);
        contactRowRef.classList.remove('contactlistrow-hoverstyle')
    }
    contactRowRef.classList.add('contactlistrow-hoverstyle');
}


/**
 * change the contact values
 * 
 * @param {number} contactIndex -the Index of the Contact
 */
async function editContact(contactIndex) {
    let newName = document.getElementById('contactname');
    let newEmail = document.getElementById('contactmail');
    let newPhone = document.getElementById('contactphone');
    let currentContact = allContacts[contactIndex];
    currentContact.name = newName.value;
    currentContact.email = newEmail.value;
    currentContact.phone = newPhone.value;
}


/**
 * update the new contactinfos
 * 
 * @param {number} contactIndex -the Index of the Contact
 */
async function updateContactData(contactIndex) {
    editContact(contactIndex);
    await updateContacts(contactIndex)
    closeContactsField();
    renderContacts();
    renderContactData(contactIndex);
}


/**
 * save the new contactinfos to firebase
 */
async function updateContacts(contactIndex) {
    let currentContact = allContacts[contactIndex]
    let contactID = currentContact.id;
    await putData(`contacts/${contactID}`, currentContact);
    pushToArray(responseToJson.contacts, 'allContacts');
}


/**
 * delete contact
 * 
 * @param {number} contactIndex -the Index of the current Contact
 */
async function deleteContact(contactIndex) {
    let currentContact = allContacts[contactIndex]
    let contactID = currentContact.id;
    let validate = checkCurrentUser(currentContact);
    if (validate === false) {
        await deleteCurrentContact(currentContact, contactID, contactIndex);
    }
}


/**
 * deletes the current Contact from Contactlist and Tasks
 * 
 * @param {object} currentContact -the current Contact Object
 * @param {number} contactID -the ID of the curretn Contact
 * @param {number} contactIndex -the Index of the current Contact
 */
async function deleteCurrentContact(currentContact, contactID, contactIndex){
    deleteContactsInTasks(contactIndex);
    await deleteData(`contacts/${contactID}`, currentContact);
    closeContactsData();
    closeContactsField();
    hideContactData();
    await loadData();
    pushToArray(responseToJson.contacts, 'allContacts');
    renderContacts();
}


/**
 * hide the Contactdata window
 */
function hideContactData(){
    if (window.innerWidth < 1300) {
        hideContactInfosResponsive();
    }
}


/**
 * checks wether the current Contact is the User
 * 
 * @param {number} currentContact -the current Contact Object
 * @returns -returns validate
 */
function checkCurrentUser(currentContact) {
    if (userBase !== 0) {
        if (currentContact.email !== currentUser.email) {
            validate = false
        } else {
            validate = true;
        }
    }
    else {
        validate = false;
    }
    return validate
}


/**
 * find all tasks to which the contact is currently assigned
 * 
 * @param {number} contactIndex -the Index of the Contact 
 */
async function deleteContactsInTasks(contactIndex) {
    for (let taskIndex = 0; taskIndex < allTasks.length; taskIndex++) {
        const toDelete = allTasks[taskIndex];
        await checkToDeleteContactInTask(contactIndex, toDelete);
    }
}


/**
 * deletes the contact from all tasks to which it is currently assigned
 * 
 * @param {number} contactIndex -the Index of the Contact 
 * @param {object} toDelete -the contact that should be deleted
 * @returns -stop the function
 */
async function checkToDeleteContactInTask(contactIndex, toDelete) {
    let currentContact = allContacts[contactIndex];
    let currentContactID = currentContact.id;
    let currentAssignedContacts = toDelete.assignedto
    if (toDelete.assignedto === undefined) { return };
    for (let deleteIndex = 0; deleteIndex < currentAssignedContacts.length; deleteIndex++) {
        const toDeleteContact = currentAssignedContacts[deleteIndex];
        if (toDeleteContact.id === currentContactID) {
            currentAssignedContacts.splice(deleteIndex, 1);
            await updateTasks(toDelete);
        }
    }
}