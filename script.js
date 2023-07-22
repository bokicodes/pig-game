"use strict";

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnRead = document.querySelector(".btn--read");
const btnClose = document.querySelector(".btn--close");

const score1El = document.querySelector("#score--0");
const score2El = document.querySelector("#score--1");

const currentScore1El = document.querySelector("#current--0");
const currentScore2El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");

const player1BgEl = document.querySelector(".player--0");
const player2BgEl = document.querySelector(".player--1");

const overlay = document.querySelector(".overlay");
const rules = document.querySelector(".rules");

const player1NameEl = document.querySelector("#name--0");
const player2NameEl = document.querySelector("#name--1");

//Starting conditions
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add("hidden");
let playing = true;

//variables
let score1 = 0;
let score2 = 0;
let currentScore1 = 0;
let currentScore2 = 0;
let player1 = true;

btnRoll.addEventListener("click", function () {
	if (!playing) {
		return;
	}

	const diceNumber = Math.trunc(Math.random() * 6) + 1;
	diceEl.classList.remove("hidden");
	diceEl.src = `dice-${diceNumber}.png`; //html elementima moze direktno ovako da se pristupi, a css elementima ides .style.nesto

	if (diceNumber !== 1) {
		if (player1) {
			currentScore1 += diceNumber;
			currentScore1El.textContent = currentScore1;
		} else {
			currentScore2 += diceNumber;
			currentScore2El.textContent = currentScore2;
		}
	} else {
		if (player1) {
			player1 = false;
			player1BgEl.classList.remove("player--active");
			player2BgEl.classList.add("player--active");
			currentScore1 = 0;
			currentScore1El.textContent = currentScore1;
		} else {
			player1 = true;
			player1BgEl.classList.add("player--active");
			player2BgEl.classList.remove("player--active");
			currentScore2 = 0;
			currentScore2El.textContent = currentScore2;
		}
	}
});

btnNew.addEventListener("click", () => {
	score1El.textContent = 0;
	score2El.textContent = 0;
	diceEl.classList.add("hidden");

	playing = true;
	player1BgEl.classList.remove("player--winner");
	player2BgEl.classList.remove("player--winner");
	player1NameEl.textContent = "PLAYER 1";
	player2NameEl.textContent = "PLAYER 2";

	score1 = 0;
	score2 = 0;

	currentScore1 = 0;
	currentScore2 = 0;
	currentScore1El.textContent = currentScore1;
	currentScore2El.textContent = currentScore2;

	player1 = true;
	player1BgEl.classList.add("player--active");
	player2BgEl.classList.remove("player--active");
});

btnHold.addEventListener("click", () => {
	if (!playing) {
		return;
	}

	if (player1) {
		score1 += currentScore1;
		score1El.textContent = score1;

		//provera da li je player1 pobedio
		if (score1 >= 100) {
			player1BgEl.classList.remove("player--active");
			player1BgEl.classList.add("player--winner");
			player1NameEl.textContent += " HAS WON!";
			playing = false;
			diceEl.classList.add("hidden");
		}

		currentScore1 = 0;
		currentScore1El.textContent = currentScore1;
		player1BgEl.classList.remove("player--active");
		player2BgEl.classList.add("player--active");
		player1 = false;
	} else {
		score2 += currentScore2;
		score2El.textContent = score2;

		//provera da li je player2 pobedio
		if (score2 >= 100) {
			player2BgEl.classList.remove("player--active");
			player2BgEl.classList.add("player--winner");
			player2NameEl.textContent += " HAS WON!";
			playing = false;
			diceEl.classList.add("hidden");
		}

		currentScore2 = 0;
		currentScore2El.textContent = currentScore2;
		player1BgEl.classList.add("player--active");
		player2BgEl.classList.remove("player--active");
		player1 = true;
	}
});

btnRead.addEventListener("click", () => {
	rules.classList.remove("hidden");
	overlay.classList.remove("hidden");
	btnClose.classList.remove("hidden");
});

btnClose.addEventListener("click", () => {
	rules.classList.add("hidden");
	overlay.classList.add("hidden");
	btnClose.classList.add("hidden");
});
