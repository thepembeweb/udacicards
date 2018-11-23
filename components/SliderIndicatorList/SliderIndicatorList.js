import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { ABSOLUTE, ROW } from '../../constants/CssHelpers';
import SliderIndicator from '../SliderIndicator';

const SliderIndicatorList = ({
  animatedValue,
  deviceWidth,
  itemList,
  itemWidth
}) => {
  return (
    <View style={styles.container}>
      {itemList.map((item, index) => (
        <SliderIndicator
          key={index}
          animatedValue={animatedValue}
          deviceWidth={deviceWidth}
          itemIndex={index}
          itemWidth={itemWidth}
        />
      ))}
    </View>
  );
};

SliderIndicatorList.PropTypes = {
  animatedValue: PropTypes.any.isRequired,
  deviceWidth: PropTypes.number.isRequired,
  itemList: PropTypes.array.isRequired,
  itemWidth: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    position: ABSOLUTE,
    zIndex: 2,
    top: 40,
    flexDirection: ROW
  }
});

export default SliderIndicatorList;
