/*
FILENAME:   HeaderRightView.js
PURPOSE:    right sid e of header. with setttings and search btns
AUTHOR:     eric phung
DATE:       Sun Nov  3 14:25:49 2019
            12/11/2019 12:31 AM
            12/04/2019 04:39 PM | implemented hooks
            12/04/2019 07:41 PM Updated to TouchabaleOp from gesture handler. changed css
*/

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  // TouchableOpacity,
  Image
} from 'react-native';

import {
  // TouchableNativeFeedback,
  // TouchableHighlight,
  TouchableOpacity,
  // TouchableWithoutFeedback
} from 'react-native-gesture-handler';

import { withNavigation } from 'react-navigation';

function HeaderRightView(props) {
  // state hooks
  const [navigation, setNavigation] = useState(null);

  useEffect(() => {
    // mount component
    setNavigation(props.navigation);
  }, []);

  const searchBtnPressed = () => {
    navigation.navigate('Search');
  };

  const settingsBtnPressed = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={
      {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        marginRight: 4, // '20%', // 3,
        marginTop: 20,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }
    }
    >
      {/* ==== Search Button ==== */}

     <TouchableOpacity
        onPress={searchBtnPressed}
        style={styles.searchBtnTouchableOpacity}
      >

        <Image
          resizeMode="contain"
          style={styles.searchImage}
          source={global.searchIcon}
        />

      </TouchableOpacity>

      {/* ==== Settings Button ==== */}

      <TouchableOpacity
        onPress={settingsBtnPressed}
        style={styles.settingsBtnTouchableOpacity}
      >

        <Image
          resizeMode="contain"
          style={styles.settingsImage}
          source={global.settingsIcon}
        />

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  searchBtnTouchableOpacity: {
    width: 45,
    height: '60%'

    // flex: 0.5,
    // width: 40,
    // height: '60%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  searchImage: {
    width: '100%',
    height: '100%'
  },

  settingsBtnTouchableOpacity: {
    // flex: 1,
    width: 45, // 30,
    // height: 45, // 30,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  settingsImage: {
    width: '100%',
    height: '100%'
  }
});

export default withNavigation(HeaderRightView);
