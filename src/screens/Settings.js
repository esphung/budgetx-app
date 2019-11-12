// Settings.js
// Thu Oct 31 23:17:49 2019
// eric phung
//  settings screen for budget x app
import React, { Component } from 'react';
import {
  StyleSheet,
  View,

  Button,
  AsyncStorage
} from 'react-native';

// ui colors
import colors from '../../colors';

class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    const obj = {
      title: 'Settings',

      headerStyle: {
        backgroundColor: colors.dark,
      },
      headerLeft: (
        <Button title="Back" onPress={() => navigation.goBack(null)} />
      ),

      headerTintColor: colors.white
    };
    // const props = navigation.getScreenProps('props');

    return obj;
  }

  clearAll() {
    const { navigation } = this.props;
    AsyncStorage.clear();
    navigation.goBack(null);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Reset" onPress={() => this.clearAll()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkTwo
  },

  logOutBtnView: {
    flex: 1,
    marginLeft: 15,
    marginBottom: 6
  },

  logOutBtnText: {
    width: 58,
    height: 20,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    textAlign: 'right',
    color: colors.pinkRed,
  }
});

export default Settings;
