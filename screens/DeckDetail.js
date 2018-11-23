import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import {
  OPTION_ROUTE_ADD_CARD,
  OPTION_ROUTE_QUIZ
} from '../constants/NavigationOptions';

import DeckDetailView from '../components/DeckDetailView';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;
    return { title: `${deckId}` };
  };

  handleNavigateToAddCard = () => {
    this.props.navigation.navigate(OPTION_ROUTE_ADD_CARD, {
      deckId: this.props.title
    });
  };

  handleNavigateToQuiz = () => {
    this.props.navigation.navigate(OPTION_ROUTE_QUIZ, {
      deckId: this.props.title
    });
  };

  render() {
    const { title, numCards } = this.props;

    return (
      <View style={styles.container}>
        <DeckDetailView
          cardTitle={title}
          numberOfQuestions={numCards}
          handleNavigateToAddCard={this.handleNavigateToAddCard}
          handleNavigateToQuiz={this.handleNavigateToQuiz}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(decks, { navigation }) {
  const { deckId } = navigation.state.params;
  const deck = Object.values(decks)[0][deckId];
  return { title: deck.title, numCards: deck.questions.length };
}

export default connect(mapStateToProps)(DeckDetail);
