import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, View } from 'react-native';
import { ABSOLUTE } from '../../constants/CssHelpers';
import { TRANSPARENT } from '../../constants/Colors';
import { getImage } from '../../utils/helpers';

const Banner = ({ height, imageUrl, width }) => {
  const imageSource = getImage(imageUrl);
  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.banner,
          {
            height: height,
            width: width
          }
        ]}
        source={imageSource}
      />
    </View>
  );
};

Banner.propTypes = {
  height: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: TRANSPARENT
  },
  banner: {
    left: 0,
    position: ABSOLUTE,
    top: 0
  }
});

export default Banner;
