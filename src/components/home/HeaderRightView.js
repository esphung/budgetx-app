/*
FILENAME:   HeaderRightView.js
PURPOSE:    right sid e of header. with setttings and search btns
AUTHOR:     eric phung
DATE:       Sun Nov  3 14:25:49 2019
            12/11/2019 12:31 AM
            12/04/2019 04:39 PM | implemented hooks
            12/04/2019 07:41 PM Updated to TouchabaleOp from gesture handler. changed css
            02/04/2020 06:52 PM | Moved styles extesrnal
*/

import React from 'react';

import { MaterialCommunityIcons, EvilIcons, FontAwesome5, Entypo, Octicons } from '@expo/vector-icons';

import PropTypes from 'prop-types';

import colors from '../../../colors';

import styles from '../../../styles';

import {
  // StyleSheet,
  View,
  // TouchableOpacity,
  Image,
} from 'react-native';

import {
  // TouchableNativeFeedback,
  // TouchableHighlight,
  TouchableOpacity,
  // TouchableWithoutFeedback
} from 'react-native-gesture-handler';

import { withNavigation } from 'react-navigation';

function HeaderRightView(props) {
  const { navigation } = props;

  // function searchBtnPressed() {
  //   navigation.navigate('Search');
  // }

  const helpBtnPressed = () => {
    // console.log('navigation: ', navigation);
  };

  const metricsBtnPressed = () => {
    navigation.navigate('MetricsScreen');
  };

  function settingsBtnPressed() {
    navigation.navigate('Settings');
  }

  return (
    <View style={
      {
        // flex: 1,
        height: 50,
        width:  (screenWidth)/(2),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100%',
        // width: '100%',
        // marginRight: 4, // '20%', // 3,
        // marginTop: 20,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }
    }
    >
  {/* ==== Extra Button ==== */}
    <TouchableOpacity
      // onPress={searchBtnPressed}
      disabled
      onPress={() => {}}
      style={[
        // styles.searchBtnTouchableOpacity,
        {
        flex: 1,
        width:  (screenWidth)/(8),

        alignItems: 'center',
        justifyContent: 'center',
        // width: screenWidth,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }]}
    >
      {/*<FontAwesome5 name="dollar-sign" size={24} color={colors.white} />*/}
{/*
        <Image
          resizeMode="contain"
          style={styles.searchImage}
          source={global.searchIcon}
        />
*/}
    </TouchableOpacity>

          {/* ==== Help Button ==== */}


      <TouchableOpacity
        // onPress={searchBtnPressed}
        onPress={helpBtnPressed}
        style={[
          // styles.searchBtnTouchableOpacity,
          {
          flex: 1,
          width:  (screenWidth)/(8),

          alignItems: 'center',
          justifyContent: 'center',
          // width: screenWidth,
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }]}
      >

      {/*<Entypo style={{
        opacity: 0.5
      }} name="help" size={24} color={colors.white} />*/}
{/*
        <Image
          resizeMode="contain"
          style={styles.searchImage}
          source={global.searchIcon}
        />
*/}
      </TouchableOpacity>

    {/* ==== Metrics Button ==== */}

    <TouchableOpacity
      // onPress={searchBtnPressed}
      // disabled={!global.authenticated}
      onPress={metricsBtnPressed}
      style={[
        // styles.searchBtnTouchableOpacity,
        {
        flex: 1,
        width: (screenWidth)/(8),

        alignItems: 'center',
        justifyContent: 'center',
        // width: screenWidth,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }]}
    >
      <Octicons name="graph" size={24} color={colors.white} />
{/*
        <Image
          resizeMode="contain"
          style={styles.searchImage}
          source={global.searchIcon}
        />
*/}

      </TouchableOpacity>



      {/* ==== Settings Button ==== */}

      <TouchableOpacity
        // testID="UniqueId204"
        onPress={settingsBtnPressed}
        // style={styles.settingsBtnTouchableOpacityMask}
        style={{
          flex: 1,
          width:  (screenWidth)/(8),

          alignItems: 'center',
          justifyContent: 'center',

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}
      >
      <EvilIcons name="gear" size={36} color={colors.white} />

     {/*   <Image
          resizeMode="contain"
          style={
            [
              styles.settingsImage,
              {
                // borderWidth: 1,
                // borderColor: 'white',
              }
            ]
          }
          source={global.settingsIcon}

          accessibilityLabel="Settings"
          accessible
        />*/}

      </TouchableOpacity>

    </View>
  );
}

// const styles = StyleSheet.create({
//   searchBtnTouchableOpacity: {
//     width: 45,
//     height: '60%'

//     // flex: 0.5,
//     // width: 40,
//     // height: '60%',

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'dashed',
//   },

//   searchImage: {
//     width: '100%',
//     height: '100%'
//   },

//   settingsBtnTouchableOpacityMask: {
//     // flex: 1,
//     width: 38,
//     height: 38,

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'dashed',
//   },

//   settingsImage: {
//     width: '100%',
//     height: '100%'
//   }
// });

HeaderRightView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(HeaderRightView);
