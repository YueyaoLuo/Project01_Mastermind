/*----- constants -----*/

const redColor = 'rgb(234, 153, 153)';
const orangeColor = 'rgb(249, 203, 156)'
const yellowColor = 'rgb(255, 229, 153)';
const greenColor = 'rgb(182, 215, 168)';
const blueColor = 'rgb(159, 197, 232)';
const purpleColor = 'rgb(180, 167, 214)';

const allColors = [redColor, orangeColor, yellowColor, greenColor, blueColor, purpleColor]

const correctHints = "black,black,black,black";
// const allColors = ['red', 'orange', 'yellow', 'green', 'blue', 'puprle']



/*----- state variables -----*/
// let computerChoice;
let playerChoice;
let hints;



/*----- cached elements  -----*/


const boardEl = document.querySelectorAll('.playBoard');
const hintsEl = document.querySelectorAll('.feedback');
const colorEl = document.querySelector('.colours');
const buttonEl = document.querySelector('.button');
const instructionEL = document.getElementById('instructionPopup');
const winEl = document.getElementById('winMessage');
const looseEl = document.getElementById('looseMessage');

const playAgain = document.querySelector('btn-restart');

const red = document.getElementById('red');
const orange = document.getElementById('orange');
const yellow = document.getElementById('yellow');
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const purple = document.getElementById('purple');


// console.log(getComputedStyle(boardEl[1]).backgroundColor)

/*----- event listeners -----*/
buttonEl.addEventListener('click', buttonElClickHandler);
colorEl.addEventListener('click', colorElClickHandler);


/*----- functions -----*/
/*----- model functions -----*/

//when initilizing the game, computer generated random secrete color code (including duplicated color)

function setComputerChoice() {

    const secreteColor = [];
    for (let i = 0; i < 4; i++) {
        randomInt = Math.floor(Math.random() * allColors.length)
        secreteColor.push(allColors[randomInt])
    }

    //create the same secreteColorcode for 12 rows
    const repetitions = 12;
    let repeatedSecreteColor = [];

    for (let i = 0; i < repetitions; i++) {
        repeatedSecreteColor = repeatedSecreteColor.concat(secreteColor);
    }
    return repeatedSecreteColor;

}

let computerChoice = setComputerChoice();
console.log(computerChoice)






/*----- controller functions -----*/
//when clicking colors to choose color - set players choice

function colorElClickHandler(event) {
    if (event.target.className !== "circle") {
        return;
    }
    //check the hole color, if it is white then the chosen color can be assigned to it, otherwise need to assign the next one
    const targetColor = getComputedStyle(event.target).backgroundColor;


    for (i = 0; i < boardEl.length; i++) {
        if (getComputedStyle(boardEl[i]).backgroundColor === 'rgb(255, 255, 255)') {
            boardEl[i].style.backgroundColor = targetColor;
            break;
        };
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

//for restart button and also the play/try again button inside of win or loose message
function restart() {
    //playboard and hint section back to white
    for (i = 0; i < boardEl.length; i++) {
        boardEl[i].style.backgroundColor = 'white';
        hintsEl[i].style.backgroundColor = 'white';
    }
    //regenerate computer choice
    computerChoice = setComputerChoice();
    hints = [];

    closeInsturctionForm();


}

function backspace() {
    for (i = boardEl.length - 1; i >= 0; i--) {
        if (getComputedStyle(boardEl[i]).backgroundColor !== 'rgb(255, 255, 255)') {
            boardEl[i].style.backgroundColor = 'white';
            return;
        }
    }
}



//compare players choice with computer choice for hint section
function getPlayerChoice() {
    let playerChoice = [];
    
    for (let i = boardEl.length - 1; i >= 0;) {
        if (getComputedStyle(boardEl[i]).backgroundColor === 'rgb(255, 255, 255)') {
            i = i - 4; //move back by 4 positions if the hole is empty, which means players hasnt choose color for the hole
        } else {
            const choice = getComputedStyle(boardEl[i]).backgroundColor;
            playerChoice.unshift(choice); //using unshift to have right order of color choice

            i--; //move back by 1 position
        }
        
    }
    return playerChoice;


}

function check() {
    const playerChoice = getPlayerChoice();
    const hints = [];
    for (let i = playerChoice.length - 1; i >= 0;) {

        if (getComputedStyle(boardEl[i]).backgroundColor === 'rgb(255, 255, 255)') {
            i = i - 4;
        } else {
            //calculate hints based on players choice and computer choice
            if (playerChoice[i] === computerChoice[i]) {
                hints.unshift('black')
            } else if (computerChoice.includes(playerChoice[i])) {
                hints.unshift('gray')
            } else {
                hints.unshift('none')
            }
            i--;
            console.log(hints)
        }
    }    
    console.log(hints)
    updateHintSection(hints);
    checkHintSection(hints);
    console.log(hints.slice(-4).toString());
    console.log(correctHints)
}

//update hint section color based on hints array
function updateHintSection(hints) {
    for (i = 0; i < 48; i++) {
        hintsEl[i].style.backgroundColor = hints[i]
        if (hints[i] === 'none') {
            hintsEl[i].style.backgroundColor = 'white'
        }
    }
    
}  


//when have 4 black hints on a row (the last 4 in the array are black), send win message
function checkHintSection(hints) {
    //convert array to string to compare
    if (hints.slice(-4).toString() === correctHints) {
        openWinMessgae();
        //when run out of 12 turns, still doesnt get the correct code, send loose message
    } else if (hints.length >= 47) {
        openLooseMessage();
    }
}






//pop up windows
//for instructions only
function openInstructionForm() {
    instructionEL.style.display = "block";

}

//when hitting the last row and havent get correct secrete code, sending loose messgae
function openLooseMessage() {
    looseEl.style.display = "block";
}

//successfully get the color code, pop up win message
function openWinMessgae() {
    winEl.style.display = "block";
}


//for all popup windows
function closeInsturctionForm() {
    instructionEL.style.display = "none";
    winEl.style.display = "none";
    looseEl.style.display = "none";
}






/*----- view functions -----*/
//to render players choices and hint colour codes