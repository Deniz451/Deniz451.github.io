import { languageButtons, emailBtn, projectsGamedev, projectsOther} from './domElements.js';
import { switchGamedevProjectDescription, switchOtherProjectDescription } from './projectDescription.js';
import { handleMouseMove } from './animation.js';
import { switchLanguage } from './language.js';
import { copyToClipboard } from './clipboard.js';
import { enableSmoothScrolling } from './smoothScroll.js';
import { initializeLoader } from './loader.js';

// Event listeners
document.addEventListener("mousemove", handleMouseMove);
emailBtn.addEventListener("click", () => copyToClipboard('denis.resitko@gmail.com'));
languageButtons.forEach(button => { button.addEventListener("click", () => switchLanguage(button, true)) });
languageButtons.forEach(button => { button.addEventListener("click", () => switchLanguage(button, true)); });
projectsOther.forEach(project => { project.addEventListener("click", () => switchOtherProjectDescription(project)) });
projectsGamedev.forEach(project => { project.addEventListener("click", () => switchGamedevProjectDescription(project)) });

// Perform actions on content load
document.addEventListener("DOMContentLoaded", () => {
    enableSmoothScrolling();
    switchLanguage(languageButtons[0], false);
    switchOtherProjectDescription(projectsOther[0]);
    switchGamedevProjectDescription(projectsGamedev[0]);
});

// Perform actions on page load
window.addEventListener('load', initializeLoader);