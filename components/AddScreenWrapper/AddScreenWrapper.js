import React from 'react';
import PropTypes from 'prop-types';
import Emoji from 'react-native-emoji';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { CENTER } from '../../constants/CssHelpers';
import { THEME_OVERLAY_COLOR, TRANSPARENT } from '../../constants/Colors';
import { ADD_SCREEN_ICON, BANNER_BACKGROUND } from '../../constants/Helpers';
import Banner from '../Banner';

const AddScreenWrapper = ({ children, height, width }) => {
  return (
    <View style={styles.container}>
      <Banner height={height} imageUrl={BANNER_BACKGROUND} width={width} />
      <ScrollView style={styles.contentContainer}>
        <KeyboardAvoidingView style={styles.content} behavior='padding'>
          <Emoji name={ADD_SCREEN_ICON} style={styles.contentIcon} />
          {children}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

AddScreenWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TRANSPARENT
  },
  contentContainer: {
    flex: 1,
    backgroundColor: THEME_OVERLAY_COLOR
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: CENTER,
    alignItems: CENTER
  },
  contentIcon: {
    fontSize: 48
  }
});

export default AddScreenWrapper;
