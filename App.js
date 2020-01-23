import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { LIGHT_CONTENT } from './constants/CssHelpers';
import { THEME } from './constants/Colors';
import { IOS } from './constants/Helpers';
import {
  HEADER_FORCE_INSET,
  HEADER_STYLE,
  HEADER_TINT_COLOR,
  HEADER_TITLE_STYLE_IOS,
  HEADER_TITLE_STYLE_ANDROID,
  OPTION_TITLE_HOME,
  OPTION_TITLE_ADD_CARD,
  OPTION_TITLE_QUIZ,
  TAB_BAR_LABEL_ADD_DECK,
  TAB_BAR_LABEL_ADD_DECK_ICON,
  TAB_BAR_LABEL_DECKS,
  TAB_BAR_LABEL_DECKS_ICON,
  TAB_BAR_LABEL_ICON_SIZE,
  TAB_BAR_OPTIONS
} from './constants/NavigationOptions';
import reducer from './reducers';
import { setQuizLocalNotification } from './utils/api';
import AddCard from './screens/AddCard';
import AddDeck from './screens/AddDeck';
import Dashboard from './screens/Dashboard';
import DeckDetail from './screens/DeckDetail';
import Quiz from './screens/Quiz';

const MainTabs = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLabel: TAB_BAR_LABEL_DECKS,
        tabBarIcon: ({ tintColor }) => (
          <Feather
            name={TAB_BAR_LABEL_DECKS_ICON}
            color={tintColor}
            size={TAB_BAR_LABEL_ICON_SIZE}
          />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: TAB_BAR_LABEL_ADD_DECK,
        tabBarIcon: ({ tintColor }) => (
          <Feather
            name={TAB_BAR_LABEL_ADD_DECK_ICON}
            color={tintColor}
            size={TAB_BAR_LABEL_ICON_SIZE}
          />
        )
      }
    }
  },
  {
    tabBarOptions: TAB_BAR_OPTIONS
  }
);

const DeckNavigator = createStackNavigator({
  Home: {
    screen: MainTabs,
    navigationOptions: {
      headerForceInset: HEADER_FORCE_INSET,
      headerStyle: HEADER_STYLE,
      headerTintColor: HEADER_TINT_COLOR,
      headerTitleStyle:
        Platform.OS === IOS
          ? HEADER_TITLE_STYLE_IOS
          : HEADER_TITLE_STYLE_ANDROID,
      title: OPTION_TITLE_HOME
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerForceInset: HEADER_FORCE_INSET,
      headerStyle: HEADER_STYLE,
      headerTintColor: HEADER_TINT_COLOR,
      headerTitleStyle:
        Platform.OS === IOS
          ? HEADER_TITLE_STYLE_IOS
          : HEADER_TITLE_STYLE_ANDROID
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerForceInset: HEADER_FORCE_INSET,
      headerStyle: HEADER_STYLE,
      headerTintColor: HEADER_TINT_COLOR,
      headerTitleStyle:
        Platform.OS === IOS
          ? HEADER_TITLE_STYLE_IOS
          : HEADER_TITLE_STYLE_ANDROID,
      title: OPTION_TITLE_ADD_CARD
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerForceInset: HEADER_FORCE_INSET,
      headerStyle: HEADER_STYLE,
      headerTintColor: HEADER_TINT_COLOR,
      headerTitleStyle:
        Platform.OS === IOS
          ? HEADER_TITLE_STYLE_IOS
          : HEADER_TITLE_STYLE_ANDROID,
      title: OPTION_TITLE_QUIZ
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setQuizLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.containerWrapper}>
          <View style={styles.container}>
            <StatusBar
              translucent
              backgroundColor={THEME}
              barStyle={LIGHT_CONTENT}
            />
          </View>
          <DeckNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME,
    height: Constants.statusBarHeight
  },
  containerWrapper: {
    flex: 1
  }
}); 
