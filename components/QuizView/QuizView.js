import React from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CENTER, ABSOLUTE } from '../../constants/CssHelpers';
import { TRANSPARENT, BLACK } from '../../constants/Colors';
import { 
  CARD_ANSWER_BACKGROUND,
  CARD_ANSWER_ICON,
  CARD_QUESTION_BACKGROUND,
  CARD_QUESTION_ICON,
} from '../../constants/Helpers';
import { OPTION_ROUTE_DECK_DETAIL } from '../../constants/NavigationOptions';
import { clearQuizNotification, setQuizLocalNotification } from '../../utils/api';
import { getRandomImageUrlByCustomIndex, getSliderItemWidth, getTimeStamp } from '../../utils/helpers';
import QuestionCardFooter from '../QuestionCardFooter';
import QuestionCardHeader from '../QuestionCardHeader';
import QuizCard from '../QuizCard';
import ScoreCard from '../ScoreCard';
import SliderIndicatorList from '../SliderIndicatorList';

import Emoji from 'react-native-emoji';

const FlipCard = styled.View`
  width: 240;
  height: 240;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

const FlipCardAnimated = Animated.createAnimatedComponent(FlipCard);

let scrollXPos = 0;

const { width } = Dimensions.get('window');

class QuizView extends React.Component {
  timeStamp = getTimeStamp();
  itemWidth = getSliderItemWidth(this.props.deck.questions);
  animatedValue = new Animated.Value(0);

  state = {
    correctAnswerCount: 0,
    hasPageRendered: false,
    isAnswerDisplayed: true,
    questionIndex: 0,
    rotate: new Animated.Value(0),
    showScorecard: false
  };

  handleFlipCard = () => {
    const { isAnswerDisplayed, rotate } = this.state;
    if (isAnswerDisplayed) {
      Animated.spring(rotate, {
        toValue: 1,
        friction: 8,
        tension: 5
      }).start();
    } else {
      Animated.spring(rotate, {
        toValue: 0,
        friction: 8,
        tension: 5
      }).start();
    }
    this.setState(this.toggleAnswerDisplay);
  };

  toggleAnswerDisplay = (state, props) => {
    return {
      isAnswerDisplayed: !this.state.isAnswerDisplayed
    };
  };

  handleCorrectAnswer = () => {
    this.setState(prevState => ({
      correctAnswerCount: prevState.correctAnswerCount + 1
    }));
    this.moveToNextQuestionOrShowScorecard();
  };

  handleIncorrectAnswer = () => {
    this.moveToNextQuestionOrShowScorecard();
  };

  moveToNextQuestionOrShowScorecard = () => {
    const { questions } = this.props.deck;

    if (this.state.questionIndex === questions.length - 1) {
      this.setState(() => ({
        showScorecard: true
      }));
    } else {
      this.setState(prevState => ({
        questionIndex: prevState.questionIndex + 1
      }));
      this.handleFlipCard();
      this.scrollToQuestion(this.state.questionIndex);
    }
  };

  isOptionsEnabled = () => {
    return !this.state.isAnswerDisplayed;
  };

  handleStartQuizAgain = () => {
    this.setState(() => ({
      questionIndex: 0,
      isAnswerDisplayed: true,
      correctAnswerCount: 0,
      showScorecard: false,
      rotate: new Animated.Value(0)
    }));
  };

  handleBackToDeck = () => {
    this.props.navigation.navigate(OPTION_ROUTE_DECK_DETAIL, {
      deckId: this.props.deck.title
    });
  };

  onButtonPress = () => {
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
  };

  scrollToQuestion = index => {
    scrollXPos = width * (index + 1);
    this.scroller.scrollTo({ x: scrollXPos, y: 0 });
  };

  getEmoji(key,size){
    return (<Emoji name={key} size={size} />);
  }

  renderScoreCard = () => {
    clearQuizNotification().then(setQuizLocalNotification());

    const { title, questions } = this.props.deck;

    return (
      <ScoreCard
        cardTitle={title}
        numberOfCorrectAnswers={this.state.correctAnswerCount}
        numberOfQuestions={questions.length}
        handleStartQuizAgain={this.handleStartQuizAgain}
        handleBackToDeck={this.handleBackToDeck}
      />
    );
  };

  renderQuiz = () => {
    const { title, questions } = this.props.deck;
    const { rotate } = this.state;
    const frontAnimatedStyle = {
      opacity: rotate.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0]
      }),
      transform: [
        {
          rotateY: rotate.interpolate(
            {
              inputRange: [0, 1],
              outputRange: ['0deg', '-180deg']
            },
            { perspective: 1000 }
          )
        }
      ]
    };
    const backAnimatedStyle = {
      opacity: rotate,
      transform: [
        {
          rotateY: rotate.interpolate(
            {
              inputRange: [0, 1],
              outputRange: ['-180deg', '-360deg']
            },
            { perspective: 1000 }
          )
        }
      ]
    };

    return (
      <View style={styles.container} flex={1}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          ref={scroller => {
            this.scroller = scroller;
          }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.animatedValue } } }
          ])}
        >
          {questions.map((question, index) => (
            <ImageBackground
              key={`image${index}`}
              source={{
                uri: getRandomImageUrlByCustomIndex(`${this.timeStamp}${index}`)
              }}
              style={styles.flipCardContainer}
            >
              <QuestionCardHeader
                cardIndex={index}
                cardTitle={title}
                totalCards={questions.length}
              />

              <View style={styles.contentContainer}>
                <FlipCardAnimated style={frontAnimatedStyle}>
                  <QuizCard
                    description={question.question}
                    icon={this.getEmoji(CARD_QUESTION_ICON, 18)}
                    imageUrl={CARD_QUESTION_BACKGROUND}
                  />
                </FlipCardAnimated>

                <Animated.View
                  style={[
                    styles.flipCard,
                    styles.flipCardBack,
                    backAnimatedStyle
                  ]}
                >
                  <QuizCard
                    description={question.answer}
                    icon={this.getEmoji(CARD_ANSWER_ICON, 18)}
                    imageUrl={CARD_ANSWER_BACKGROUND}
                  />
                </Animated.View>
              </View>

              <QuestionCardFooter
                handleCorrectAnswer={this.handleCorrectAnswer}
                handleFlipCard={this.handleFlipCard}
                handleIncorrectAnswer={this.handleIncorrectAnswer}
                isEnabled={this.isOptionsEnabled()}
              />
            </ImageBackground>
          ))}
        </ScrollView>

        <SliderIndicatorList
          animatedValue={this.animatedValue}
          deviceWidth={width}
          itemList={questions}
          itemWidth={this.itemWidth}
        />
      </View>
    );
  };

  render() {
    const { showScorecard } = this.state;
    return !showScorecard ? this.renderQuiz() : this.renderScoreCard();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: CENTER,
    justifyContent: CENTER
  },
  contentContainer: {
    alignItems: CENTER,
    margin: 8,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 0
  },
  flipCard: {
    alignItems: CENTER,
    height: 240,
    justifyContent: CENTER,
    width: 240
  },
  flipCardBack: {
    position: ABSOLUTE
  },
  flipCardContainer: {
    padding: 10,
    paddingTop: 10,
    width: width
  }
});

export default QuizView; 