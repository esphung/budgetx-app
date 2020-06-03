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
  // AsyncStorage,
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
  Auth.currentAuthenticatedUser().then(async () => {
    try {
      const storage = await loadSettingsStorage(global.storageKey);

      const { categories } = storage;
      categories.forEach((category) => {
        removeCategory(category);
      });
      if (await isDeviceOnline()) {
        const onlineCategories = await listAllOnlineCategories();
        onlineCategories.forEach((item) => {
          removeCategory(item);
        });
      }
      showMessage({
        message: 'All categories deleted',
        // duration: 550,
        position: 'bottom',
        color: colors.shamrockGreen, // "#606060", // text color
        // opacity: 0.5,
        textStyle: styles.textStyle,
        // icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
      });
    } catch (e) {
      // statements
      // console.log(e);
    }
  });
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
        // console.log(e);
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


export default function CustomizeCategoriesScreen() {
  const [selected, setSelected] = useState(new Map());

  const [isReady, setIsReady] = useState(true);

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

    deleteAllOnlineCategories();


    const storageObj = await loadSettingsStorage(global.storageKey);
    let j = storageObj.categories.length - 1;
    let i = defaultCategories.length - 1;

    for (j; j >= 0; j--) {
      removeCategory(storageObj.categories[j]);
    }
    storageObj.categories = defaultCategories;

    for (i; i >= 0; i--) {
      defaultCategories[i].owner = global.storageKey;
    }

    setData(defaultCategories)
    saveSettingsStorage(global.storageKey, storageObj);

    
    // pushAllCategoriesToCloud();
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
            resetCategories();
            setDialogVisible(false);
          }
        }
      />
    </Dialog.Container>
  );

  CustomizeCategoriesScreen.showDialog = () => {
    setDialogVisible(true);
  };


  const deleteCategoryByID = async (item) => {
    const previous = item; // for user redo purposes
    const storage = await loadSettingsStorage(global.storageKey);

    const category = searchByID(item.id, storage.categories);

    let i = 0;
    for (i; i < storage.categories.length; i += 1) {
      if (storage.categories[i].id === category.id) {
        storage.categories.splice(i, 1);
      }
    }
    removeCategory(category);

    

    setData(storage.categories);

    saveSettingsStorage(global.storageKey, storage);

    // showMessage({
    //   message: 'Undo remove category',
    //   duration: 2250,
    //   position: 'bottom',
    //   color: colors.shamrockGreen, // "#606060", // text color
    //   // opacity: 0.5,

    //   textStyle: styles.textStyle,

    //   onPress: async () => {
    //     // addCategory()
    //     setIsAddingCategory(true);
    //     // const list = await loadUserCategories();
    //     const userObject = await loadSettingsStorage(global.storageKey);
    //     // console.log(userObject.user.categories);

    //     const list = userObject.categories;

    //     list.unshift(previous);

    //     setData(list);

    //     userObject.categories = list;
    //     // await saveUserObject(userObject);
    //     saveSettingsStorage(global.storageKey, userObject);
    //     if (await isDeviceOnline()) {
    //       if (await getAuthentication()) {
    //         SaveCategory(previous);
    //       }
    //     }
    //     setIsAddingCategory(false);
    //   },
    // });
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
        Alert.alert('Category already exists');
      } else {
        // create same name obj of diff type
        obj = new Category(uuidv4(), name, color, type, global.storageKey, 0);

        list.unshift(obj);

        userObject.categories = list;

        saveSettingsStorage(global.storageKey, userObject);

        setData(list);
      }

      Auth.currentAuthenticatedUser().then(() => {
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

    setData(list);

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
          // UpdateCategory(transaction.category);
        }

        // UpdateTransaction(transaction);

      }).catch((err) => {
        console.log('error authenticating user for customized category update: ', err);
      })
    });
    saveSettingsStorage(storageKey, storage);
  };
  const retrieveStoredCategories = async () => {

    const storage = await loadSettingsStorage(global.storageKey);
    // setAuthenticated(await getAuthentication())
    Auth.currentAuthenticatedUser().then(async (user) =>  {
      global.authenticated = true;
      let list = await listAllOnlineCategories()
      storage.categories = list;
    }).catch(async () => {
      global.authenticated = false;
    })
    clearState()
    setData(storage.categories);
  };
  const deleteBtnPressed = async (item) => {
    try {
      deleteCategoryByID(item);
    } catch(e) {
      // statements
      console.log('e: ', e);
    }
    clearState()
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
      // clearState()
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
    return () => {
      // effect
    };
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
  function capitalizeFLetter(string) {
    return string.replace(/^./, string[0].toUpperCase()); 
  }


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
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',

        // width: '100%',

        // marginRight:screenWidth/2,

        // borderBottomWidth: 0,
        opacity: (Object.keys(colors).includes(name) || global.authenticated) ? 1.0 : 0.4
      }}>

