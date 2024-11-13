const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const katakana = "アィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾ"
const numbers = "0123456789"
const symbols = "!#$%&*()<>?|}{[]/"
const characters = latin + katakana + numbers + symbols;
const matrixContainer = document.querySelector(".matrix-container");
const overlay = document.querySelector(".overlay");
const projects = document.querySelectorAll(".projects-container > section > p");
const projectArticles = document.querySelectorAll(".projects-container > div > article");
const languageButtons = document.querySelectorAll(".language-selection-container button");
const maxDrops = 30;
let activeDrops = [];

// matrix highlight effect
document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const radius = 250;
    const smoothTransition = 80;
    const overlayOpacity = 0.55;
    const overlayBackground = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(0, 0, 0, ${overlayOpacity}) 0%, rgba(0, 0, 0, ${overlayOpacity}) ${radius - smoothTransition}px, rgba(0, 0, 0, 0.7) ${radius}px)`;

    overlay.style.background = overlayBackground;
});

// smooth anchor transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// load screen animation
window.addEventListener('load', () => {
    const loaderText = document.querySelector('.load-screen > p');
    const loadScreen = document.querySelector('.load-screen');
    loaderText.style.animation = 'sweep 1.4s ease-in forwards';

    loaderText.addEventListener('animationend', () => {
        const spans = document.querySelectorAll('.load-screen span');
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
});

projects.forEach(element => {
    element.addEventListener("click", () => switchProjectDescription(element))
});

languageButtons.forEach(button => {
    button.addEventListener("click", () => switchLanguage(button, true))
});

document.getElementById("email").addEventListener("click", () => copyToClipboard('denis.resitko@gmail.com'));


function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// matrix effect
function createFallingDrop() {
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
        char.textContent = characters[Math.floor(Math.random() * characters.length)];
        drop.appendChild(char);
    }

    matrixContainer.appendChild(drop);
    activeDrops.push(drop);

    drop.addEventListener("animationend", () => {
        matrixContainer.removeChild(drop);
        activeDrops = activeDrops.filter(d => d !== drop);
    });
}

function switchProjectDescription(element){

    projects.forEach(project => {
        project.style.color = "white";
    });
    projectArticles.forEach(article => {
        article.style.opacity = 0;
    });
    let projectArticleId = element.dataset.target;
    
    element.style.color = "rgb(148, 148, 148)";
    document.getElementById(projectArticleId).style.opacity = 1;
}

lastLang = '';
function switchLanguage(button, animate){
    languageButtons.forEach(button => {
        button.style.backgroundColor = "transparent";
    });
    button.style.backgroundColor = "white";

    lang = button.dataset.language;

    if (lang != lastLang){
        loadTextContent(lang, animate);
        lastLang = lang;
    }
}

async function loadTextContent(lang, animate) {
    try {
        const response = await fetch('../json/text.json');
        const translations = await response.json();
        const langTexts = translations[lang];
        const characters = 'abcdefghijklmnopqrstuvwxyz';

        for (const id in langTexts) {
            const element = document.getElementById(id);
            if (element) {
                if (animate) {
                    const finalText = langTexts[id];
                    let charArr = finalText.split('');
                    const isLongText = (finalText.match(/\s/g) || []).length > 1; // Checks if there's more than 1 whitespace
                    let progress = 0;

                    const interval = setInterval(() => {
                        if (isLongText) {
                            // Randomize all characters at once for long text
                            for (let i = 0; i < charArr.length; i++) {
                                if (charArr[i] !== ' ') {
                                    charArr[i] = characters.charAt(Math.floor(Math.random() * characters.length));
                                }
                            }
                            element.innerHTML = charArr.join('');
                            
                            // Stop randomizing and set to final text after a short delay
                            setTimeout(() => {
                                clearInterval(interval);
                                element.innerHTML = finalText;
                            }, 500);
                        } else {
                            // Wave effect for shorter text
                            for (let i = progress; i < charArr.length; i++) {
                                if (charArr[i] !== ' ') {
                                    charArr[i] = characters.charAt(Math.floor(Math.random() * characters.length));
                                }
                            }
                            element.innerHTML = charArr.join('');
                            
                            // Gradually lock characters in place
                            if (progress < charArr.length) {
                                charArr[progress] = finalText[progress];
                                progress++;
                            } else {
                                clearInterval(interval);
                            }
                        }
                    }, 50);
                } else {
                    element.innerHTML = langTexts[id];
                }
            }
        }
    } catch (error) {
        console.error("Error loading text content:", error);
    }
}

// Load default language on page load
document.addEventListener("DOMContentLoaded", () => {
    switchLanguage(languageButtons[0], false);
});

switchProjectDescription(projects[0]);