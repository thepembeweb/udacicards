import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AUTO, CENTER, FLEX_END, INCONSOLATA_BOLD, INCONSOLATA_REGULAR, NONE, ROW, SPACE_BETWEEN, SPACING_COMMA_FIVE, SPACING_ONE } from '../../constants/CssHelpers';
import { LIGHT_GRAY_TINT, LIGHTER_GRAY, RED, THEME, THEME_OVERLAY_COLOR, WHITE } from '../../constants/Colors';
import {
  CARD_ANSWER_NO,
  CARD_ANSWER_NO_ICON,
  CARD_ANSWER_YES,
  CARD_ANSWER_YES_ICON,
  VIEW_ANSWER_LABEL,
  VIEW_QUESTION_LABEL
} from '../../constants/Helpers';

const QuestionCardFooter = ({
  handleCorrectAnswer,
  handleFlipCard,
  handleIncorrectAnswer,
  isEnabled
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tagLineContainer}
        onPress={handleFlipCard}
      >
        <Text style={styles.tagLine}>
          {isEnabled ? VIEW_QUESTION_LABEL : VIEW_ANSWER_LABEL}
        </Text>
      </TouchableOpacity>

      <View style={styles.options}>
        <TouchableOpacity
          style={[
            styles.option,
            isEnabled ? styles.correctOptionDisabled : styles.optionDisabled
          ]}
          disabled={!isEnabled}
          onPress={handleCorrectAnswer}
        >
          <Text
            style={[
              styles.optionTitle,
              isEnabled ? styles.optionTitleEnabled : styles.optionTitleDisabled
            ]}
          >
            {CARD_ANSWER_YES}
          </Text>
          <Feather
            name={CARD_ANSWER_YES_ICON}
            size={32}
            style={[
              styles.optionIcon,
              isEnabled ? styles.optionIconEnabled : styles.optionIconDisabled
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            isEnabled ? styles.incorrectOptionEnabled : styles.optionDisabled
          ]}
          disabled={!isEnabled}
          onPress={handleIncorrectAnswer}
        >
          <Text
            style={[
              styles.optionTitle,
              isEnabled ? styles.optionTitleEnabled : styles.optionTitleDisabled
            ]}
          >
            {CARD_ANSWER_NO}
          </Text>
          <Feather
            name={CARD_ANSWER_NO_ICON}
            size={32}
            style={[
              styles.optionIcon,
              isEnabled ? styles.optionIconEnabled : styles.optionIconDisabled
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

QuestionCardFooter.propTypes = {
  handleCorrectAnswer: PropTypes.func.isRequired,
  handleFlipCard: PropTypes.func.isRequired,
  handleIncorrectAnswer: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    alignItems: CENTER,
    justifyContent: FLEX_END,
    marginBottom: 0,
    marginTop: AUTO
  },
  correctOptionDisabled: {
    backgroundColor: THEME
  },
  incorrectOptionEnabled: {
    backgroundColor: THEME
  },
  option: {
    alignItems: CENTER,
    borderRadius: 4,
    justifyContent: CENTER,
    width: '48%'
  },
  optionDisabled: {
    backgroundColor: LIGHTER_GRAY,
    display: NONE
  },
  options: {
    flexDirection: ROW,
    height: 150,
    justifyContent: SPACE_BETWEEN,
    marginVertical: 16,
    width: '90%'
  },
  optionTitle: {
    color: RED,
    fontFamily: INCONSOLATA_BOLD,
    fontSize: 48,
    letterSpacing: SPACING_ONE
  },
  optionTitleDisabled: {
    color: LIGHT_GRAY_TINT
  },
  optionTitleEnabled: {
    color: WHITE
  },
  optionIcon: {
    alignSelf: CENTER
  },
  optionIconDisabled: {
    color: LIGHT_GRAY_TINT
  },
  optionIconEnabled: {
    color: WHITE
  },
  tagLine: {
    color: WHITE,
    fontFamily: INCONSOLATA_REGULAR,
    fontSize: 15,
    letterSpacing: SPACING_COMMA_FIVE
  },
  tagLineContainer: {
    backgroundColor: THEME_OVERLAY_COLOR,
    borderBottomColor: THEME,
    borderBottomWidth: 2,
    padding: 5,
    paddingBottom: 4
  }
});

export default QuestionCardFooter;
