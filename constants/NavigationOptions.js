import { BOLD, NEVER, SPACING_TWO, STRETCH } from '../constants/CssHelpers';
import {
  BLACK,
  GRAY,
  RED,
  THEME,
  THEME_TEXT_SHADOW_COLOR,
  WHITE
} from '../constants/Colors';

export const OPTION_TITLE_HOME = 'UdaciCards';
export const OPTION_TITLE_ADD_CARD = 'Add Card';
export const OPTION_TITLE_QUIZ = 'Quiz';

export const OPTION_ROUTE_DECK_DETAIL = 'DeckDetail';
export const OPTION_ROUTE_ADD_CARD = 'AddCard';
export const OPTION_ROUTE_QUIZ = 'Quiz';

export const TAB_BAR_LABEL_ADD_DECK = 'ADD DECK';
export const TAB_BAR_LABEL_ADD_DECK_ICON = 'plus';
export const TAB_BAR_LABEL_DECKS = 'DECKS';
export const TAB_BAR_LABEL_DECKS_ICON = 'layers';
export const TAB_BAR_LABEL_ICON_SIZE = 24;

export const HEADER_STYLE = {
  backgroundColor: THEME,
  height: 53
};
export const HEADER_TINT_COLOR = WHITE;
export const HEADER_TITLE_STYLE_IOS = {
  fontSize: 26,
  fontWeight: BOLD,
  letterSpacing: SPACING_TWO,
  textShadowColor: THEME_TEXT_SHADOW_COLOR,
  textShadowOffset: { width: -1, height: 1 },
  textShadowRadius: 10,
  alignSelf: STRETCH,
  padding: 10
};
export const HEADER_TITLE_STYLE_ANDROID = {
  fontSize: 26,
  fontWeight: BOLD,
  textShadowColor: THEME_TEXT_SHADOW_COLOR,
  textShadowOffset: { width: -1, height: 1 },
  textShadowRadius: 10,
  alignSelf: STRETCH,
  padding: 10
};
export const HEADER_FORCE_INSET = {
  top: NEVER,
  bottom: NEVER
};
export const TAB_BAR_OPTIONS = {
  activeTintColor: RED,
  inactiveTintColor: GRAY,
  style: {
    backgroundColor: WHITE,
    borderTopWidth: 0,
    shadowOffset: { width: 5, height: 3 },
    shadowColor: BLACK,
    shadowOpacity: 0.5,
    elevation: 5
  }
};
