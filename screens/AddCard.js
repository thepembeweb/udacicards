import React from 'react';
import { Feather } from '@expo/vector-icons';
import Toast from '@rimiti/react-native-toastify';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { BLOCK, CENTER, FULL_WIDTH, NONE, STRETCH } from '../constants/CssHelpers';
import {
  LIGHT_GRAY,
  LIGHT_GRAY_TINT,
  RED,
  THEME,
  WHITE
} from '../constants/Colors';
import {
  BACK_TO_DECK_ICON,
  CARD_ADDED,
  DEFAULT_EMPTY_STRING,
  ENTER_ANSWER,
  ENTER_QUESTION,
  IOS,
  SPACER,
  SUBMIT,
  SUBMIT_ICON,
  QUIZ_BACK_TO_DECK,
  WHAT_IS_THE_ANSWER,
  WHAT_IS_THE_QUESTION
} from '../constants/Helpers';
import { OPTION_ROUTE_DECK_DETAIL } from '../constants/NavigationOptions';
import { addCard } from '../actions';
import { addCardToDeckStorage } from '../utils/api';
import AddScreenWrapper from '../components/AddScreenWrapper';

const { height, width } = Dimensions.get('window');

class AddCard extends React.Component {
  state = {
    question: DEFAULT_EMPTY_STRING,
    answer: DEFAULT_EMPTY_STRING,
    isBackToDeckEnabled: false
  };

  handleSubmit = () => {
    const { dispatch, deckId } = this.props;
    const { question, answer } = this.state;
    const cardInfo = {
      deckId,
      question,
      answer
    };
    addCardToDeckStorage({ cardInfo }).then(() => {
      dispatch(addCard(cardInfo));
    });
    this.setState({
      question: DEFAULT_EMPTY_STRING,
      answer: DEFAULT_EMPTY_STRING,
      isBackToDeckEnabled: true
    });
    this.notify(CARD_ADDED);
  };

  handleBackToDeck = () => {
    this.props.navigation.navigate(OPTION_ROUTE_DECK_DETAIL, {
      deckId: this.props.deckId
    });
  };

  isBackToDeckEnabled = () => {
    return this.state.isBackToDeckEnabled;
  };

  isSubmitEnabled = () => {
    return (
      this.state.question.trim().length > 0 &&
      this.state.answer.trim().length > 0
    );
  };

  notify = message => this.toastify.show(message, 2000);

  render() {
    return (
      <AddScreenWrapper height={height} width={width}>
        <Text style={styles.inputLabel}>{WHAT_IS_THE_QUESTION}</Text>
        <TextInput
          style={
            Platform.OS === IOS ? styles.inputTextiOS : styles.inputTextAndroid
          }
          placeholder={ENTER_QUESTION}
          placeholderTextColor={WHITE}
          maxLength={100}
          multiline={true}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />

        <Text
          style={[
            styles.inputLabel,
            {
              marginTop: 20
            }
          ]}
        >
          {WHAT_IS_THE_ANSWER}
        </Text>
        <TextInput
          style={
            Platform.OS === IOS ? styles.inputTextiOS : styles.inputTextAndroid
          }
          placeholder={ENTER_ANSWER}
          placeholderTextColor={WHITE}
          maxLength={200}
          multiline={true}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />

        <TouchableOpacity
          style={[
            styles.option,
            this.isSubmitEnabled()
              ? styles.optionEnabled
              : styles.optionDisabled
          ]}
          disabled={!this.isSubmitEnabled()}
          onPress={this.handleSubmit}
        >
          <Text
            style={[
              styles.optionTitle,
              this.isSubmitEnabled()
                ? styles.optionTitleEnabled
                : styles.optionTitleDisabled
            ]}
          >
            <Feather
              name={SUBMIT_ICON}
              size={20}
              style={[
                styles.optionIcon,
                this.isSubmitEnabled()
                  ? styles.optionIconEnabled
                  : styles.optionIconDisabled
              ]}
            />
            {SPACER}
            {SUBMIT}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            styles.optionEnabled,
            this.isBackToDeckEnabled()
              ? styles.optionVisible
              : styles.optionHidden
          ]}
          disabled={!this.isBackToDeckEnabled()}
          onPress={this.handleBackToDeck}
        >
          <Text
            style={[
              styles.optionTitle,
              styles.optionTitleEnabled
            ]}
          >
            <Feather
              name={BACK_TO_DECK_ICON}
              size={20}
              style={[
                styles.optionIcon,
                styles.optionIconEnabled
              ]}
            />
            {SPACER}
            {QUIZ_BACK_TO_DECK}
          </Text>
        </TouchableOpacity>

        <Toast ref={c => (this.toastify = c)} />
      </AddScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 30,
    color: WHITE,
    textAlign: CENTER,
    letterSpacing: 0.5
  },
  inputTextiOS: {
    marginTop: 20,
    alignSelf: STRETCH,
    padding: 5,
    borderWidth: 1,
    borderColor: WHITE,
    color: WHITE,
    fontSize: 20
  },
  inputTextAndroid: {
    marginTop: 20,
    alignSelf: STRETCH,
    padding: 5,
    color: WHITE,
    fontSize: 20
  },
  option: {
    borderRadius: 4,
    width: FULL_WIDTH,
    justifyContent: CENTER,
    alignItems: CENTER,
    padding: 10,
    marginTop: 20
  },
  optionDisabled: {
    backgroundColor: LIGHT_GRAY
  },
  optionEnabled: {
    backgroundColor: THEME
  },
  optionTitle: {
    color: RED,
    fontSize: 24,
    fontFamily: 'inconsolata-bold'
  },
  optionTitleEnabled: {
    color: WHITE
  },
  optionTitleDisabled: {
    color: LIGHT_GRAY_TINT
  },
  optionIcon: {
    alignSelf: CENTER
  },
  optionIconEnabled: {
    color: WHITE
  },
  optionIconDisabled: {
    color: LIGHT_GRAY_TINT
  },
  optionHidden: {
    display: NONE
  },
  optionVisible: {
    display: BLOCK
  },
});

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return { deckId };
}

export default connect(mapStateToProps)(AddCard);
