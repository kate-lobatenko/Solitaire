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
	this.$container = document.getElementById('game');

	this.createDecks();
	this.registerEvents();
}

function DealDeck() {
	Deck.call(this);

	//deal deck must create extra deck node nearby to place opened cards there
	//deal deck with extra deck must be wrapped in .col-3 div

	this.$el.classList.add('flat');
}

function FinishDeck() {
	Deck.call(this, 0);

	this.$el.classList.add('flat');

	this.cards = [];
	this.suit = null;
}

function PlayingDeck(cardsKit) {
	Deck.call(this, cardsAmount);

	if (this.cards.length > 1) {
		this.cards.slice(-1).open();
	}
}

function Deck(cardsKit) { // cards kit is array of objects like this [{number: 1, suit: 0, color: 0}, {number: 6, suit: 1, color: 1}]
	this.cards = [];

	if (cardsKit.length) {
		this.createCards(cardsKit);
	}

	//decks must be wrapped in .col div
	this.$el.classList.add('deck');

	this.registerEvents();
}

function Card(color, suit, number) {
	this.color = color;
	this.suit = suit;
	this.number = number;
	this.isOpen = false;

	this.$el = document.createElement('div');
	this.$el.classList.add('card', GAME_SETTINGS.suitsNames[suit]);
	this.$el.innerText = GAME_SETTINGS.signs[number];

	this.registerEvents();
}

Game.prototype = {
	createDecks: function() {
		//this.$stashContainer.innerHTML = '';
		//this.$playContainer.innerHTML = '';

		//create decks here
	},

	getProperFinishDeck: function(suit) {
		return this.finishDecks.filter((deck) => deck.suit === suit)[0]
				|| this.finishDecks.filter((deck) => deck.isEmpty())[0];
	},

	registerEvents: function() {

	},
}

Deck.prototype = {
	createCards: function(cardsAmount) {

	},

	registerEvents: function() {

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

	onClick: function() {

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
	
});