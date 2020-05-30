import React, { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';

import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';

import { AppLoading } from 'expo';

import {
  // StyleSheet,
  View,
  // ScrollView,
  // Button,
  // TouchableOpacity,
  // Text,
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

import { Container, Header, Content, Text, ListItem, CheckBox, Body, Right } from 'native-base';

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

/* my custom queries */
import {
  updateTransaction,
  // removeTransaction,
  // removePayee,
  removeCategory,
  // savePayee,
  saveCategory,
  // saveTransaction,
  updateCategory,
  getCategoryByID,
  // fetchStoredTransactions,
  // fetchStoredCategories,
  // getTransactionByID,
} from '../storage/my_queries';

import { crayola, getCrayolaColors } from '../data/crayola';

const MAX_NAME_LENGTH = 15;

const getAuthentication = async () => {
  let bool = false;
  await Auth.currentAuthenticatedUser()
    .then((cognito) => {
      // console.log('cognito: ', cognito);
      bool = (cognito) ? true : false;
    }).catch((err) => {
      console.log('err: ', err);
    })
  return bool
};


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

function searchByID(key, myArray) {
  let obj = null;
  let i = 0;
  for (i; i < myArray.length; i += 1) {
    if (myArray[i].id === key) {
      obj = myArray[i];
    }
  }
  return obj;
}

const pushAllCategoriesToCloud = async () => {
  Auth.currentAuthenticatedUser().then(async (user) => {
     try {
    const storage = await loadSettingsStorage(global.storageKey);
    // console.log('local_transactions: ', local_transactions);

   for (var i = 0; i < storage.categories.length; i++) {

    // removeCategory(storage.categories[i])

      // /* Create New Category */
      const category = new Category(
        storage.categories[i].id, // id
        storage.categories[i].name, // name
        storage.categories[i].color, // color
        storage.categories[i].type, // type
        storage.categories[i].owner, // owner
        storage.categories[i].version + 1, // version
      );

    updateCategory(category);

    // saveCategory(categories)
      // console.log('storage.categories[i]: ', storage.categories[i]);
   }

  } catch(e) {
    // statements
    console.log(e);
  }
  }).catch((err) => console.log('err: ', err))

}


function CellItem({
  id,
  name,
  selected,
  onSelect,
  color,
  addCategory,
  authenticated,
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

// static methods
  

export default function CustomizeCategoriesScreen() {
  const [selected, setSelected] = useState(new Map());

  const [isReady, setIsReady] = useState(true);

  // const [storageKey, setStorageKey] = useState(null);

  const [data, setData] = useState([]);

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

  const [authenticated, setAuthenticated] = useState(false);

  const [flatlistData, setFlatlistData] = useState(getFlatListDataFromObject(colors));

  const [dialogVisible, setDialogVisible] = useState(false)

  const resetDialog = <Dialog.Container visible={dialogVisible}>
          <Dialog.Title>Categories reset</Dialog.Title>
          <Dialog.Description>
            Do you want to delete these categories? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
          <Dialog.Button label="Delete" onPress={() => {
            resetCategories()
            setDialogVisible(false)
          }
        } />
        </Dialog.Container>

  CustomizeCategoriesScreen.showDialog = () => {
    // retrieveStoredCategories()
    // alert('message?: DOMString')
    setDialogVisible(true)
  }

  const compareLists = async (a, b) => {
  // load online transactions
  // let online_transactions = await retrieveOnlineTransactions();
  // console.log('online_transactions.length: ', online_transactions.length);

  // load local transactions
  // let local_transactions = await retrieveLocalTransactions();
  // console.log('local_transactions.length: ', local_transactions.length);

  // let storage = await loadSettingsStorage(global.storageKey);
  // local_transactions = storage.transactions;
  // console.log('local_transactions.length: ', local_transactions.length);

  const props = ['name', 'version'];

  const result = a.filter((o1) => {
      // filter out (!) items in online_transactions
      return b.some((o2) => {
        return (o1.name === o2.name);
      });
  }).map(function(o){
      // objects with only the required properties
      // and map to apply this to the filtered array as a whole
      return props.reduce((newo) => {
          newo = o;
          return newo;
      }, {});
  });
  
  // console.log('compareListTransactions(local, online) => result: ', result);
  console.log('result: ', result);
  return result;
}

  const resetCategories = async () => {
    // console.log('data: ', data);
    // console.log(key);
    // let success = false;
    // setIsReady(false)
    const storageObj = await loadSettingsStorage(storageKey);

    // for (var i = storageObj.categories.length - 1; i >= 0; i--) {
    //   await deleteCategoryByID(storageObj.categories[i])
    // }

    storageObj.categories = defaultCategories

    // storageObj.categories.forEach( function(element, index) {
    //   // statements

    // //   let og = searchByName(element.name, defaultCategories)

    // //   if (og) {
    // //     element = og
    // //     element.owner = global.storageKey
    // //     updateCategory(element)
    // //   } else {
    // //     deleteCategoryByID
    // //   }
    // //   // if (og) {
    // //   //   console.log('og: ', og);
    // //   //   element = og
    // //   //   element.owner = global.storageKey
    // //   // } else {
    // //   //   deleteCategoryByID(element)
    // //   // }
    // });

    

    // compareLists(data, storageObj.categories)

    // for (var i = storageObj.categories.length - 1; i >= 0; i--) {

      
      

    //   // if (storageObj.categories[i]) {
    //   //   // new custom category found
    //   //   removeCategoryByName(storageObj.categories[i].name)
    //   //   console.log('storageObj.categories[i]: ', storageObj.categories[i]);
    //   // }

    //   let existing = searchByName(storageObj.categories[i].name, defaultCategories)

    //   if (existing) {
    //     storageObj.categories[i].type = existing.type
    //     storageObj.categories[i].color = existing.color
    //     storageObj.categories[i].owner = global.storageKey
    //     storageObj.categories[i].version = existing.version

    //     alert(storageObj.categories[i].name)
    //     console.log('storageObj.categories[i]: ', storageObj.categories[i]);
    //     console.log('existing: ', existing);

    //     return
        
    //     // storageObj.categories[i].type = existing.type
    //     // storageObj.categories[i].color = existing.color
    //     // storageObj.categories[i].owner = global.storageKey
    //     // storageObj.categories[i].version = existing.version

        
    //   }

    //   // if (existing) {
    //   //   // category is updated from orginal default categories
    //   //   // keep id, owner, version
    //   //   // set name, color, type, to default values

    //   //   let updated = {
    //   //     id: existing.id,
    //   //     name: existing.name,
    //   //     color: searchByName(existing.name, defaultCategories).color,
    //   //     type: searchByName(existing.name, defaultCategories).type,
    //   //     owner: global.storageKey,
    //   //     version: existing.version + 1
    //   //   }

    //   //   // console.log('updated: ', updated);

    //   //   // updateCategory(updated)

    //   //   storageObj.categories[i] = updated
    //   // }

      


        

    // }

    
  if (global.storageKey) {
    for (var i = defaultCategories.length - 1; i >= 0; i--) {
      defaultCategories[i].owner = global.storageKey
    }
  }

    saveSettingsStorage(global.storageKey, storageObj);

    setData(defaultCategories);

    pushAllCategoriesToCloud()

    setIsReady(true)
  };

  // CustomizeCategoriesScreen.reloadCategories = () => {
  //   // alert('message?: DOMString');
  //   resetCategories();
  // };

  // export function movieLength() {
  //   return this.state.movies.length;
  // }

  

  // // fetch aws method
  // async function retrieveCognitoUserKey() {
  //   Auth.currentAuthenticatedUser()
  //     .then((cognito) => {
  //       setStorageKey(cognito.username);
  //     })
  //     .catch((err) => {
  //       // console.log(err);
  //       Alert.alert(err);
  //     });
  // }

  // private methods
  const removeCategoryByName = async (name) => {
    setIsAddingCategory(true);
    // setIsLoading(true);
    const storage = await loadSettingsStorage(storageKey);

    const obj = searchByName(name, storage.categories);

    removeCategory(obj);

    let i = 0;
    for (i; i < storage.categories.length; i += 1) {
      if (storage.categories[i] === obj) {
        storage.categories.splice(i, 1);
      }
    }
    saveSettingsStorage(global.storageKey, storage);
    setData(storage.categories);
    // setIsLoading(false);



    setHelpMessage('Removed category');

    setIsAddingCategory(false);
  };

  const deleteCategoryByID = async (item) => {
    const storage = await loadSettingsStorage(storageKey);

    const category = searchByID(item.id, storage.categories);

    // console.log('item: ', item);

    // console.log('storage.categories.length: ', storage.categories.length);

    let i = 0;
    for (i; i < storage.categories.length; i += 1) {
      if (storage.categories[i].id === category.id) {
        storage.categories.splice(i, 1);
      }
    }

    // console.log('storage.categories.length: ', storage.categories.length);

    await removeCategory(category)

    saveSettingsStorage(global.storageKey, storage);

    setData(storage.categories);

    pushAllCategoriesToCloud()

    // Alert.alert('Category Successfully Deleted!');
  }

  const addCategory = async (name, color, type, owner, version) => {
    setIsAddingCategory(true);
    // const list = await loadUserCategories();
    const userObject = await loadSettingsStorage(storageKey);
    // console.log(userObject.user.categories);

    const list = userObject.categories;
    // console.log(list)
    // console.log(list.length);

    let obj = searchByName(name, list);

    // console.log('category: ', {
    //   name: name,
    //   color: color,
    //   type: type,
    //   owner: global.storageKeym
    //   version: obj.version
    // });




    if (obj) {
      if (obj.type === type) {
        Alert.alert('Category already exists');
      } else {
        // create same name obj of diff type
        obj = new Category(uuidv4(), name, color, type, global.storageKey, 0);

        list.unshift(obj);

        userObject.categories = list;

        // console.log(userObject)

        // await saveUserObject(userObject);
        saveSettingsStorage(storageKey, userObject);

        setData(list);



        setHelpMessage('Added category');
      }

      Auth.currentAuthenticatedUser().then((cognito) => {
        saveCategory(obj)
      }).catch((errr)  => console.log('err: ', err))
    }



    if (!obj) {
      // create new category
      obj = new Category(uuidv4(), name, color, type, global.storageKey, 0);
      if ((obj.type).toLowerCase() === 'income') {
        obj.color = colors.shamrockGreen;
      }

      list.unshift(obj);

      userObject.categories = list;

      // console.log(userObject)

      // await saveUserObject(userObject);
      await saveSettingsStorage(storageKey, userObject);

      setData(list);

      
    }

    pushAllCategoriesToCloud()


    


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
    await Alert.prompt('Add New Category', 'Enter a name for your new category', (name) => addCategory(name, colors.white, 'EXPENSE', global.storageKey, 0));
  };


  const storeUserCategories = async (list) => {
    const storage = await loadSettingsStorage(storageKey);

    // console.log('data: ', data);

    storage.categories = list

    saveSettingsStorage(global.storageKey, storage);
  };

  const updateUserTransactionCategories = async (list) => {
    // let success = false;
    const storage = await loadSettingsStorage(storageKey);

    const transactions = storage.transactions;

    // update all of the user's transactions 'categories

    await transactions.forEach(async (element) => {
      var foundCategory = (searchByName(element.category.name, list))
          // id,
          // name,
          // color,
          // type,
          // owner,
          // version
      if (foundCategory) {
        // console.log('Found:', foundCategory);
        // change out category
        const category = new Category(
          foundCategory.id,
          foundCategory.name,
          foundCategory.color,
          foundCategory.type,
          foundCategory.owner,
          foundCategory.version,
          );
        // category.id = foundCategory.id;
        // element.category = searchByID(foundCategory.id, list);
        element.category = category; // searchByID(foundCategory.id, data);
        // success = true;

        

        /* try to update online transactions */
        Auth.currentAuthenticatedUser().then((cognito) => {
          updateTransaction(element)
        }).catch((err) => {
          // console.log('unauth user updating user transactions in CustomizeCategoriesScreen: ', err);
        })

        // console.log('onlineCategory: ', onlineCategory);
      }
    });
    
    storage.transactions = transactions

    saveSettingsStorage(storageKey, storage);

    // if (success) {
    //   saveSettingsStorage(storageKey, storage);
    // }
    // storage.categories = list;

    // saveSettingsStorage(storageKey, storage);
    // setIsLoading(false);
  };


  const retrieveStoredCategories = async () => {
    // setAuthenticated(await getAuthentication())
    await Auth.currentAuthenticatedUser().then((user) =>  {
      global.authenticated = true
    }).catch(() => {
      global.authenticated = false
    })
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
      deleteCategoryByID(item);
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
        authenticated={global.authenticated}

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
              setCurrentCategory(item);
              // alert(currentCategory)
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

    // setIsReady(true);
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

  // useEffect(() => {
  //   // console.log('Data changed.. saved data');
  //   if (data) {
  //     // const success = storeUserCategories(data.filter((item) => { return item.name }))
  //     // console.log('success: ', success);
  //     // if (true) {
  //       updateUserTransactionCategories(data);
  //       // console.log('Updated Transaction Categories');
  //     // }
  //   }
  //   // else if (data && data.length < 1) {
  //   //   setHelpMessage('No categories available.');
  //   // }
  //   return () => {
  //     // effect
  //     // setHelpMessage('Swipe left or right to edit');

  //     // setHelpMessage('Swipe Left to Edit or Right Delete');
      
  //     // setIsLoading(false);



  //   };
  // }, [data]);

  useEffect(() => {
    // clearState();

    // retrieveStoredCategories();

    setFlatlistData(getFlatListDataFromObject(colors).concat(getFlatListDataFromObject(getCrayolaColors())))

    
    return () => {
      // effect
      // clearState()
      // setIsReady(true);
    };
  }, [])

  //  useEffect(() => {
  //   // console.log(text);z
  //   // if (authenticated  === true) {
      
  //   // }

  //   return () => {
  //     // effect
  //   };
  // }, [authenticated]);

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
              addCategory(nameInputValue, colors.white, 'EXPENSE', global.storageKey, 0);
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


  function ColorTableCell({ item, onPress, name, color, opacity }) {
    // console.log('item: ', item);

    if (
      name.toLowerCase() === 'darkgreyblue' ||
      name.toLowerCase() === 'dark' ||
      name.toLowerCase() === 'offwhite' ||
      name.toLowerCase() === 'black' ||
      name.toLowerCase() === 'darktwo' ||
      name.toLowerCase() === 'white'
    ) {
      return null;
    }


    let title = capitalizeFLetter(name);
    title = title.split(' ')

    let suffix = ''
    if (title[1]) {
      // title = title[0] + ' ' + title[1]
      title[1] = capitalizeFLetter(title[1])
    }

    title = title[0] + ' ' + title[1]

    title = title.replace(' undefined', '');

    return (
      <ListItem
      style={{
        // alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',

        borderBottomWidth: 0,
        opacity: (Object.keys(colors).includes(name) || global.authenticated) ? 1.0 : 0.4
      }}>
        
        
           <TouchableOpacity
        onPress={onPress}
        disabled={(Object.keys(colors).includes(name) !== true && !global.authenticated)}
        // style={styles.buttonStyle}
        style={[
          // styles.buttonStyle,
          {
            flex: 1,
            minWidth: '100%',
            // flex: 1,
          flexDirection: 'row',
          // alignItems: 'center',
          // justifyContent: 'center',

          height: 50,

          paddingHorizontal: 8,
          // padding: 4,

          // borderRadius: 24,
          borderWidth: 1,
          borderStyle: 'solid',

          borderColor: item.value,

          // backgroundColor: 'transparent'
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',

        }]}
      >
       <Text style={[
          styles.listItemTitleStyle,
            {
            color: item.value,
            
          }
          ]}
        >
        {   
         title
        }
        <Text style={[
            styles.listItemTitleStyle,
            {
            color: colors.offWhite,
            textAlign: 'right',
            alignItems: 'flex-end',

          }]}>
            {
              ` ${color}`
            }
          </Text>
        </Text>
      </TouchableOpacity>
            
      </ListItem>
     

    );
  }

  const updateCategoryColor = async (selectedColor) => {
    // console.log('color: ', color);

    // alert(Object.keys(colors).includes(selectedColor.key.toLowerCase()))

    // console.log('currentCategory:',currentCategory)


    if (await getAuthentication() !== true && Object.keys(colors).includes(selectedColor.key.toLowerCase()) !== true) {
      setHelpMessage('Please sign up to access more colors')
    }

    // console.log('name: ', name);

    if (!currentCategory) return;

    setIsLoading(true)

    try {
      
      const storage = await loadSettingsStorage(storageKey);

      const obj = searchByID(currentCategory.id, storage.categories);

      obj.color = selectedColor.value

      saveSettingsStorage(global.storageKey, storage);

      setData(storage.categories);

      storeUserCategories(storage.categories);
      
      updateUserTransactionCategories(storage.categories);

      pushAllCategoriesToCloud()

      setIsLoading(false)
    } catch(e) {
      // statements
      console.log(e);
      setIsLoading(false)
    }

    

    // for (var i = 0; i < data.length; i++) {
    //   if (data[i].id === currentCategory.id) {
    //     // data[i].color = color;

       

        

        


        

        
        

    //     return
    //   }
    // }
    
   
    // setHelpMessage('Updated transactions');

    // if (success) updateUserTransactionCategories(data);
    setShouldShowColorBox(false);
  // }

  // console.log('colors.cat(crayola): ', colors.cat(crayola));
  // console.log('crayola: ', crayola);

 
  }






  

  // console.log('getFlatListDataFromObject(getCrayolaColors()): ', getFlatListDataFromObject(getCrayolaColors()));

  // console.log('getFlatListDataFromObject((colors)): ', getFlatListDataFromObject((colors)));
  // console.log('colors: ', colors);

  // console.log('getCrayolaColors(): ', getCrayolaColors());

  // let crayolaData = getCrayolaColors();

  // let flatlistData = getFlatListDataFromObject(crayolaData);

  

  const colorBox = (
    <SafeAreaView style={[
      styles.container,
      {
        paddingTop: 12,
      }
    ]}
    >
      
      <FlatList
        // data={getFlatListDataFromObject(colors)}
        // renderItem={({ item }) => <Item item={item} onPress={() => updateCategoryColor(item.key, colors[item.key])} />}
        // keyExtractor={(item) => item.key}

        // data={authenticated && getFlatListDataFromObject(crayolaData)  || getFlatListDataFromObject(colors)}
        data={flatlistData}
        renderItem={({ item }) => <ColorTableCell item={item} opacity={0.5} name={item.key} color={item.value} onPress={() => {
          updateCategoryColor(item)
        }} />}
        keyExtractor={(item) => item.key}
      />
      {
        isLoading && <View style={
          {
            flex: 1,
            position: 'absolute',
            left: 0,
            right:  0,
            // bottom: 50,
          }
        }>
        <ActivityIndicator size="large" />
        </View>
      }


{/*        <Dialog.Button label="Cancel" onPress={() => {
          setShouldShowColorBox(false);
        }} />
        <Dialog.Button label="Ok" onPress={() => {
          console.log('Select Pressed');
          setShouldShowColorBox(false);
        }} />
      </Dialog.Container>*/}
    </SafeAreaView>
  );

  let view = (
    <SafeAreaView style={styles.container}>
      <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        onWillFocus={retrieveStoredCategories} // {(payload) => clearState()}
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
          
          // height: 50,

          width:  screenWidth,

          alignItems: 'center',
          justifyContent: 'center',
          // width: '100%',
          // margin: 2,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}>

        <HelpMessage message={helpMessage} />
        </View>

                <View style={{
          // flexDirection: 'column',
          // height: 50,

          width:  screenWidth,

          alignItems: 'center',
          justifyContent: 'center',
          // width: '100%',
          // margin: 2,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }}>


        <BlueButton
          icon={(<AntDesign name="addfile" size={24} color={colors.white} />)}
          title="Add New"
          onPress={() => {
            Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
          }}
        />

        </View>

                <View style={{
          height: 10,
          width: '100%',
          margin: 2,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }} />
      </View>
      {
        !isReady && <View style={
      {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 500,
        bottom: 0,
        left: 0,
        right:  0,

        // backgroundColor: colors.dark,

      }
    }><ActivityIndicator /></View>
      }
      </View>
      {
        isAddingCategory &&
        // true &&
        <ActivityIndicator color={colors.offWhite} size="small" />
      }
      {
        resetDialog
      }
    </SafeAreaView>
  );

  if (shouldShowDialog) {
    return dialogBox;
  }

  if (shouldShowColorBox) {
    return colorBox;
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
    CustomizeCategoriesScreen.showDialog()
    // return  <Dialog.Container visible={dialogVisible}>
    //       <Dialog.Title>Account delete</Dialog.Title>
    //       <Dialog.Description>
    //         Do you want to delete this account? You cannot undo this action.
    //       </Dialog.Description>
    //       <Dialog.Button label="Cancel" onPress={this.handleCancel} />
    //       <Dialog.Button label="Delete" onPress={this.handleDelete} />
    //     </Dialog.Container>


    // await new Promise(() => {
    //   const title = 'Are You Sure?';
    //   const message = 'This cannot be undone.';
    //   const buttons = [
    //     { text: 'Cancel', type: 'cancel' },
    //     {
    //       text: 'Reset All of My Categories',
    //       onPress: CustomizeCategoriesScreen.reloadCategories

    
    //     }
    //   ];
    //   Alert.alert(title, message, buttons);

    // });


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
    <TouchableOpacity onPress={promptUserForCategoryReset}>
    <Text style={[
      styles.buttonText,
          {
          color: colors.pinkRed,
          // opacity: 0.5,
        }]}>Reset
        {/*<FontAwesome5 name="eraser" size={24} color={colors.pinkRed} />*/}
        </Text></TouchableOpacity></View>),
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


// export default CustomizeCategoriesScreen;

