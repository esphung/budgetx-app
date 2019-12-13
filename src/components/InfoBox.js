import React from 'react';

import {
  ScrollView,
  View,
} from 'react-native';

import { Container, Header, Content, Button, Text } from 'native-base';

import colors from 'main/colors';

const InfoBox = (props) => {
  return (
    
    <Container style=
      {
        {
          flex: 1,
          justifyContent: 'center',
          alignContainers: 'center',


 

          width: 346,
          maxWidth: '90%',
          height: 74,
          maxHeight: '90%',


 
          borderRadius: 9,
          backgroundColor: colors.dark,
          shadowColor: '#0f1725',
          shadowOffset: {
            width: 5,
            height: 5
          },
          shadowRadius: 16,
          shadowOpacity: 1,
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
            fontSize: 17,
            fontWeight: '600',
            fontStyle: 'normal',
            letterSpacing: 0.13,
            color: colors.shamrockGreen,

            paddingHorizontal: 6,
            textAlign: 'center',
          }
        }
      >{ props.title }</Text>
    </Container>


   
  )
}
export default InfoBox