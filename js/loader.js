import { loaderText, spans, loadScreen } from './domElements.js';
import { createFallingDrop } from './animation.js';

export function initializeLoader() {
    loaderText.style.animation = 'sweep 1.4s ease-in forwards';

    loaderText.addEventListener('animationend', () => {
        let animationsCompleted = 0;

        const checkAllAnimationsCompleted = () => {
            animationsCompleted++;
            if (animationsCompleted === spans.length) {
                loadScreen.classList.add('hide');

                loadScreen.addEventListener('transitionend', () => {
                    loadScreen.style.display = 'none';

                    setInterval(createFallingDrop, 500);
                });
            }
        };

        spans.forEach((span, index) => {
            setTimeout(() => {
                span.style.animation = 'fadeOut 0.5s ease forwards';
                span.style.opacity = '1';

                span.addEventListener('animationend', checkAllAnimationsCompleted);
            }, index * 300);
        });
    });
}
