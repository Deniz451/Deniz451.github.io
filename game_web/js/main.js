// All game names in select screen
const names = document.querySelectorAll('.select-screen-game-name');

// All buttons back/play
let backBtns = document.querySelectorAll(".back-btn");
let playBtns = document.querySelectorAll(".play-btn");

let nameIndex = 0;
let backBtnIndex = 0;
let playBtnIndex = 0;
let gamePanelOpen = false;
let gameContainer = null;


names[nameIndex].classList.add('selected');
AddTextToSelected();

document.addEventListener('keydown', function(event) {
    //up
    if(event.keyCode == 38) {
        if (!gamePanelOpen){
            nameIndex--;
            if (nameIndex < 0){
                nameIndex++;
            }
            else{
                MoveSelctedGame();
                AddTextToSelected();
            }
        }
        else{
            playBtns[playBtnIndex].classList.remove('selected');
            backBtns[backBtnIndex].classList.add('selected');
        }
    }
    //down
    else if(event.keyCode == 40) {
        if (!gamePanelOpen){
            nameIndex++;
            if (nameIndex > names.length - 1){
                nameIndex = names.length - 1;
            }
            else{
                MoveSelctedGame();
                AddTextToSelected();
            }
        }
        else{
            backBtns[backBtnIndex].classList.remove('selected');
            playBtns[playBtnIndex].classList.add('selected');
        }
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
            
        }
    }
    //esc
    else if (event.keyCode == 27 && gamePanelOpen){
        CloseGame();
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
    gameContainer = document.getElementById(names[nameIndex].dataset.target);
    gameContainer.style.display = "block";
    gamePanelOpen = true;
}

// Closes selected game container
function CloseGame(){
    gameContainer.style.display = "none";
    gamePanelOpen = false;
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