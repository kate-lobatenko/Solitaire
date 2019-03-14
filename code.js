/*
	Jack is treadted as 11
	Queen is treated as 12
	King is treated as 13
	Ace is treated as 1
*/

const GAME_SETTINGS = {
	numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
	signs: ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
	amounts: {
		total: 52,
		dealDeck: 24,
		decks: [1, 2, 3, 4, 5, 6, 7], // amount of cards in every playing deck
		deal: 1
	},
	suits: [0, 1, 2, 3], //hearts, diamonds, clovers, spades
	suitsNames: ['hearts', 'diamonds', 'clovers', 'spades'],
	colors: [0, 1] //red, black
}

window.addEventListener('load', function() {
	new Game();
});

function Game() {
	this.dealDeck = null;
	this.finishDecks = [];
	this.playDecks = [];

	this.$stashContainer = document.getElementById('stashDecks');
	this.$playContainer = document.getElementById('playDecks');
	this.$el = document.getElementById('game');

	this.cardKits = this.generateCardKits();

	this.createDecks();
	this.registerEvents();
}

function DealDeck() {
	Deck.apply(this, arguments);

	//deal deck must create extra deck node nearby to place opened cards there
	this.$el.classList.add('flat');
	this.$wrapper.classList.add('col-3');
}

function FinishDeck() {
	Deck.apply(this, arguments);

	this.$el.classList.add('flat');

	this.cards = [];
	this.suit = null;
}

function PlayingDeck(cardsKit) {
	Deck.apply(this, arguments);

	this.openLastCard();
}

function Deck(cardKits) { // cards kit is array of objects like this [{number: 1, suit: 0, color: 0}, {number: 6, suit: 1, color: 1}]
	this.cards = [];

	this.$el = document.createElement('div');
	this.$wrapper = document.createElement('div');

	if (cardKits.length) {
		this.createCards(cardKits);
	}

	//decks must be wrapped in .col div
	this.$wrapper.appendChild(this.$el);
	this.$wrapper.classList.add('col');
	this.$el.classList.add('deck');

	this.registerEvents();
}

function Card(cardKit) {
	this.color = cardKit.color;
	this.suit = cardKit.suit;
	this.number = cardKit.number;
	this.isOpen = false;

	this.$el = document.createElement('div');
	this.$el.classList.add('card', GAME_SETTINGS.suitsNames[cardKit.suit]);
	this.$el.innerText = GAME_SETTINGS.signs[cardKit.number];

	this.registerEvents();
}

Game.prototype = {
	createDecks: function() {
		let kits = this.getShuffledDecks();

		this.$stashContainer.innerHTML = '';
		this.$playContainer.innerHTML = '';

		this.dealDeck = new DealDeck(kits.splice(0, GAME_SETTINGS.amounts.dealDeck));
		this.$stashContainer.appendChild(this.dealDeck.$wrapper);

		for(let i = 0; i < GAME_SETTINGS.suits.length; i++) {
			let finishDeck = new FinishDeck([]);

			this.$stashContainer.appendChild(finishDeck.$wrapper);
		}

		let deckSettings = GAME_SETTINGS.amounts.decks;

		for(let i = 0; i < deckSettings.length; i++) {
			let deck = new PlayingDeck(kits.splice(0, deckSettings[i]));

			this.$playContainer.appendChild(deck.$wrapper);
		}
		//create decks here
	},

	getShuffledDecks: function() {
		let kits = this.cardKits.slice();
		let shuffledKits = [];

		while (kits.length) {
			let randomIndex = Math.round(Math.random() * (kits.length - 1));

			shuffledKits.push(kits.splice(randomIndex, 1)[0]);
		}

		return shuffledKits;
	},

	generateCardKits: function() {
		return [
			{color: 0, suit: 0, number: 1},
			{color: 0, suit: 0, number: 2},
			{color: 0, suit: 0, number: 3},
			{color: 0, suit: 0, number: 4},
			{color: 0, suit: 0, number: 5},
			{color: 0, suit: 0, number: 6},
			{color: 0, suit: 0, number: 7},
			{color: 0, suit: 0, number: 8},
			{color: 0, suit: 0, number: 9},
			{color: 0, suit: 0, number: 10},
			{color: 0, suit: 0, number: 11},
			{color: 0, suit: 0, number: 12},
			{color: 0, suit: 0, number: 13},

			{color: 0, suit: 1, number: 1},
			{color: 0, suit: 1, number: 2},
			{color: 0, suit: 1, number: 3},
			{color: 0, suit: 1, number: 4},
			{color: 0, suit: 1, number: 5},
			{color: 0, suit: 1, number: 6},
			{color: 0, suit: 1, number: 7},
			{color: 0, suit: 1, number: 8},
			{color: 0, suit: 1, number: 9},
			{color: 0, suit: 1, number: 10},
			{color: 0, suit: 1, number: 11},
			{color: 0, suit: 1, number: 12},
			{color: 0, suit: 1, number: 13},

			{color: 1, suit: 2, number: 1},
			{color: 1, suit: 2, number: 2},
			{color: 1, suit: 2, number: 3},
			{color: 1, suit: 2, number: 4},
			{color: 1, suit: 2, number: 5},
			{color: 1, suit: 2, number: 6},
			{color: 1, suit: 2, number: 7},
			{color: 1, suit: 2, number: 8},
			{color: 1, suit: 2, number: 9},
			{color: 1, suit: 2, number: 10},
			{color: 1, suit: 2, number: 11},
			{color: 1, suit: 2, number: 12},
			{color: 1, suit: 2, number: 13},

			{color: 1, suit: 3, number: 1},
			{color: 1, suit: 3, number: 2},
			{color: 1, suit: 3, number: 3},
			{color: 1, suit: 3, number: 4},
			{color: 1, suit: 3, number: 5},
			{color: 1, suit: 3, number: 6},
			{color: 1, suit: 3, number: 7},
			{color: 1, suit: 3, number: 8},
			{color: 1, suit: 3, number: 9},
			{color: 1, suit: 3, number: 10},
			{color: 1, suit: 3, number: 11},
			{color: 1, suit: 3, number: 12},
			{color: 1, suit: 3, number: 13}			
		];
	},

	getProperFinishDeck: function(suit) {
		return this.finishDecks.filter((deck) => deck.suit === suit)[0]
				|| this.finishDecks.filter((deck) => deck.isEmpty())[0];
	},

	registerEvents: function() {
		this.$el.addEventListener('deck.click', this.onDeckClick().bind(this));
	},

	onDeckClick: function() {
		let selectedDeck = null;
		let selectedCards = [];

		return function(e) {
			let deck = e.detail.deck;
			let cards = e.detail.cards;
			
			if (selectedDeck) {
				if(this.moveCards(selectedDeck, deck, selectedCards)){
					selectedDeck = null;
					selectedCards = [];
				}
			} else {
				selectedDeck = deck;
				selectedCards = cards;
			}
		}
	},

	moveCards: function(deckFrom, deckTo, cards) {
		if (deckTo.addCards(cards)) {
			deckFrom.removeCards(cards);

			return true;
		}

		return false;
	}
}

