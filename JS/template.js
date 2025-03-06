/**
 * get the Contact List Template
 * 
 * @param {number} contactIndex -the Index of the current Contact
 * @param {object} CONTACT -the current Contact Object
 * @returns -returns the DOM Element
 */
function getContactListTemplate(contactIndex, CONTACT) {

    return `<div onclick="showContactInfosResponsive(); renderContactData(${contactIndex})"  class="contactlistrow" id="contactlistrow${contactIndex}">

    <div class="initials" style="background-color: ${CONTACT.color};"><p>${CONTACT.initials}</p></div>
    <div>
        <p>${CONTACT.name}</p>
        <p class="maillink">${CONTACT.email}</p>
    </div>
    
</div>`
}


/**
 * create the Letter Headline in Contactlist
 * 
 * @param {string} currentLetter -the currentLetter of Contactrow
 * @returns -returns the DOM Element
 */
function getLetterTemplate(currentLetter) {

    return `<div class="letter"><p>${currentLetter}</p></div>`
}


/**
 * get the Contact Inputfield
 * 
 * @returns -returns the DOM Element
 */
function getContactsInputField() {

    return `<div class="contacts-inputfield">

<div class="contacts-inputfield-left">
<button onclick="closeContactsField()" class="close-button-responsive">x</button>
    <img src="./assets/img/logo.png" alt="">
    <p>Add contact</p>
    <div></div>
    
</div>
<div class="contacts-inputfield-right">
    <button  onclick="closeContactsField()" class="close-button">x</button>
     
    <div class="contactlogo-container">

        <div class="contactlogo-add">

            <img src="./assets/icon/person.svg" alt="">
        </div>

    </div>
    <div class="contactinput">
        <div>
        <input class="required" name="contact-name" type="text" placeholder="Name" id="contactname">
        <div class="errortext" id="contact-name"></div>
        </div>
        <div>
        <input class="required" name="contact-mail" type="email" placeholder="E-Mail" id="contactmail">
         <div class="errortext" id="contact-mail"></div>
         <div class="errortext" id="typemessage"></div>
         </div>
         <div>
        <input class="required" name="contact-phone" type="text" placeholder="Phone" id="contactphone">
         <div class="errortext" id="contact-phone"></div>
         </div> 

        <div class="inputfield-buttons-container">

            <button onclick="closeContactsField()" class="gap cancelbutton btn-light">Cancel<img src="./assets/icon/clear.svg" alt=""></button>
            <button class="gap btn-dark" onclick="validateInputFields('contact')">Create Contact<img src="./assets/icon/check.png" alt=""></button>


        </div>
    </div>
</div>
</div>`
}


/**
 * get the Contact Editfield
 * 
 * @param {number} contactIndex -the Index of the current Contact
 * @param {*} EDITCONTACT -the Contact to Edit 
 * @returns --returns the DOM Element
 */
function getContactsEditField(contactIndex, EDITCONTACT) {

    return `<div class="contacts-inputfield">

<div class="contacts-inputfield-left">
<button onclick="closeContactsField()" class="close-button-responsive">x</button>
    <img src="./assets/img/logo.png" alt="">
    <p>Edit contact</p>
    <div></div>
</div>
<div class="contacts-inputfield-right">
    <button onclick="closeContactsField()" class="close-button">x</button>
    <div class="contactlogo-container">

          <div class="contactlogo" style="background-color:${EDITCONTACT.color}">

              <p id="initialsDisplay" >${EDITCONTACT.initials}</p>
        </div>

    </div>
    <div class="contactinput">
        <div>
        <input class="required" name="contact-name" value="${EDITCONTACT.name}" type="text"  id="contactname">
        <div class="errortext" id="contact-name"></div>
        </div>
        <div>
        <input class="required" name="contact-mail" value="${EDITCONTACT.email}" type="email" id="contactmail">
         <div class="errortext" id="contact-mail"></div>
          <div class="errortext" id="typemessage"></div>
         </div>
         <div>
        <input class="required" name="contact-phone" value="${EDITCONTACT.phone}" type="text" id="contactphone">
         <div class="errortext" id="contact-phone"></div>
         </div> 

        <div class="inputfield-buttons-container">

            <button onclick="deleteContact(${contactIndex})" class="btn-light">Delete</button>
            <button class="gap btn-dark" onclick="validateInputFields('contactedit', ${contactIndex})">Save<img src="./assets/icon/check.png" alt=""></button>


        </div>
    </div>
</div>
</div>`
}


