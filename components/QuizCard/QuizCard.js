import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import Emoji from 'react-native-emoji';
import {
  ABSOLUTE,
  BOLD,
  CENTER,
  FLEX_END,
  FULL_WIDTH,
  HIDDEN,
  SPACING_ONE
} from '../../constants/CssHelpers';
import { BLACK, THEME_OVERLAY_COLOR, WHITE } from '../../constants/Colors';
import { SPACER } from '../../constants/Helpers';
import { getImage } from '../../utils/helpers';

const  QuizCard = ({ description, icon, imageUrl }) => {
  const imageSource = getImage(imageUrl);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.nearbyCard}>
        <View style={styles.header}>
          <Image style={styles.image} source={imageSource} />
          <Text style={styles.headerText}>
            {icon}
            {SPACER}
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

QuizCard.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    borderColor: WHITE,
    borderWidth: 2,
    height: 240,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 300
  },
  nearbyCard: {
    borderRadius: 8,
    height: 240,
    overflow: HIDDEN,
    width: FULL_WIDTH
  },
  headerText: {
    backgroundColor: THEME_OVERLAY_COLOR,
    color: WHITE,
    fontSize: 21,
    fontWeight: BOLD,
    letterSpacing: SPACING_ONE,
    padding: 10,
    textAlign: CENTER
  },
  image: {
    bottom: 0,
    height: 212,
    left: 0,
    position: ABSOLUTE,
    right: 0,
    width: 270,
    top: 0
  },
  header: {
    height: 212,
    justifyContent: FLEX_END,
    margin: 12,
    padding: 10
  }
});

export default QuizCard;
