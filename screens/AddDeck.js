import React from 'react';
import { Feather } from '@expo/vector-icons';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { CENTER, FULL_WIDTH, STRETCH } from '../constants/CssHelpers';
import {
  LIGHT_GRAY,
  LIGHT_GRAY_TINT,
  RED,
  THEME,
  WHITE
} from '../constants/Colors';
import {
  DEFAULT_EMPTY_STRING,
  ENTER_DECK_TITLE,
  IOS,
  SPACER,
  SUBMIT,
  SUBMIT_ICON,
  WHAT_IS_THE_DECK_TITLE
} from '../constants/Helpers';
import {
  OPTION_ROUTE_DECK_DETAIL
} from '../constants/NavigationOptions';
import { addDeck } from '../actions';
import { addDeckToStorage } from '../utils/api';
import AddScreenWrapper from '../components/AddScreenWrapper';

const { height, width } = Dimensions.get('window');

class AddDeck extends React.Component {
  state = {
    title: DEFAULT_EMPTY_STRING
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const key = this.state.title;
    const deck = {
      title: this.state.title,
      questions: []
    };

    addDeckToStorage({ deck, key }).then(() => {
      dispatch(
        addDeck({
          [key]: deck
        })
      );
      this.setState({
        title: DEFAULT_EMPTY_STRING
      });
      this.props.navigation.navigate(OPTION_ROUTE_DECK_DETAIL, { deckId: key });
    });
  };

  isSubmitEnabled = () => {
    return this.state.title.trim().length > 0;
  };

  render() {
    return (
      <AddScreenWrapper height={height} width={width}>
        <Text style={styles.inputLabel}>{WHAT_IS_THE_DECK_TITLE}</Text>
        <TextInput
          style={
            Platform.OS === IOS ? styles.inputTextiOS : styles.inputTextAndroid
          }
          placeholder={ENTER_DECK_TITLE}
          placeholderTextColor={WHITE}
          maxLength={15}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />

        <TouchableOpacity
          style={[
            styles.option,
            this.isSubmitEnabled()
              ? styles.correctOptionDisabled
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
  correctOptionDisabled: {
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
  }
});

export default connect()(AddDeck);