Deck.prototype = {
	createCards: function(cardKits) {
		for(let i = 0; i < cardKits.length; i++) {
			let card = new Card(cardKits[i]);

			this.$el.appendChild(card.$el);
			this.cards.push(card);
		}
	},

	registerEvents: function() {
		this.$el.addEventListener('card.click', this.onCardClick.bind(this));
	},

	onCardClick: function(e) {
		let cardIndex = this.cards.indexOf(e.detail.card);
		let cards = this.cards.slice(cardIndex);

		this.cards.forEach((card) => card.unselect());
		cards.forEach((card) => card.select());

		this.$el.dispatchEvent(new CustomEvent('deck.click', {
			bubbles: true,
			detail: {
				deck: this,
				cards: cards
			}
		}));
	},

	getCardIndex: function(card) {
		for(let i = 0; i < this.cards.length; i++) {
			let currentCard = this.cards[i];

			// refactor this shit
			if (currentCard.color === card.color && currentCard.number === card.number && currentCard.suit === card.suit) {
				return i;
			}
		}

		return -1;
	},

	addCards: function(cards) {
		if (!this.verifyTurn(cards)) {
			return false;
		}

		for(let i = 0; i < cards.length; i++) {
			this.$el.appendChild(cards[i].$el);
			this.cards.push(cards[i]);
		}

		return true;
	},

	removeCards: function(cards) {
		let cardIndex = this.getCardIndex(cards[0]);

		this.cards.splice(cardIndex);
	},

	verifyTurn: function(cards) {
		let upperCard = cards[0];
		let cardTo = this.cards.slice(-1).pop();

		return upperCard.color != cardTo.color 
				&& cardTo.number - upperCard.number === 1
				// or this is king and deck is empty;
	}
}

Card.prototype = {
	select: function() {
		this.$el.classList.add('selected');
	},

	unselect: function() {
		this.$el.classList.remove('selected');
	},

	open: function() {
		this.$el.classList.add('open');
		this.isOpen = true;
	},

	close: function() {
		this.$el.classList.remove('open');
		this.isOpen = false;
	},

	isClosed: function() {
		return !this.isOpen;
	},

	onClick: function(e) {
		e.stopPropagation();

		this.$el.dispatchEvent(new CustomEvent('card.click', {
			bubbles: true,
			detail: {
				card: this
			}
		}));
	},

	onDoubleClick: function() {

	},

	registerEvents: function() {
		this.$el.addEventListener('click', this.onClick.bind(this));
		this.$el.addEventListener('dblclick', this.onDoubleClick.bind(this));
	}
}

DealDeck.prototype = Object.assign(Object.create(Deck.prototype), {
	onClick: function() {

	},

	registerEvents: function() {
		Deck.prototype.registerEvents.call(this);

		this.$el.addEventListener('click', this.onClick.bind(this));
	},

	onClick: function(e) {
		let closedCard = this.getFirstClosedCard();

		if (closedCard) {
			this.getFirstClosedCard().open();
		} else {
			this.revert();
		}
	},

	getFirstClosedCard: function() {
		return this.cards.filter((card) => card.isClosed())[0];
	},

	revert: function() {
		this.cards.forEach((card) => card.close());
	},

	addCards: function() {
		return false;
	}
});

FinishDeck.prototype = Object.assign(Object.create(Deck.prototype), {
	isEmpty: function() {
		return !(this.suit || this.cards.length);
	},

	setEmpty: function() {
		this.suit = null;
	}
});

PlayingDeck.prototype = Object.assign(Object.create(Deck.prototype), {
	openLastCard: function() {
		if (this.cards.length) {
			this.cards.slice(-1).pop().open();
		}
	},

	removeCards: function() {
		Deck.prototype.removeCards.apply(this, arguments);

		this.openLastCard();
	}
});