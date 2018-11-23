import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AVENIR, BOLD, CENTER, ROW, SPACING_ONE_COMMA_THREE, UPPERCASE } from '../../constants/CssHelpers';
import { LIGHT_BLACK, TRANSPARENT, WHITE } from '../../constants/Colors';

const QuestionCardHeader = ({ cardIndex, cardTitle, totalCards }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.text, styles.title]}>{cardTitle}</Text>
      <View style={styles.rating}>
        <Text style={[styles.text, styles.value]}>
          Card {cardIndex + 1} of {totalCards}
        </Text>
      </View>
    </ScrollView>
  );
};

QuestionCardHeader.propTypes = {
  cardIndex: PropTypes.number,
  cardTitle: PropTypes.string,
  totalCards: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rating: {
    flexDirection: ROW,
    justifyContent: CENTER
  },
  text: {
    color: WHITE,
    fontFamily: AVENIR,
    fontWeight: BOLD,
    textShadowColor: LIGHT_BLACK,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4
  },
  title: {
    fontSize: 22,
    letterSpacing: SPACING_ONE_COMMA_THREE,
    marginBottom: 5,
    marginTop: 47,
    textAlign: CENTER,
    textTransform: UPPERCASE
  },
  value: {
    fontSize: 16
  }
});

export default QuestionCardHeader;
