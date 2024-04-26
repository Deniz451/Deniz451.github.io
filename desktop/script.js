//#region Alert card
const alertCard = document.querySelector(".alert-card");

document.addEventListener('DOMContentLoaded', function() {
    const hasVisited = localStorage.getItem('hasVisited');

    if (hasVisited === null || hasVisited === undefined) {
        alertCard.style.display = "block";
    }
});

const alertCardInitialPosition = {
    top: alertCard.style.top,
    left: alertCard.style.left
};

makeDraggable(alertCard);

alertCard.style.top = alertCardInitialPosition.top;
alertCard.style.left = alertCardInitialPosition.left;

document.getElementById("alert-card-button-close").addEventListener("click", () => {
    alertCard.style.display = "none";
    localStorage.setItem('hasVisited', true);
});
//#endregion

//#region Display app with desktop icon
const minOffset = 40;
const maxOffset = 60;

document.querySelectorAll(".app").forEach((element) => {
    element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.target + "-card")
    const dot = document.querySelector("." + target.classList[0] + "-dot");

    if (!target.style.display || target.style.display === "none") {

        if(cardsInitialPosition.length === undefined){
            const offset = Math.floor(Math.random() * (maxOffset - minOffset + 1)) + minOffset;
            target.style.top = 70 + offset + "px";
            target.style.left = 300 + offset + "px";
        }
        else {
            target.style.top = cardsInitialPosition.top;
            target.style.left = cardsInitialPosition.left;
        }

        document.querySelectorAll(".app-window").forEach((element) => {
            element.style.zIndex = "1"
        })
        target.style.zIndex = "2"
        target.style.display = "block";
        dot.style.opacity = 1

        makeDraggable(target);
    } else {
        target.style.display = "none";
        dot.style.opacity = 0;
    }
    });
});
//#endregion

//#region App buttons
let cardsInitialPosition = {};

document.querySelectorAll(".button-close").forEach((element) => {
    element.addEventListener("click", () => {
        const target = document.querySelector(element.dataset.target)

        if (document.fullscreenElement === target) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }

        cardsInitialPosition = {
            top: target.style.top,
            left: target.style.left
        };
        
        const dot = document.querySelector("." + target.classList[0] + "-dot");
        dot.style.opacity = 0;
        target.style.display = "none";
    });
});

document.querySelectorAll(".button-maximize").forEach((element) => {
    element.addEventListener("click", () => {
        const target = document.querySelector(element.dataset.target)

        cardsInitialPosition = {
            top: target.style.top,
            left: target.style.left
        };

        if (target.requestFullscreen) {
            target.requestFullscreen();
        } else if (target.mozRequestFullScreen) {
            target.mozRequestFullScreen();
        } else if (target.webkitRequestFullscreen) {
            target.webkitRequestFullscreen();
        } else if (target.msRequestFullscreen) {
            target.msRequestFullscreen();
        }
    });
});

