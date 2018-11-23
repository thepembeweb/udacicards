import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ABSOLUTE, FULL_WIDTH } from '../../constants/CssHelpers';
import { RED, TRANSPARENT, WHITE } from '../../constants/Colors';
import {
  CARD_BACKGROUND,
  QUIZ_BACK_TO_DECK,
  QUIZ_ERROR_BACKGROUND,
  QUIZ_ERROR_ICON,
  QUIZ_ERROR_MESSAGE,
  QUIZ_START_AGAIN,
  QUIZ_SUCCESS_BACKGROUND,
  QUIZ_SUCCESS_ICON,
  QUIZ_SUCCESS_MESSAGE,
} from '../../constants/Helpers';
import { getResultCardsDescription, getImage, getPercentageDescription, hasPassedQuiz } from '../../utils/helpers';
import Button from '../Button';
import ResultCard from '../ResultCard';

const { width } = Dimensions.get('window');

const ScoreCard = ({
  cardTitle,
  handleStartQuizAgain,
  handleBackToDeck,
  numberOfQuestions,
  numberOfCorrectAnswers
}) => {
  const hasPassed = hasPassedQuiz(
    numberOfCorrectAnswers,
    numberOfQuestions
  );
  const scoreDescription = getPercentageDescription(
    numberOfCorrectAnswers,
    numberOfQuestions
  );
  const cardsDescription = getResultCardsDescription(numberOfCorrectAnswers, numberOfQuestions);
  const containerImageBackground = hasPassed
    ? QUIZ_SUCCESS_BACKGROUND
    : QUIZ_ERROR_BACKGROUND;
  const containerImageBackgroundSource = getImage(containerImageBackground);
  return (
    <ImageBackground
      style={styles.container}
      source={containerImageBackgroundSource}
    >
      <TouchableOpacity style={styles.content}>
        {hasPassed ? (
          <ResultCard
            description={cardsDescription}
            icon={QUIZ_SUCCESS_ICON}
            imageUrl={CARD_BACKGROUND}
            message={QUIZ_SUCCESS_MESSAGE}
            score={scoreDescription}
            title={cardTitle}
          />
        ) : (
          <ResultCard
            description={cardsDescription}
            icon={QUIZ_ERROR_ICON}
            imageUrl={CARD_BACKGROUND}
            message={QUIZ_ERROR_MESSAGE}
            score={scoreDescription}
            title={cardTitle}
          />
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Button
          text={QUIZ_START_AGAIN}
          isEnabled={true}
          onPress={handleStartQuizAgain}
        />
        <Button
          text={QUIZ_BACK_TO_DECK}
          isEnabled={true}
          onPress={handleBackToDeck}
        />
      </View>
    </ImageBackground>
  );
};

ScoreCard.PropTypes = {
  cardTitle: PropTypes.string.isRequired,
  handleStartQuizAgain: PropTypes.string.isRequired,
  handleBackToDeck: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.string.isRequired,
  numberOfCorrectAnswers: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    width: width - 40,
    height: 200,
    marginTop: 20,
    marginBottom: 20
  },
  footer: {
    position: ABSOLUTE,
    width: FULL_WIDTH,
    height: 180,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: WHITE,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 20
  }
});

export default ScoreCard;
