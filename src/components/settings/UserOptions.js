import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  // Image,
  // FlatList,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { SwipeListView } from 'react-native-swipe-list-view';

// ui colors
import colors from '../../../colors';

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    // top: '5%',

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
    flex: 0.05,
    flexDirection: 'row-reverse',


    textAlign: 'right',
    // width: 8,
    // height: 13,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    opacity: 0.5,
    letterSpacing: 0.13,
    color: colors.white, // '#ffffff',

    paddingRight: 12,

    // backgroundColor: '#ffffff',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
});

function UserOptions(props) {
  // const [rowHeight, setRowHeight] = useState(46);
  const { onPress } = props;

  function renderSeparator(item) {
    let view = <View />;
    // console.log(item.leadingItem.key);
    view = (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.dark, // 'transparent',

            // borderWidth: 1,
            // borderColor: colors.dark,
            // borderStyle: 'solid',
          }}
        >
          <View
            style={
              {

                width: '90%', // 346,
                alignSelf: 'center',
                // height: 0.5,

                borderWidth: 0.5,
                borderColor: colors.darkTwo,
                borderStyle: 'solid',
              }
            }
          />
        </View>
      );
    return view;
  }

  function renderItem(item) {
    let rowHeight = 46;
    let backgroundColor = colors.dark;
    let isDisabled = false;
    let caret = '>';

    if (item.key === '') {
      // rowHeight = 24;
      backgroundColor = 'transparent', // colors.darkTwo;
      isDisabled = true;
      caret = '';
      // console.log(item);
    }

    const title = `${item.key}`;
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
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            // height: 46,
            // width: 370,
            height: rowHeight, // 46,
            backgroundColor, // colors.dark,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
        disabled={isDisabled}
        onPress={() => onPress(item)}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.arrow}>{caret}</Text>
        </View>
      </TouchableOpacity>
    );
    return view;
  }
  const view = (
    <SwipeListView
      scrollEnabled={true}
      style={styles.table}

      // style={
      //   {
      //     flex: 1,
      //     // borderWidth: 1,
      //     // borderColor: 'white',
      //     // borderStyle: 'solid',

      //     // paddingBottom: 50,
      //   }
      // }
      // contentContainerStyle={styles.container}
      data={[
        { key: 'Customize Categories' },
        { key: 'Export Transactions' },
        // { key: 'Passcode' },
        { key: 'Change Password/Sign Out' },
        // { key: 'Backup Data' },
        { key: '' },
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
