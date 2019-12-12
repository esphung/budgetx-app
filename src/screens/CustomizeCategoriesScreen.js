import React, { useState, useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  ScrollView,
  // Button,
  // TouchableOpacity,
  Text,
  Image,
  // TextInput
  SafeAreaView,
  AsyncStorage,
  Alert,
  FlatList,
} from 'react-native';

import {
  Container,
  Item,
  Input,
  // Icon,
} from 'native-base';

import { Ionicons } from 'expo-vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Constants from 'expo-constants';

import { Auth } from 'aws-amplify';

// ui colors
import colors from 'main/colors';

import {
  loadUserObject,
  saveUserObject,
  saveUserCategories,
  loadUserCategories,
} from '../storage/UserStorage';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    backgroundColor: colors.darkTwo,
    

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  table: {
    // flex: 1,

    top: '10%',
    // backgroundColor: colors.darkTwo,
    // backgroundColor: colors.dark,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  name: {
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
  item: {
    backgroundColor: colors.dark, // '#f9c2ff',
    paddingVertical: 14,
    // marginVertical: 8,
    paddingHorizontal: 12,
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
  iconStyle: {
    // flex: 0.1,
    color: colors.offWhite, // '#5a52a5',
    fontSize: 17,
    marginLeft: 15,

    // borderWidth: 1,
    // borderColor: 'pink',
    // borderStyle: 'solid',
  },
});

// let DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     name: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     name: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     name: 'Third Item',
//   },
// ];


function CellItem({
  id,
  name,
  selected,
  onSelect,
  color,
}) {


  const deleteIconName = selected ? 'md-remove-circle-outline' : 'md-remove-circle';
  
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? colors.darkGreyBlue : colors.dark },
      ]}
    >
      <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        <Text style={[
        styles.name,
        { color: selected ? color : colors.white },
      ]}>{name}</Text>


        <Ionicons active name={deleteIconName} style={styles.iconStyle} />
        
        {/*<Text style={styles.arrow}>X</Text>*/}
      

      </View>
    </TouchableOpacity>
  );
}

const CustomizeCategoriesScreen = (props) => {
  const [selected, setSelected] = useState(new Map());

  const [storageKey, setStorageKey] = useState(null);

  const [data, setData] = useState(null);

  const retrieveStoredCategories = async (key) => {
    const userCategories = await loadUserCategories();
    setData(userCategories);
  }

  const onPress = (item) => {
    console.log(item);
  };

  function renderSeparator(item) {
    let view = <View />;
    // console.log(item.leadingItem.key);
    if (item.leadingItem.key !== '' && item.leadingItem.key !== 'Passcode' && item.leadingItem.key !== 'Change Password') {
      view = (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.dark,

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
      <CellItem
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

        id={String(item.id)}
        name={item.name}
        selected={!!selected.get(String(item.id))}
        onSelect={onSelect}

        color={item.color}
      >
        
      </CellItem>
    );
    return view;
  }

  const onSelect = useCallback(
    (id) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    }, [selected]);

  // useEffect(() => {
  //   console.log(selected);
  //   return () => {
  //     // effect
  //   };
  // }, [selected]);

  useEffect(() => {
    if (storageKey) {
      // console.log(storageKey);
      retrieveStoredCategories(storageKey);
    }
    return () => {
      // effect
    };
  }, [storageKey])

  useEffect(() => {
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      setStorageKey(`${user.username}/categories`);
      // console.log(user.username)
    })
    .catch(err => console.log(err));

    
    return () => {
      // effect
    };
  }, [])

  let view = <View />;

  view = (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.table}
        data={data}
        renderItem={({ item }) => renderItem(item)}
        // renderItem={({ item }) => (
        //   <Item
        //     id={item.id}
        //     name={item.name}
        //     selected={!!selected.get(item.id)}
        //     onSelect={onSelect}
        //   />
        // )}
        keyExtractor={(item) => String(item.id)}
        extraData={selected}
        ItemSeparatorComponent={(item) => renderSeparator(item)}
      />
    </SafeAreaView>
  );
  return view;
};

CustomizeCategoriesScreen.navigationOptions = ({ navigation }) => {
  const navbar = {
    headerTransparent: {},
    headerStyle: {
      backgroundColor: colors.dark,
    },
    headerTintColor: colors.white,
  }
  return navbar;
}

CustomizeCategoriesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

CellItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   name: {
//     fontSize: 32,
//   },
// });


export default CustomizeCategoriesScreen;