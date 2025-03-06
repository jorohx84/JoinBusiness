/**
 * change the prio button color
 * 
 * @param {string} buttonKey -declares which button was pressed
 * @param {string} idKey -get the current ID of object in template
 */
function changeButtonColor(buttonKey, idKey) {
    let urgentButton = document.getElementById(`urgent-button-${idKey}`);
    let mediumButton = document.getElementById(`medium-button-${idKey}`);
    let lowButton = document.getElementById(`low-button-${idKey}`);
    changeColor(urgentButton, mediumButton, lowButton, buttonKey);
    changeSVG(buttonKey, idKey);
}


/**
 * change the BackgroundColor of the Buttons
 * @param {element} urgentButton -the Urgent Buttun DOM Element
 * @param {element} mediumButton -the Medium Buttun DOM Element
 * @param {element} lowButton -the Low Buttun DOM Element
 * @param {string} buttonKey -selects the clicked Button
 */
function changeColor(urgentButton, mediumButton, lowButton, buttonKey) {
    if (buttonKey === 'Urgent') {
        changeUrgentButton(urgentButton, mediumButton, lowButton);
        priority = 'Urgent'
    }
    if (buttonKey === 'Medium') {
        changeMediumButton(urgentButton, mediumButton, lowButton)
        priority = 'Medium'
    }
    if (buttonKey === 'Low') {
        changeLowButton(urgentButton, mediumButton, lowButton);
        priority = 'Low'
    }
}


/**
 * 
 * @param {string} buttonKey -selects the clicked Button
 * @param {string} idKey -get the current ID of object in template
 */
function changeSVG(buttonKey, idKey) {
    if (buttonKey === 'Urgent') {
        changeButtonsSVG(buttonKey, idKey);
        priority = 'Urgent'
    }
    if (buttonKey === 'Medium') {
        changeButtonsSVG(buttonKey, idKey);
        priority = 'Medium'
    }
    if (buttonKey === 'Low') {
        changeButtonsSVG(buttonKey, idKey);
        priority = 'Low'
    }

}
/**
 * change the color of the urgent button
 * 
 * @param {element} urgentButton -the current Button who is clicked
 * @param {element} mediumButton -the current Button who is clicked
 * @param {element} lowButton -the current Button who is clicked
 */
function changeUrgentButton(urgentButton, mediumButton, lowButton) {
    urgentButton.classList.add('colorred');
    mediumButton.classList.remove('colororange');
    lowButton.classList.remove('colorgreen');
    urgent = true;
    medium = false;
    low = false;
}


/**
 * change the color of the medium button
 * 
 * @param {element} urgentButton -the current Button who is clicked
 * @param {element} mediumButton -the current Button who is clicked
 * @param {element} lowButton -the current Button who is clicked
 */
function changeMediumButton(urgentButton, mediumButton, lowButton) {
    urgentButton.classList.remove('colorred');
    mediumButton.classList.add('colororange');
    lowButton.classList.remove('colorgreen');
    urgent = false;
    medium = true;
    low = false;
}


/**
 * change the color of the low button
 * 
 * @param {element} urgentButton -the current Button who is clicked
 * @param {element} mediumButton -the current Button who is clicked
 * @param {element} lowButton -the current Button who is clicked
 */
function changeLowButton(urgentButton, mediumButton, lowButton) {
    urgentButton.classList.remove('colorred');
    mediumButton.classList.remove('colororange');
    lowButton.classList.add('colorgreen');
    urgent = false;
    medium = false;
    low = true;
}


/**
 * change the svg of the prio buttons 
 * 
 * @param {string} buttonKey -declares which button was pressed
 * @param {string} idKey -get the current ID of object in template
 */
function changeButtonsSVG(buttonKey, idKey) {
    let urgentSVG = document.getElementById(`urgentsvg-${idKey}`);
    let mediumSVG = document.getElementById(`mediumsvg-${idKey}`);
    let lowSVG = document.getElementById(`lowsvg-${idKey}`);
    if (buttonKey === 'Urgent') {
        changeUrgentSVGColor(urgentSVG, mediumSVG, lowSVG)
    }
    if (buttonKey === 'Medium') {
        changeMediumSVGColor(urgentSVG, mediumSVG, lowSVG)
    }
    if (buttonKey === 'Low') {
        changeLowSVGColor(urgentSVG, mediumSVG, lowSVG)
    }
}


/**
 * change the color of the current urgent svg path 
 * 
 * @param {element} urgentSVG -the SVG of the current Button who is clicked
 * @param {element} mediumSVG -the SVG of the current Button who is clicked
 * @param {element} lowSVG -the SVG of the current Button who is clicked
 */
function changeUrgentSVGColor(urgentSVG, mediumSVG, lowSVG) {
    urgentSVG.classList.add('svg-color-white');
    mediumSVG.classList.remove('svg-color-white');
    lowSVG.classList.remove('svg-color-white');
}


/**
 * change the color of the current medium svg path
 * 
 * @param {element} urgentSVG -the SVG of the current Button who is clicked
 * @param {element} mediumSVG -the SVG of the current Button who is clicked
 * @param {element} lowSVG -the SVG of the current Button who is clicked
 */
function changeMediumSVGColor(urgentSVG, mediumSVG, lowSVG) {
    urgentSVG.classList.remove('svg-color-white');
    mediumSVG.classList.add('svg-color-white');
    lowSVG.classList.remove('svg-color-white');
}


/**
 * change the color of the current low svg path
 * 
 * @param {element} urgentSVG -the SVG of the current Button who is clicked
 * @param {element} mediumSVG -the SVG of the current Button who is clicked
 * @param {element} lowSVG -the SVG of the current Button who is clicked
 */
function changeLowSVGColor(urgentSVG, mediumSVG, lowSVG) {
    urgentSVG.classList.remove('svg-color-white');
    mediumSVG.classList.remove('svg-color-white');
    lowSVG.classList.add('svg-color-white');
}
