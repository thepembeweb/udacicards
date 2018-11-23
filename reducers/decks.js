import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from "../constants/ActionTypes";

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const { answer, deckId, question } = action.cardData;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat({ question, answer })
        }
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deckData
      };
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    default:
      return state;
  }
}
