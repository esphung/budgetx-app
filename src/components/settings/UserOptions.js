import React, { useState } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from '../../../colors';

function UserOptions() {
  // const [rowHeight, setRowHeight] = useState(46);

  function renderSeparator(item) {
    let view = <View />;
    // console.log(item.leadingItem.key)
    if (item.leadingItem.key !== '' && item.leadingItem.key !== 'Passcode') {
      return (
        <View style={{
          flex: 1,
          backgroundColor: 'transparent',

          borderWidth: 1,
          borderColor: colors.dark,
          borderStyle: 'solid',
        }}>
            <View style={
            {
              
              width: '90%', // 346,
              alignSelf: 'center',
              // height: 1,

              // color: 'orange',

    
              borderWidth: 1,
              borderColor: colors.darkTwo,
              borderStyle: 'solid',
            }
          } />
        </View>
      )
    } else {
      return view;
    }
  }

  function renderItem(item) {
    let rowHeight = 45;
    let backgroundColor = colors.dark;
    let isDisabled = false;

    if (item.key === '') {
      rowHeight = 20;
      backgroundColor = colors.darkTwo
      isDisabled = true;
      // console.log(item);
    }
    const view = (
      <TouchableOpacity
        style={
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            // width: 370,
            height: rowHeight, // 46,
            backgroundColor: backgroundColor, // colors.dark,



            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
        disabled={isDisabled}
      >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
        <Text style={styles.title}>{item.key}</Text>
        <Text style={styles.arrow}>></Text>
      </View>
      </TouchableOpacity>
    );
    return view;
  }
  const view = (
    <FlatList
      scrollEnabled={false}
      contentContainerStyle={styles.container}
      data={[
        {key: 'Currency'},
        {key: 'Customize Categories'},
        {key: 'Export Transactions'},
        {key: 'Passcode'},
        {key: ''},
        {key: 'Contact Support'},
        {key: 'Terms of Service'}
      ]}
      
      renderItem={({item, index}) => renderItem(item)}
      ItemSeparatorComponent={(item) => renderSeparator(item)}
    />
  );
  return view;
}

const styles = StyleSheet.create({
  container: {
    // flex: 0.1,
    flex: 0.5,
    // width: '100%',
    // height: '10%',

    // height: '8%',

    top: '10%',

    marginTop: 10,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  title: {
    flex: 1,
    // width: 67,
    // height: 20,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0.13,
    color: colors.white, // '#ffffff',

    paddingLeft: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  arrow: {
    flex: 0.1,
    textAlign: 'center',
    // width: 8,
    // height: 13,
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 17,
    opacity: 0.5,
    letterSpacing: 0.13,
    color: colors.white, // '#ffffff',

    // backgroundColor: '#ffffff'

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  }
});

// const optionRectangle = {
//   width: 375,
//   height: rowHeight, // 46,
//   backgroundColor: colors.dark,

//   borderWidth: 1,
//   borderColor: 'white',
//   borderStyle: 'dotted',
// };

export default UserOptions;