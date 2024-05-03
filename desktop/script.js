//#region Attention card
const attentionCard = document.querySelector(".attention-card");

document.addEventListener('DOMContentLoaded', function() {
    const hasVisited = localStorage.getItem('hasVisited');

    if (window.innerWidth > 900 && hasVisited === null || hasVisited === undefined) {
        attentionCard.style.display = "block";
    }
});

const attentionCardInitialPosition = {
    top: attentionCard.style.top,
    left: attentionCard.style.left
};

makeDraggable(attentionCard);

attentionCard.style.top = attentionCardInitialPosition.top;
attentionCard.style.left = attentionCardInitialPosition.left;

document.getElementById("attention-card-button-close").addEventListener("click", () => {
    attentionCard.style.display = "none";
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

//#region Make draggable function
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

        if (e.target === header || header.contains(e.target)) {
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            header.style.cursor = 'grabbing';
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
            element.classList[0] === "sticky-container") {
            
            deletedItemsCount++;
            deletedItemsContent.push(element.querySelector('textarea').value);
            element.remove();
            deleteIcon.src = "../photos/trash-full.png";
            updateTrashBin();
        }

        header.style.cursor = 'default';
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
//#endregion

//#region Display project with project preview
document.querySelectorAll(".vscode-project-preview").forEach((element) => {
    element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.target)

    document.querySelectorAll(".unity-card-body-main-projects-container > section").forEach((section) => {
        section.style.display = "none";
    });

    if (!target.style.display || target.style.display === "none") {
        target.style.display = "block";
    }
    });
});

document.querySelectorAll(".blender-project-preview").forEach((element) => {
    element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.target)

    document.querySelectorAll(".blender-card-body-main-projects-container > section").forEach((section) => {
        section.style.display = "none";
    });
    if (!target.style.display || target.style.display === "none") {
        target.style.display = "block";
    }
    });
});

document.querySelectorAll(".unity-project-preview").forEach((element) => {
    element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.target)

    document.querySelectorAll(".unity-card-body-main-projects-container > section").forEach((section) => {
        section.style.display = "none";
    });
    
    if (!target.style.display || target.style.display === "none") {
        target.style.display = "block";
    }
    });
});
//#endregion

//#region Enter/exit full screen
const fullScreenBtn = document.getElementById('full-screen-request-button')
fullScreenBtn.addEventListener('click', () => {
    if (document.fullscreenElement || 
        document.webkitFullscreenElement || 
        document.mozFullScreenElement || 
        document.msFullscreenElement) {
        exitFullscreen();
        fullScreenBtn.src = "../icons/zoom.png"
    } else {
        requestFullscreen();
        fullScreenBtn.src = "../icons/unzoom.png"
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
            document.querySelector(".mobile-taskbar").style.display = "none";
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
    document.querySelector(".mobile-taskbar").style.display = "flex";
    });
});
//#endregion

//#region Language
const enBtn = document.getElementById("en");
const csBtn = document.getElementById("cs");
const ruBtn = document.getElementById("ru");
enBtn.style.fontWeight = "bold";
let currentLanguage = 'english';

enBtn.addEventListener("click", () => {
    csBtn.style.fontWeight = "normal";
    ruBtn.style.fontWeight = "normal";
    enBtn.style.fontWeight = "bold";
    currentLanguage = 'english';
    loadLanguage(currentLanguage);
})

csBtn.addEventListener("click", () => {
    ruBtn.style.fontWeight = "normal";
    enBtn.style.fontWeight = "normal";
    csBtn.style.fontWeight = "bold";
    currentLanguage = 'czech';
    loadLanguage(currentLanguage);
})

ruBtn.addEventListener("click", () => {
    csBtn.style.fontWeight = "normal";
    enBtn.style.fontWeight = "normal";
    ruBtn.style.fontWeight = "bold";
    currentLanguage = 'russian';
    loadLanguage(currentLanguage);
})


