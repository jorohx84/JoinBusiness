/**
 * get the Subtask Template
 * 
 * @param {string} idKey --the ID of the DOM Element
 * @param {number} subIndex -the Index of the current Task Card
 * @param {object} SUB -the current Subtask Object
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @returns -returns the DOM Element
 */
function getSubtaskTemplates(idKey, subIndex, SUB, taskKey) {

    return `<div class="subtask-row"> <input id="${subIndex}input-subtask-row-main" type="text" value="${SUB.subtask}" disabled>
            <div id="${subIndex}subtask-edit-buttons-main" >
                <div class="subtask-edit-buttons">
                    <button onclick="showSubRowButtons(${subIndex}, '${idKey}', '${taskKey}'); ableSubtaskInput(${subIndex}, '${idKey}')"><img src="./assets/icon/edit.png" alt=""></button>
                         <div class="subtask-middline"></div>
                     <button onclick="deleteSubtask('${idKey}', ${subIndex}, '${taskKey}')"><img src="./assets/icon/delete.png" alt=""></button>
            </div>
            </div>
    
    <div id="${subIndex}subtasks-button-row-main" class="d_none ">
    <div class="subtask-edit-buttons">
        <button onclick="deleteSubtask('${idKey}', ${subIndex}, '${taskKey}')"><img src="./assets/icon/delete.png" alt=""></button>
    
        <div class="subtask-middline"></div>
        <button onclick=" editSubtask( '${idKey}', ${subIndex}, '${taskKey}')"><img class="check-edit-button" src="./assets/icon/check.png" alt=""></button>
    
    </div>
    </div>`

}


/**
 * get the current SubtaskInfo Template to Edit
 * 
 * @param {string} arrayKey -the current Array the Task actually is
 * @param {number} indexKey -the Index of the current TaskCard
 * @param {number} subIndex -the Index of the current Task Card
 * @param {string} idKey -the ID of the DOM Element
 * @param {object} SUB -the current Subtask Object
 * @param {string} taskKey -controls the function depending on whether it is a new task or a task to be edited
 * @returns -returns the DOM Element
 */
function getEditSubtaskTemplates(arrayKey, indexKey, subIndex, idKey, SUB, taskKey) {

    return `<div class="subtask-row"> <input id="${subIndex}input-subtask-row-main" type="text" value="${SUB.subtask}" disabled>
        <div id="${subIndex}subtask-edit-buttons-main" >
            <div class="subtask-edit-buttons">
                <button onclick="showSubRowButtons(${subIndex}, '${idKey}'); ableSubtaskInput(${subIndex}, '${idKey}')"><img src="./assets/icon/edit.png" alt=""></button>
                     <div class="subtask-middline"></div>
                 <button onclick="deleteSubtask('${idKey}', ${subIndex}, '${taskKey}', '${arrayKey}', ${indexKey})"><img src="./assets/icon/delete.png" alt=""></button>
        </div>
        </div>

<div id="${subIndex}subtasks-button-row-main" class="d_none ">
<div class="subtask-edit-buttons">
    <button onclick="deleteSubtask('${idKey}', ${subIndex}, '${taskKey}', '${arrayKey}', ${indexKey})"><img src="./assets/icon/delete.png" alt=""></button>

    <div class="subtask-middline"></div>
    <button onclick=" editSubtask('${idKey}', ${subIndex}, '${taskKey}', '${arrayKey}', ${indexKey})"><img class="check-edit-button" src="./assets/icon/check.png" alt=""></button>

</div>
</div>`

}


/**
 * get the Assigned Contact Template
 * 
 * @param {string} arrayKey -the current Array the Task actually is
 * @param {number} assignIndex -the Index of the assigned Contact
 * @param {object} ASSIGNEDTO -the assigned Contact Object
 * @returns -returns the DOM Element
 */
function getAssigndContactsTemplate(arrayKey, assignIndex, ASSIGNEDTO) {

    return `<div class="contactlistrow-overlay">

    <div class="initials-overlay" style="background-color: ${ASSIGNEDTO.color};"><p>${ASSIGNEDTO.initials}</p></div>
    <div>
        <p>${ASSIGNEDTO.name}</p>

    </div>
    
</div>`
}


/**
 * 
 * @param {string} arrayKey -the current Array the Task actually is
 * @param {number} indexKey -the Index of the current TaskCard
 * @param {object} SUBCARD -the Subtask Object in Task Card
 * @returns -returns the DOM Element
 */
function getSubtaskCardTemplate(arrayKey, indexKey, SUBCARD) {

    return `<div class="subtask-taskcard"><div id="subtask-checkbox-container${indexKey}"></div><p>${SUBCARD.subtask}</p></div>`

}


