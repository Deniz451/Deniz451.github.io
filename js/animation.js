import { matrixContainer, overlay } from './domElements.js';
import { matrixDropsCharacters, maxDrops } from './constants.js';

let activeDrops = [];
let overlayAlpha = 0.7;
let flashBrigtness = 0.55;

export function handleMouseMove(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const overlayBackground = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(0, 0, 0, ${flashBrigtness}) 0%, rgba(0, 0, 0, ${flashBrigtness}) 170px, rgba(0, 0, 0, ${overlayAlpha}) 250px)`;
    overlay.style.background = overlayBackground;
}

export function createFallingDrop() {
    if (activeDrops.length >= maxDrops) {
        return;
    }

    const drop = document.createElement("div");
    drop.classList.add("matrix-drop");

    drop.style.left = `${Math.random() * 100}vw`;

    const fallSpeed = 6 + Math.random() * 4;
    drop.style.animationDuration = `${fallSpeed}s`;
    drop.style.opacity = `${fallSpeed > 8 ? 0.5 : 1}`;

    const dropLength = Math.floor(5 + Math.random() * 10);
    for (let i = 0; i < dropLength; i++) {
        const char = document.createElement("span");
        char.textContent = matrixDropsCharacters[Math.floor(Math.random() * matrixDropsCharacters.length)];
        drop.appendChild(char);
    }

    matrixContainer.appendChild(drop);
    activeDrops.push(drop);

    drop.addEventListener("animationend", () => {
        matrixContainer.removeChild(drop);
        activeDrops = activeDrops.filter(d => d !== drop);
    });
}

export function changeBackgroundOpacity(val){
    overlayAlpha = val / 100;
    flashBrigtness = overlayAlpha / 100 * 80
}