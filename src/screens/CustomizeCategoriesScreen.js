import React, { useState, useCallback, useEffect } from 'react';

import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  ScrollView,
  // Button,
  // TouchableOpacity,
  Text,
  TextInput,
  Image,
  // TextInput
  SafeAreaView,
  AsyncStorage,
  Alert,
  FlatList,
  ActivityIndicator,
  Button,
} from 'react-native';

import {
  Container,
  Item,
  Input,
  // Icon,
} from 'native-base';

import { NavigationEvents } from 'react-navigation';

import { SwipeListView } from 'react-native-swipe-list-view';

import CustomSwipeCell from '../components/CustomSwipeCell';

import { Ionicons } from 'expo-vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Constants from 'expo-constants';

import { Auth } from 'aws-amplify';

import Category from '../models/Category';

// ui colors
import colors from 'main/colors';

import {
  loadUserObject,
  saveUserObject,
  // saveUserCategories,
  // loadUserCategories,
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
  // arrow: {
  //   flex: 0.1,
  //   flexDirection: 'row-reverse',

  //   textAlign: 'center',
  //   // width: 8,
  //   // height: 13,
  //   fontFamily: 'SFProDisplay-Semibold',
  //   fontSize: 17,
  //   opacity: 0.5,
  //   letterSpacing: 0.13,
  //   color: colors.white, // '#ffffff',

  //   paddingRight: 12,

  //   // backgroundColor: '#ffffff'

  //   // borderWidth: 1,
  //   // borderColor: 'white',
  //   // borderStyle: 'solid',
  // },
  iconStyle: {
    flex: 0.1,
    color: colors.offWhite, // '#5a52a5',
    fontSize: 17,
    marginLeft: 15,

    // borderWidth: 1,
    // borderColor: 'pink',
    // borderStyle: 'solid',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',

    width: '50%',
    // left: '500%',
    height: '100%', // 37,

    backgroundColor: colors.pinkRed,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },

  text: {
    flex: 1,
    opacity: 0.6,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    // lineHeight: 28,
    letterSpacing: 0.17,
    textAlign: 'left',
    color: 'rgba(255, 255, 255, 0.5)',
    paddingLeft: 12, // 'rgba(255, 255, 255, 0.5)',
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

// find previous obj if exists
function search(nameKey, myArray) {
  let obj = null;
  let i = 0;
  for (i; i < myArray.length; i += 1) {
    // console.log(myArray[i].name, nameKey);
    if (myArray[i].name.toLowerCase().trim() === nameKey.toLowerCase().trim()) {
      console.log(nameKey)
      obj = myArray[i];
    }
  }
  return obj;
}


function CellItem({
  id,
  name,
  selected,
  onSelect,
  color,
  addCategory,
}) {

  const [text, setText] = useState(null);

  const [isLoading, setIsLoading] = useState(false);


  // const deleteIconName = selected ? 'md-remove-circle-outline' : 'md-remove-circle';

  const itemIconName = selected ? 'md-unlock' : 'md-lock';

  const isEditable = selected ? true : false;

  // const handleNameEndEditing = (text) => {
  //   console.log(text);
  // }

  function checkColor(color) {

    return color !== 'dark' | color !== 'darkTwo' | color !== 'darkGreyBlue' | color !== 'offWhite'
    
  }

  const randomKeyFrom = (obj) => {
    const keys = Object.keys(obj);

    // console.log(keys.filter(checkColor))

    return obj[keys.filter(checkColor)[Math.floor(Math.random() * keys.length)]];
  };

  const handleTextChange = (value) => {

    // console.log(value);
    setText(value)
  }

  const handleTextSubmit = async (value) => {
    setIsLoading(true);

    // load stored user
    const userObject = await loadUserObject(); // load storage object

    const previousObj = search(value, userObject.user.categories);

    const randomColor = randomKeyFrom(colors)

    if (!previousObj) {
      // clean scrub name

      //  create new payee
      addCategory(value, randomColor);

      // // add payee to list
      // userObject.user.categories.unshift(category);
      // // console.log(payees);

      // // save new list of payees
      // saveUserObject(userObject);

      // load user saved transactions
      // const userObject = await loadUserObject(); // load storage object

      // // find current transaction from list
      // let i = userObject.user.categories.length - 1;
      // for (i; i >= 0; i -= 1) {
      //   if (userObject.user.categories[i].name.toLowerCase().trim() === value.toLowerCase().trim()) {
      //     // set transaction payee
      //     userObject.user.categories[i].payee = payee;

      //     // console.log(transactions[i]);

      //     // save transactions list
      //     saveUserObject(userObject);

      //     // return from here
      //     return;
      //   }
      // }
    }

    // console.log('Submitted:', value);
    setIsLoading(false);
  }

  useEffect(() => {
    setText(name)
    return () => {
      // effect
    };
  }, [])

  useEffect(() => {
    console.log(text);
    return () => {
      // effect
    };
  }, [text])
  
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      activeOpacity={1}
      style={[
        styles.item,
        { 
          backgroundColor: selected ? colors.darkGreyBlue : colors.dark,
        },
      ]}
    >
      <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        <TextInput
          style={
            [
              styles.text,
              {
                color: selected ? colors.white : color,
                opacity: selected ? 0.9 : 1,
              },
            ]
          }

          placeholder=""

          placeholderTextColor={colors.offWhite}

          editable={isEditable}

          returnKeyType="done"

          keyboardAppearance="dark"

          autoCapitalize="words"

          autoCorrect

          onChangeText={(text) => handleTextChange(text)}

          onSubmitEditing={() => handleTextSubmit(text)}

          // onEndEditing={() => setText(name)}

          maxLength={14}

          value={text}

          // onEndEditing={(text) => handleNameEndEditing(text)}
        />

        <View style={
          {
            flex: 1,
          }
        } />

        <Ionicons active name={itemIconName} style={styles.iconStyle} />
        
        {/*<Text style={styles.arrow}>X</Text>*/}
      

      </View>
    </TouchableOpacity>
  );
}

const CustomizeCategoriesScreen = (props) => {
  const [selected, setSelected] = useState(new Map());

  // const [storageKey, setStorageKey] = useState(null);

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(null);

  async function removeCategoryByName(name) {
    setIsLoading(true);
    const userObject = await loadUserObject();

    // console.log(list)
    const list = userObject.user.categories;

    let obj = await search(name, list);

    // console.log(list.length);

    // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for( var i = 0; i < list.length; i++){ 
       if ( list[i] === obj) {
         list.splice(i, 1); 
       }
    }

    // console.log(list.length);

    // console.log(obj);

    setData(list);
    return obj;
  }

  async function updateCategoryByName(name) {
    const userObject = await loadUserObject();

    const list = userObject.user.categories;
    // console.log(list)
    let obj = await search(name, list);

    // console.log(list.length);

    // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for( var i = 0; i < list.length; i++){ 
       if ( list[i] === obj) {
         list[i] = obj;
       }
    }

    // console.log(list.length);

    // console.log(obj);
    setIsLoading(false);
    return obj;
  }

  const addCategory = async (name, color) => {
    // const list = await loadUserCategories();
    const userObject = await loadUserObject();
    // console.log(userObject.user.categories);

    const list = userObject.user.categories;
    // console.log(list)
    // console.log(list.length);

    let obj = search(name, list);

    if (!obj) {
      // create new category
      obj = new Category(name, color);

      list.unshift(obj);

      userObject.user.categories = list;

      // console.log(userObject)

      await saveUserObject(userObject);

      

      // console.log(userObject.user.categories.length););

    }

    setData(list);

    return obj;
  }


  const storeUserCategories = async (list) => {
    setIsLoading(true);

    const userObject = await loadUserObject();

    userObject.user.categories = list;

    saveUserObject(userObject);

    setIsLoading(false);
  };

  const retrieveStoredUser = async (key) => {
    setIsLoading(true);

    const userObject = await loadUserObject();

    setUser(userObject.user);

    setIsLoading(false);
  }

  const deleteBtnPressed = async (item) => {
    setIsLoading(true);
    await removeCategoryByName(item.name);
    // console.log('Deleted:', await loadUserCategories());
    setIsLoading(false);
  };

  const onPress = (item) => {
    // console.log(item);
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

  function renderItem({item}) {
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

        addCategory={addCategory}
      >
        
      </CellItem>
    );
    return view;
  }

  function renderHiddenItem({ item }) {
    const { header } = item;
    let view = <View />;
    if (header) {
      view = (
        <View style={{
          flex: 1,
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
          backgroundColor: colors.dark,
        }}
        />
      );
    } else if (!header) {
      view = (
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{
            flex: 1,
            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
            // backgroundColor: colors.dark,
          }}
          />
          <View style={styles.rowBack}>
            <CustomSwipeCell
              // keyExtractor={() => String(index)}
              onDeleteBtnPress={() => deleteBtnPressed(item)}
            />
          </View>
        </View>
      );
    }

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

  const clearState = () => {
    retrieveStoredUser();
    // console.log('Cleared state');
  };

  useEffect(() => {
    clearState();
    return () => {
      // effect
    };
  }, []);

  useEffect(() => {
    if (user) {
      setData(user.categories);
    }
    // return () => {
    //   // effect
    // };
  }, [user])

  useEffect(() => {
    // console.log('Data changed.. saved data');
    if (data) {
      storeUserCategories(data.filter((item) => {
        return item.name
      }));

      // console.log(data.length);
      // console.log(user.categories.length)
      // saveUserObject()
    }
    return () => {
      // effect
    };
  }, [data])

  // useEffect(() => {
  //   // Auth.currentAuthenticatedUser({
  //   //     bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  //   // }).then((user) => {
  //   //   setStorageKey(`${user.username}/categories`);

  //   //   // console.log(user.username)
  //   // })
  //   // .catch(err => console.log(err));

    
  //   return () => {
  //     // effect
  //   };
  // }, [])


  let view = (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkTwo }}>
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );

  if (!isLoading) {
     view = (
      <SafeAreaView style={styles.container}>
        <NavigationEvents
          // try only this. and your component will auto refresh when this is the active component
          onWillFocus={() => clearState()} // {(payload) => clearState()}
          // other props
          // onDidFocus={payload => console.log('did focus',payload)}
          // onWillBlur={payload => console.log('will blur',payload)}
          // onDidBlur={payload => console.log('did blur',payload)}
        />
        <SwipeListView

          style={styles.table}
          data={data}
          renderItem={(item) => renderItem(item)}
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
          renderHiddenItem={(item) => renderHiddenItem(item)}

          leftOpenValue={0}
          rightOpenValue={-75}

        />

        <Button title="Add New" onPress={() => addCategory('')} />
      </SafeAreaView>
    );
    
  };
  return view;

}


CustomizeCategoriesScreen.navigationOptions = ({ navigation }) => {
  const navbar = {
    headerTransparent: {},
    headerStyle: {
      backgroundColor: colors.dark,
    },
    headerTintColor: colors.white,

    // headerRight: <Button title="Add New" onPress={() => {
    //   addCategory();
    // }} />
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
  name: PropTypes.string,
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