{/*      <View style={{
        // flexDirection: 'row',
            // height: 1,
    // height: '70%',
    width: 50,
    marginVertical: 10,
    marginRight: 6,
    backgroundColor: colors.white, // 'rgba(0,0,0,0.5)',
    opacity: 0.1,
      }} />
        
        */}
        <TouchableOpacity
        onPress={onPress}
        disabled={(Object.keys(colors).includes(name) !== true && !global.authenticated)}
        // style={styles.buttonStyle}
        style={[
          // styles.buttonStyle,
          {
                maxHeight: MAX_PILL_HEIGHT,
                            minWidth:MIN_PILL_WIDTH ,
                            maxWidth: MAX_PILL_WIDTH + 100,
  
          // alignItems: 'center',
          // justifyContent: 'center',

          // marginHorizontal: 4,
          // marginVertical: 10,

          borderRadius: 17,
          borderWidth: 1,


          borderColor: item.value,

          backgroundColor: currentColor === color ? currentColor : 'transparent',
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
        }]}
      >

       <Text style={[
          styles.listItemTitleStyle,
            {
            // color: currentColor === color ? colors.offWhite : colors.white,
            color: currentColor === color ? colors.offWhite : color,
            
          }
          ]}
        >
        {   
         title
        }
        <Text style={[
            styles.listItemTitleStyle,
            {
            color: currentColor === color ? colors.white  : colors.offWhite,
            textAlign: 'right',
            // alignItems: 'flex-end',

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
      
      updateUserTransactionCategories(storage.categories);

      setIsLoading(false);

      // showMessage({
      //   message: 'Updated category type',
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

      // setShouldShowColorBox(false);

      clearState()
    } catch(e) {
      // statements
      console.log('error updating category type:', e);
      // setIsLoading(false);

      clearState()

      // setShouldShowColorBox(false);
    }

    // onSelect(currentCategory.id);

    // setCurrentCategory(null);

      // const userObject = await loadSettingsStorage(global.storageKey)
      // userObject.categories = list;
      // // await saveUserObject(userObject);
      // saveSettingsStorage(storageKey, userObject);

      // setData(list);

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
    <SafeAreaView style={[
      styles.container,
      {
        // paddingTop: 12,
        // alignItems: 'center',

        flex: 1,

        bottom: 0,
        left:  0,

        right: 0,
        top: 0,

backgroundColor: colors.dark, // 'rgba(0,0,0,0.5)',

      }
    ]}
    > 
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={(item) => (
    <View style={[
      // styles.separator,
      {
    //         width: 50,
    // // height: '70%',
    // height: 1,
    // marginHorizontal: 10,
    // backgroundColor: colors.white, // 'rgba(0,0,0,0.5)',
    // opacity: 0.1,
  },
      item && {marginLeft: 0}]} />
  )}
        // data={getFlatListDataFromObject(colors)}
        // renderItem={({ item }) => <Item item={item} onPress={() => UpdateCategoryColor(item.key, colors[item.key])} />}
        // keyExtractor={(item) => item.key}

        // data={authenticated && getFlatListDataFromObject(crayolaData) || getFlatListDataFromObject(colors)}
        data={flatlistData}
        // extraData={selected}
        renderItem={({ item }) => <ColorTableCell currentColor={currentColor} item={item} opacity={1} name={item.key} color={item.value} onPress={() => {
          UpdateCategoryColor(item);
        }} />}
        keyExtractor={(item) => item.key}
      />

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
          borderStyle: 'solid',
         }} />

        
      {
        isLoading && <View style={
          {
            // flex: 1,
            position: 'absolute',
            left: 0,
            right:  0,
            // bottom: 50,
          }
        }>
        <ActivityIndicator size="large" />
        </View>
      }
    </SafeAreaView>
  );

