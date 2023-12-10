'use strict';

// Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currScr0 = document.querySelector('#current--0');
const currScr1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');

// Variables
let scores, currScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  currScr0.textContent = 0;
  currScr1.textContent = 0;

  playerTwo.classList.remove('player--active');
  playerOne.classList.add('player--active');
  playerTwo.classList.remove('player--winner');
  playerOne.classList.remove('player--winner');
};
init();

// Start conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// Switch player
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle('player--active');
  playerTwo.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document.querySelector(`#current--${activePlayer}`).textContent = 0;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document.querySelector(`.player--${activePlayer}`).classList.add('name');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
