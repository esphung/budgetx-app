import React, { useState } from 'react';

import {
  StyleSheet,
  Animated,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  FlatList,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from 'main/colors';

import styles from 'main/styles';

import SlideViewSeparator from '../SlideViewSeparator';

import SlideUpTransactionRect from './SlideUpTransactionRect';

import NoteTextInput from '../NoteTextInput';

// const styles = StyleSheet.create({
//   // container: {
//   //   flex: 1,
//   //   position: 'absolute',
//   //   width: '100%',
//   //   height: '40%',
//   //   bottom: '0%',
//   //   backgroundColor: colors.darkTwo,
//   //   shadowColor: '#0a101b',
//   //   shadowOffset: {
//   //     width: 1,
//   //     height: 1,
//   //   },
//   //   shadowRadius: 26,
//   //   shadowOpacity: 1,

//   //   borderWidth: 1,
//   //   borderColor: 'white',
//   //   borderStyle: 'dashed',
//   // },
//   inner: {
//     // padding: 24,
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
// });

function SlideUpView(props) {
  const {
    slideViewBounceValue,
    transaction,
    updateStoredTransactionNote,
  } = props;

  // console.log(transaction);

  const [isKeyboardAvoidEnabled, setIsKeyboardAvoidEnabled] = useState(true);

  const keyboardAvoidingView = (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled={isKeyboardAvoidEnabled}
                style={{
                  // flex: 1,
                  width: '100%',
                  height: '40%',
                  bottom: '0%',
                  top: '60%',
                  // borderWidth: 1,
                  // borderColor: 'white',
                  // borderStyle: 'dashed',
                  zIndex: -1,


              }}
            >
                <SafeAreaView style={
                  {
                    flex: 1,

                  }
                }>
                <Animated.View
      style={[styles.slideView, { transform: [{ translateY: slideViewBounceValue }] }]}
    >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.innerSlide}>

                        <SlideViewSeparator />

                            <SlideUpTransactionRect transaction={transaction} />

{/*                            <TouchableOpacity style={[
                              styles.tableItemStyle, {
                                backgroundColor: colors.dark,
                                // marginVertical: 1,
                              }]} onPress={() =>  console.log('Choose Category')}>
          <Text style={styles.listItemTitleStyle}>Choose Category</Text>
        </TouchableOpacity>
*/}
                            <NoteTextInput
                              transaction={transaction}
                              // handleNoteChange={handleNoteChange}
                              updateStoredTransactionNote={updateStoredTransactionNote}
                            />
{/*                            <View style={styles.btnContainer}>
                                <Button title="Submit" onPress={() => null} />
                            </View>*/}
                            <View style={{ flex : 1, marginBottom: 24 }} />
                            
                        </View>

                    </TouchableWithoutFeedback>
                    </Animated.View>
                </SafeAreaView>
            </KeyboardAvoidingView>
          )

  const animatedView = (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideViewBounceValue }] }]}
    >
      <SlideUpTransactionRect transaction={transaction} />
      


        <TouchableOpacity
          style={styles.itemStyle} onPress={() =>  console.log('Choose Category')}>
          <Text style={{
            color: 'pink'
          }}>Category</Text>
        </TouchableOpacity>`

      <NoteTextInput
        transaction={transaction}
        // handleNoteChange={handleNoteChange}
        updateStoredTransactionNote={updateStoredTransactionNote}
      />

    </Animated.View>
       

    
  );

  // return animatedView;

  return keyboardAvoidingView;
}

export default SlideUpView;
