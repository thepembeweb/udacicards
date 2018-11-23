import React, { Component } from 'react';
import {
  Animated,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { BLACK, WHITE } from '../constants/Colors';
import { BOLD, CLAMP, CENTER, SPACING_COMMA_FIVE } from '../constants/CssHelpers';
import {
  ANDROID,
  DASHBOARD_LOADING_MESSAGE,
  DASHBOARD_TITLE
} from '../constants/Helpers';
import { receiveDecks } from '../actions';
import { fetchExistingDecks } from '../utils/api';
import DeckList from '../components/DeckList';

class Dashboard extends Component {
  state = {
    fetchingData: true
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetchExistingDecks().then(decks => {
      dispatch(receiveDecks(decks));
      this.setState(() => ({ fetchingData: false }));
    });
  }

  componentWillMount() {
    this.scrollY = new Animated.Value(0);
    this.startHeaderHeight = 80;
    this.endHeaderHeight = 50;

    if (Platform.OS == ANDROID) {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
      this.endHeaderHeight = 70 + StatusBar.currentHeight;
    }
    this.animatedHeaderHeight = this.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [this.startHeaderHeight, this.endHeaderHeight],
      extrapolate: CLAMP
    });
    this.animatedOpacity = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [0, 1],
      extrapolate: CLAMP
    });
    this.animatedTagTop = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [-30, 10],
      extrapolate: CLAMP
    });
    this.animatedMarginTop = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [50, 30],
      extrapolate: CLAMP
    });
  }

  render() {
    const { fetchingData } = this.state;
    if (fetchingData === true) {
      return (
        <View
          style={{
            flex: 1
          }}
        >
          <Spinner
            visible
            textContent={DASHBOARD_LOADING_MESSAGE}
            textStyle={{
              color: { BLACK }
            }}
          />
        </View>
      );
    }

    const { decks } = this.props;
    const decksArray = Object.values(Object.values(decks)[0]);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ])}
          >
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{DASHBOARD_TITLE}</Text>
              <DeckList decks={decksArray} navigation={this.props.navigation} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: BOLD,
    paddingHorizontal: 20,
    textAlign: CENTER,
    letterSpacing: SPACING_COMMA_FIVE
  }
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(Dashboard);