// arbitrary size limits
const MAX_PILL_WIDTH = 176;
const MIN_PILL_WIDTH = 54;
const MAX_PILL_HEIGHT = 32;

  const editBox = (
    <SafeAreaView
      style={[
        styles.container,
        {
          // position: 'absolute',

          left: 0,
          right: 0,
          top: 0,
          bottom: 0, // 0,

          height: 350,

          zIndex: 1,

          backgroundColor: colors.darkTwo,

          borderTopWidth: 1,

          shadowColor: Platform.OS === 'ios' ? '#0a101b' : '',
          shadowOffset: Platform.OS === 'ios' ? {
            width: 1,
            height: 1,
          } : {},
          shadowRadius: Platform.OS === 'ios' ? 26 : 0,
          shadowOpacity: Platform.OS === 'ios' ? 1 : 0,

          // marginHorizontal: 10,
          padding: 4,

          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',

          // borderRadius: 23,
        }
      ]}
    >
          <View style={{
            // flexDirection: 'row',
            // // flex: 1,
            // width: screenWidth,
            // // borderWidth: 1,
            // // borderColor: 'white',
            // // borderStyle: 'solid',

            // // backgroundColor: colors.darkTwo,

            // height: 60,

            // alignItems: 'center',
            // justifyContent: 'flex-start',
          }}>

        

{/*         <View
          style={[
            // styles.buttonStyle,
            {
              maxHeight: MAX_PILL_HEIGHT,
              minWidth: MIN_PILL_WIDTH,
              maxWidth: MAX_PILL_WIDTH,
              height: '60%', // 37,
              maxHeight: 37,

              // alignItems: 'center',
              justifyContent: 'center',

              // marginHorizontal: 4,
              // marginVertical: 10,

              borderRadius: 17,
              borderWidth: 1,
              // borderStyle: 'solid',
              borderColor: colors.offWhite,

              marginHorizontal: 6,

              backgroundColor: colors.dark, // shouldShowColorBox ? currentColor : 'transparent',
          }]}
            // icon={(<AntDesign name="addfile" size={24} color={colors.white} />)}
            // title="Income"
            // onPress={() => {
            //   UpdateCategoryType('EXPENSE');
            //   // Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
            // }}

                     // onPress={() => {
          //   setShouldShowTypeButtons(!shouldShowTypeButtons)
          //   // setShouldShowColorBox(!shouldShowColorBox)

          // }}
          >



          <Text style={[styles.pillItemText]}>Edit Category
 
          </Text>

          </View>
*/}

          {
          // shouldShowTypeButtons &&

           (
            <View style={{
           flexDirection: 'row',
            // flex: 1,
            width: screenWidth,
            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',

            // backgroundColor: colors.darkTwo,

            height: 60,

            alignItems: 'center',
            justifyContent: 'flex-start',
            }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                   flexDirection: 'row',
                   // alignSelf: 'center',
                   flex: 1,
                   width: '100%',
                   // borderWidth: 1,
                   // borderColor: 'white',
                   // borderStyle: 'solid',

                   // backgroundColor: colors.white,

                   borderTopWidth: 1,
                   borderTopColor: colors.dark,

                     shadowColor: '#0a101b',
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowRadius: 26,
                    shadowOpacity: 1,
                                         


       
                   height: 60,
       
                   alignItems: 'center',
                   justifyContent: 'center',
                 }}>




                   
           
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

            // backgroundColor: colors.white,

                    
           
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
                         borderColor: currentType === 'EXPENSE' ? 'transparent' : colors.pinkRed,
           
                         marginHorizontal: 6,
           
                         backgroundColor: currentType === 'EXPENSE' ? colors.pinkRed : 'transparent',
                     }]}
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

                                                         <TouchableOpacity
                        style={[
                          // styles.buttonStyle,
                          {
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
                            // borderStyle: 'solid',
                            borderColor: colors.azure,
              
                            marginHorizontal: 6,
              
                            backgroundColor: 'transparent',
                        }]}
                          // icon={(<AntDesign name="addfile" size={24} color={colors.white} />)}
                          // title="Income"
                          onPress={() => {
                            // deleteBtnPressed(currentCategory)
                             // Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
                             clearState()

                            // setShouldShowColorBox(!shouldShowColorBox)
                            // Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
                          }}
                        >
                        <Text style={[styles.pillItemText, {
                          color: colors.azure,
                        }]}>Cancel
                        {/*<Ionicons name="ios-create" size={17} color={colors.white} />*/}
                        </Text>
                        </TouchableOpacity>
       


                                    <TouchableOpacity
                        style={[
                          // styles.buttonStyle,
                          {
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
                            // borderStyle: 'solid',
                            borderColor: colors.offWhite,
              
                            marginHorizontal: 6,
              
                            backgroundColor: 'transparent',
                        }]}
                          // icon={(<AntDesign name="addfile" size={24} color={colors.white} />)}
                          // title="Income"
                          onPress={() => {
                            deleteBtnPressed(currentCategory)

                            // setShouldShowColorBox(!shouldShowColorBox)
                            // Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
                          }}
                        >
                        <Text style={[styles.pillItemText, {
                          color: colors.white,
                        }]}>Delete <FontAwesome name="trash-o" size={17} color={colors.offWhite} /></Text>
                        </TouchableOpacity>




                     {/*<TouchableText title="Choose Color" onPress={() => setShouldShowColorBox(!shouldShowColorBox)} />*/}
           
                       
{/*                    <TouchableOpacity
                                             style={[
                                               // styles.buttonStyle,
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
                                                 borderColor: colors.azure,
                                   
                                                 marginHorizontal: 6,
                                   
                                                 backgroundColor: 'transparent', // colors.azure
                                             }]}
                                               // icon={(<AntDesign name="addfile" size={24} color={colors.white} />)}
                                               // title="Income"
                                               onPress={() => {
                                                onSelect(currentCategory.id)
                                                setCurrentCategory(null);
                        
                                                 // UpdateCategoryType('EXPENSE');
                                                 // Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
                                               }}
                                             >
                                             <Text style={[styles.pillItemText, {
                                               color: colors.offWhite,
                                             }]}>Done</Text></TouchableOpacity>
                                   */
                                              }                        
                 
           
                     </ScrollView>



                     </View>
                    )
        }


