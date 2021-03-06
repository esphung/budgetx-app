import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

import { showMessage } from 'react-native-flash-message';

import {
  // StyleSheet,
  View,
  ScrollView,
  // Button,
  // TouchableOpacity,
  Text,
  // TextInput,
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
  AsyncStorage,
} from 'react-native';

import {
  // Container,
  // Header,
  // Content,
  ListItem,
  // CheckBox,
  // Body,
  // Right
} from 'native-base';

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

import BlueButton from '../components/BlueButton';

// import TouchableText from '../../storybook/stories/TouchableText';

// import HelpMessage from '../../storybook/stories/HelpMessage';

import { isDeviceOnline } from '../../network-functions';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../storage/SettingsStorage';

// import CustomSwipeCell from '../components/CustomSwipeCell';

import ColorTableCell from '../components/table/ColorTableCell';

import SwipeDelete from '../components/SwipeDelete';

import SwipeEdit from '../components/SwipeEdit';

// import { Auth } from 'aws-amplify';

import Category from '../models/Category';

// import InfoBox from '../../storybook/stories/InfoBox';

// import ColorDialog from '../components/ColorDialog';

import CellItem from '../components/customizeCategories/CellItem';

import defaultCategories from '../data/categories';

import uuidv4 from '../functions/uuidv4';

import searchByID from '../functions/searchByID';

import searchByName from '../functions/searchByName';

/* my custom queries */
import {
  UpdateTransaction,
  // removeTransaction,
  DeleteTransaction,
  // removePayee,
  removeCategory,
  // savePayee,
  SaveCategory,
  // saveTransaction,
  UpdateCategory,
  // getCategoryByID,
  // fetchStoredTransactions,
  // fetchStoredCategories,
  // getTransactionByID,
  listAllOnlineCategories,
  // removeCategory,
} from '../storage/my_queries';

import { getCrayolaColors } from '../data/crayola';

const MAX_NAME_LENGTH = 15;

function posToNeg(num) {
  return -Math.abs(num);
}
function negToPos(num) {
  return Math.abs(num);
}

const getAuthentication = async () => {
  global.authenticated = false;
  Auth.currentAuthenticatedUser()
    .then(async () => {
      // console.log('user authenticated: ', cognito.attributes.sub);
      global.authenticated = true;
    }).catch(() => {
      // console.warn('error getting user authentication: ', err);
    });
  return global.authenticated;
};

const deleteAllOnlineCategories = async () => {
  // if (await isDeviceOnline() !== true) return;

  // alert(await isDeviceOnline() && getAuthentication() && JSON.parse(await AsyncStorage.getItem('someBoolean')))
  // Auth.currentAuthenticatedUser().then(async () => {
    try {
      const storage = await loadSettingsStorage(global.storageKey);

      let { categories } = storage;



      // categories.forEach((category) => {
      //   removeCategory(category);
      // });

      if (await isDeviceOnline() && getAuthentication() && JSON.parse(await AsyncStorage.getItem('someBoolean'))) {
        const onlineCategories = await listAllOnlineCategories();
        categories.forEach((item) => {
          removeCategory(item);
        });
      }
      // showMessage({
      //   message: 'All categories deleted',
      //   // duration: 550,
      //   position: 'bottom',
      //   color: colors.shamrockGreen, // "#606060", // text color
      //   // opacity: 0.5,
      //   textStyle: styles.textStyle,
      //   // icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
      // });

    } catch (e) {
      // statements
      console.log(e);
    }
  // });
  // .catch((err) => console.log('err: ', err));
};

const pushAllCategoriesToCloud = async () => {
  Auth.currentAuthenticatedUser()
    .then(async () => {
      try {
        const storage = await loadSettingsStorage(global.storageKey);

        const { categories } = storage;

        categories.forEach((category) => {
          UpdateCategory(category);
        });
      } catch (e) {
        // statements
        console.log(e);
      }
    });
};

function getFlatListDataFromObject(obj) {
  // console.log(obj);
  const data = [];
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  keys.forEach((key, index) => {
    const item = {
      key,
      value: values[index],
    };
    data.push(item);
  });
  return data;
}

// arbitrary size limits
const MAX_PILL_WIDTH = 176;
const MIN_PILL_WIDTH = 54;
const MAX_PILL_HEIGHT = 32;

