/*----- constants -----*/
const redColor = 'rgb(234, 153, 153)';
const orangeColor = 'rgb(249, 203, 156)'
const yellowColor = 'rgb(255, 229, 153)';
const greenColor = 'rgb(182, 215, 168)';
const blueColor = 'rgb(159, 197, 232)';
const purpleColor = 'rgb(180, 167, 214)';
const allColors = [redColor, orangeColor, yellowColor, greenColor, blueColor, purpleColor]

const correctHints = "black,black,black,black";



/*----- state variables -----*/
let computerChoice;
let playerChoice;
let hints;


/*----- cached elements  -----*/
const boardEl = document.querySelectorAll('.playBoard');
const hintsEl = document.querySelectorAll('.feedback');
const colorEl = document.querySelectorAll('.circle');
const squareEl = document.querySelectorAll('.square');
const buttonEl = document.querySelector('.button');
const instructionEL = document.getElementById('instructionPopup');
const winEl = document.getElementById('winMessage');
const looseEl = document.getElementById('looseMessage');

// all color elements
const red = document.getElementById('red');
const orange = document.getElementById('orange');
const yellow = document.getElementById('yellow');
const green = document.getElementById('green');
const blue = document.getElementById('blue');
const purple = document.getElementById('purple');



/*----- event listeners -----*/

buttonEl.addEventListener('click', buttonElClickHandler);
colorEl.forEach(button => {
    button.addEventListener('click', colorElClickHandler);
});


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

computerChoice = setComputerChoice();
console.log(computerChoice);//intended to log this out to check if the game works properly 



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
            assignColor(boardEl[i], targetColor)
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
    // reset board and hint section colors to default white
    for (i = 0; i < boardEl.length; i++) {
        colorBacktoWhite(boardEl[i]);
        colorBacktoWhite(hintsEl[i]);
    }

    //regenerate computer choice
    setComputerChoice();
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

        }
    }
    updateHintSection(hints);
    checkHintSection(hints);
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

//update hint section color based on hints array
function updateHintSection(hints) {
    for (i = 0; i < 48; i++) {
        hintsEl[i].style.backgroundColor = hints[i]
        if (hints[i] === 'none') {
            colorBacktoWhite(hintsEl[i]);
        }
    }
}

//disable function - cant choose any colors when checking and popup windows show up

function disable() {
    colorEl.forEach(button => {
        button.disabled = true;
    });
    squareEl.forEach(button => {
        button.disabled = true;
    });
}

//back to norm after disabled
function enable() {
    colorEl.forEach(button => {
        button.disabled = false;
    });
    squareEl.forEach(button => {
        button.disabled = false;
    });
}

//pop up windows
//for instructions only
function openInstructionForm() {
    displayPopupWindows(instructionEL);
    disable()
}

//when hitting the last row and havent get correct secrete code, sending loose messgae
function openLooseMessage() {
    displayPopupWindows(looseEl);
    disable();
}

//successfully get the color code, pop up win message
function openWinMessgae() {
    displayPopupWindows(winEl);
    disable()
}


//for all popup windows
function closeInsturctionForm() {
    closePopupWindows(instructionEL);
    closePopupWindows(winEl);
    closePopupWindows(looseEl);
    enable();
}


/*----- view functions -----*/

// assign target colors to element
function assignColor(El, targetColor) {
    El.style.backgroundColor = targetColor;
}

//playboard and hint section back to white - for restart btn
function colorBacktoWhite(El) {
    El.style.backgroundColor = 'white'
}


//to display pop-up windows
function displayPopupWindows(El) {
    El.style.display = 'block'
}

//to close pop up windows
function closePopupWindows(El) {
    El.style.display = 'none'
}