document.querySelectorAll(".button-minimize").forEach((element) => {
    element.addEventListener("click", () => {
        const target = document.querySelector(element.dataset.target);
        if (document.fullscreenElement === target) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }

        target.style.top = cardsInitialPosition.top;
        target.style.left = cardsInitialPosition.left;
    });
});
//#endregion

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let header;

    if (!element.style.top) {
        element.style.top = "0px";
    }
    if (!element.style.left) {
        element.style.left = "0px";
    }

    if (element.querySelector("." + element.classList[0] + "-header") != null) {
        header = element.querySelector("." + element.classList[0] + "-header");
        header.addEventListener("mouseenter", () => {
            header.style.cursor = 'grab';
        });

        header.addEventListener("mouseleave", () => {
            if (!isDragging) {
                header.style.cursor = 'default';
            }
        });

        header.onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        if (header != null) {
            if (e.target === header || header.contains(e.target)) {
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
                header.style.cursor = 'grabbing';
            }
        } else {
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            element.style.cursor = 'grabbing';
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        let newTop = element.offsetTop - pos2;
        let newLeft = element.offsetLeft - pos1;

        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft + element.offsetWidth > window.innerWidth) {
            newLeft = window.innerWidth - element.offsetWidth;
        }

        if (newTop < 0) {
            newTop = 0;
        } else if (newTop + element.offsetHeight > window.innerHeight) {
            newTop = window.innerHeight - element.offsetHeight;
        }

        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";
    }

    function closeDragElement() {
        const deleteIcon = document.getElementById('trash-bin');
        const deleteRect = deleteIcon.getBoundingClientRect();

        if (pos3 >= deleteRect.left &&
            pos3 <= deleteRect.right &&
            pos4 >= deleteRect.top &&
            pos4 <= deleteRect.bottom &&
            element.classList[0] === "new-sticky") {
            
            console.log("added to trash bin");
            element.remove();
            deleteIcon.src = "../photos/trash-full.png";
        }

        if (header != null) header.style.cursor = 'default';
        else element.style.cursor = 'default';
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//#region Display project with project preview
document.querySelectorAll(".vscode-project-preview").forEach((element) => {
    element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.target)

    document.querySelectorAll(".vscode-card-body-main article").forEach((article) => {
        article.style.display = "none";
    });

    if (!target.style.display || target.style.display === "none") {
        target.style.display = "block";
    }
    });
});

document.querySelectorAll(".blender-project-preview").forEach((element) => {
    element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.target)

    document.querySelectorAll(".blender-card-body-main article").forEach((article) => {
        article.style.display = "none";
    });
    
    if (!target.style.display || target.style.display === "none") {
        target.style.display = "block";
    }
    });
});

document.querySelectorAll(".unity-project-preview").forEach((element) => {
    element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.target)

    document.querySelectorAll(".unity-card-body-main article").forEach((article) => {
        article.style.display = "none";
    });
    
    if (!target.style.display || target.style.display === "none") {
        target.style.display = "block";
    }
    });
});
//#endregion

//#region Enter/exit full screen
document.getElementById('full-screen-request-button').addEventListener('click', () => {
    if (document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement || 
        document.msFullscreenElement) {
        exitFullscreen();
    } else {
        requestFullscreen();
    }
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

//#region Open mobile app
document.querySelectorAll(".mobile-app").forEach((element) => {
    element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.target)
    if (!target.style.display || target.style.display === "none") {
        target.style.display = "block";
        Array.from(target.children).forEach(child => {
            child.style.display = "flex";
        });
    }
    });
});
//#endregion

//#region Close mobile app
document.querySelectorAll(".desktop-mobile-app-navbar-close-icon").forEach((element) => {
    element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.target)
    target.style.display = "none";
    });
});
//#endregion

//#region Language

//#endregion

//#region Photo slides
let slideIndex = 0;
let timeout;

photoCarousel();

document.querySelectorAll(".indicators").forEach((element) => {
    element.addEventListener("click", () => {
        clearTimeout(timeout);
        photoShow(element.dataset.value);
        startCarousel();
    });
});

function startCarousel() {
    timeout = setTimeout(photoCarousel, 5000);
}

function photoCarousel() {
    let photos = document.getElementsByClassName("photo-slides");
    for (let i = 0; i < photos.length; i++) {
        photos[i].style.display = "none";
    }
    slideIndex++;

    if (slideIndex > photos.length) {
        slideIndex = 1;
    }

    photos[slideIndex - 1].style.display = "block";
    startCarousel();
}

function photoShow(index) {
    let photos = document.getElementsByClassName("photo-slides");
    for (let i = 0; i < photos.length; i++) {
        photos[i].style.display = "none";
    }

    photos[index].style.display = "block";
}
//#endregion

//#region Prevent zooming*/
window.addEventListener('wheel', function(event) {
    if (event.ctrlKey === true) {
        event.preventDefault();
    }
}, { passive: false });

