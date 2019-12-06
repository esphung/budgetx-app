import React from 'react';

import {
  ScrollView,
  SafeAreaView,
} from 'react-native';

import colors from '../../colors';

import messages from '../../messages';

import HeadingLabel from '../components/Terms/HeadingLabel';

import MessageLabel from '../components/Terms/MessageLabel';

function titleCaseSentence(string) {
  const sentence = string.toLowerCase().split('.');
  let i = 0;
  for (i; i < sentence.length; i += 1) {
    sentence[i] = `${sentence[i][0]}`.toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(' ');
}

function Terms() {
  const view = (
    <SafeAreaView
      style={
        {
          flex: 1,
          backgroundColor: colors.darkTwo,
        }
      }
    >
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

        <HeadingLabel message={messages.terms.accept.title} />
        <MessageLabel message={messages.terms.accept.message} />

        <HeadingLabel message={messages.terms.legal.title} />
        <MessageLabel message={titleCaseSentence(messages.terms.legal.message)} />

        <HeadingLabel message={messages.terms.privacy.title} />
        <MessageLabel message={messages.terms.privacy.message} />

        <HeadingLabel message={messages.terms.change.title} />
        <MessageLabel message={messages.terms.change.message} />

      </ScrollView>
    </SafeAreaView>
  );
  return view;
}

Terms.navigationOptions = () => {
  const navbar = {
    title: 'Terms Of Service',
    headerTransparent: {},
    headerTintColor: colors.white,

  };
  return navbar;
};

export default Terms;
