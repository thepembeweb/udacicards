import * as types from '../constants/ActionTypes';

export const addCard = cardData => ({ type: types.ADD_CARD, cardData });
export const addDeck = deckData => ({ type: types.ADD_DECK, deckData });
export const receiveDecks = decks => ({ type: types.RECEIVE_DECKS, decks });
