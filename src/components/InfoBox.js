import React from 'react';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

// import { Container, Header, Content, Button, Text } from 'native-base';

import colors from 'main/colors';

const InfoBox = (props) => {
  const view = (
    <TouchableOpacity
    onPress={props.onPress}
    style={
      {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
        marginBottom: 20,
        minWidth: 346,
        width: '90%',
        maxWidth: '95%',
        minHeight: 74,

        borderRadius: 9,
        backgroundColor: colors.dark,
        shadowColor: '#0f1725',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowRadius: 16,
        shadowOpacity: 1,

        // borderWidth: 1,
        // borderColor: colors.white,
        // borderStyle: 'solid',
      }
    }
    >
      <Text
        style={
          {

            // width: 215,
            // alignSelf: 'center',

            // height: 40,
            fontFamily: 'SFProDisplay-Semibold',
            fontSize: 21,
            fontWeight: '600',
            fontStyle: 'normal',
            letterSpacing: 0.13,
            color: colors.shamrockGreen,

            paddingHorizontal: 6,
            textAlign: 'center',
          }
        }
      >
        { props.title }
      </Text>
    </TouchableOpacity>
  );
  return view;
};

export default InfoBox;
