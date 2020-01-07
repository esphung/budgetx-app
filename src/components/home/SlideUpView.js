import React, { useState } from 'react';

import {
  StyleSheet,
  Animated,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from '../../../colors';

import SlideUpTransactionRect from './SlideUpTransactionRect';

import NoteTextInput from '../NoteTextInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '40%',
    bottom: '0%',
    backgroundColor: colors.darkTwo,
    shadowColor: '#0a101b',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
});

function SlideUpView(props) {
  const {
    slideViewBounceValue,
    transaction,
    updateStoredTransactionNote,
  } = props;

  // console.log(transaction);

  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(true);

  const view = (
    

      
      
      <Animated.View
      style={[styles.container, { transform: [{ translateY: slideViewBounceValue }] }]}
    >
        <View
          style={
            {
              flex: 1,

              height: 200,

              // backgroundColor: colors.darkTwo,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          <SlideUpTransactionRect transaction={transaction} />
        </View>

        <View
          style={
            {
              // flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',

              
            }
          }
        >

{/*        <TouchableOpacity style={
          {
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: colors.dark,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',


          }
        } onPress={() =>  console.log('Choose Category')}>
          <Text style={{
              // width: 67,
              height: 46,
              fontFamily: 'SFProDisplay-Regular',
              fontSize: 17,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.13,
              color: '#ffffff',
              textAlign: 'center',

              padding: 12,
          }}>Category</Text>
        </TouchableOpacity>*/}

          <NoteTextInput
            transaction={transaction}
            // handleNoteChange={handleNoteChange}
            updateStoredTransactionNote={updateStoredTransactionNote}
          />

        </View>

        <View style={
          {
            flex: 1,

            alignItems: 'stretch',
            justifyContent: 'center',

            // height: 200,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
        >
        
        </View>


        </Animated.View>
       

    
  );

  return view;
}

export default SlideUpView;
