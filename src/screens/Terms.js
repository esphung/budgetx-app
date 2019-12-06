import React from 'react';

import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import colors from '../../colors';

import messages from '../../messages';

import HeadingLabel from '../components/Terms/HeadingLabel';

import MessageLabel from '../components/Terms/MessageLabel';

console.log(messages.terms.legal);

function titleCaseSentence(string) {
      var sentence = string.toLowerCase().split('.');
      for(var i = 0; i < sentence.length; i++){
         sentence[i] = `${sentence[i][0]}`.toUpperCase() + sentence[i].slice(1);
      }
   return sentence.join(" ");
 }

const Terms = () => {
  return (
    <SafeAreaView style={
      {
        flex: 1,
        backgroundColor: colors.darkTwo,
      }
    }>
      <ScrollView
        contentContainerStyle={
          {

            alignItems: 'stretch',
            justifyContent: 'flex-start',

            backgroundColor: 'transparent',

            marginTop: '12%',
          }
        } 
      >

        <HeadingLabel message={ messages.terms.accept.title } />
        <MessageLabel message={ messages.terms.accept.message } />

        <HeadingLabel message={ messages.terms.legal.title } />
        <MessageLabel message={ titleCaseSentence(messages.terms.legal.message) } />

        <HeadingLabel message={ messages.terms.privacy.title } />
        <MessageLabel message={ messages.terms.privacy.message } />

        <HeadingLabel message={ messages.terms.change.title } />
        <MessageLabel message={ messages.terms.change.message } />

      </ScrollView>
    </SafeAreaView>
  );
}

Terms.navigationOptions = ({ navigation }) => {
    const navbar = {
    title: 'Terms Of Service',
    //  headerStyle: {
    //     // position: 'absolute',
    //     backgroundColor: 'transparent',
    //     zIndex: 100,
    //     // top: 0,
    //     // left: 0,
    //     // right: 0,
    //     elevation: 0,
    //     shadowOpacity: 0,
    //     borderBottomWidth: 0,
    // },

    headerTransparent: {},
    // headerStyle: {
    //   backgroundColor: colors.darkTwo,
    // },
    headerTintColor: colors.white,

  };
  return navbar;
}

export default Terms;
