
# Game title
MASTERMIND


# Screenshots
![wireframes](/wireframes/Screenshot%202024-03-23%20160756.png)



# Description: 
(MVP version)
- Only 1 player in the game, computer randomly generated 4 secrete colour code and their order that player is going to guess.
- Player choose 4 colours in 6 given colours and place them into player section (order matters!)



# Game rules:
1. Player to choose from 6 colours to put into 4 holes and guess the right colours and their positions. Using CHECK button to get some hints regarding the chosen colour and the order.
2. The secrete colour code may include duplicated colour.
3. 4 smaller pegs on each row to indicate if the user put the right or wrong colour and their order. BLACK indicate right colour position, GRAY indicate right colour but at the wrong position, NO PEG to indicate a wrong colour that does not appear in the secrete code.
4. When the guess is correct or run out of 12 guessing turns (decoding board are full), the game is over and has a pop up window sending result message


# User story:
- As a user, I want to know how to play the game 
- As a user, I want to pick up colour
- As a user, I want to change my mind during each turn
- As a user, I want to check my guess
- As a user, I want to restart the game 
- As a user, I want to have a won or lost message


# Technologies Used: 
- JavaScript
- HTML
- CSS


# Getting Started:
[Mastermind Game](https://yueyaoluo.github.io/Project01_Mastermind/)


# Next Steps:
- Have two players in the game and create a score board for them
- The placement of the hint pegs NOT to indicate which particular code pegs are meant.
- Thinking of a vacant hole as being another colour code



# To-do list:
- [X] create playing board
- [x] create bottons
- [x] set computer randomly generated secrete color code
- [x] user click to choose colours
- [x] Button for instructions
- [x] Button for restart the game
- [x] Button for backspace, allowing player to change mind
- [x] Button for checking players choice
- [x] Hint section to provide feedback based on rules and player's choices
- [x] pop-up windows to send result message
- [x] Refine UI