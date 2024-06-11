const names = document.querySelectorAll('.game');
let nameIndex = 0;
let buttonsIndex = 0;
let gamePanelOpen = false;
let gameContainer = null;
names[nameIndex].classList.add('selected')

addTextToSelected();
document.addEventListener('keydown', function(event) {
    //up
    if(event.keyCode == 38 && !gamePanelOpen) {
        nameIndex--;
        if (nameIndex < 0){
            nameIndex++;
        }
        else{
            moveSelcted();
            addTextToSelected();
        }
    }
    //down
    else if(event.keyCode == 40 && !gamePanelOpen) {
        nameIndex++;
        if (nameIndex > names.length - 1){
            nameIndex = names.length - 1;
        }
        else{
            moveSelcted();
            addTextToSelected();
        }
    }
    //enter
    else if (event.keyCode == 13){
        selectGame();
    }
    //esc
    else if (event.keyCode == 27 && gamePanelOpen){
        closeGame();
    }
});

function moveSelcted(){
    names.forEach(element => {
        element.classList.remove('selected');
    });

    names[nameIndex].classList.add('selected')
}

function selectGame(){
    gameContainer = document.getElementById(names[nameIndex].dataset.target);
    gameContainer.style.display = "block";
    gamePanelOpen = true;
}

function closeGame(){
    gameContainer.style.display = "none";
    gamePanelOpen = false;
}

function addTextToSelected(){
    const existingDiv = document.getElementById("selectedText");
    if (existingDiv) existingDiv.remove();

    const div = document.createElement("div");
    const content = document.createTextNode("Enter");
    div.id = "selectedText";
    div.appendChild(content);

    const currentDiv = document.getElementById("div1");
    names[nameIndex].appendChild(div);
}