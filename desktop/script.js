//#region Alert card
const alertCard = document.querySelector(".alert-card");

document.addEventListener('DOMContentLoaded', function() {
    const hasVisited = localStorage.getItem('hasVisited');

    if (hasVisited === null || hasVisited === undefined) {
        alertCard.style.display = "block";
    }
});

const initialPosition = {
    top: alertCard.style.top,
    left: alertCard.style.left
};

makeDraggable(alertCard);

alertCard.style.top = initialPosition.top;
alertCard.style.left = initialPosition.left;

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
    const target = document.querySelector(element.dataset.target)
    const dot = document.querySelector("." + target.classList[0] + "-dot");

    if (!target.style.display || target.style.display === "none") {
        const offset = Math.floor(Math.random() * (maxOffset - minOffset + 1)) + minOffset;
        target.style.top = 70 + offset + "px";
        target.style.left = 300 + offset + "px";
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
document.querySelectorAll(".button-close").forEach((element) => {
    element.addEventListener("click", () => {
        const target = document.querySelector(element.dataset.target)

        if (document.fullscreenElement === target) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        
        const dot = document.querySelector("." + target.classList[0] + "-dot");
        dot.style.opacity = 0;
        target.style.display = "none";
    });
});

document.querySelectorAll(".button-maximize").forEach((element) => {
    element.addEventListener("click", () => {
        const target = document.querySelector(element.dataset.target)
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
    });
});
//#endregion

function makeDraggable(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (!element.style.top) {
        element.style.top = "0px";
    }
    if (!element.style.left) {
        element.style.left = "0px";
    }

    let header = element.querySelector("." + element.classList[0] + "-header");

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        
        if (e.target === header || header.contains(e.target)) {
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
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
    console.log(select.value);
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