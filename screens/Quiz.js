import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import QuizView from '../components/QuizView';

class Quiz extends React.Component {
  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <QuizView deck={deck} navigation={this.props.navigation} />
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
  return { deck };
}

export default connect(mapStateToProps)(Quiz);
