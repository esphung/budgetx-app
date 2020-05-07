/*
https://github.com/jacse/react-native-app-intro-slider
*/

import React, { useState } from 'react';

// import { AppLoading } from 'expo';


import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

// import Icon from 'react-native-vector-icons/Ionicons';

import { NavigationEvents } from 'react-navigation';

import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';

// ui colors
import colors from '../../colors';

// ui styles
import styles from '../../styles';

// const styles = StyleSheet.create({
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',

//     borderWidth: 1,
//     borderColor: 'white',
//     borderStyle: 'dashed',

//   },
//   buttonCircle: {
//     // width: 40,
//     // height: 40,
//     // backgroundColor: 'rgba(0, 0, 0, .2)',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   //[...]
// });

// let imageViewStyle = {
//   // borderWidth: 1,
//   // borderColor: 'white',
//   // borderStyle: 'solid',
// }

let slide = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 50,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'dashed',
}
// let buttonCircle = {
//   width: 40,
//   height: 40,
//   // backgroundColor: 'rgba(0, 0, 0, .2)',
//   borderRadius: 20,
//   justifyContent: 'center',
//   alignItems: 'center',
// }

const slides = [
  {
    key: 1,
    title: `welcome to financely\n`,
    subtitle: 'a classic way to spend\n',
    text: 'keep track of your money by using financely just like a',
    foot: '\ncheckbook register',
    image: global.appIconImage243x260,
    // backgroundColor: '#59b2ab',
    style: {},
    icon: <FontAwesome style={{
      position: 'absolute',
      bottom: 80,
      marginBottom:  12,
    }} name="bank" size={36} color={colors.white} />,
  },
  {
    key: 4,
    title: `know how much you have\n`,
    subtitle: 'when you have it',
    text: 'everrytime you make a transaction. put in financely. banks won\'t always up to date',
    foot: '\nfinancely will be',
    image: global.appIconImage243x260,
    // backgroundColor: '#59b2ab',
    style: {},
    icon: <FontAwesome style={{
      position: 'absolute',
      bottom: 80,
      marginBottom:  12,
    }} name="money" size={36} color={colors.white} />,
  },
  // {
  //   key: 2,
  //   title: '',
  //   subtitle: '',
  //   text: 'banking apps aren\'t always up to date\n(they don\'t want to be)',
  //   // and can easily distract you with offers and ads',
  //   image: global.appIconImage243x260,
  //   // backgroundColor: '#febe29',
  //   style: {},
  // icon: {},
  // },
  {
    key: 3,
    title: 'built to be offline\n',
    subtitle: 'but always in the cloud',
    text: 'with cross-device sync,\nyour data will always be available to you anywhere',
    foot: '\neven offline',
    image: global.appIconImage243x260,
    // backgroundColor: '#22bcb5',
    style: {},
    icon: <Entypo style={{
      position: 'absolute',
      bottom: 80,
      marginBottom:  12,
    }} name="network" size={36} color={colors.white} />,
  }
];

export default function MyAppIntroSlider({ navigation }) {
  const handleRoute = (route) => {
    navigation.navigate(route)
  };
  const [showRealApp, setShowRealApp] = useState(false);

  const _renderItem = ({ item }) => {
    return (
      <View style={slide}>
       {
          item.icon
        }
        <Text style={[styles.textStyle, {
          position: 'absolute',
          top: screenWidth/9,
          fontSize: 26,
          textAlign: 'center',
          textShadowColor: 'gray',
          textShadowOffset: {width: 2, height: 10},
          // color: colors.white,
          padding: 18,

        }]}>
       
        {
          item.title
        }
          <Text style={[styles.textStyle, {
            position: 'absolute',
            top: screenWidth/3,
            fontSize: 26,
            textAlign: 'center',
            textShadowColor: 'gray',
            textShadowOffset: {width: 2, height: 10},
            color: colors.offWhite,
            padding: 10,
    
          }]}>{item.subtitle}</Text>
        </Text>
       
        <View style={{
          bottom: 50,
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}>
        <Image resizeMode="contain" style={item.style} source={item.image} /></View>
        <Text style={[styles.textStyle, {
          position: 'absolute',
          top: screenWidth * 1.3,
          fontSize: 26,
          textAlign: 'center',
          textShadowColor: 'gray',
          textShadowOffset: {width: 2, height: 10},
          color: colors.offWhite,
          padding: 10,
  
        }]}>{item.text}<Text style={[styles.textStyle, {
          position: 'absolute',
          top: screenWidth * 1.4,
          fontSize: 26,
          textAlign: 'center',
          textShadowColor: 'gray',
          textShadowOffset: {width: 2, height: 10},
          color: colors.shamrockGreen,
          opacity: 0.9,
          padding: 10,
  
        }]}>{item.foot}</Text></Text>
      </View>
    );
  }
  const _onDone = () => {
    // User finished the introduction.
    // Show real app through
    // navigation or simply by controlling state
    // this.setState({ showRealApp: true });
    AsyncStorage.setItem('hasSeenIntro', JSON.stringify(true));

    navigation.navigate('AuthLoading');

    setShowRealApp(true);
  }

  const _renderNextButton = () => {
    return (
      <View>
{/*        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          color={colors.white}
          size={36}
        />*/}
      </View>
    );
  };
  
  if (showRealApp) {
    // <AppLoading />;
    return null
  } else {
    return (
      <AppIntroSlider
        // dotClickEnabled
        keyExtractor={item => item.key.toString()}
        renderItem={_renderItem}
        renderNextButton={_renderNextButton}
        data={slides}
        onDone={_onDone}

        // onSkip={_onDone}
        renderPagination={false}

        // skipLabel="Skip"
        // showSkipButton
        // bottomButton
      />
    );
  }
}

MyAppIntroSlider.navigationOptions = () => {
  const navbar = {
    headerTransparent: {},
    headerTintColor: colors.white,
    headerLeft: null,
  };
  return navbar;
};

