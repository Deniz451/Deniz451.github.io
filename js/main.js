import { languageButtons, emailBtn, projectsGamedev, projectsOther, brightnessSlider} from './domElements.js';
import { switchGamedevProjectDescription, switchOtherProjectDescription } from './projectDescription.js';
import { handleMouseMove, changeBackgroundOpacity } from './animation.js';
import { switchLanguage } from './language.js';
import { copyToClipboard } from './clipboard.js';
import { enableSmoothScrolling } from './smoothScroll.js';
import { initializeLoader } from './loader.js';

emailBtn.addEventListener("click", () => copyToClipboard('denis.resitko@gmail.com'));
brightnessSlider.addEventListener('input', () => changeBackgroundOpacity(brightnessSlider.value));
languageButtons.forEach(button => { button.addEventListener("click", () => switchLanguage(button, true)) });
languageButtons.forEach(button => { button.addEventListener("click", () => switchLanguage(button, true)); });
projectsOther.forEach(project => { project.addEventListener("click", () => switchOtherProjectDescription(project)) });
projectsGamedev.forEach(project => { project.addEventListener("click", () => switchGamedevProjectDescription(project)) });

document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("DOMContentLoaded", () => {
    enableSmoothScrolling();
    switchLanguage(languageButtons[0], false);
    switchOtherProjectDescription(projectsOther[0]);
    switchGamedevProjectDescription(projectsGamedev[0]);
});

window.addEventListener('load', initializeLoader);
window.addEventListener('wheel', function(event) { if (event.ctrlKey === true) { event.preventDefault(); }}, { passive: false });
window.addEventListener('touchmove', function(event) { if (event.touches.length > 1) { event.preventDefault(); } }, { passive: false });