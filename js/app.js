// [] Show star rating at end of game

/*
 * Create a list that holds all of your cards
 */
const cards = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb']

// Const variables
const MOVES = document.getElementsByClassName('moves')[0];
const DECK = document.getElementsByClassName('deck')[0];
const RESTART = document.getElementsByClassName('restart')[0];
const STAR2 = document.getElementsByClassName('fa fa-star')[1];
const STAR3 = document.getElementsByClassName('fa fa-star')[2];
const TIMER_DISPLAY = document.getElementsByClassName('seconds')[0];

// Other variables
let openCards = [];
let matchCount = 0;
let moveCount = 0;
let starCount = 3;
let timerStarted = false;
let seconds = 0;
let timer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Initialise the game
initGame();

function initGame() {
	// Reset values to defaults, this is used in case the game is restarted
	openCards = [];
	matchCount = 0;
	moveCount = 0;
	timerStarted = false;
	seconds = 0;
	displayCards(cards);
	addEventListeners();
}

// Shuffle and display the cards
function displayCards(cards) {
	shuffle(cards);
	cards.forEach(card => {
		let i = document.createElement('i');
		i.classList = `fa fa-${card}`;
		let li = document.createElement('li');
		li.className = 'card';
		li.appendChild(i);
		DECK.appendChild(li);
	})
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// Set up the event listener for each card
function addEventListeners () {
	DECK.childNodes.forEach((card) => {
		card.addEventListener('click', (e) => {
			if (timerStarted == false) {
				startTimer();
			}
			let card = '';
			// Set card to parent in case user clicks icon instead of card on second click
			if (e.target.nodeName == 'I') {
				card = e.target.parentNode;
			} else {
				card = e.target;
			}
			if (card.classList.value !== 'card open show') {
				displayCard(card);
				checkForMatch(card);
			}
		})
	})
}

// Display the card's symbol
function displayCard(card) {
	card.classList.add('open', 'show');
}

// Add the card to a *list* of "open" cards
function checkForMatch(card) {
		openCards.push(card);
		// Check to see if the two cards match
		if (openCards.length == 2) {
			if (openCards[0].children[0].classList[1].substr(3) == openCards[1].children[0].classList[1].substr(3)) {
				cardMatch();
			} else {
				cardNoMatch();
			}
		}
}

// If the cards do match, lock the cards in the open position
function cardMatch() {
	openCards.forEach((card)=> {
		card.classList.remove('open', 'show');
		card.classList.add('match');
	})
		openCards = [];
		updateMoveCount();
		updateMatchCount();
}

// If the cards do not match, remove the cards from the list and hide the card's symbol
function cardNoMatch() {
	openCards.forEach((card)=> {
		setTimeout(() => card.classList.remove('open', 'show'),1000);
		openCards = [];
	})
	updateMoveCount();
}


// Increment the move counter and display it on the page
function updateMoveCount() {
	moveCount += 1;
	if (moveCount == 15) {
		starCount = --starCount;
		console.log(starCount);
		STAR3.style.display = 'none';
	}
	if (moveCount == 25) {
		starCount = --starCount;
		console.log(starCount);
		STAR2.style.display = 'none';
	}
	MOVES.innerHTML = moveCount;
}

// If all cards have matched, display a message with the final score
function updateMatchCount() {
	matchCount += 1;
	if (matchCount == 8) {
		stopTimer();
		showScore();
	}
}

// Show the score
function showScore() {
	// Call sweet alert to display popup
	swal('Good job, you won! ', `In ${moveCount} turns and ${seconds} seconds`, 'success');
	createStarRating();
}

// Display the star rating on the score alert
function createStarRating() {
	for (let i = 0; i < starCount; i++) {
		const STAR_RATING_LI = document.createElement('li');
		const STAR_RATING_I = document.createElement('i');
		const SWAL_TITLE = document.getElementsByClassName('swal-title')[0];
		const STAR_RATING_UI = document.createElement('ul');
		STAR_RATING_UI.classList.add('stars');
		STAR_RATING_I.classList.add('fa', 'fa-star');
		STAR_RATING_LI.appendChild(STAR_RATING_I);
		STAR_RATING_UI.appendChild(STAR_RATING_LI);
		SWAL_TITLE.appendChild(STAR_RATING_UI);
	}
}

// Restart the game
RESTART.addEventListener('click', () => {
	DECK.innerHTML = '';
	STAR2.style.display = 'inline-block';
	STAR3.style.display = 'inline-block';
	stopTimer();
	TIMER_DISPLAY.innerHTML = '';
	MOVES.innerHTML = '0';
	initGame();
})

// Start the timer
function startTimer() {
	timerStarted = true;
	timer = setInterval( () => {
		seconds++;
		TIMER_DISPLAY.innerHTML = `Timer: ${seconds} seconds`;
}, 1000);
}

// Stop the timer
function stopTimer() {
	clearInterval(timer);
}