window.addEventListener('touchmove', function(event) {
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });
//#endregion

//#region Color theme

//#endregion

//#region Pick mail subject
document.getElementById("subject").addEventListener("change", function() {
    var select = document.getElementById("subject");
    var otherSubjectInput = document.getElementById("otherSubject");
    if (select.value === "other") {
        otherSubjectInput.style.display = "block";
    } else {
        otherSubjectInput.style.display = "none";
    }
});
//#endregion

//#region Mail character counter
const textarea = document.getElementById('content');
const counter = document.getElementById('character-counter');

textarea.addEventListener('input', function() {
    const length = textarea.value.length;
    counter.textContent = length + '/400';
});
//#endregion

//#region Display app name
document.querySelectorAll(".app").forEach((element) => {
    const target = document.querySelector(element.dataset.target + "-pop-up")
    element.addEventListener("mouseenter", () => {
    target.style.opacity = 1
    });
    element.addEventListener('mouseleave', function() {
        target.style.opacity = 0
    });
});
//#endregion

//#region Painting
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.fillStyle = '#FFFFFF';
context.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;

let lineWidth = 1;
let lineCap = 'round';
let lineColor = '#000000';

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    
    const pos = getMousePos(canvas, e);
    const x = pos.x;
    const y = pos.y;

    context.lineWidth = lineWidth;
    context.lineCap = lineCap;
    context.strokeStyle = lineColor;
    
    context.lineTo(x, y);
    context.stroke();
    
    context.beginPath();
    context.moveTo(x, y);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

document.getElementById("lineWidthSlider").addEventListener("change", (event) => {
    const element = event.target;
    console.log(element);
    console.log(element.value);
    lineWidth = element.value;
});

document.querySelectorAll('.color-buttons button').forEach((element) => {
    element.addEventListener("click", () => {
        lineColor = element.value;
    });
});

document.querySelector('.painting-card-body img').addEventListener("click", () => {
    document.querySelector(".canvas-sidebar").style.display = "flex";
});

document.querySelector('.canvas-sidebar img').addEventListener("click", () => {
    document.querySelector(".canvas-sidebar").style.display = "none";
});
//#endregion

//#region Sticky note
const element = document.querySelector('.stickies-card-body img');
let isDragging = false;
let hasTextInput;

element.addEventListener("mouseenter", () => {
    element.style.cursor = 'grab';
});

element.addEventListener("mouseleave", () => {
    if (!isDragging) {
        element.style.cursor = 'default';
    }
});

element.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isDragging = true;
    element.style.cursor = 'grabbing';

    let cursorX = event.clientX;
    let cursorY = event.clientY;

    const sticky = document.createElement('img');
    sticky.src = "../photos/sticky-note2.png";
    sticky.alt = 'sticky';
    sticky.width = 200;
    sticky.height = 200;
    sticky.classList.add('new-sticky');

    sticky.style.left = cursorX + 'px';
    sticky.style.top = cursorY + 'px';

    document.body.appendChild(sticky);
    makeDraggable(sticky);

    const text = document.createElement('input');
    text.setAttribute('type', 'text');
    text.setAttribute('placeholder', 'Enter text here');
    text.classList.add("sticky-text");
    sticky.appendChild(text);
    console.log(sticky);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function onMouseMove(event) {
        cursorX = event.clientX;
        cursorY = event.clientY;
        sticky.style.left = cursorX + 'px';
        sticky.style.top = cursorY + 'px';
    }

    function onMouseUp() {
        isDragging = false;
        element.style.cursor = 'grab';
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }
});
//#endregion

//#region Navbar clock
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let day = today.getDate();
    let monthNames = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = monthNames[today.getMonth()];
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    m = checkTime(m);
    document.querySelector('.navbar-time').innerHTML =  month + " " + day + " " + h + ":" + m + " " + ampm;
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