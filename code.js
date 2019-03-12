/*
	Jack treadted as 11
	Queen treated as 12
	King treated as 13
	Ace treated as 1
*/

var cardSettings = {
	numbers: [1,2,3,4,5,6,7,8,9,10,11,12,13],
	amounts: {
		total: 52,
		dealDeck: 24,
		decks: [1,2,3,4,5,6,7], // amount of cards in every playing deckб
		deal: 1
	},
	suits = [0, 1 ,2 ,3], //hearts, diamonds, clovers, spades
	suitsNames = ['hearts', 'diamonds', 'clovers', 'spades'],
	colors: [0, 1] //red, black
}

function Game() {
	this.cards = [];
	this.decks = [];
	this.selectedCard = null;
}

function DealDeck() {
	Deck.call(this);

	var $col = document.createElement('col');

	this.$el = document.createElement('div');

	$
	this.$el.classList.add()
}

function FinishDeck(suit) {
	Deck.call(this);

	this.cards = [];
	this.suit
}

function PlayingDeck() {
	Deck.call(this);
}

function Deck(cardsAmount) {
	this.cards = [];

	this.createCards(cardsAmount);
}

function Card(color, suit, number) {
	this.color = color;
	this.suit = suit;
	this.number = number;
}

Game.prototype = {
	start: function() {

	},

	createDecks: function() {

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
	onClick: function() {

	},

	onDoubleClick: function() {

	},

	registerEvents: function() {
		this.$el.addEventListener('click', this.onClick.bind(this));
		this.$el.addEventListener('dblclick', this.onDoubleClick.bind(this));
	}
}