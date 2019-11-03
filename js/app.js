/*
 * Create a list that holds all of your cards
 */
let cards = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb', 'diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb']

const deck = document.getElementsByClassName('deck')[0];

let openCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
displayCards(cards);

function displayCards(cards) {
	// shuffle(cards);
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  [x] display the card's symbol (put this functionality in another function that you call from this one)
 *  [x] add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click', function (e) {
	let card = e.target;
	displayCard(card);
	checkForMatch(card);
})

function displayCard(card) {
	// display the card's symbol
	card.classList.add('open', 'show');
}

function checkForMatch(card) {
	// add the card to a *list* of "open" cards
	openCards.push(card);

	if (openCards.length == 2) {
		if (openCards[0].children[0].classList[1].substr(3) == openCards[1].children[0].classList[1].substr(3)) {
			console.log("Match")
			console.log(openCards);
			cardMatch();
		} else {
			setTimeout(cardNoMatch,1000);
		}
	}
	console.log(openCards);
}

function cardMatch() {
	openCards.forEach((card)=> {
		card.classList.remove('open', 'show');
		card.classList.add('match');
		openCards = [];
	})
}

function cardNoMatch() {
	openCards.forEach((card)=> {
		card.classList.remove('open', 'show');
		openCards = [];
	})
}