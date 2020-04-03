import React, { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';

import { AppLoading } from 'expo';

import {
  // StyleSheet,
  View,
  // ScrollView,
  // Button,
  // TouchableOpacity,
  Text,
  TextInput,
  // Image,
  // TextInput
  SafeAreaView,
  // AsyncStorage,
  // Alert,
  FlatList,
  ActivityIndicator,
  // Button,
  Alert,
  Platform,
  // BlurViewIOS,
  // BlurView,
} from 'react-native';

// import { BlurView } from 'expo-blur';

// import {
//   Container,
//   Item,
//   Input,
//   // Icon,
// } from 'native-base';

import Auth from '@aws-amplify/auth';

import { NavigationEvents } from 'react-navigation';

import { SwipeListView } from 'react-native-swipe-list-view';

// import { Ionicons } from 'expo-vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Dialog from 'react-native-dialog';

// import Constants from 'expo-constants';

import { isDeviceOnline } from '../../network-functions';

import {
  crossDeviceSync,
  // pushCategoriesToCloud,
} from '../functions/crossDeviceSync';

/* my custom queries */
import {
  // updateTransaction,
  updateCategory,
  // removeTransaction,
  // removePayee,
  removeCategory,
  // savePayee,
  saveCategory,
  saveTransaction,
  // fetchStoredTransactions,
  // fetchStoredCategories,
  // getTransactionByID,
} from '../storage/my_queries';

// ui colors
import colors from '../../colors';

import styles from '../../styles';

import BlueButton from '../../storybook/stories/BlueButton';

import TouchableText from '../../storybook/stories/TouchableText';

import HelpMessage from '../../storybook/stories/HelpMessage';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../storage/SettingsStorage';

// import CustomSwipeCell from '../components/CustomSwipeCell';

import SwipeDelete from '../components/SwipeDelete';

import SwipeEdit from '../components/SwipeEdit';

// import { Auth } from 'aws-amplify';

import Category from '../models/Category';

// import InfoBox from '../../storybook/stories/InfoBox';

// import ColorDialog from '../components/ColorDialog';

import defaultCategories from '../data/categories';

import uuidv4 from '../functions/uuidv4';

import searchByID from '../functions/searchByID';

const MAX_NAME_LENGTH = 15;

// import {
//   loadUserObject,
//   saveUserObject,
//   // saveUserCategories,
//   // loadUserCategories,
// } from '../storage/UserStorage';

// find previous obj if exists
function searchByName(nameKey, myArray) {
  let obj = null;
  let i = 0;
  for (i; i < myArray.length; i += 1) {
    // console.log(myArray[i].name, nameKey);
    if (myArray[i].name.toLowerCase().trim() === nameKey.toLowerCase().trim()) {
      // console.log(nameKey)
      obj = myArray[i];
    }
  }
  return obj;
}

// function searchByID(key, myArray) {
//   let obj = null;
//   let i = 0;
//   for (i; i < myArray.length; i += 1) {
//     if (myArray[i].id === key) {
//       obj = myArray[i];
//     }
//   }
//   return obj;
// }


function CellItem({
  id,
  name,
  selected,
  onSelect,
  color,
  addCategory,
}) {
  // const [text, setText] = useState(null);

  // let isEditable = false;
  // if (!name) {
  //   isEditable = true;
  // }
  // const handleTextChange = (value) => {
  //   // console.log(value);
  //   setText(value);
  // };

  // const colorSelect = (colorId) => {
  //   Alert.alert('Please Purchase Category Color Change');
  //   // console.log(colorId);
  // };



  // async function retrieveCognitoUserKey() {
  //   Auth.currentAuthenticatedUser()
  //     .then((cognito) => {
  //       // setUserToken(user.signInUserSession.accessToken.jwtToken);
  //       // console.log('username:', cognitoUser.username);
  //       // setStorageKey(cognito.username);

  //       // setEmail(cognito.attributes.email);
  //       key = cognito.username;
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       Alert.alert(err);
  //     });
  // }


  // const handleTextSubmit = async (value) => {
  //   Alert.alert('handling text submit', text)
  //   // let key = retrieveCognitoUserKey();

  //   // if (key) {
  //   //   // load stored user settings
  //   //   const userObject = await loadSettingsStorage(key);
  //   // } else {
  //   //   alert('error handling text submit')
  //   // }

    

  //   // const previousObj = searchByName(value, userObject.categories);

  //   // // const randomColor = randomKeyFrom(colors)

  //   // if (!previousObj) {
  //   //   //  create new payee
  //   //   // addCategory(value, randomColor);
  //   //   addCategory(value, colors.white);
  //   // }
  // };

  // useEffect(() => {
  //   retrieveCognitoUserKey();
  //   return () => {
  //     // effect
  //   };
  // }, []);

  // useEffect(() => {
  //   setText(name);
  //   return () => {
  //     // effect
  //   };
  // }, [])

  // useEffect(() => {
  //   // console.log(text);
  //   return () => {
  //     // effect
  //   };
  // }, [text]);

  return (
    <TouchableOpacity
      // onPress={() => onSelect(id)}
      onPress={() => console.log('category id: ', id)}
      activeOpacity={1.0}
      style={[
        styles.tableItemStyle,
        {
          backgroundColor: selected ? colors.darkGreyBlue : colors.dark,
        },
      ]}
    >
      <View
        style={
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }
      >
        <TextInput
          style={
            [
              styles.listItemTitleStyle,
              {
                color: selected ? colors.white : color,
                opacity: selected ? 0.9 : 1,
              },
            ]
          }

          placeholder={name}

          placeholderTextColor={color}

          editable={false}

          returnKeyType="done"

          keyboardAppearance="dark"

          autoCapitalize="words"

          autoCorrect

          // onChangeText={(value) => handleTextChange(value)}

          // onSubmitEditing={() => handleTextSubmit(text)}

          // onEndEditing={(value) => setText(value)}

          maxLength={14}

          value={name}
        />

        <View style={
          {
            flex: 1,
          }
        }
      />

        {/* <TouchableOpacity onPress={() => colorSelect(id)}><Ionicons active name={itemIconName} style={styles.iconStyle} /></TouchableOpacity> */}
        {/* <Text style={styles.arrow}>X</Text> */}

      </View>
    </TouchableOpacity>
  );
}

const CustomizeCategoriesScreen = () => {
  const [selected, setSelected] = useState(new Map());

  const [isReady, setIsReady] = useState(false);

  // const [storageKey, setStorageKey] = useState(null);

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  // const [user, setUser] = useState(null);

  // const [storageKey, setStorageKey] = useState(null);

  // const [typeInputValue, setTypeInputValue] = useState(null);

  const [nameInputValue, setNameInputValue] = useState(null);

  const [shouldShowDialog, setShowDialogBox] = useState(false);

  const [shouldShowColorBox, setShouldShowColorBox] = useState(false);

  const [currentCategory, setCurrentCategory] = useState(null);

  const [helpMessage, setHelpMessage] = useState(null);

  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const [currentOwner, setCurrentOwner] = useState('');

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const pushCategoriesToCloud = async (categories) => {
    // console.log('categories: ', categories);
  try {
    // const storage = await loadSettingsStorage(global.storageKey);

    for (var i = 0; i < categories.length; i++) {
      // /* Create New Category */
      const category = new Category(
        categories[i].id, // id
        categories[i].name, // name
        categories[i].color, // color
        categories[i].type, // type
        currentOwner, // owner
        categories[i].version, // version
      );
      console.log('category: ', category);
      // saveCategory(category);
      updateCategory(category);
    }
  } catch (e) {
    // statements
    console.log('Error pushing categories to cloud:', e);
  }
};

  function retrieveAuthenication() {
    Auth.currentAuthenticatedUser()
    .then(async (cognito) => {
      const storage = await loadSettingsStorage(global.storageKey);
      
      setCurrentOwner(cognito.attributes.sub);

      // setCategories(storage.categories);

      // setCurrentTransactions(storage.transactions);

      // setCurrentSettingsVersion(storage.version);

      setIsUserLoggedIn(true); // cognito (logged in)
    })
    .catch(async (auth_error) => {
        const userObject = await loadSettingsStorage(global.storageKey); // load user object
   
        setCurrentOwner(userObject.user.id);

        // setCurrentTransactions(userObject.transactions);

        // // setCurrentSettingsVersion(userObject.version);

        setIsUserLoggedIn(false); //  local (not logged in)

        // showMessage({
        //   message: `You are ${auth_error}`,
        //   type: 'danger', // "success", "info", "warning", "danger"
        //   icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type) // description: "My message description",
        // });  
    });
  }

  // static methods
  CustomizeCategoriesScreen.resetCategories = async () => {
    
    const storageObj = await loadSettingsStorage(storageKey);

    setCurrentOwner(global.storageKey)

    storageObj.categories = defaultCategories;



      let isConnected = await isDeviceOnline();

      //   get  owner
      await retrieveAuthenication();

      if (isConnected && isUserLoggedIn) pushCategoriesToCloud(storageObj.categories);

    try {
      saveSettingsStorage(global.storageKey, storageObj);

      setData(storageObj.categories);

      setHelpMessage('Reset Categories');








      
    } catch(e) {
      // statements
      console.log(e);
    }


  };

  //methods
  // const removeCategoryByName = async (name) => {
  //   // setIsAddingCategory(true);
  //   // setIsLoading(true);
  //   const storage = await loadSettingsStorage(storageKey);

  //   const obj = searchByName(name, storage.categories);

  //   let i = 0;
  //   for (i; i < storage.categories.length; i += 1) {
  //     if (storage.categories[i] === obj) {
  //       storage.categories.splice(i, 1);
  //     }
  //   }
  //   saveSettingsStorage(storageKey, storage);
  //   setData(storage.categories);
  //   // setIsLoading(false);

  //   setHelpMessage('Removed category');

  //   setIsAddingCategory(false);
  // };

  const removeCategoryByID = async (id) => {
    // setIsAddingCategory(true);
    // setIsLoading(true);
    const storage = await loadSettingsStorage(storageKey);

    const obj = searchByID(id, storage.categories);

    let categories = storage.categories;

    /* splice original category */
    let i = 0;
    for (i; i < categories.length; i += 1) {
      if (categories[i].id === obj.id) {
        categories.splice(i, 1);
      }
    }
    storage.categories = categories;

    saveSettingsStorage(storageKey, storage);

    setData(storage.categories);

    setHelpMessage('Removed category');

    // setIsAddingCategory(false);

    // navigate back to home

    // setIsLoading(false);
  };

  const deleteCategoryByID = async (item) => {
    console.log('item to remove: ', item);
    const storage = await loadSettingsStorage(storageKey);

    const category = searchByID(item.id, storage.categories);

    console.log('item: ', item);

    console.log('storage.categories.length: ', storage.categories.length);

    let i = 0;
    for (i; i < storage.categories.length; i += 1) {
      if (storage.categories[i] === category) {
        storage.categories.splice(i, 1);
      }
    }

    console.log('storage.categories.length: ', storage.categories.length);

    let isConnected = await isDeviceOnline();
    if (isConnected === true) {
      try {
      removeCategory(category);
      } catch(e) {
        // statements
        console.log(e);
      }
    }
    

    saveSettingsStorage(storageKey, storage);

    setData(storage.categories);

    // Alert.alert('Category Successfully Deleted!');
  }

  function retrieveAuthenication() {
    Auth.currentAuthenticatedUser()
    .then(async (cognito) => {
      const storage = await loadSettingsStorage(global.storageKey);
      
      setCurrentOwner(storage.user.id);

      // setCategories(storage.categories);

      // setCurrentTransactions(storage.transactions);

      // setCurrentSettingsVersion(storage.version);

      setIsUserLoggedIn(true); // cognito (logged in)
    })
    .catch(async (auth_error) => {
        const userObject = await loadSettingsStorage(global.storageKey); // load user object
   
        setCurrentOwner(userObject.user.id);

        // setCurrentTransactions(userObject.transactions);

        // setCurrentSettingsVersion(userObject.version);

        // setIsUserLoggedIn(false); //  local (not logged in)

        // showMessage({
        //   message: `You are ${auth_error}`,
        //   type: 'danger', // "success", "info", "warning", "danger"
        //   icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type) // description: "My message description",
        // });  
    });
  }


  const addCategory = async (name, color, type) => {
    setIsAddingCategory(true);
    // const list = await loadUserCategories();
    const userObject = await loadSettingsStorage(storageKey);
    // console.log(userObject.user.categories);

    const list = userObject.categories;
    // console.log(list)
    // console.log(list.length);

    let obj = searchByName(name, list);

    if (obj) {
      if (obj.type === type) {
        Alert.alert('Category already exists');
      } else {
        // create same name obj of diff type
        obj = new Category(uuidv4(), name, color, type);

        list.unshift(obj);

        userObject.categories = list;

        // console.log(userObject)

        // await saveUserObject(userObject);
        saveSettingsStorage(storageKey, userObject);

        setData(list);

        setHelpMessage('Added category');
      }
    }

    if (!obj) {
      // create new category
      obj = new Category(uuidv4(), name, color, type, currentOwner, 0);
      if (obj.type === 'INCOME') {
        obj.color = colors.shamrockGreen;
      }

      saveCategory(obj);

      list.unshift(obj);

      userObject.categories = list;

      

      // console.log(userObject)

      // await saveUserObject(userObject);
      saveSettingsStorage(storageKey, userObject);

      setData(list);
    }
    setIsAddingCategory(false);
 
    return obj;
  };

  // async function updateCategoryByName(name) {
  //   const userObject = await loadSettingsStorage(storageKey);

  //   const list = userObject.categories;
  //   // console.log(list)
  //   let obj = await searchByName(name, list);

  //   // console.log(list.length);

  //   // var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  //   for( var i = 0; i < list.length; i++){
  //      if ( list[i] === obj) {
  //        list[i] = obj;
  //      }
  //   }

  //   // console.log(list.length);

  //   // console.log(obj);
  //   // setIsLoading(false);
  //   return obj;
  // }

  // const promptUserForCategoryType = async () => {
  //   const selection = await new Promise((resolve) => {
  //   const title = 'Choose a type';
  //   const message = 'Please make your selection.';
  //   const buttons = [
  //       { text: 'Cancel', type: 'cancel' },
  //       { text: 'Income', onPress: () => {
  //         setTypeInputValue('income');
  //       }},
  //       { text: 'Expense', onPress: () => {
  //         setTypeInputValue('expense');
  //       }
  //     }
  //   ];
  //       Alert.alert(title, message, buttons);
  //   })

  //   if (selection) {
  //       setTypeInputValue(selection);
  //   }
  // };

  const promptUserForCategoryName = async () => {
    await Alert.prompt('Add New Category', 'Enter a name for your new category', (name) => addCategory(name, colors.white, 'expense'));
  };


  const storeUserCategories = async (list) => {
    let success = false;
    const storage = await loadSettingsStorage(storageKey);

    storage.categories = list;

    try {
      saveSettingsStorage(storageKey, storage);
      success = true;
    } catch (e) {
      // statements
      // console.log(e);
    }
    return success;
  };

  const updateUserTransactionCategories = async (list) => {
    let success = false;
    const storage = await loadSettingsStorage(storageKey);

    const transactions = storage.transactions;
    // console.log('Transactions found:', transactions.length);

    try {
      transactions.forEach( function(element, index) {
        var foundCategory = (searchByName(element.category.name, list))
        if (foundCategory) {
          // console.log('Found:', foundCategory);
          // change out category
          const category = new Category(foundCategory.id, foundCategory.name, foundCategory.color, foundCategory.type);
          // category.id = foundCategory.id;
          // element.category = searchByID(foundCategory.id, list);
          element.category = category; // searchByID(foundCategory.id, data);
          success = true;
        }
      });
    } catch(e) {
      // statements
      console.log('Could not update transaction', e);
    }

    if (success) {
      saveSettingsStorage(storageKey, storage);
    }
    // storage.categories = list;

    // saveSettingsStorage(storageKey, storage);
    // setIsLoading(false);
  };


  const retrieveStoredCategories = async () => {
    const storage = await loadSettingsStorage(storageKey);
    // console.log(storage)
    try {
      setData(storage.categories);
    } catch(e) {
      // statements
      console.log('e: ', e);
    }
  };

  const deleteBtnPressed = async (item) => {
    try {
      await deleteCategoryByID(item);


    } catch(e) {
      // statements
      console.log('e: ', e);
    }
    // await removeCategoryByName(item.name);
  };

  function renderSeparator(item) {
    // let view = <View />;
    // console.log(item.leadingItem.key);
    // if (item.leadingItem.key !== '' && item.leadingItem.key !== 'Passcode' && item.leadingItem.key !== 'Change Password') {
    const view = (
        <View
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
      );
    // }

    if (data) {
      return view;
    }
    
  }

  function renderItem({ item }) {
    const rowHeight = 45;
    const backgroundColor = colors.dark;
    // const isDisabled = false;
    // let caret = '>';


    // console.log(item);
    const view = (
      <CellItem
        style={
          {
            // alignItems: 'center',
            // justifyContent: 'center',
            // width: '100%',
            // // width: 370,
            // // height: 46,
            // backgroundColor, // colors.dark,

            // // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'dotted',
          }
        }
        // disabled={isDisabled}

        onPress={() => onPress(item)}

        id={item.id}
        name={item.name}
        // selected={!!selected.get(item.id)}
        onSelect={() => onSelect(searchByID(item.id, data))}

        color={item.color}

        addCategory={addCategory}
      />
    );
    return view;
  }

  function renderHiddenItem({ item }) {
    const hidden = (
      <View style={styles.rowBack}>

        <View style={styles.rowBackLeft}>
          <SwipeEdit
            keyExtractor={item.id}
            onPress={() => {
              setCurrentCategory(searchByID(item.id, data));
              setShouldShowColorBox(true);
              // console.log('Edited', item);
            }}
          />
        </View>
        <View style={styles.rowBackRight}>
          <SwipeDelete
            keyExtractor={item.id}
            onDeleteBtnPress={() => deleteBtnPressed(item)}
          />
        </View>
      </View>
    );
    return hidden;
  }

  // function onSelect(category) {
  //   // Alert.alert('Purchase category color change');
  //   setCurrentCategory(category);
  //   setShouldShowColorBox(true);
  // }

  // const onSelect = useCallback(
  //   (id) => {
  //     const newSelected = new Map(selected);
  //     newSelected.set(id, !selected.get(id));

  //     setSelected(newSelected);
  //   }, [selected]);

  // useEffect(() => {
  //   console.log(selected);
  //   return () => {
  //     // effect
  //   };
  // }, [selected]);

  async function clearState() {
    setIsReady(false);
    // setTypeInputValue(null);
    // setNameInputValue(null);
    setShowDialogBox(false);

    setCurrentCategory(null);

    setIsAddingCategory(false);

    // retrieveStoredCategories();

    // retrieveStoredCategories();
    // retrieveCognitoUserKey();
    // console.log('Cleared state');

    setIsReady(true);
  }

  // useEffect(() => {
  //   if (storageKey) {
  //     retrieveStoredCategories();
  //   }
  //   // return () => {
  //   //   // effect
  //   // };
  // }, [storageKey]);

  // useEffect(() => {
  //   clearState();
  //   return () => {
  //     // effect
  //   };
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     setData(user.categories);
  //   }
  //   // return () => {
  //   //   // effect
  //   // };
  // }, [user]);

  // useEffect(() => {
  //   return () => {
  //     // effect
  //     updateUserTransactionCategories();
  //     console.log('Updated Categori')
  //   };
  // }, [])

  useEffect(() => {
    // console.log('Data changed.. saved data');
    if (data) {
      const success = storeUserCategories(data.filter((item) => { return item.name }))
      if (success) {
        updateUserTransactionCategories(data);
        // console.log('Updated Transaction Categories');
      }
    }
    else if (data && data.length < 1) {
      setHelpMessage('No categories available.');
    }
    return () => {
      // effect
      // setHelpMessage('Swipe left or right to edit');

      // setHelpMessage('Swipe Left to Edit or Right Delete');
      
      // setIsLoading(false);



    };
  }, [data]);

  useEffect(() => {
    clearState();
    retrieveStoredCategories();
    return () => {
      // effect
      setIsReady(true);
    };
  }, [])

  // useEffect(() => {
  //   if (typeInputValue && !nameInputValue) {
  //     promptUserForCategoryName();
  //   } else if (nameInputValue && typeInputValue) {
  //     addCategory(nameInputValue, colors.white, typeInputValue);
  //     clearState();
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [typeInputValue, nameInputValue]);

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

  // if {
  //     view = (
  //      <AppLoading
  //       startAsync={retrieveStoredCategories}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //     );
  //   }

  // const dialogBox = (
  //   <View>
  //     <Dialog.Container visible={true}>
  //       <Dialog.Title>Account delete</Dialog.Title>
  //       <Dialog.Description>
  //         Do you want to delete this account? You cannot undo this action.
  //       </Dialog.Description>
  //       <Dialog.Button label="Cancel" />
  //       <Dialog.Button label="Delete" />
  //     </Dialog.Container>
  //   </View>
  // );

  const cancelBtnPressed = () => {
    setShowDialogBox(false);
  };

  // const blurComponentIOS = 
  //   <BlurView
  //     style={StyleSheet.absoluteFill}
  //     blurType="xlight"
  //     blurAmount={50}
  //   />
  

  const dialogBox = (
    <View>
      <Dialog.Container
        // blurComponentIOS={blurComponentIOS}
        headerStyle={{
          // backgroundColor: 'pink',
          backgroundColor: colors.dark,
        }}
        contentStyle={{
          backgroundColor: colors.dark,
        }}
        footerStyle={
          {
            backgroundColor: colors.dark,
          }
        }

        visible={shouldShowDialog}>
        <Dialog.Title style={
         [
           styles.textStyle,
           {
             fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
             fontWeight: '600',
             fontSize: 17,
           }
         ]
        }>Choose a name</Dialog.Title>
        <Dialog.Description style={{
            color: colors.darkTwo,

            // width: 153,
            // height: 36,
            fontFamily: 'SFProDisplay-Regular',
            fontSize: 15,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0.1,
            // color: "#ffffff"
          }}>
          A new expense will be created
        </Dialog.Description>
        <Dialog.Input
          style={{
            marginBottom: 20,
            textAlign: 'center',
            borderWidth: 1,
            borderColor: colors.white, // colors.dark,
            borderStyle: 'solid',
            borderRadius: 19,

          }}
          onChangeText={(text) => setNameInputValue(text)}
          maxLength={MAX_NAME_LENGTH}
          autoCorrect
        />
        <Dialog.Button
          style={styles.buttonText}
          onPress={cancelBtnPressed}
          label="Cancel"
        />
        <Dialog.Button
          style={styles.buttonText}
          onPress={() => {
            if (nameInputValue) {
              addCategory(nameInputValue, colors.white, 'expense');
            }
            setShowDialogBox(false);
          }}
          label="Ok"
        />
      </Dialog.Container>
    </View>
  );

  // console.log(colors);

  // const COLORS_DATA = [
  //   { key: 'azure' },
  //   { key: 'brightOrange' },
  //   // { key: 'dark' },
  //   // { key: 'darkGreyBlue' },
  //   // { key: 'darkTwo' },
  //   { key: 'heliotrope' },
  //   // { key: 'offWhite' },
  //   { key: 'pinkRed' },
  //   { key: 'shamrockGreen' },
  //   { key: 'tangerine' },
  //   { key: 'white' },
  // ];



  function capitalizeFLetter(string) {
    return string.replace(/^./, string[0].toUpperCase()); 
  }

  // function getWords(str) {
  //   // var str = 'MaEfSdsfSsdfsAdfssdGsdfEsdf';
  //   var newmsg = str.replace(/[a-z]/g, '');
  //   var old = str.replace(/[A-Z]/g, '');

  //   let arr = str.split(newmsg, 1);

  //   return arr[0]
  // }

  function getFlatListDataFromObject(obj) {
    // console.log(obj);
    const data = [];
    let keys = Object.keys(obj);
    let values = Object.values(obj)
    // console.log(Object.values(obj));
    // console.log(Object.keys(obj));
    // body...
    keys.forEach( function(key, index) {
      // statements
      let item = {
        'key': key,
        'value': values[index],
      }
      // console.log('id', index, key, values[index]);
      data.push(item);
    });
    return data;
  }

  // console.log(getFlatListDataFromObject(colors));


  function Item({ item, onPress }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        // style={styles.buttonStyle}
        style={[,
          styles.buttonStyle,
          {
          // alignItems: 'center',
          // justifyContent: 'center',

          marginHorizontal: 14,
          marginVertical: 5,

          // borderRadius: 17,
          borderWidth: 1,
          borderStyle: 'solid',

          borderColor: colors[item.key],

        }]}
      >
        <Text style={[styles.listItemTitleStyle, {
          color: colors[item.key]
        }]}>{
          capitalizeFLetter(item.key)
        }</Text>
      </TouchableOpacity>
    );
  }

  const updateCategoryColor = async (name, color) => {
    let success = false;

    for (var i = 0; i < data.length; i++) {
      if (data[i] === currentCategory) {
        data[i].color = color;

        updateCategory(data[i])
        success = true;
      }
    }

    if (success) {
      await storeUserCategories(data);
      updateUserTransactionCategories(data);
      setHelpMessage('Updated transactions');


    };

    // if (success) updateUserTransactionCategories(data);



    setShouldShowColorBox(false);
    // setIsLoading(false);
  }

  const colorBox = (
    <View style={[styles.container, {
      paddingTop: 12,
      // backgroundColor: 'pink',
    }]}
    >
      
      <FlatList
        data={getFlatListDataFromObject(colors)}
        renderItem={({ item }) => <Item item={item} onPress={() => updateCategoryColor(item.key, colors[item.key])} />}
        keyExtractor={(item) => item.key}
      />


{/*        <Dialog.Button label="Cancel" onPress={() => {
          setShouldShowColorBox(false);
        }} />
        <Dialog.Button label="Ok" onPress={() => {
          console.log('Select Pressed');
          setShouldShowColorBox(false);
        }} />
      </Dialog.Container>*/}
    </View>
  );

  let view = (
    <SafeAreaView style={styles.container}>
      <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        onWillFocus={clearState} // {(payload) => clearState()}
        // other props
        // onDidFocus={payload => console.log('did focus',payload)}
        // onWillBlur={payload => console.log('will blur',payload)}
        // onDidBlur={payload => console.log('did blur',payload)}
      />
      <View style={{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',

        // width: '100%',
        // height: '100%',

        marginVertical: '4%',

        // position: 'absolute',

      }} >
      <View style={{
        flex: 1,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }}>
      <SwipeListView

        // style={styles.table}
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

        leftOpenValue={75}
        rightOpenValue={-75}
      />
      </View>

      {/* <Button title="Add New" onPress={() => addCategory('')} /> */}
      <View
        style={
          {
            // flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',


            // marginVertical: '2%',
            // paddingBottom: 14,

            // padding: 14,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
            // backgroundColor: 'transparent',
          }
        }
      >
        <View style={{
          height: 10,
          width: '100%',
          margin: 2,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }} />

        <HelpMessage message={helpMessage} />

        <View style={{
          height: 10,
          width: '100%',
          margin: 2,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }} />
        <BlueButton
          title="Add New"
          onPress={() => {
            Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
          }}
        />

                <View style={{
          height: 10,
          width: '100%',
          margin: 2,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }} />
      </View>
      </View>
      {
        isAddingCategory &&
        // true &&
        <ActivityIndicator color={colors.offWhite} size="small" />
      }
    </SafeAreaView>
  );

  if (shouldShowDialog) {
    return dialogBox;
  }

  if (shouldShowColorBox) {
    return colorBox;
  }

  if (!isReady) {
    view = <View style={
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: colors.dark,

      }
    }><ActivityIndicator /></View>
  }

  // const appLoading = (
  //   <View
  //     style={
  //       {
  //         flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.darkTwo
  //       }
  //     }
  //   >
     
  //     <AppLoading
  //       startAsync={clearState}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   </View>
  // );

  // if (isLoading) {
  //   return appLoading;
  // }

  return view;
};

