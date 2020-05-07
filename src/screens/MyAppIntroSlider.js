/*
https://github.com/jacse/react-native-app-intro-slider
*/

import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

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
// import styles from '../../styles';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'dashed',

  },
  buttonCircle: {
    // width: 40,
    // height: 40,
    // backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //[...]
});

const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    // image: require('../../assets/circle.png'),
    // backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/circle.png'),
    // backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../../assets/circle.png'),
    // backgroundColor: '#22bcb5',
  }
];

export default function App(props) {
  const handleRoute = (route) => {
    props.navigation.navigate(route)
  };

  const [showRealApp, setShowRealApp] = useState(false)
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  const _onDone = () => {
    // User finished the introduction.
    // Show real app through
    // navigation or simply by controlling state
    // this.setState({ showRealApp: true });
    // setShowRealApp(true)


    AsyncStorage.setItem('hasSeenIntro', JSON.stringify(true))

    props.navigation.navigate('AuthLoading')

    
  }
  
  if (showRealApp) {
    return <App />;
  } else {
    return <AppIntroSlider keyExtractor={item => item.key.toString()} renderItem={_renderItem} data={slides} onDone={_onDone}/>;
  }
}






