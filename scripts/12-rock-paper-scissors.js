let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isAutoPlaying = false;
let intervalId;

//const autoPlay = () => {

//};
function autoPlay() {

  if (!isAutoPlaying){
    IntervalId = setInterval(() =>{
      playGame(pickComputerMove())
    } , 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Play';
  }
  else {
    clearInterval(IntervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }

};

document.querySelector('.js-rock-button').addEventListener('click', () => { playGame('rock')});
document.querySelector('.js-paper-button').addEventListener('click', () => { playGame('paper')});
document.querySelector('.js-scissors-button').addEventListener('click', () => { playGame('scissors')});

document.body.addEventListener('keydown', (event) => {

if (event.key === 'r'){
  playGame('rock')
}
else if (event.key === 'p'){
  playGame('paper')
}
else if (event.key ==='s')
{
  playGame('scissors')
}
else if (event.key ===' ')
{
  autoPlay();
}
else if (event.key==='Backspace'){
  score.wins =0;
  score.losses =0;
  score.ties =0;
  localStorage.removeItem('score');
  updateScoreElement();
}
});

function resetScore(){
  score.wins =0;
  score.losses =0;
  score.ties =0;
  localStorage.removeItem('score');
  updateScoreElement();
}
document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    // Update the click event listener to
    // show the confirmation message instead
    // of restting the score immediately.
    showResetConfirmation();
  });

  document.querySelector('.js-auto-play-button').addEventListener('click', () => { autoPlay()});


  function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
          Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
          No
        </button>
      `;
    
    // You could use onclick="..." in the HTML above,
    // but it's recommended to use .addEventListener()
    document.querySelector('.js-reset-confirm-yes')
      .addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
      });
    
    document.querySelector('.js-reset-confirm-no')
      .addEventListener('click', () => {
        hideResetConfirmation();
      });
  }
  function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = '';
  }
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'You Lose';
    } else if (computerMove === 'paper') {
      result = 'You Win';
    } else if (computerMove === 'scissors') {
      result = 'Tie';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else if (computerMove === 'scissors') {
      result = 'You Lose';
    }
  } else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You Lose';
    } else if (computerMove === 'scissors') {
      result = 'You Win';
    }
  }

  if (result === 'You Win') {
    score.wins++;
  } else if (result === 'You Lose') {
    score.losses++;
  } else if (result === 'Tie') {
    score.ties++;
  }


  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = `${result}.`;
  document.querySelector(
    '.js-moves'
  ).innerHTML = `      You <img class="move-icon" src="/images/${playerMove}-emoji.png" />
  <img class="move-icon" src="/images/${computerMove}-emoji.png" />
  Computer`;
}

function updateResult() {}
function updateScoreElement() {
  document.querySelector(
    '.js-score'
  ).innerHTML = ` Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}
function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}




