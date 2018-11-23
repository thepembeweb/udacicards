import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { BOLD_600, CENTER, SPACING_TWO } from '../../constants/CssHelpers';
import { DISABLED_GRAY, GRAY, THEME, WHITE } from '../../constants/Colors';

const Button = ({ isEnabled, onPress, text }) => {
  return (
    <TouchableHighlight
      disabled={!isEnabled}
      onPress={() => onPress()}
      style={[
        styles.buttonStyle,
        isEnabled > 0 ? styles.buttonStyleEnabled : styles.buttonStyleDisabled
      ]}
    >
      <Text
        style={[
          styles.textStyle,
          isEnabled > 0 ? styles.textStyleEnabled : styles.textStyleDisabled
        ]}
      >
        {text}
      </Text>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: THEME,
    borderRadius: 3,
    marginTop: 20,
    paddingBottom: 15,
    paddingTop: 15
  },
  buttonStyleDisabled: {
    backgroundColor: GRAY
  },
  buttonStyleEnabled: {
    backgroundColor: THEME,
    borderRadius: 5,
  },
  textStyle: {
    color: WHITE,
    fontWeight: BOLD_600,
    letterSpacing: SPACING_TWO,
    textAlign: CENTER
  },
  textStyleDisabled: {
    color: DISABLED_GRAY
  },
  textStyleEnabled: {
    color: WHITE
  }
});

export default Button;
