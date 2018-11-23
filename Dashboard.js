import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  CLAMP,
  CENTER,
  BOLD,
  SPACING_COMMA_FIVE
} from './constants/CssHelpers';
import { BLACK, WHITE } from './constants/Colors';
import { ANDROID, DASHBOARD_TITLE } from './constants/Helpers';
import { receiveDecks } from './actions';
import { fetchExistingDecks } from './utils/api';
import DeckList from '../components/DeckList';

const { height, width } = Dimensions.get('window');

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
        <View style={styles.container}>
          <Spinner
            visible
            textContent={'Fetching Decks...'}
            textStyle={{
              color: { BLACK }
            }}
          />
        </View>
      );
    }

    const { decks } = this.props;
    const decksArray = Object.values(decks);

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

              <DeckList decks={decksArray} height={height} width={width} />
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
    backgroundColor: WHITE,
    flex: 1,
    paddingTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: BOLD,
    letterSpacing: SPACING_COMMA_FIVE,
    paddingHorizontal: 20,
    textAlign: CENTER
  }
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(Dashboard);