/**
 * get the Contactlist Row Element
 * 
 * @param {number} dropDownIndex - the Index of the Contact in Dropdown
 * @param {object} DROP -the Coontact Object in Dropdown
 * @param {string} idKey -the ID of the DOM Element
 * @param {string} arrayKey -the current Array the Task actually is
 * @param {number} indexKey -the Index of the current TaskCard
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @returns -returns the DOM Element
 */
function getContactRowDropDown(dropDownIndex, DROP, idKey, arrayKey, indexKey, taskKey) {
    return `<div onclick="changeCheckStatus(event, ${dropDownIndex}, '${idKey}', '${taskKey}', '${arrayKey}', ${indexKey})" class="contactlistrow-drop" id="${dropDownIndex}contactlistrow-drop">
            <div class="drop-name">
                     <div class="initials" style="background-color: ${DROP.color};"><p>${DROP.initials}</p></div>
                      <p>${DROP.name}</p>
                 </div>
                 <div id="${idKey}-checkbox-${dropDownIndex}"">
                <input class="contact-check" id="${idKey}-contact-check-${dropDownIndex}" type="checkbox" ${status}>
                    </div>
    
             </div>`

}


/**
 * get the Contact Data Template
 * 
 * @param {number} contactIndex -the Index of the current Index
 * @returns -returns the DOM Element
 */
function getContactDataTemplate(contactIndex) {
    return `<div class="contactdata-head">
             <div class="initalsdata" style="background-color: ${allContacts[contactIndex].color};">
             <p>${allContacts[contactIndex].initials}</p>
            </div>

            <div class="contactdata-head-right">
                <p>${allContacts[contactIndex].name}</p>
                <div class="editbuttons">
                 <button onclick="showContactsField('edit',${contactIndex})"><img src="./assets/icon/edit.png" alt="">Edit</button>
                <button onclick="deleteContact(${contactIndex})"><img src="./assets/icon/delete.png" alt="">Delete</button>
                </div>
            </div>

        </div>

        <div onclick="slidOutEditButtons()" class="contactdata-body">
            <p class="contact-information">Contact Infomation</p>

            <b class="">Email</b>
            <a href="mailto:${allContacts[contactIndex].email}">${allContacts[contactIndex].email}</a>
            <b class="">Phone</b>
            <a class="" href:"${allContacts[contactIndex].phone}">${allContacts[contactIndex].phone}</a>

        </div>
        
        <button onclick="slidInEditButtons()" class="edit-buttons-responsive"><img src="./assets/icon/more_vert.svg" alt=""></button>
          
        
        
             <div class="edit-buttons-responisve-container slideInEdit" id="edit-buttons-responisve-container">
                 <div class="editbuttons-responsive">
                    <button onclick="showContactsField('edit',${contactIndex})"><img src="./assets/icon/edit.png" alt="">Edit</button>
                    <button onclick="deleteContact(${contactIndex})"><img src="./assets/icon/delete.png" alt="">Delete</button>
                </div>
            </div>
      

                `
}


/**
 * get the Task Card Template
 * 
 * @param {string} arrayKey -the current Array the Task actually is
 * @param {string} indexKey -the Index of the current TaskCard
 * @param {string} TASK -the current TaskCard Object
 * @returns -returns the DOM Element
 */
function getTaskCardTemplate(arrayKey, indexKey, TASK) {
    return `
 <div onclick="openTaskCard(); renderTaskCardOverlay('${arrayKey}', ${indexKey}, 'over')" draggable="true" ondragstart="startDragging(${TASK['id']})"  class="task-card" id="draggable">
                      <div id="movetobuttons-${arrayKey}${indexKey}" class="d_none">
    
                           <div class="movetobuttons">
                           <button onclick="toggleMoveToButtons('${arrayKey}', ${indexKey}, event)" class="movebuttonsclose"><img src="./assets/icon/clear.svg" alt=""></button>
                                <p>move to:</p>
                                <button onclick="movingTaskCardWithoutDragging('todo', ${TASK.id}, event)" id="button-todo${indexKey}${arrayKey}">to do</button>
                                <button onclick="movingTaskCardWithoutDragging('progress', ${TASK.id}, event)" id="button-progress${indexKey}${arrayKey}">in progress</button>
                                <button onclick="movingTaskCardWithoutDragging('feedback', ${TASK.id}, event)" id="button-feedback${indexKey}${arrayKey}">await feedback</button>
                                <button onclick="movingTaskCardWithoutDragging('done', ${TASK.id}, event)" id="button-done${indexKey}${arrayKey}">done</button>

                             </div>
</div>
                    <button onclick="toggleMoveToButtons('${arrayKey}', ${indexKey}, event)" class="dropbutton"><img src="./assets/icon/arrow-left-line.svg" alt=""></button>   

    <div class="category-card" id="${arrayKey}category${indexKey}">
                              <p>${TASK.Category}</p>
                                </div>
                                <div class="titleanddescription">
                                <p class="bold">${TASK.Title}</p>
                                <p class="descriptiontext">${TASK.Description}</p>
                                </div>
                                    <div class="d_none progressbar" id="${arrayKey}progressbar${indexKey}" >
                                        <div onclick="showProgressBarStatus('${arrayKey}', ${indexKey}, event)" class="progressstatus" >
                                            <div class="progressstatus-inner" id="${arrayKey}progressbar-inner${indexKey}"></div>
                                        </div>
                                        <p class="d_none" id="${arrayKey}subtasks-done${indexKey}"></p>
                                    </div>

                                    <div class="statusbar">
                                    <div class="members-container">
                                        <div class="members" id="${arrayKey}-member${indexKey}">MEMBER</div>
                                        <p class="memberscount" id="${arrayKey}memberscount${indexKey}"></p>
                                        </div>
                                        <div class="prio-status" id="${arrayKey}-prio-status${indexKey}-main">PRIO</div>

                                    </div>
                            
            </div>

                              `
}


