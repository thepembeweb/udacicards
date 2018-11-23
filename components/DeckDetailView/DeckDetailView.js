import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ABSOLUTE, FULL_WIDTH } from '../../constants/CssHelpers';
import { TRANSPARENT, WHITE } from '../../constants/Colors';
import {
  ADD_CARD,
  BANNER_BACKGROUND, 
  CARD_BACKGROUND,
  START_QUIZ,
} from '../../constants/Helpers';
import { getCardsDescription, getImage } from '../../utils/helpers';
import Button from '../Button';
import DetailCard from '../DetailCard';

const { width } = Dimensions.get('window');

const DeckDetailView = ({
  cardTitle,
  numberOfQuestions,
  handleNavigateToAddCard,
  handleNavigateToQuiz
}) => {
  const cardsDescription = getCardsDescription(numberOfQuestions);
  const containerImageBackground = getImage(BANNER_BACKGROUND);

  return (
    <ImageBackground
      style={styles.container}
      source={containerImageBackground}
    >
      <TouchableOpacity style={styles.content}>
        <DetailCard
          description={cardsDescription}
          imageUrl={CARD_BACKGROUND}
          title={cardTitle}
        />
      </TouchableOpacity>

      <View style={styles.footer}>
        <Button
          text={ADD_CARD}
          isEnabled={true}
          onPress={handleNavigateToAddCard}
        />
        <Button
          text={START_QUIZ}
          isEnabled={numberOfQuestions > 0}
          onPress={handleNavigateToQuiz}
        />
      </View>
    </ImageBackground>
  );
};

DeckDetailView.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  handleNavigateToAddCard: PropTypes.func.isRequired,
  handleNavigateToQuiz: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: WHITE 
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

export default DeckDetailView;
