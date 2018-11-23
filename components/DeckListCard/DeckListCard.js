import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import {
  ABSOLUTE,
  BOLD_800,
  COVER,
  FLEX_END,
  SPACING_TWO
} from '../../constants/CssHelpers';
import {
  LIGHT_GRAY,
  THEME_TEXT_SHADOW_COLOR,
  THEME_OVERLAY_COLOR,
  WHITE
} from '../../constants/Colors';
import { getImage, getImageByIndex } from '../../utils/helpers';

const { width } = Dimensions.get('window');

const DeckListCard = ({ description, imageUrlIndex, title }) => {
  const imageSource = getImageByIndex(imageUrlIndex);  
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={imageSource} />
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.bodyText}>{description}</Text>
    </View>
  );
};

DeckListCard.propTypes = {
  description: PropTypes.string.isRequired,
  imageUrlIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  header: {
    height: 200,
    justifyContent: FLEX_END,
    padding: 10,
    width: width - 40
  },
  headerText: {
    backgroundColor: THEME_OVERLAY_COLOR,
    color: WHITE,
    fontWeight: BOLD_800,
    fontSize: 23,
    letterSpacing: SPACING_TWO,
    padding: 10
  },
  bodyText: {
    backgroundColor: THEME_OVERLAY_COLOR,
    color: WHITE,
    fontSize: 15,
    letterSpacing: SPACING_TWO,
    padding: 10,
    textShadowColor: THEME_TEXT_SHADOW_COLOR,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  image: {
    borderColor: LIGHT_GRAY,
    borderRadius: 5,
    borderWidth: 1,
    bottom: 0,
    flex: 1,
    height: null,
    left: 0,
    right: 0,
    position: ABSOLUTE,
    resizeMode: COVER,
    top: 0,
    width: null
  }
});

export default DeckListCard;
