/*----- constants -----*/

const allColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']


/*----- state variables -----*/
let computerChoice;
// let playerChoice = [];


/*----- cached elements  -----*/


const boardEl = document.querySelectorAll('.playBoard');
const hintsEl = document.getElementById('hints')
const colorEl = document.querySelector('.colours');
const buttonEl = document.querySelector('.button')
const instructionEL = document.getElementById('instructionPopup')



/*----- event listeners -----*/
buttonEl.addEventListener('click', buttonElClickHandler);
colorEl.addEventListener('click', colorElClickHandler);





/*----- functions -----*/
/*----- model functions -----*/

//when initilizing the game, computer generated random secrete color code (including duplicated color)

function setComputerChoice() {

    const secreteColors = [];
    for (let i = 0; i < 4; i++) {
        randomInt = Math.floor(Math.random() * allColors.length)
        secreteColors.push(allColors[randomInt])
    };

    return secreteColors;

}

console.log(setComputerChoice())



/*----- controller functions -----*/
//when clicking colors to choose color - set players choice
function colorElClickHandler(event) {
    if (event.target.className !== "circle") {
        return;
    }
    //check the hole color, if it is white then the chosen color can be assigned to it, otherwise need to assign the next one
    const targetColor = getComputedStyle(event.target).backgroundColor;
    for (i = 0; i < 48; i++) {
        if (getComputedStyle(boardEl[i]).backgroundColor === 'rgb(255, 255, 255)') {
            boardEl[i].style.backgroundColor = targetColor
            return;
        }
    }
}

//when clicking buttons

function buttonElClickHandler(event) {
    if (event.target.className !== "square") {
        return;
    }
    
    const target = event.target.getAttribute('name');
    if (target === 'instructions') {
        openInstructionForm();
    } else if (target === 'restart') {
        restart();
    } else if (target === 'backspace') {
        backspace();
    } else {
        check();
    }
}



//pop up windows
//for instructions
function openInstructionForm() {
    instructionEL.style.display = "block";
    
}

function closeInsturctionForm() {
    instructionEL.style.display = "none";
}




function restart() {
    //playboard and hint section back to white
    for (i = 0; i < 48; i++) {
        boardEl[i].style.backgroundColor = 'white'; 
    }






    //regenerate computer choice
    computerChoice = setComputerChoice();

}

function backspace() {

}



//compare players choice with computer choice for hint section

function check() {

}



//when hitting the last row or successfully get the color code, pop up result message!








/*----- view functions -----*/
//to render players choices and hint colour codes