let doubleKey = false;

/**
 * set userBase
 */
function signUpInit() {
    userBase = 0.1
}

/**
 * create a contact card from current user and saved it in firebase
 * 
 * @param {object} user -the current User 
 */
async function pushUsertoAllContacts(user) {
    let currentUser = user;
    let doubleKey = checkDublikate(currentUser);
    if (doubleKey === true) {
        return
    }
    let contact = createContactObjectFromUser(currentUser)
    let contactID = 'u' + currentUser.id;
    await putData(`contacts/${contactID}`, contact);
}


/**
 * check wether the current User is already in contacts
 * 
 * @param {object} currentUser -the current User 
 * @returns -returns wether the current User is already in contacts
 */
function checkDublikate(currentUser) {
    let double = allContacts.find(contact => contact.email === currentUser.email);
    if (double) {
        doubleKey = true;
        return doubleKey
    } else {
        doubleKey = false
        return doubleKey
    }
}


/**
 * create the Contact Object from User
 * 
 * @param {*} currentUser -the current User 
 * @returns -returns the contact object Informations
 */
function createContactObjectFromUser(currentUser) {
    return {
        'name': currentUser.name + ' (You)',
        'email': currentUser.email,
        'phone': '',
        'initials': currentUser.initials,
        'color': currentUser.color,
        'checked': false,
        'id': 'u' + currentUser.id,
    }
}


/**
 * get the user initials from current user
 */
function getUserInitials() {
    getFromLocalStorage();
    let initialsRef = document.getElementById('header-initials');
    initialsRef.innerHTML = "";
    if (userBase !== 0.1) {
        if (userBase !== 0) {
            initialsRef.innerHTML += currentUser.initials
        } else {
            initialsRef.innerHTML += 'G'
        }
    }
}
