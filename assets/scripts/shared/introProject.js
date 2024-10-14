/**
 * introProject.js
 */

import { attachEventHandlerById } from "./eventHandlers.js";

const handleCloseProject = (e, overlay, dialog) => {
    overlay.classList.remove("active");
    dialog.close();
}

function showDialog(overlay, dialog) {
    overlay.classList.add('active');
    dialog.showModal();
}

const setupIntroduceProject = () => {
    // console.log("Running introduction project...");
    
    // Variables
    const overlayId = "overlay";
    const dialogId = "introProject";
    const closeBtnId = "closeIntroProject"
    
    // HTML Elements
    const overlay = document.getElementById(overlayId);
    const dialog = document.getElementById(dialogId)

    showDialog(overlay, dialog);

    // Event Listeners
    attachEventHandlerById(closeBtnId, "click", handleCloseProject, overlay, dialog);
}

export { setupIntroduceProject };