function loadLanguage(currentLanguage) {
    fetch(`${currentLanguage}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.dataset.translate; // Ensure it matches the HTML attribute
                element.innerHTML = data[key] || element.innerHTML; // Use fallback if translation is not found
            });
        })
        .catch(error => console.error('Error loading language:', error)); // Log any errors
}


loadLanguage(currentLanguage);
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
const btnLight = document.getElementById("theme-btn-light");
const btnDark = document.getElementById("theme-btn-dark");
let colorTheme = localStorage.getItem('colorTheme');
let root = document.documentElement;
btnLight.style.fontWeight = "bold";

if (colorTheme === "light") {
    root.style.setProperty('--card-body-color', 'white');
}
else if (colorTheme === "dark") {
    root.style.setProperty('--card-body-color', 'rgb(140, 140, 140)');
}

btnLight.addEventListener("click", () => {
    localStorage.setItem('colorTheme', "light");
    root.style.setProperty('--card-body-color', 'white');

    btnDark.style.fontWeight = "normal";
    btnLight.style.fontWeight = "bold";
})

btnDark.addEventListener("click", () => {
    localStorage.setItem('colorTheme', "dark");
    root.style.setProperty('--card-body-color', 'rgb(140, 140, 140)');

    btnLight.style.fontWeight = "normal";
    btnDark.style.fontWeight = "bold";
})
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
const paintingCanvas = document.getElementById('paintingCanvas');
const context = paintingCanvas.getContext('2d');

context.fillStyle = '#FFFFFF';
context.fillRect(0, 0, paintingCanvas.width, paintingCanvas.height);

let isDrawing = false;

let lineWidth = 1;
let lineCap = 'round';
let lineColor = '#000000';

paintingCanvas.addEventListener('mousedown', startDrawing);
paintingCanvas.addEventListener('mousemove', draw);
paintingCanvas.addEventListener('mouseup', stopDrawing);
paintingCanvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    
    const pos = getMousePos(paintingCanvas, e);
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

function getMousePos(paintingCanvas, evt) {
    var rect = paintingCanvas.getBoundingClientRect(),
        scaleX = paintingCanvas.width / rect.width,
        scaleY = paintingCanvas.height / rect.height;

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

document.querySelector('.canvas-sidebar img:nth-of-type(1)').addEventListener("click", () => {
    document.querySelector(".canvas-sidebar").style.display = "none";
});

document.querySelector(".canvas-sidebar > img:nth-of-type(2)").addEventListener("click", () => {
    context.clearRect(0, 0, paintingCanvas.width, paintingCanvas.height);
})
//#endregion

//#region Sticky note
const element = document.querySelector('.stickies-card-body img');
let isDragging = false;

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

    const sticky = document.createElement('div');
    sticky.classList.add('sticky-container');

    const stickyHeader = document.createElement('section');
    stickyHeader.classList.add('sticky-container-header');

    const stickyImg = document.createElement('img');
    stickyImg.src = "../photos/sticky-note-2.png";
    stickyImg.alt = 'sticky';
    stickyImg.width = 200;
    stickyImg.height = 200;

    const text = document.createElement('textarea');
    text.setAttribute('placeholder', 'Enter text here');
    text.maxLength = 90;
    text.classList.add("sticky-text");

    sticky.appendChild(stickyHeader);
    sticky.appendChild(stickyImg);
    sticky.appendChild(text);

    sticky.style.left = cursorX + 'px';
    sticky.style.top = cursorY + 'px';

    document.body.appendChild(sticky);
    makeDraggable(sticky);

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
    document.querySelector('.mobile-header-time').innerHTML = h + ":" + m;
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

//#region Canvas clock
const clockCanvas = document.querySelector(".clock-card-body canvas");
const ctx = clockCanvas.getContext("2d");

let radius = 150;
ctx.translate(clockCanvas.width / 2, clockCanvas.height / 2);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}
  
function drawFace(ctx, radius) {  
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.lineWidth = radius*0.1;
    ctx.stroke();
  
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(let num = 1; num < 13; num++){
        let ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);

    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}
  
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
//#endregion

//#region Trash bin
let deletedItemsArr = [];
let deletedItemsContent = [];
let deletedItemsCount = 0;
const trashBinBody = document.querySelector(".trash-card-body");
const alertCard = document.querySelector(".alert-card");

function updateTrashBin(){
    const deletedItemName = document.createElement('p');
    deletedItemName.textContent = "Sticky note " + deletedItemsCount;
    deletedItemsArr.push(deletedItemName.innerHTML);
    deletedItemName.addEventListener("click", displayAlert);
    trashBinBody.appendChild(deletedItemName);
};

function displayAlert() {
    alertCard.style.display = "block";
}

document.getElementById("alert-card-button-no").addEventListener("click", () => {
    alertCard.style.display = "none";
});
document.getElementById("alert-card-button-yes").addEventListener("click", function() {
    alertCard.style.display = "none";
    restoreDeletedItem();
});

function restoreDeletedItem(){
    console.log(deletedItemsCount);
    deletedItemsCount--;
    console.log(deletedItemsCount);


    if (deletedItemsCount == 0){
        const deleteIcon = document.getElementById('trash-bin');
        deleteIcon.src = "../photos/trash-empty.png";
    }
}
//#endregion