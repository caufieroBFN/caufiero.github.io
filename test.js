//CHALLENGE: Detect Tie games
//CHALLENGE: Maybe 4x4 grid
//CHALLENGE: Visual stuff, font, colors, layout

//All possible ways someone can win on the grid
const winCons = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

//Getting all of the grid buttons
const buttons = document.querySelectorAll(".piece");
const winText = document.getElementById("win-text");

//Specific to players
const players = ["X", "O"];
const playerColors = ["yellow", "cyan"];

//Lists which are chosen spaces
let turn = 0;
let xSpaces = [];
let oSpaces = [];

const playerLists = [xSpaces, oSpaces];

//Set up click handlers on each button
buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

//Happens whenever a button is clicked in the grid
function handleClick(event) {
  //only do ANYTHING if the button has not been claimed yet
  if (event.target.textContent != "X" && event.target.textContent != "O") {
    //Set the color, text to that player, then also add spot to player's list
    event.target.textContent = players[turn];
    event.target.style.backgroundColor = playerColors[turn];
    playerLists[turn].push(parseInt(event.target.dataset.index));

    //Check if player's list fufills any win cons
    let isWin = checkWin(playerLists[turn]);
    //if a player wins, deactivate all buttons and display win
    if (isWin) {
      winText.textContent = players[turn] + " Wins!";

      //button deactivation
      buttons.forEach((button) => {
        button.disabled = true;
      });
    }

    //Switch player
    turn = 1 - turn;
  }
}

//Checking win conditions whenever a button is pressed
function checkWin(playerList) {
  trueWinCon = null;
  win = false;
  winCons.forEach((condition) => {
    //Checks if every part of a win condition is in the player list
    const match = condition.every((el) => playerList.includes(el));
    if (match) {
      trueWinCon = condition;
      win = true;
    }
  });

  //Do this only if a win condition has been found, and do it for only one condition
  if (trueWinCon != null) {
    trueWinCon.forEach((num) => {
      //Literals for inserting num require BACKTICKS so keep that in mind
      let winningButton = document.querySelector(`button[data-index="${num}"]`);
      winningButton.style.backgroundColor = "red";
      winningButton.style.textColor = "white";
    });
  }

  return win;
}

//Sets all buttons back to default text and color, and wipes the player lists
function resetButtons() {
  buttons.forEach((button) => {
    button.textContent = "";
    button.style.backgroundColor = "initial";
    xSpaces.length = 0;
    oSpaces.length = 0;
    button.disabled = false;
    winText.textContent = "";
    turn = 0;
  });
}