// // static methods
// CustomizeCategoriesScreen.resetCategories = async () => {
//   const storageObj = await loadSettingsStorage(storageKey);
//   storageObj.categories = defaultCategories;
//   // console.log(storageObj.categories.length);
//   saveSettingsStorage(storageKey, storageObj);

//   setData(storageObject.categories);

//   // navigation.goBack();
//   // promptUserForCategoryReset();
// };


CustomizeCategoriesScreen.navigationOptions = ({ navigation }) => {
  // const [categories, setCategories] = useState(null);

  // const [storageKey, setStorageKey] = useState(null);

  // let categories = null;

  // let key = retrieveCognitoUserKey();



  // async function retrieveCognitoUserKey() {
  //   Auth.currentAuthenticatedUser()
  //     .then((cognito) => {
  //       // setUserToken(user.signInUserSession.accessToken.jwtToken);
  //       // console.log('username:', cognitoUser.username);
  //       // setStorageKey(cognito.username);

  //       // setEmail(cognito.attributes.email);
  //       key = cognito.username;
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       Alert.alert(err);
  //     });
  // }

  const promptUserForCategoryReset = async () => {
    await new Promise(() => {
      const title = 'Are You Sure?';
      const message = 'This cannot be undone.';
      const buttons = [
        { text: 'Cancel', type: 'cancel' },
        {
          text: 'Reset All of My Categories',
          onPress: () => {
            CustomizeCategoriesScreen.resetCategories(storageKey);
          }
        }
      ];
      Alert.alert(title, message, buttons);
    });
  };

  const navbar = {
    // headerTransparent: {},
    headerStyle: {
      backgroundColor: colors.dark,
    },
    headerTintColor: colors.white,

    headerRight: (<View style={{
      marginRight: 10,
    }}>
    <TouchableText title="Reset" onPress={promptUserForCategoryReset} /></View>),
    // resetCategories: () => {
    //   CustomizeCategoriesScreen.resetCategories(storageKey);
    // },
  };
  return navbar;
};

// CustomizeCategoriesScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

// CellItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string,
//   selected: PropTypes.bool.isRequired,
//   onSelect: PropTypes.func.isRequired,
// };

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
