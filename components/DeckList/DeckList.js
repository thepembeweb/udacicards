import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CARD_HOME_BACKGROUND } from '../../constants/Helpers';
import { OPTION_ROUTE_DECK_DETAIL } from '../../constants/NavigationOptions';
import { getCardsDescription } from '../../utils/helpers';

import DeckListCard from '../DeckListCard';

const { width } = Dimensions.get('window');

const DeckList = ({ decks, navigation }) => (
  <View style={styles.container}>
    {decks.map((deck, index) => (
      <View key={index}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate(OPTION_ROUTE_DECK_DETAIL, {
              deckId: deck.title
            })
          }
        >
          <DeckListCard
            description={getCardsDescription(deck.questions.length)}
            imageUrlIndex={index}
            title={deck.title}
          />
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

DeckList.propTypes = {
  decks: PropTypes.array.isRequired,
  navigation: PropTypes.any.isRequired
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    paddingHorizontal: 20
  },
  card: {
    height: 200,
    marginBottom: 20,
    marginTop: 20,
    width: width - 40
  }
});

export default DeckList;
