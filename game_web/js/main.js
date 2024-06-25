// All game names in select screen
const names = document.querySelectorAll('.select-screen-game-name');

// All buttons back/play
let backBtns = document.querySelectorAll(".back-btn");
let playBtns = document.querySelectorAll(".play-btn");

let nameIndex = 0;
let backBtnIndex = 0;
let playBtnIndex = 0;
let gamePanelOpen = false;
let gameOpen = false;
let gameContainer = null;
let game = null;


names[nameIndex].classList.add('selected');
AddTextToSelected();

console.log(names.length);

document.addEventListener('keydown', function(event) {
    //up
    if(event.keyCode == 38) {
        if (!gamePanelOpen){
            nameIndex--;
            if (nameIndex < 0){
                //nameIndex++;
                nameIndex = names.length - 1;
                MoveSelctedGame();
                AddTextToSelected();
            }
            else{
                MoveSelctedGame();
                AddTextToSelected();
            }
        }
        else if (gamePanelOpen && !gameOpen){
            playBtns[playBtnIndex].classList.remove('selected');
            backBtns[backBtnIndex].classList.add('selected');
        }
        console.log(nameIndex);
    }
    //down
    else if(event.keyCode == 40) {
        if (!gamePanelOpen){
            nameIndex++;
            if (nameIndex > names.length - 1){
                //nameIndex = names.length - 1;
                nameIndex = 0;
                MoveSelctedGame();
                AddTextToSelected();
            }
            else{
                MoveSelctedGame();
                AddTextToSelected();
            }
        }
        else if (gamePanelOpen && !gameOpen){
            backBtns[backBtnIndex].classList.remove('selected');
            playBtns[playBtnIndex].classList.add('selected');
        }
        console.log(nameIndex);
    }
    //enter
    else if (event.keyCode == 13){
        if (!gamePanelOpen){
            SelectGame();

            backBtnIndex = nameIndex;
            playBtnIndex = nameIndex;
            backBtns[backBtnIndex].classList.add('selected');   
        }
        else{
            if (backBtns[backBtnIndex].classList.contains("selected")){
                CloseGamePanel();
                DeselectBtns();
            }
            else if (playBtns[playBtnIndex].classList.contains("selected")){
                PlayGame();
            }
        }
    }
    //esc
    else if (event.keyCode == 27 && gamePanelOpen){
        CloseGamePanel();
        DeselectBtns();
    }
});



// Moves the selection stripe for game names 
function MoveSelctedGame(){
    names.forEach(element => {
        element.classList.remove('selected');
    });

    names[nameIndex].classList.add('selected')
}

// Moves the selection stripe for back/play buttons
function MoveSelctedBtn(){

}

// Opens selected game container
function SelectGame(){
    gameContainer = document.getElementById(names[nameIndex].dataset.panel);
    gameContainer.style.display = "block";
    gamePanelOpen = true;
}

// Open the container with the game
function PlayGame(){
    game = document.getElementById(names[nameIndex].dataset.game);
    game.style.display = "block";
    gameOpen = true;
}

// Closes selected game container
function CloseGamePanel(){
    gameContainer.style.display = "none";
    gamePanelOpen = false;
    CloseGame();
}

// Close the container with the game
function CloseGame(){
    game = document.getElementById(names[nameIndex].dataset.game);
    game.style.display = "none";
    gameOpen = false;
}

// Adds text to slection stripe
function AddTextToSelected(){
    const existingDiv = document.getElementById("selectedText");
    if (existingDiv) existingDiv.remove();

    const div = document.createElement("div");
    const content = document.createTextNode("Enter");
    div.id = "selectedText";
    div.style.marginRight = "10px";
    div.appendChild(content);

    const currentDiv = document.getElementById("div1");
    names[nameIndex].appendChild(div);
}

// Remove .selected class from buttons back/play
function DeselectBtns(){
    if (backBtns[backBtnIndex].classList.contains("selected")){
        backBtns[backBtnIndex].classList.remove("selected");
    }
    else if (playBtns[playBtnIndex].classList.contains("selected")){
        playBtns[playBtnIndex].classList.remove("selected");
    }
}

// Prevent zooming with mouse
window.addEventListener('wheel', function(event) {
    if (event.ctrlKey === true) {
        event.preventDefault();
    }
}, { passive: false });

window.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });