/*
	Jack is treated as 11
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
};

window.addEventListener('load', function () {
	new Game();
});

function Game() {
	this.dealDeck = null;
	this.finishDecks = [];
	this.playDecks = [];

	this.$stashContainer = document.getElementById('stashDecks');
	this.$playContainer = document.getElementById('playDecks');
	this.$finishContainer = document.getElementById('finishDecks');
	this.$el = document.getElementById('game');

	this.cardKits = this.generateCardKits();

	this.createDecks();
	this.registerEvents();
}

function DealDeck() {
	Deck.apply(this, arguments);

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

function Deck(cardKits) {
	this.cards = [];

	this.$el = document.createElement('div');
	this.$wrapper = document.createElement('div');

	if (typeof (cardKits) == 'undefined') {
		return;
	}

	if (cardKits.length) {
		this.createCards(cardKits);
	}

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
	createDecks: function () {
		let kits = this.getShuffledDecks();

		this.$stashContainer.innerHTML = '';
		this.$playContainer.innerHTML = '';
		this.$finishContainer.innerHTML = '';

		this.dealDeck = new DealDeck(kits.splice(0, GAME_SETTINGS.amounts.dealDeck));
		this.$stashContainer.appendChild(this.dealDeck.$wrapper);

		for (let i = 0; i < GAME_SETTINGS.suits.length; i++) {
			let finishDeck = new FinishDeck([]);

			this.$finishContainer.appendChild(finishDeck.$wrapper);
			finishDeck.$wrapper.classList.add('col', 'col-3', 'inner-card');
			finishDeck.$wrapper.id = GAME_SETTINGS.suitsNames[i];
			this.$stashContainer.appendChild(this.$finishContainer);
		}

		let deckSettings = GAME_SETTINGS.amounts.decks;

		for (let i = 0; i < deckSettings.length; i++) {
			let deck = new PlayingDeck(kits.splice(0, deckSettings[i]));

			this.$playContainer.appendChild(deck.$wrapper);
		}

	},

	getShuffledDecks: function () {
		let kits = this.cardKits.slice();
		let shuffledKits = [];

		while (kits.length) {
			let randomIndex = Math.round(Math.random() * (kits.length - 1));

			shuffledKits.push(kits.splice(randomIndex, 1)[0]);
		}

		return shuffledKits;
	},

	generateCardKits: function () {

		const newArr = [];
		let k, j;
		const sizeArr = GAME_SETTINGS.numbers.length * GAME_SETTINGS.suits.length;
		const lengthNumbArr = GAME_SETTINGS.numbers.length;
		for (let i = 0; i < sizeArr; i++) {

			if (i >= sizeArr / 2) {
				k = 1;
			} else {
				k = 0;
			}

			switch (Math.floor(i / lengthNumbArr)) {
				case 0:
					j = 0;
					break;
				case 1:
					j = 1;
					break;
				case 2:
					j = 2;
					break;
				case 3:
					j = 3;
					break;
			}

			if (i < lengthNumbArr) {
				newArr[i] = {
					color: GAME_SETTINGS.colors[k],
					suit: GAME_SETTINGS.suits[j],
					number: GAME_SETTINGS.numbers[i]
				};

			} else {
				newArr[i] = {
					color: GAME_SETTINGS.colors[k],
					suit: GAME_SETTINGS.suits[j],
					number: i % GAME_SETTINGS.numbers.length + 1
				};
			}

		}

		return newArr;

	},

	getProperFinishDeck: function (suit) {
		return this.finishDecks.filter((deck) => deck.suit === suit)[0] ||
			this.finishDecks.filter((deck) => deck.isEmpty())[0];
	},

	registerEvents: function () {
		this.$el.addEventListener('deck.click', this.onDeckClick().bind(this));
	},

	onDeckClick: function () {
		let selectedDeck = null;
		let selectedCards = [];

		return function (e) {
			let deck = e.detail.deck;
			let cards = e.detail.cards;

			if (selectedDeck === deck) {
				selectedCards = cards;
				return;
			}

			if (deck === null) {
				if (selectedDeck) {
					selectedDeck.unselectCards();
				}

				selectedDeck = null;
				selectedCards = [];

				return;
			}

			if (selectedDeck) {
				if (this.moveCards(selectedDeck, deck, selectedCards)) {
					selectedDeck = null;
					selectedCards = [];
					deck.unselectCards();
				} else {
					selectedDeck.unselectCards();
					selectedDeck = deck;
					selectedCards = cards;
				}
			} else {
				selectedDeck = deck;
				selectedCards = cards;
			}
		}
	},

	moveCards: function (deckFrom, deckTo, cards) {
		if (deckTo.addCards(cards)) {
			deckFrom.removeCards(cards);

			return true;
		}

		return false;
	}
}

Deck.prototype = {
	createCards: function (cardKits) {
		for (let i = 0; i < cardKits.length; i++) {
			let card = new Card(cardKits[i]);

			this.$el.appendChild(card.$el);
			this.cards.push(card);
		}
	},

	registerEvents: function () {
		this.$el.addEventListener('card.click', this.onCardClick.bind(this));
		this.$el.addEventListener('card.doubleclick', this.onCardDoubleClick.bind(this));
		this.$el.addEventListener('click', this.onClick.bind(this));
	},

	onCardDoubleClick: function (e) {

		let cardIndex = this.cards.indexOf(e.detail.card);
		let cards = this.cards.slice(cardIndex);

		this.cards.forEach((card) => card.unselect());
		cards.forEach((card) => card.select());

		this.$el.dispatchEvent(new CustomEvent('deck.doubleclick', {
			bubbles: true,
			detail: {
				//deck: this,
				card: this
			}
		}));

		FinishDeck.prototype.onCardDoubleClick(e);
	},

	onCardClick: function (e) {
		let cardIndex = this.cards.indexOf(e.detail.card);
		let cards = this.cards.slice(cardIndex, cardIndex + 1);

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

	getCardIndex: function (card) {
		for (let i = 0; i < this.cards.length; i++) {
			let currentCard = this.cards[i];

			if (currentCard.color === card.color && currentCard.number === card.number && currentCard.suit === card.suit) {
				return i;
			}
		}

		return -1;
	},

	addCards: function (cards) {
		if (!this.verifyTurn(cards)) {
			return false;
		}

		for (let i = 0; i < cards.length; i++) {
			this.$el.appendChild(cards[i].$el);
			this.cards.push(cards[i]);
		}

		return true;

	},

	removeCards: function (cards) {
		let cardIndex = this.getCardIndex(cards[0]);

		this.cards.splice(cardIndex);
	},

	verifyTurn: function (cards) {
		if (cards.length) {
			let upperCard = cards[0];
			let cardTo = this.cards.slice(-1).pop();

			return (!cardTo && upperCard.number === 13) ||
				(cardTo && upperCard.color != cardTo.color &&
					cardTo.number - upperCard.number === 1);
		}

	},

	onClick: function (e) {
		this.$el.dispatchEvent(new CustomEvent('deck.click', {
			bubbles: true,
			detail: {
				deck: this,
				cards: []
			}
		}));
	},

	unselectCards: function () {
		this.cards.forEach((card) => card.unselect());
	}
}

Card.prototype = {
	select: function () {
		this.$el.classList.add('selected');
	},

	unselect: function () {
		this.$el.classList.remove('selected');
	},

	open: function () {
		this.$el.classList.add('open');
		this.isOpen = true;
	},

	close: function () {
		this.$el.classList.remove('open');
		this.isOpen = false;
	},

	isClosed: function () {
		return !this.isOpen;
	},

	onClick: function (e) {
		e.stopPropagation();

		this.$el.dispatchEvent(new CustomEvent('card.click', {
			bubbles: true,
			detail: {
				card: this
			}
		}));

	},

	looseFocus: function (event) {
		const isClickInside = this.$el.contains(event.target);

		if (!isClickInside) {
			this.$el.classList.remove('selected');
		}
	},

	onDoubleClick: function (e) {
		e.stopPropagation();

		this.$el.dispatchEvent(new CustomEvent('card.doubleclick', {
			bubbles: true,
			detail: {
				card: this
			}
		}));

	},

	registerEvents: function () {
		this.$el.addEventListener('click', this.onClick.bind(this));
		this.$el.addEventListener('dblclick', this.onDoubleClick.bind(this));
		document.addEventListener('click', this.looseFocus.bind(this));
	}
}

DealDeck.prototype = Object.assign(Object.create(Deck.prototype), {
	registerEvents: function () {
		Deck.prototype.registerEvents.call(this);

		this.$el.addEventListener('click', this.onClick.bind(this));
	},

	onClick: function (e) {
		let closedCard = this.getFirstClosedCard();

		if (closedCard) {
			this.getFirstClosedCard().open();
		} else {
			this.revert();
		}

		this.$el.dispatchEvent(new CustomEvent('deck.click', {
			bubbles: true,
			detail: {
				deck: null
			}
		}));
	},

	getFirstClosedCard: function () {
		return this.cards.filter((card) => card.isClosed())[0];
	},

	revert: function () {
		this.cards.forEach((card) => card.close());
	},

	addCards: function () {
		return false;
	},

	getSelectedCards: function (card) {
		card.select();

		return [card];
	},

	removeCards: function (cards) {
		let cardIndex = this.getCardIndex(cards[0]);

		this.cards.splice(cardIndex, 1);
	}

});

FinishDeck.prototype = Object.assign(Object.create(Deck.prototype), {
	getContainers: function () {
		let deckHearts = document.getElementById("hearts"),
			deckDiamonds = document.getElementById("diamonds"),
			deckClovers = document.getElementById("clovers"),
			deckSpades = document.getElementById("spades");
		return {
			deckHearts: deckHearts,
			deckDiamonds: deckDiamonds,
			deckClovers: deckClovers,
			deckSpades: deckSpades
		}
	},

	isEmpty: function () {
		return !(this.suit || this.cards.length);
	},

	setEmpty: function () {
		this.suit = null;
	},

	registerEvents: function () {
		Deck.prototype.registerEvents.call(this);
		this.$el.addEventListener('deck.doubleclick', this.onCardDoubleClick.bind(this));
	},

	finishCards: [],

	onCardDoubleClick: function (e) {
		let card = e.detail.card;

		let deckHearts = this.getContainers().deckHearts,
			deckDiamonds = this.getContainers().deckDiamonds,
			deckClovers = this.getContainers().deckClovers,
			deckSpades = this.getContainers().deckSpades;

		if (this.finishCards.length===0 || this.finishCards.card !== undefined ){
			this.finishCards.push(card);
			console.log(this.finishCards);

			switch (e.detail.card.suit) {
				case 0:
					this.moveCards(this.finishCards, deckHearts);
					break;
				case 1:
					this.moveCards(this.finishCards, deckDiamonds);
					break;
				case 2:
					this.moveCards(this.finishCards, deckClovers);
					break;
				case 3:
					this.moveCards(this.finishCards, deckSpades);
					break;
			}
		}


	},

	verifyTurn: function (card) {
		if (this.finishCards.length) {
			let upperCard = this.finishCards[0];
			let cardTo = this.finishCards.slice(-1).pop();
			let cardNumber = card.number;

			return (cardNumber === GAME_SETTINGS.numbers[0]) ||
			 (cardTo && upperCard.color === cardTo.color &&
					cardTo.number - upperCard.number === 1);
		}

	},

	moveCards: function (fromDeck, toDeck, cards) {
		if (this.addCards(cards)) {
			this.removeCards(cards);

			return true;
		}

		return false;
	},

	addCards: function (cards) {
		if (!this.verifyTurn(cards)) {
			return false;
		}

		for (let i = 0; i < cards.length; i++) {
			this.$el.appendChild(cards[i].$el);
			this.cards.push(cards[i]);
		}

		return true;

	}
});

PlayingDeck.prototype = Object.assign(Object.create(Deck.prototype), {
	openLastCard: function () {
		if (this.cards.length) {
			this.cards.slice(-1).pop().open();
		}
	},

	removeCards: function () {
		Deck.prototype.removeCards.apply(this, arguments);

		this.openLastCard();
	}

});