import { languageButtons } from './domElements.js';
import { textAnimCharacters } from './constants.js';

let lastLang = '';

export function switchLanguage(button, animate) {
    languageButtons.forEach(button => {
        button.style.backgroundColor = "transparent";
    });
    button.style.backgroundColor = "white";

    let lang = button.dataset.language;

    if (lang != lastLang){
        loadTextContent(lang, animate);
        lastLang = lang;
    }
}

export async function loadTextContent(lang, animate) {
    try {
        const response = await fetch('../json/text.json');
        const translations = await response.json();
        const langTexts = translations[lang];
        
        for (const id in langTexts) {
            const element = document.getElementById(id);
            if (element) {
                if (animate) {
                    const finalText = langTexts[id];
                    let charArr = finalText.split('');
                    const isLongText = (finalText.match(/\s/g) || []).length > 1;
                    let progress = 0;

                    const interval = setInterval(() => {
                        if (isLongText) {
                            for (let i = 0; i < charArr.length; i++) {
                                if (charArr[i] !== ' ') {
                                    charArr[i] = textAnimCharacters.charAt(Math.floor(Math.random() * textAnimCharacters.length));
                                }
                            }
                            element.innerHTML = charArr.join('');
                            
                            setTimeout(() => {
                                clearInterval(interval);
                                element.innerHTML = finalText;
                            }, 500);
                        } else {
                            for (let i = progress; i < charArr.length; i++) {
                                if (charArr[i] !== ' ') {
                                    charArr[i] = textAnimCharacters.charAt(Math.floor(Math.random() * textAnimCharacters.length));
                                }
                            }
                            element.innerHTML = charArr.join('');
                            
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