const optionsPillStyle = {
  maxHeight: MAX_PILL_HEIGHT,
  minWidth:MIN_PILL_WIDTH,
  maxWidth: MAX_PILL_WIDTH,
  height: '60%', // 37,
  maxHeight: 50,

  alignItems: 'center',
  justifyContent: 'center',

  // marginHorizontal: 4,
  marginVertical: 10,

  borderRadius: 17,
  borderWidth: 1,
  marginHorizontal: 6,
};

export default function CustomizeCategoriesScreen() {
  const [selected, setSelected] = useState(new Map());

  const [isReady, setIsReady] = useState(false);

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [nameInputValue, setNameInputValue] = useState(null);

  const [shouldShowDialog, setShowDialogBox] = useState(false);

  const [shouldShowColorBox] = useState(true);

  const [currentCategory, setCurrentCategory] = useState(null);

  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const [flatlistData, setFlatlistData] = useState(getFlatListDataFromObject(colors));

  const [dialogVisible, setDialogVisible] = useState(false);

  const [showCreateCategoryButton, setShowCreateCategoryButton] = useState(true);

  const [currentType, setCurrentType] = useState('EXPENSE');

  const [currentColor, setCurrentColor] = useState(colors.offWhite);

  const resetCategories = async () => {
    deleteAllOnlineCategories()
    // .then(async () => {
      let list = defaultCategories();

      try {
        const storage = await loadSettingsStorage(global.storageKey);

        storage.categories = list;

        saveSettingsStorage(global.storageKey, storage);

        // setData(list);

        reloadCategories();
      } catch(e) {
        // statements
        console.log(e);
      }
    // })

  };
  const showCategoryEditing = () => {
    setShowCreateCategoryButton(false);
  };

  const hideCategoryEditing = () => {
    setShowCreateCategoryButton(true);
  };
  const onSelect = React.useCallback(
    (id) => {
      const newSelected = new Map(selected);

      newSelected.clear();

      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );
  const resetDialog = (
    <Dialog.Container visible={dialogVisible}>
      <Dialog.Title>Categories reset</Dialog.Title>
      <Dialog.Description>
        Do you want to delete these categories? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
      <Dialog.Button
        label="Delete"
        onPress={
          () => {
            setDialogVisible(false)
            resetCategories();
            
          }
        }
      />
    </Dialog.Container>
  );
  CustomizeCategoriesScreen.showDialog = () => {
    setDialogVisible(true);
  };
  const reloadCategories = async () => {
    // setIsLoading(true);
    try {
      const storage = await loadSettingsStorage(global.storageKey);
      const { categories } = storage;

      setData(categories);
    } catch(e) {
      // statements
      console.log(e);
    }
    // setIsLoading(false);
  };
  const deleteStoredCategory = async (item) => {
    // console.log('global.storageKey: ', global.storageKey);
    // const previous = item; // for user redo purposes
    const storage = await loadSettingsStorage(global.storageKey);

    const arr = storage.categories;

    // console.log('storage.categories.length: ', storage.categories.length);

    const found = arr.find((element) => element.id === item.id);

    const pos = arr.indexOf(found, arr);

    arr.splice(pos, 1);

    // let blankCategory = new Category();

    // UpdateCategory(blankCategory);

    if (await isDeviceOnline() && getAuthentication() && JSON.parse(await AsyncStorage.getItem('someBoolean'))) {
      removeCategory(found);
    }
    
    saveSettingsStorage(global.storageKey, storage);

    clearState().then(reloadCategories);
  };
  const addCategory = async (name, color, type) => {
    setIsAddingCategory(true);
    // const list = await loadUserCategories();
    const userObject = await loadSettingsStorage(global.storageKey);
    // console.log(userObject.user.categories);

    const list = userObject.categories;

    let obj = searchByName(name, list);
    if (obj) {
      if (obj.type === type) {
        // Alert.alert('Category already exists');
      } else {
        // create same name obj of diff type
        obj = new Category(uuidv4(), name, color, type, global.storageKey, 0);

        list.unshift(obj);

        userObject.categories = list;

        saveSettingsStorage(global.storageKey, userObject);

        setData(list);
      }

      await Auth.currentAuthenticatedUser().then(() => {
        SaveCategory(obj);
      });
    }
    if (!obj) {
      // create new category
      obj = new Category(uuidv4(), name, color, type, global.storageKey, 0);
      if ((obj.type).toLowerCase() === 'income') {
        obj.color = colors.shamrockGreen;
      }
      list.unshift(obj);

      userObject.categories = list;

      saveSettingsStorage(global.storageKey, userObject);

      setData(list);
    }
    setIsAddingCategory(false);

    clearState()

    return obj;
  };
  const promptUserForCategoryName = async () => {
    await Alert.prompt('Add New Category', 'Enter a name for your new category', (name) => addCategory(name, colors.white, 'EXPENSE'));
  };


  const storeUserCategories = async (list) => {
    const storage = await loadSettingsStorage(global.storageKey);

    storage.categories = list;

    saveSettingsStorage(global.storageKey, storage);
  };
  const updateUserTransactionCategories = async (list) => {
    // let success = false;
    const storage = await loadSettingsStorage(global.storageKey);

    // let { categories } = storage;

    // update all of the user's transactions 'categories
    storage.categories = list;

    // setData(list);

    storage.transactions.forEach(async (transaction) => {
      /* Upddate transaction category */
      let categoryFound = searchByID(transaction.category.id, list)
      // transaction.category = searchByID(transaction.category.id, list);

      if (!categoryFound) {
        categoryFound = searchByName(transaction.category.name, list)
      }

      transaction.category = categoryFound

      /* Update transaction type */
      transaction.type = transaction.category.type;

      /* Adjust inaccurate amounts to new category type */
      if (transaction.type === 'EXPENSE') {
        transaction.amount = posToNeg(transaction.amount)
      } else if (transaction.type === 'INCOME') {
        transaction.amount = negToPos(transaction.amount)
      }

      /* Sync new transaction and transaction's category to online */
      Auth.currentAuthenticatedUser().then(async (cognito) => {
        

        let online_categories = await listAllOnlineCategories();
        let found = searchByID(transaction.category.id, online_categories);
        if (found) {
          UpdateCategory(transaction.category);
        } else {
          found = searchByName(transaction.category.name, online_categories);
          transaction.category = found
          UpdateCategory(transaction.category);
        }

        UpdateTransaction(transaction);

      }).catch((err) => {
        console.log('error authenticating user for customized category update: ', err);
      })
    });
    saveSettingsStorage(storageKey, storage);
  };

  const filterCategories = (local, online) => {
  let items = local.concat(online);
  // let keys = ['id', 'name','version'];
  let list = [];
  for (var i in items) {
    var filter = {
      id: items[i].id,
      name: items[i].name,
      type: items[i].type,
    };
    var filteredById = items.filter((item) => {
     for (var key in filter) {
      if ((item['name'] !== filter['name']) || (item['type'] !== filter['type']))
        return false
     }
      return true;
    });

    // testing
    // find all with same id
    // if (filteredById) {
      // find highest version of same id

      // console.log(filteredById);
      // return item with highest value version
      let highestVersion = Math.max.apply(Math, 
        filteredById.map((o) => {
          return o.version
        }))

      let result = filteredById.filter(obj => {
        return obj.version === highestVersion
      })
    // console.log(result);
    list.push(result[0])
    // }
    
  } // end for loop
  // return list;

  let arr = list;

   const unique = arr
       .map((e) => {
         if (!e) {
          return
         }
         return e['id']
       })
  // store the keys of
  // the unique objects
  .map((e, i, final) => 
       {
  return final.indexOf(e) === i && i})
  
  // eliminate the dead keys
  // & store unique objects
  .filter(e => {
    return arr[e]
  })
  .map(e => arr[e]);

  return unique;
};
  const retrieveStoredCategories = async () => {

    const storage = await loadSettingsStorage(global.storageKey);
    // setAuthenticated(await getAuthentication())
    await Auth.currentAuthenticatedUser().then(async (user) =>  {
      setIsLoading(true)
      global.authenticated = true;
      if (await isDeviceOnline() && JSON.parse(await AsyncStorage.getItem('someBoolean'))) {
        let online_categories = await listAllOnlineCategories()
        // storage.categories = list;

        let local_categories = storage.categories;

        let merged = filterCategories(local_categories, online_categories)

        setData(merged);

        storage.categories = merged


      } else {
        setData(storage.categories);
      }

      saveSettingsStorage(global.storageKey, storage)

      setIsLoading(false)
    }).catch(async () => {
      global.authenticated = false;

      let local_categories = storage.categories;

      // let merged = filterCategories(local_categories, online_categories)

      setData(local_categories);

      

      // saveSettingsStorage(global.storageKey, storage)
    })
    // clearState()
    
  };
  const deleteBtnPressed = async () => {
    deleteStoredCategory(currentCategory)
    
    
    // await removeCategoryByName(item.name);
  };

  function renderSeparator(item) {
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
    if (data) {
      return view;
    }
  }
  function renderItem({ item }) {
    // console.log(item);
    const view = (
      <CellItem
        authenticated={global.authenticated}
        // onPress={() => onPress(item)}

        id={item.id}
        name={item.name}
        selected={!!selected.get(item.id)}
        onSelect={onSelect}

        currentCategory={currentCategory}
        color={item.color}

        addCategory={addCategory}

        data={data}

        setCurrentCategory={setCurrentCategory}
      />
    );
    return view;
  }
  function renderHiddenItem({ item }) {
    const hidden = (
      <View style={styles.rowBack}>
      <View style={styles.rowBackLeft}>
          <SwipeEdit
          disabled
            keyExtractor={item.id}
            onEditBtnPress={() => {}}
          />
        </View>
        <View style={styles.rowBackRight}>
          <SwipeDelete
     
            keyExtractor={item.id}
            onDeleteBtnPress={() => {
              if (!shouldShowColorBox) return
              deleteBtnPressed(item)}}
          />
        </View>
      </View>
    );
    return hidden;
  }
  async function clearState() {
    // setIsReady(false);
    setCurrentColor(null)

    setSelected(new Map())

    onSelect(null)

    setShowDialogBox(false);

    setCurrentCategory(null);

    setIsAddingCategory(false);

    setIsLoading(false);
  }

  useEffect(() => {
    setFlatlistData(getFlatListDataFromObject(colors).concat(getFlatListDataFromObject(getCrayolaColors())))
    
    return () => {
      // effect
      clearState()
      // setIsReady(true);

    };
  }, [])

  useEffect(() => {
    if (currentCategory) {
      setCurrentColor(currentCategory.color);
      setCurrentType(currentCategory.type);
      showCategoryEditing(currentCategory)
      
    }
    if (!currentCategory) {
      setCurrentColor(colors.offWhite);
      setCurrentType('EXPENSE');
      hideCategoryEditing()
    }
    // return () => {
    //   // effect
    //   setIsReady(true)
    //   setIsLoading(false)
    //   setIsAddingCategory(false)
    //   setShowDialogBox(false)
    // };
  }, [currentCategory])

  const cancelBtnPressed = () => {
    setShowDialogBox(false);
  };

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
              addCategory(nameInputValue, colors.white, 'EXPENSE');
            }
            setShowDialogBox(false);
          }}
          label="Ok"
        />
      </Dialog.Container>
    </View>
  );

  // function ColorTableCell({ item, onPress, name, color, opacity }) {

  //   // console.log('item: ', item);
  //   /* remove colors that are too dark or dont work with the UI */
  //   if (
  //     name.toLowerCase() === 'darkgreyblue' ||
  //     name.toLowerCase() === 'dark' ||
  //     name.toLowerCase() === 'offwhite' ||
  //     name.toLowerCase() === 'black' ||
  //     name.toLowerCase() === 'darktwo' ||
  //     name.toLowerCase() === 'white'
  //   ) {
  //     return null;
  //   }
  //   /* Clean up diplayed title */
  //   let title = capitalizeFLetter(name);
  //   title = title.split(' ')

  //   let suffix = ''
  //   if (title[1]) {
  //     // title = title[0] + ' ' + title[1]
  //     title[1] = capitalizeFLetter(title[1]);
  //   }

  //   title = title[0] + ' ' + title[1];
  //   title = title.replace(' undefined', '');

  //   /* Scrolling color pills */
  //   return (
  //     <View
  //       style={{
  //         borderWidth: 1,
  //         borderColor: 'white',
  //         borderStyle: 'solid',
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         paddingTop: 2,
  //       }}
  //     >
  //       <TouchableOpacity
  //         onPress={onPress}
  //         disabled={(Object.keys(colors).includes(name) !== true && !global.authenticated)}
  //         style={
  //           [
  //             {
  //               maxHeight: MAX_PILL_HEIGHT,
  //               minWidth: MIN_PILL_WIDTH,
  //               maxWidth: MAX_PILL_WIDTH,
  //               height: '60%', // 37,
  //               maxHeight: 50,

  //               marginHorizontal: 4,
  //               marginVertical: 10,
  //               paddingHorizontal: 10,
  //               paddingTop: 2,
  //               borderRadius: 17,
  //               borderWidth: 1,
  //               borderColor: color,
  //               backgroundColor: currentColor === color ? currentColor : 'transparent',
  //               opacity: (Object.keys(colors).includes(name) || global.authenticated) ? 1.0 : 0.4,
  //               // borderWidth: 1,
  //               // borderColor: 'white',
  //               // borderStyle: 'solid',
  //             }
  //           ]
  //         }
  //       >

  //      <Text style={[
  //         styles.listItemTitleStyle,
  //           {
  //           // color: currentColor === color ? colors.offWhite : colors.white,
  //           color: currentColor === color ? colors.offWhite : color,
            
  //         }
  //         ]}
  //       >
  //       {   
  //        title
  //       }
  //       <Text style={[
  //           styles.listItemTitleStyle,
  //           {
  //           color: currentColor === color ? colors.white  : colors.offWhite,
  //           textAlign: 'right',
  //           // alignItems: 'flex-end',

  //         }]}>
  //           {
  //             ` ${color}`
  //           }
  //         </Text>
  //       </Text>
  //     </TouchableOpacity>
  //     </View>
  //   );
  // }

  const UpdateCategoryType = async (type) => {
    if (!currentCategory) return;

    setIsLoading(true);

    // currentCategory.type = type

    // setCurrentType(currentCategory.type);

    try {
      const storage = await loadSettingsStorage(global.storageKey);

      const obj = searchByID(currentCategory.id, storage.categories);

      obj.type = type

      setCurrentType(obj.type);

      saveSettingsStorage(global.storageKey, storage);

      setData(storage.categories);

      storeUserCategories(storage.categories);
      
      reloadCategories();

      updateUserTransactionCategories(storage.categories);

      setIsLoading(false);

      clearState();
    } catch(e) {
      // statements
      console.log('error updating category type:', e);
      setIsLoading(false);

      clearState();
    }
  }
  const UpdateCategoryColor = async (selectedColor) => {
    if (!currentCategory || !currentColor) return;

    setIsLoading(true);

    try {
      const storage = await loadSettingsStorage(storageKey);

      const obj = await searchByID(currentCategory.id, storage.categories);

      if (!obj) return

      obj.color = selectedColor.value

      saveSettingsStorage(global.storageKey, storage);

      setData(storage.categories);

      storeUserCategories(storage.categories);
      
      updateUserTransactionCategories(storage.categories);

      reloadCategories();

      // setIsLoading(false);

      // showMessage({
      //   message: 'Updated category color',
      //   // duration: 550,
      //   position: 'bottom',

      //   // description: "My message description",
      //   // type: 'success', // "success", "info", "warning", "danger"
      //   // backgroundColor: colors.dark, // "purple", // background color
      //   color: colors.shamrockGreen, // "#606060", // text color
      //   // opacity: 0.5,

      //   textStyle: styles.textStyle,

      //   // icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
      // });

      /* Move  current  color to the top of the list */
      var first = selectedColor
      let list = flatlistData.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; })

      // console.log('list[0]: ', list[0]);

      // console.log('flatlistData: ', flatlistData);

      // const pos = flatlistData.indexOf()

      // console.log('list[0]: ', list[0]);

      setCurrentColor(selectedColor.value);

      // setShouldShowColorBox(!shouldShowColorBox)

      // setShouldShowColorBox(false);

      clearState()



    } catch(e) {
      // statements
      console.log('error updating category color:', e);
      // setIsLoading(false);

      clearState()

      // setShouldShowColorBox(false);
    }
  }

  const colorBox = (
    <View> 
      <FlatList
        style={styles.table}
        contentContainerStyle={{
          // flex: 1,
          height: global.screenHeight/15,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,

          // backgroundColor: colors.dark,

          // borderWidth: 1,
          // borderColor: 'red',
          // borderStyle: 'solid',
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // data={getFlatListDataFromObject(colors)}
        // renderItem={({ item }) => <Item item={item} onPress={() => UpdateCategoryColor(item.key, colors[item.key])} />}
        keyExtractor={(item) => item.key}

        data={flatlistData}
        // extraData={selected}
        renderItem={({ item }) =>
          <ColorTableCell
            currentColor={currentColor}
            item={item}
            opacity={1}
            name={item.key}
            color={item.value}
            onPress={() => {
              UpdateCategoryColor(item);
            }}
          />
        }
        keyExtractor={(item) => item.key}
      />

      {/* Seperator Line */}
     <View
        style={{
          position: 'absolute',
          top: 0,

          // left: '38%',
          // height: 1,
          width: screenWidth,
          borderWidth: 1,
          // borderColor: 'white',
          borderColor: colors.dark,
          // borderStyle: 'solid',
         }} />
    </View>
  );
  const deleteBtn = (
    <TouchableOpacity
      style={
        [
          optionsPillStyle,
          {
            borderColor: colors.offWhite,
            backgroundColor: 'transparent',
          }
        ]
      }
        // icon={(<AntDesign name="addfile" size={24} color={colors.white} />)}
        // title="Income"
        onPress={deleteBtnPressed}
      >
      <Text style={[styles.pillItemText, {
        color: colors.white,
      }]}>Delete <FontAwesome name="trash-o" size={17} color={colors.offWhite} /></Text>
      </TouchableOpacity>
  );
  const editBox = (
    <View>
      {/* scroll view with option pills */}
      <View style={{
        // flexDirection: 'row',
        // flex: 1,
        // width: screenWidth,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',

        // backgroundColor: colors.darkTwo,



        // height: 60,

        // alignItems: 'center',
        // justifyContent: 'flex-start',
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
               flexDirection: 'row',
               // alignSelf: 'center',
               flex: 1,
               // width: '100%',
               // borderWidth: 1,
               // borderColor: 'orange',
               // borderStyle: 'solid',



               backgroundColor: colors.darkTwo,

               // borderTopWidth: 1,
               // borderTopColor: colors.dark,




   
               height: global.screenHeight/15, // 60,
   
               alignItems: 'center',
               justifyContent: 'center',
             }
           }
          >




                     
             
                    <TouchableOpacity
                    style={
                     {
                       maxHeight: MAX_PILL_HEIGHT,
                       minWidth: MIN_PILL_WIDTH,
                       maxWidth: MAX_PILL_WIDTH,
                       height: '60%', // 37,
                       maxHeight: 50,
             
                       // alignItems: 'center',
                       justifyContent: 'center',
             
                       marginHorizontal: 4,
                       marginVertical: 10,

             
                       borderRadius: 17,
                       borderWidth: 1,
                       // borderStyle: 'solid',
                       borderColor: currentType === 'INCOME' ? 'transparent' : colors.shamrockGreen,
             
                       // marginHorizontal: 6,
             
                       backgroundColor: currentType === 'INCOME' ? colors.shamrockGreen : 'transparent'
             
                     }
                   }
                         // icon={(<AntDesign name="addfile" size={24} color={colors.white} />)}
                         // title="Expense"
                         onPress={() => {
                           UpdateCategoryType('INCOME')
                           clearState()
                           // Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
                         }}
                       >
                       <Text style={[styles.pillItemText, {
                         color: currentType === 'INCOME' ? colors.white : colors.shamrockGreen
                       }]}>Income</Text></TouchableOpacity>
                       
             
                      <TouchableOpacity
                       style={[
                         // styles.buttonStyle,
                         optionsPillStyle,
                         {
                           // maxHeight: MAX_PILL_HEIGHT,
                           // minWidth: MIN_PILL_WIDTH,
                           // maxWidth: MAX_PILL_WIDTH,
                           // height: '60%', // 37,
                           // maxHeight: 50,
             
                           // // alignItems: 'center',
                           // justifyContent: 'center',
             
                           // marginHorizontal: 4,
                           // marginVertical: 10,
             
                           // borderRadius: 17,
                           // borderWidth: 1,
                           // borderStyle: 'solid',
                           borderColor: currentType === 'EXPENSE' ? 'transparent' : colors.pinkRed,
             
                           marginHorizontal: 6,
             
                           backgroundColor: currentType === 'EXPENSE' ? colors.pinkRed : 'transparent',
                       }
                       ]}
                         // icon={(<AntDesign name="addfile" size={24} color={colors.white} />)}
                         // title="Income"
                         onPress={() => {
                           UpdateCategoryType('EXPENSE');
                           clearState()
                           // Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
                         }}
                       >  
                       <Text style={[styles.pillItemText, {
                         color: (currentType === 'EXPENSE' ? colors.white : colors.pinkRed),
                       }]}>Expense</Text>
                       </TouchableOpacity>

        <View style={styles.separator} />

        {
          deleteBtn
        }



      </ScrollView>



       </View>

{/*       <View style={{
        alignSelf: 'center',
         width: global.screenWidth * 0.9,
    // height: '70%',
    height: 1,
    marginVertical: 10,
    backgroundColor: colors.white, // 'rgba(0,0,0,0.5)',
    opacity: 0.1,
       }} />*/}

        <View
          style={
            [
              // styles.container,
              {
                // flexDirection: 'row',
                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            ]
          }
        >
        {
          colorBox
        }
        </View>

    </View>
  );

  let view = (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={retrieveStoredCategories} />
      <View
        style={{
          flex: 1,
        }}
      >
      <View style={{
        flex: 1,
      }}>
      <FlatList

        style={styles.table}
        data={data}
        renderItem={(item) => renderItem(item)}
        // renderItem={({ item }) => (
        //   <CellItem
        //     id={item.id}
        //     name={item.name}
        //     selected={!!selected.get(item.id)}
        //     onSelect={onSelect}
        //   />
        // )}
        keyExtractor={(item) => String(item.id)}
        extraData={selected}
        ItemSeparatorComponent={(item) => renderSeparator(item)}
        // renderHiddenItem={(item) => renderHiddenItem(item)}

        // leftOpenValue={75}
        // rightOpenValue={-75}
      />
      </View>

      <View style={{
                shadowColor: Platform.OS === 'ios' ? '#0a101b' : '',
        shadowOffset: Platform.OS === 'ios' ? {
          width: 1,
          height: 1,
        } : {},
        shadowRadius: Platform.OS === 'ios' ? 26 : 0,
        shadowOpacity: Platform.OS === 'ios' ? 1 : 0,
      }}>{
        currentCategory && editBox
      }
      </View>

      {/* <Button title="Add New" onPress={() => addCategory('')} /> */}
      <View
        style={
          {
            // flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',


            // marginVertical: '2%',
            padding: 14,

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

       {/* <HelpMessage message={helpMessage} />*/}
        </View>

        

        {
          showCreateCategoryButton && 
        
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
        
        }
        

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
        isLoading && <View style={
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right:  0,
        opacity: 0.5,

        zIndex:  1,

        backgroundColor: colors.dark,

      }
    }><ActivityIndicator size="large" color={colors.white} /></View>
      }
      </View>
{/*      {
        // !isReady &&
        // true &&
        <ActivityIndicator color={colors.offWhite} size="small" />
      }*/}
      {
        resetDialog
      }

    </SafeAreaView>
  );

  // if (shouldShowDialog) {
  //   return dialogBox;
  // }

  // if (shouldShowColorBox) {
  //   return colorBox;
  // }



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

CustomizeCategoriesScreen.navigationOptions = ({ navigation }) => {
  const promptUserForCategoryReset = async () => {
    CustomizeCategoriesScreen.showDialog()
  };
  const navbar = {
    // headerTransparent: {},
    headerStyle: {
      backgroundColor: colors.dark,
    },
    headerTintColor: colors.white,

    headerRight: () =>  {
      return (
        <View style={{
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
          </Text></TouchableOpacity></View>
        )},
  };
  return navbar;
};

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

// export default CustomizeCategoriesScreen;
