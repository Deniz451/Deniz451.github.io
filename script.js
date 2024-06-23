//#region Coputer password form
document.querySelector("form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const password = document.getElementById("password").value;
    const passwordInput = document.getElementById("password");

    try {
        const response = await fetch('/.netlify/functions/verify-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });
        
        const result = await response.json();

        if (result.success) {
            window.location.href = "../desktop/index.html";
        } else {
            document.getElementById("password").placeholder = "Wrong password";
        }
    } catch (error) {
        console.error("Error during password verification:", error);
    }

    passwordInput.value = "";
});

const viewIcon = document.getElementById("view");
const hideIcon = document.getElementById("hide");
const passwordInput = document.getElementById("password");

function togglePasswordVisibility() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        viewIcon.style.display = "none";
        hideIcon.style.display = "block";
    } else {
        passwordInput.type = "password";
        hideIcon.style.display = "none";
        viewIcon.style.display = "block";
    }
}

viewIcon.addEventListener("click", togglePasswordVisibility);
hideIcon.addEventListener("click", togglePasswordVisibility);
//#endregion

//#region Mobile clock
const monthNames = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Monday", "Tuesday", "Wendsday", "Thursday", "Friday", "Saturday", "Sunday"];

function startTime() {
    const today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let day = dayNames[today.getDay()];
    let date = today.getDate();
    let month = monthNames[today.getMonth()];
    hour = hour % 12 || 12;
    minute = checkTime(minute);
    document.querySelector('.clock-date').innerHTML = day + ", " + month + " " + date;
    document.querySelector('.clock-time').innerHTML =  hour + ":" + minute;
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

startTime();
//#endregion

//#region Mobile enter/exit fullscreen
document.querySelectorAll("header img:nth-of-type(1)").forEach((element) => {
    element.addEventListener("click", () => {
        if (document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement || 
            document.msFullscreenElement) {
            exitFullscreen();
            element.src = "../icons/zoom.png"
        } else {
            requestFullscreen();
            element.src = "../icons/unzoom.png"
        }
    });
});

function requestFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
//#endregion

//#region Mobile home screen swipe
const homeScreenSwipeArea = document.querySelector(".mobile-home-screen footer");
let homeScreenStartY;

homeScreenSwipeArea.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    homeScreenStartY = touch.clientY;
});

homeScreenSwipeArea.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    if (!homeScreenStartY) return;
    const moveY = homeScreenStartY - touch.clientY;
    const distance = Math.max(0, moveY);
    homeScreenSwipeArea.style.bottom = distance + "px";
    const opacity = Math.max(0, 1 - distance / 220);
    homeScreenSwipeArea.style.opacity = opacity;
    
    if (distance >= 220){
        document.querySelector(".mobile-home-screen").style.display = "none";
        document.querySelector(".mobile-lock-screen").style.display = "flex";
    }
});

homeScreenSwipeArea.addEventListener('touchend', function(e) {
    homeScreenStartY = null;
    homeScreenSwipeArea.style.bottom = "20px";
    homeScreenSwipeArea.style.opacity = 1;
});
//#endregion

//#region Mobile locks creen swipe
const lockScreenSwipeArea = document.querySelector(".mobile-lock-screen footer");
let lockScreenStartY;

lockScreenSwipeArea.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    lockScreenStartY = touch.clientY;
});

lockScreenSwipeArea.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    if (!lockScreenStartY) return;
    const moveY = lockScreenStartY - touch.clientY;
    const distance = Math.max(0, moveY);
    lockScreenSwipeArea.style.bottom = distance + "px";
    const opacity = Math.max(0, 1 - distance / 100);
    lockScreenSwipeArea.style.opacity = opacity;
    
    if (distance >= 100){
        document.querySelector(".mobile-lock-screen").style.display = "none";
        document.querySelector(".mobile-home-screen").style.display = "flex";
    }
});

lockScreenSwipeArea.addEventListener('touchend', function(e) {
    lockScreenStartY = null;
    lockScreenSwipeArea.style.bottom = 0;
    lockScreenSwipeArea.style.opacity = 1;
});
//#endregion

//#region Password entry
let passCodeInput = [];
let circlesIndex = 0;
const correctPassCode = ['7', '8', '9', '0'];
let circles = document.querySelectorAll(".circle");

document.querySelectorAll(".buttons-container button").forEach((element) => {
    element.addEventListener("click", () => {
        element.style.backgroundColor = "rgba(0, 0, 0, 0.215)";
        setTimeout(() => {
            element.style.backgroundColor = "transparent";
        }, 200);
        
        passCodeInput.push(element.value);
        circles[circlesIndex].style.backgroundColor = "white";
        circlesIndex++;
        
        if (passCodeInput.length === 4 && passCodeInput.every((value, index) => value === correctPassCode[index])){
            window.location.href = "../desktop/index.html";
        }
        else if (passCodeInput.length === 4){
            passCodeInput = [];

            circlesIndex = 0;
            setTimeout(() => {
                circles.forEach(element => {
                    element.style.backgroundColor = "transparent";
                });
            }, 200);
        }
    });
});
//#endregion

//#region Language translation
let currentLanguage = localStorage.getItem('currentLanguage') || 'english';
loadLanguage(currentLanguage);

function loadLanguage(currentLanguage) {
    fetch(`json/${currentLanguage}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.dataset.translate;
                const translation = data[key];
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation || element.placeholder;
                } else if (element.hasAttribute('value')) {
                    element.value = translation || element.value;
                } else {
                    element.innerHTML = translation || element.innerHTML;
                }
            });
        })
        .catch(error => console.error('Error loading language:', error));
}
//#endregion