{/*        <BlueButton title="Cancel" onPress={() => {
          setCurrentCategory(null)
        }} />*/}

{/*         <View
          style={[
            // styles.buttonStyle,
            {
              maxHeight: MAX_PILL_HEIGHT,
              minWidth: MIN_PILL_WIDTH,
              maxWidth: MAX_PILL_WIDTH,
              height: '60%', // 37,
              maxHeight: 37,

              // alignItems: 'center',
              justifyContent: 'center',

              // marginHorizontal: 4,
              // marginVertical: 10,

              borderRadius: 17,
              borderWidth: 1,
              // borderStyle: 'solid',
              // borderColor: shouldShowColorBox ? 'transparent' : currentColor,
              borderColor: colors.offWhite,

              marginHorizontal: 6,

              backgroundColor: colors.dark, // shouldShowColorBox ? currentColor : 'transparent',
          }]}
            // icon={(<AntDesign name="addfile" size={24} color={colors.white} />)}
            // title="Income"
            // onPress={() => {
            //   UpdateCategoryType('EXPENSE');
            //   // Platform.OS === 'ios' ? promptUserForCategoryName() : setShowDialogBox(true)
            // }}
          >
          <TouchableText style={[styles.pillItemText]} title="Color" onPress={() => setShouldShowColorBox(!shouldShowColorBox)}/>
          </View>
*/}




          </View>

        



        {
          shouldShowColorBox && colorBox
        }






    </SafeAreaView>
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

      {
        currentCategory && editBox
      }

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

