// [] Show star rating at end of game

/*
 * Create a list that holds all of your cards
 */
const cards = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb']

// Const variables
const moves = document.getElementsByClassName('moves')[0];
const deck = document.getElementsByClassName('deck')[0];
const restart = document.getElementsByClassName('restart')[0];
const star3 = document.getElementsByClassName('fa fa-star')[2];
const star2 = document.getElementsByClassName('fa fa-star')[1];
const timerDisplay = document.getElementsByClassName('seconds')[0];

// Other variables
let openCards = [];
let matchCount = 0;
let moveCount = 0;
let timerStarted = false;
let seconds = 0;
let timer;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

initGame();

function initGame() {
	openCards = [];
	matchCount = 0;
	moveCount = 0;
	timerStarted = false;
	seconds = 0;
	displayCards(cards);
	addEventListeners();
}

function displayCards(cards) {
	shuffle(cards);
	cards.forEach(card => {
		let i = document.createElement('i');
		i.classList = `fa fa-${card}`;
		let li = document.createElement('li');
		li.className = 'card';
		li.appendChild(i);
		deck.appendChild(li);
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
	deck.childNodes.forEach((card) => {
		card.addEventListener('click', (e) => {
			if (timerStarted == false) {
				startTimer();
			}
			let card = "";
			// Set card to parent in case user clicks icon instead of card on second click
			if (e.target.nodeName == "I") {
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
		// check to see if the two cards match
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
		let cardSymbol = openCards[0].children[0].classList[1].substr(3);
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
	if (moveCount == 20) {
		star3.style.display = "none";
	}
	if (moveCount == 40) {
		star2.style.display = "none";
	}
	moves.innerHTML = moveCount;
}

// If all cards have matched, display a message with the final score
function updateMatchCount() {
	matchCount += 1;
	if (matchCount == 8) {
		stopTimer();
		showScore();
	}
}

function showScore() {
	swal("Good job, you won!", `In ${moveCount} turns and ${seconds} seconds`, "success");
}

// Restart game
restart.addEventListener('click', () => {
	deck.innerHTML = '';
	star2.style.display = "inline-block";
	star3.style.display = "inline-block";
	stopTimer();
	timerDisplay.innerHTML = '';
	moves.innerHTML = '0';
	initGame();
})

// Timer
function startTimer() {
	timerStarted = true;
	timer = setInterval( () => {
		seconds++;
		timerDisplay.innerHTML = `Timer: ${seconds} seconds`;
}, 1000);
}

function stopTimer() {
	clearInterval(timer);
}