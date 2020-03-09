import React, { useState } from 'react';

import {
  // StyleSheet,
  View,
  Text,
  // Image,
  // FlatList,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { SwipeListView } from 'react-native-swipe-list-view';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,

//     // top: '5%',

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//   },
//   title: {
//     flex: 1,
//     // width: 67,
//     // height: 20,

//     fontFamily: 'SFProDisplay-Regular',
//     fontSize: 17,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     letterSpacing: 0.13,
//     color: colors.white, // '#ffffff',

//     paddingLeft: 12,

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//   },
//   arrow: {
//     flex: 0.05,
//     flexDirection: 'row-reverse',


//     textAlign: 'right',
//     // width: 8,
//     // height: 13,
//     fontFamily: 'SFProDisplay-Regular',
//     fontSize: 17,
//     opacity: 0.5,
//     letterSpacing: 0.13,
//     color: colors.white, // '#ffffff',

//     paddingRight: 12,

//     // backgroundColor: '#ffffff',

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'solid',
//   },
// });

function UserOptions(props) {
  // const [rowHeight, setRowHeight] = useState(46);
  const { onPress, isBackupDisabled, currentSettingsVersion, isRestoreDisabled, isUserLoggedIn } = props;

  let isDisabled = true;

  // const [isDisabled, setIsDisabled] = useState(false);

  let opacity = (1.0)

  function renderSeparator(item) {
    let view;
    // console.log('item.leadingItem: ', item.leadingItem);

    if (item.leadingItem.key === 'Contact Support' || item.leadingItem.key === '' || item.leadingItem.key === 'Backup Local Data') return null
    view = <View
          style={{
            flex: 1,
            backgroundColor: colors.dark,
            justifyContent: 'center',
            alignItems: 'center',


            // borderWidth: 1,
            // borderColor: colors.dark,
            // borderStyle: 'solid',
          }}
        >
          <View
            style={
              {
                width: '90%', // 346,
                // alignSelf: 'center',
                // height: 0.5,

                borderWidth: 0.5,
                borderColor: colors.darkTwo,
                borderStyle: 'solid',
              }
            }
          />
        </View>
    return view;
  }

  function renderItem(item) {
    let rowHeight = 45;
    let backgroundColor = colors.dark;
    let caret = '>';
    let textColor = colors.white;
    // let opacity = 1.0;

    let title = `${item.key}`;

    if (title === '') {
      rowHeight = 24;
      backgroundColor = 'transparent'; // colors.darkTwo;
      isDisabled = true;
      caret = null;
    }
    /* Backup Data */
    else if (title === ('Backup Local Data')) {
      isDisabled = !isUserLoggedIn
      if (isDisabled) {
        // title = 'Successfully Backed Up';
        textColor = colors.offWhite
        // caret = currentSettingsVersion
        caret = null;
        // backgroundColor = 'transparent';
      }
    }
    /* Restore Backup Data */
    else if (title === 'Restore Backup Data') {
      isDisabled = !isUserLoggedIn
      if (isDisabled) {
        title = 'Restored Local Backup';
        textColor = colors.offWhite
        // caret = currentSettingsVersion
        caret = null;
        // backgroundColor = 'transparent';
      }
      if (!isUserLoggedIn) {
        // title = null;
        textColor = colors.offWhite
        // backgroundColor = 'transparent';
        isDisabled = true
        caret = null;
        // rowHeight = 0;
      }
    }
    /* Reset Data */
    else if (title === 'Reset Data') {
      textColor = colors.pinkRed;
      backgroundColor = 'transparent';
      caret = null;
      opacity = 0.5
    }
    /* Change Password/Sign Out */
    else if (title === 'Change Password/Sign Out') {
      isDisabled = !isUserLoggedIn
      if (isDisabled) {
        // title = null;
        textColor = colors.offWhite
        // backgroundColor = 'transparent';
        
        caret = null;
        // rowHeight = 24;
        // caret = null;
        // opacity = 0.5
      }
    }
    /* Sign In */
    else if (title === 'Sign In') {
      isDisabled = false
      if (false) {
        title = null;
        textColor = colors.offWhite
        backgroundColor = 'transparent';
        // isDisabled = true
        caret = null;
        rowHeight = 0;
        // caret = null;
        // opacity = 0.5
      }
    }

    else {
      isDisabled = false
    }

    // if (item.key === 'Passcode') {
    //   if (props.isPasscodeEnabled === true) {
    //     title = `Passcode Enabled`;
    //   } else {
    //     title = `Passcode Disabled`;
    //   }

    // }

    // console.log(item);
    const view = (
      <TouchableOpacity
        style={
          {
            flexDirection: 'row',
            // width: '100%',
            // height: 46,
            // width: 370,
            height: rowHeight, // 46,
            backgroundColor, // colors.dark,

            opacity: opacity

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
        disabled={isDisabled}
        onPress={() => {
          // setIsDisabled(true),
          isDisabled = true,
          onPress(item)
        }}

      >
        <View
          style={{
            flex: 1,
            // flexDirection: 'row',
            // alignSelf: 'flex-start',
            // justifyContent: 'center',
          }}
        >
          <View style={
            {
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',

              paddingLeft: 12,

              // borderWidth: 1,
              // borderColor: 'blue',
              // borderStyle: 'solid',
            }
          }
          >
            <Text style={[styles.listItemTitleStyle, {
              color:  textColor
            }]}>{title}</Text>
          </View>

        </View>
        <View style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          // height: '100%',
          // borderWidth: 1,
          // borderColor: 'red',
          // borderStyle: 'solid',
        }}
        >
          <Text style={styles.arrow}>{caret}</Text>
        </View>
      </TouchableOpacity>
    );
    return view;
  }
  const view = (
    <SwipeListView
      scrollEnabled
      // style={styles.table}

      style={
        {
          // flex: 1,
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',

          // paddingBottom: 50,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }
      }
      // contentContainerStyle={[
      //   // {},
      //   // styles.container,
      //   {
      //   // flex: 1,

      //   // borderWidth: 1,
      //   // borderColor: 'white',
      //   // borderStyle: 'solid',
      // }]}
      data={[
        { key: 'Sign In' },
        { key: 'Customize Categories' },
        { key: 'Backup Local Data' },
        // { key: 'Passcode' },
        
        

        

        { key: '' },
        { key: 'Change Password/Sign Out' },
        // { key: 'Export Transactions' },
        { key: 'Restore Backup Data' },
        { key: 'Contact Support' },
        // { key: 'Passcode' },
        
        { key: 'Reset Data' },
        

      ]}

      renderItem={({ item }) => renderItem(item)}
      ItemSeparatorComponent={(item) => renderSeparator(item)}
    />
  );
  return view;
}

export default UserOptions;
