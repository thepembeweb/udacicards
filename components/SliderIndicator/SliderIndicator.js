import React from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View } from 'react-native';
import { ABSOLUTE, CLAMP, HIDDEN } from '../../constants/CssHelpers';
import { SLIDER_INDICATOR_BACKGROUND, SLIDER_TRACK_BACKGROUND } from '../../constants/Colors';
import { SLIDER_INDICATOR_SPACER } from '../../constants/Helpers';

const SliderIndicator = ({
  animatedValue,
  deviceWidth,
  itemIndex,
  itemWidth
}) => {
  const scrollBarValue = animatedValue.interpolate({
    inputRange: [deviceWidth * (itemIndex - 1), deviceWidth * (itemIndex + 1)],
    outputRange: [-itemWidth, itemWidth],
    extrapolate: CLAMP
  });

  return (
    <View
      style={[
        styles.track,
        {
          width: itemWidth,
          marginLeft: itemIndex === 0 ? 0 : SLIDER_INDICATOR_SPACER
        }
      ]}
    >
      <Animated.View
        style={[
          styles.bar,
          {
            width: itemWidth,
            transform: [{ translateX: scrollBarValue }]
          }
        ]}
      />
    </View>
  );
};

SliderIndicator.propTypes = {
  animatedValue: PropTypes.any.isRequired,
  deviceWidth: PropTypes.number.isRequired,
  itemIndex: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  track: {
    backgroundColor: SLIDER_TRACK_BACKGROUND,
    height: 2,
    overflow: HIDDEN
  },
  bar: {
    backgroundColor: SLIDER_INDICATOR_BACKGROUND,
    height: 2,
    left: 0,
    position: ABSOLUTE,
    top: 0
  }
});

export default SliderIndicator;