/**
 * get the Task Card Info Template
 * 
 * @param {string} arrayKey -the current Array the Task actually is
 * @param {string} indexKey -the Index of the current TaskCard
 * @param {object} currentTask -the current Task Object
 * @returns -returns the DOM Element
 */
function getTaskCardOverlayTemplate(arrayKey, indexKey, currentTask) {
    return `

            <div class="task-card-category-overlay" >

                <p id="${arrayKey}category-overlay${indexKey}">${currentTask.Category}</p>
                <button onclick="closeTaskCard(); getcurrentTemplates('${arrayKey}')" class="close-button-task-card-overlay"><img src="./assets/icon/clear.svg" alt=""></button>
            </div>
            <div class="task-card-title-overlay">
                <p class="task-card-title">${currentTask.Title}</p>
            </div>
            <div class="task-card-description-overlay">${currentTask.Description}</div>

            <div class="task-card-date-overlay">
                <p>Due date:</p>
                <p>${currentTask.Date}</p>
            </div>

            <div class="task-card-priority-overlay">
             <p>${currentTask.Prio} </p>
                <p id="${arrayKey}-prio-status${indexKey}-over">Priority</p>
               
            </div>

            <div class="task-card-assignedto-overlay">
                <p>Assigned To:</p>
                <div class="task-card-assignedto-content" id="${arrayKey}-task-card-assignedto-${indexKey}"></div>
            </div>
            <div class="task-card-subtasks-overlay">
                <p>Subtasks</p>
                <div class="task-card-subtasks-content" id="${arrayKey}task-card-subtasks-${indexKey}"></div>

            </div>

            <div class="task-card-buttons-overlay">

                <button onclick="deleteTaskCard('${arrayKey}', ${indexKey})"><img src="./assets/icon/delete.png" alt="">Delete</button>
                <div class="middleline-overlay"></div>
                <button onclick="editTask('${arrayKey}', ${indexKey}, 'main')"><img src="./assets/icon/edit.png" alt="">Edit</button>
            </div>

        </div>`

}


/**
 * get the Urgent SVG
 * 
 * @returns -returns the DOM Element
 */
function getUrgentSVG() {


    return `<svg width="21" height="16" viewBox="0 0 21 16"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_254822_5522)">
                                            <path
                                                d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z"
                                                fill="#FF3D00" />
                                            <path
                                                d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z"
                                                fill="#FF3D00" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_254822_5522">
                                                <rect width="20" height="14.5098" fill="white"
                                                    transform="translate(0.748535 0.745117)" />
                                            </clipPath>
                                        </defs>
                                    </svg>`
}


/**
 * get the Medium SVG
 * 
 * @returns -returns the DOM Element
 */
function getMediumSVG() {

    return `<svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_254795_5068)">
                                    <path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFA800"/>
                                    <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_254795_5068">
                                    <rect width="20" height="14.51" fill="white" transform="translate(0.748535 0.745117)"/>
                                    </clipPath>
                                    </defs>
                                    </svg>`
}


/**
 * get the Low SVG
 * 
 * @returns -returns the DOM Element
 */
function getLowSVG() {

    return `  <svg width="21" height="16" viewBox="0 0 21 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z"
                                            fill="#7AE229" />
                                        <path
                                            d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z"
                                            fill="#7AE229" />
                                    </svg>`
}


