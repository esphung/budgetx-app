import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  // Image,
  FlatList,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from 'main/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flexDirection: 'row-reverse',

    textAlign: 'center',
    // width: 8,
    // height: 13,
    fontFamily: 'SFProDisplay-Semibold',
    fontSize: 17,
    opacity: 0.5,
    letterSpacing: 0.13,
    color: colors.white, // '#ffffff',

    paddingRight: 12,

    // backgroundColor: '#ffffff'

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
    if (item.leadingItem.key !== '' && item.leadingItem.key !== 'Passcode' && item.leadingItem.key !== 'Change Password/Sign Out') {
      view = (
        <View
          style={{
            flex: 1,
            // backgroundColor: 'transparent',

            borderWidth: 1,
            borderColor: colors.dark,
            borderStyle: 'solid',
          }}
        >
          <View
            style={
              {

                width: '90%', // 346,
                alignSelf: 'center',
                height: 0.5,

                borderWidth: 1,
                borderColor: colors.darkTwo,
                borderStyle: 'solid',
              }
            }
          />
        </View>
      );
    }
    return view;
  }

  function renderItem(item) {
    let rowHeight = 45;
    let backgroundColor = colors.dark;
    let isDisabled = false;
    let caret = '>';

    if (item.key === '') {
      rowHeight = 20;
      backgroundColor = colors.darkTwo;
      isDisabled = true;
      caret = '';
      // console.log(item);
    }

    // console.log(item);
    const view = (
      <TouchableOpacity
        style={
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
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
          <Text style={styles.title}>{item.key}</Text>
          <Text style={styles.arrow}>{caret}</Text>
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
        { key: 'Customize Categories' },
        { key: 'Export Transactions' },
        // { key: 'Passcode' },
        { key: 'Change Password/Sign Out' },
        { key: '' },
        { key: 'Contact Support' },
        { key: 'Terms of Service' },
        { key: 'Reset Data' },
      ]}

      renderItem={({ item }) => renderItem(item)}
      ItemSeparatorComponent={(item) => renderSeparator(item)}
    />
  );
  return view;
}

export default UserOptions;
