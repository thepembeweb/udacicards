import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  ABSOLUTE,
  AUTO,
  BOLD_800,
  CENTER,
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
import { getImage } from '../../utils/helpers';

const DetailCard = ({ description, imageUrl, title }) => {
  const imageSource = getImage(imageUrl);
  return (
    <View style={styles.header}>
      <Image style={styles.image} source={imageSource} />
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.bodyText}>{description}</Text>
    </View>
  );
};

DetailCard.propTypes = {
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  header: {
    height: 352,
    justifyContent: FLEX_END,
    padding: 10,
    width: AUTO
  },
  headerText: {
    backgroundColor: THEME_OVERLAY_COLOR,
    color: WHITE,
    fontWeight: BOLD_800,
    fontSize: 23,
    letterSpacing: SPACING_TWO,
    padding: 10,
    textAlign: CENTER
  },
  bodyText: {
    backgroundColor: THEME_OVERLAY_COLOR,
    color: WHITE,
    fontSize: 15,
    letterSpacing: SPACING_TWO,
    padding: 10,
    textAlign: CENTER,
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
    opacity: .5,
    position: ABSOLUTE,
    resizeMode: COVER,
    top: 0, 
    width: null
  }
});

export default DetailCard;
