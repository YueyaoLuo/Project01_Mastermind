/*----- constants -----*/
const computer = 'COMPUTER'
const player = 'PLAYER';
const hints = 'HINTS'

const allColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
/*----- state variables -----*/
let computerChoice;
let playerChoice;

/*----- cached elements  -----*/

const boardEl = document.querySelectorAll('.playBoard');

console.log(boardEl[0].id)
const hintsEl = document.getElementById('hints')
// const red = document.getElementById('red');
// const orange = document.getElementById('orange');
// const yellow = document.getElementById('yellow');
// const green = document.getElementById('green');
// const blue = document.getElementById('blue');
// const purple = document.getElementById('purple');
const colorEl = document.querySelector('.colours');
const buttonEl = document.querySelector('.button')



/*----- event listeners -----*/
buttonEl.addEventListener('click', buttonElClickHandler);
colorEl.addEventListener('click', colorElClickHandler);




/*----- functions -----*/
/*----- model functions -----*/

//when initilizing the game, computer generated random secrete color code (including duplicated color)

function setComputerChoice() {
    
    const secreteArray = [];
    for (let i=0; i<6; i++) {
        randomInt = Math.floor(Math.random() * 6)
        secreteArray.push(randomInt)
     };
    
    const colorArr = [];
     for (let i=0; i<4; i++) {
        colorIndex = secreteArray[i]

        colorArr.push(allColors[colorIndex]);
    }
    return computerChoice = colorArr;

}


//set players choice function
//first not to consider clickable or not or other things, just assigning colours to the row

function setPlayerChoice() {
    for (let i=0; i<4; i++) {
        const choice = colorElClickHandler();

    }
}


 
//compare players choice with computer choice for hint section


/*----- controller functions -----*/
//when clicking colors to choose color
function colorElClickHandler(event) {
    event.preventDefault();
    const target = event.target.id;
    return target;
}

//when clicking buttons

function buttonElClickHandler(event) {
    event.preventDefault();
    const target = event.target.name;
    if (target === 'instructions') {
        instructionWindow()
    } else if (target === 'restart') {
        restart()
    } else if (target === 'backspace') {
        backspace()
    } else {
        check()
    }
}





function instructionWindow() {

}

function restart() {
//playboard and hint section back to white


//regenerate computer choice
setComputerChoice()

}

function backspace() {

}

function check() {

}


/*----- view functions -----*/
//to render players choices and hint colour codes