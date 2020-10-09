/*
FILENAME:   Home.js
PURPOSE:    home screen for budget x app
AUTHOR:     eric phung
CREATED:    Thu Oct 31 23:17:49 2019
*/
import React,
{
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

import {
  View,
  Animated,
  Dimensions,
  LogBox,
} from 'react-native';

// import Auth from '@aws-amplify/auth';
import { Auth } from 'aws-amplify'; // import Auth from '@aws-amplify/auth';

import Storage from '@aws-amplify/storage';

// import AsyncStorage from '@react-native-community/async-storage';

import { showMessage } from 'react-native-flash-message';

import { StatusBar } from 'expo-status-bar';

import { NavigationEvents } from 'react-navigation';

// import colors from 'src/colors';

import styles from 'styles/Home';

// Home Components
import SpinnerMask from 'components/SpinnerMask';

import Navbar from 'components/Home/Navbar';

import BalanceView from 'components/Home/BalanceView';

import StickyTable from 'components/Home/StickyTable';

import TransactionInputPanel from 'components/Home/TransactionInputPanel';

import BottomSheet from 'components/Home/BottomSheet';

import SlideView from 'components/Home/SlideView';

// import ScrollingPillCategoriesView from 'components/Home/ScrollingPillCategoriesView';

// import AmountInputView from 'components/Home/AmountInputView';

// import KeypadView from 'components/Home/KeypadView';

// import SlideUpView from 'components/Home/SlideUpView';

// data models
import Transaction from 'models/Transaction';

import Payee from 'models/Payee';

import Category from 'models/Category';

import calculateBalance from 'functions/calculateBalance';

import calculateMonthSpent from 'functions/calculateMonthSpent';

import colorLog from 'src/functions/colorLog';

import searchByID from 'functions/searchByID';

import getHighestVersionItemById from 'functions/getHighestVersionItemById';
// accepts { arr, filter }

// import searchByName from 'functions/searchByName';

// import findTransactionArrayDifferences from 'functions/findTransactionArrayDifferences';

import getUniqueId from 'functions/getUniqueId';

// import getNonUniqueId from 'functions/getNonUniqueId';

// import findTransactionArrayDifferences from 'functions/findTransactionArrayDifferences';

// import getFakeTransactions from 'functions/getFakeTransactions';

/* my custom queries */
// import {
//   // DeleteTransaction,
//   // DeletePayee,
//   // DeleteCategory,
// } from '../storage/my_queries';

import {
  UpdateCategory,
  AddCategory,
  ListCategories,
  DeleteCategory,
} from 'queries/Category';

import {
  UpdatePayee,
  AddPayee,
  DeletePayee,
} from 'queries/Payee';

import {
  isDeviceOnline,
  getAuthentication,
  // syncCategories,
  // getCognitoIdentity,
  getS3ProfileImage,
} from 'controllers/Network';

import {
  loadStorage,
  saveStorage,
  // storeUserCategories,
  // updateUserTransactionCategories,
} from 'controllers/Storage';

import {
  UpdateTransaction,
  AddTransaction,
  ListTransactions,
  DeleteTransaction,
  // GetTransaction,
} from 'queries/Transaction';

LogBox.ignoreLogs([
  '[Unhandled promise rejection: Error: Native splash screen is already hidden. Call this method before rendering any view.]',
  'Animated: `useNativeDriver`',
  'Animated.event now requires a second argument for options',
]);

const statusBarStyle = {
  type: 'light',
};

const screen = Dimensions.get('screen');

// Shrink table and show transaction slide below
const SHORT_TABLE_HEIGHT = (screen.height / 3); // screen.height / 2.9;

// Stretch table and push transaction slide just off screen
const LONG_TABLE_HEIGHT = (screen.height * 0.4); //  (screen.height * 0.8) // screen.height * 0.7;

const BOTTOM_SHEET_RESET_POSITION = screen.height - (screen.height / 2.5);

// const BOTTOM_SHEET_FULL_DISPLAY_POSITION = screen.height / 4;

const SLIDE_DURATIONS = 500;

const spinnerMask = (
  <View
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.2,
    }}
  >
    <SpinnerMask />
  </View>
);

async function function2(item) {
  // 2nd code goes here
  // console.log('item: ', item);
  // const storage = await loadStorage(global.storageKey);
  // const found = storage.transactions.find((element) => element === item);
  console.log('uh oh 2');
}

var deleteOnline = (transaction) => {
  // console.log('item: ', item);
  // 1st code goes here
  DeleteTransaction(transaction).then(() => DeletePayee(transaction.payee));
  // console.log('uh oh 1'),
  function2(item);
};

export default function Home({ navigation }) {
  const [currentTransactions, setCurrentTransactions] = useState([]);

  const [currentCategories, setCurrentCategories] = useState([]);

  const [currentBalance, setCurrentBalance] = useState(0.00);

  const [currentSpentBalance, setCurrentBalanceSpent] = useState(0.00);

  const [currentTransaction, setCurrentTransaction] = useState(null);

  const [currentCategory, setCurrentCategory] = useState(null);

  const [currentAmount, setCurrentAmount] = useState(0.00);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentNote, setCurrentNote] = useState('');

  const [visible, setVisible] = useState(false);

  const [isSyncing] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [currentTableHeight, setCurrentTableHeight] = useState(SHORT_TABLE_HEIGHT);

  const [isDeviceSyncEnabled, setIsDeviceSyncEnabled] = useState(false);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [boldMessage, setBoldMessage] = useState('Get cross-device sync');

  const [normalMessage, setNormalMessage] = useState('');

  const [avatarImage, setAvatarImage] = useState(global.defaultAvatar);

  const [panY] = useState(new Animated.Value(Dimensions.get('screen').height));

  const [currentSlidePosition, setCurrentSlidePosition] = useState('HIDDEN');

  const [shouldRefresh, setShouldRefresh] = useState(false);

  const fadeAnim = useRef(new Animated.Value(300)).current;

  // const [tableRefreshes, setTableRefreshes] = useState(0);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.spring(
      fadeAnim,
      {
        toValue: 1,
        duration: SLIDE_DURATIONS,
      },
    ).start(setCurrentTableHeight(SHORT_TABLE_HEIGHT));
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.spring(fadeAnim, {
      toValue: 0,
      duration: SLIDE_DURATIONS,
    }).start(setCurrentTableHeight(LONG_TABLE_HEIGHT));
  };
  // const reloadTransactions = async () => {
  //   const storage = await loadStorage(global.storageKey);
  //   setCurrentTransactions(storage.transactions);
  // };
  const onDismissBottomSheet = () => {
    setVisible(false);
    setCurrentTransaction(null);
    setCurrentCategory(null);
    setCurrentAmount(null);
    setCurrentNote('');
    fadeIn();
  };
  // const updateDatabaseTransaction = async (transaction) => {
  //   /* if online and logged in, update online transaction */
  //   if (await isDeviceOnline() && isDeviceSyncEnabled && await getAuthentication()) {
  //     // setIsUpdatingTransaction(true); // to show activity indicator
  //     try {
  //       UpdateTransaction(transaction);
  //       UpdateCategory(transaction.category);
  //       UpdatePayee(transaction.payee);
  //       // console.log('response: ', response);
  //       // setIsUpdatingTransaction(false);
  //     } catch {
  //       // statements
  //       // setIsUpdatingTransaction(false);
  //     }
  //   }
  // };
  const resetSlideView = useCallback(
    () => {
      setCurrentSlidePosition('RESET');
      // alert('message?: DOMString');
      // fadeOut();
      Animated.timing(
        // fadeAnim,
        panY,
        {
          toValue: BOTTOM_SHEET_RESET_POSITION,
          duration: SLIDE_DURATIONS,
          velocity: 100, // 100
          tension: 12, // 32
          friction: 8,
          // useNativeDriver: true,
        },
      ).start(fadeOut());
    },
    [],
  );
  // const hideSlideView = useCallback(
  //   () => {
  //     alert('message?: DOMString');
  //     // setCurrentTransaction(null);
  //     // setCurrentSlidePosition('HIDDEN');
  //     Animated.timing(
  //       panY, // fadeAnim, // slideViewBounceValue,
  //       {
  //         toValue: screen.height * 1.5, // 1, // Dimensions.get('screen').height,
  //         duration: SLIDE_DURATIONS,
  //         // velocity: 105,
  //         // tension: 2,
  //         // friction: 8,
  //         // useNativeDriver: true,
  //       },
  //     ).start(fadeIn());
  //   },
  //   [],
  // );
  const save = async () => {
    // save device transactions
    await loadStorage(global.storageKey)
      .then(async (storage) => {
        storage.transactions = currentTransactions;
        saveStorage(global.storageKey, storage);

        // if (await isDeviceOnline() && isDeviceSyncEnabled && await getAuthentication()) {
        //   storage.transactions.forEach((transaction) => {
        //     // statements
        //     UpdatePayee(transaction.payee).catch(() => {})
        //     UpdateCategory(transaction.category).catch(() => {})
        //     UpdateTransaction(transaction).catch(() => {})
        //   });
        // }
      });
  };
  // const getMergedTransactions = async () => {
  //   // console.log('await ListCategories(): ', await ListCategories());
  //   // colorLog({ message: global.storageKey, color: 'yellow' });

  //   const storage = await loadStorage(global.storageKey);

  //   if (!storage.isDeviceSyncEnabled || await isDeviceOnline() !== true) {
  //     return storage.transactions;
  //   }
  //   storage.transactions.forEach((transaction) => {
  //     if (!transaction.payee) {
  //       transaction.payee = new Payee({ name: transaction.note });
  //       AddPayee(transaction.payee).catch(() => AddPayee(transaction.payee));
  //       UpdateTransaction(transaction).catch(() => AddCategory(transaction.category));
  //       UpdateCategory(transaction.category).catch(() => AddCategory(transaction.category));
  //       // colorLog({
  //       //  message: 'transaction: ' + JSON.stringify(transaction, ['id', 'payee'], 1),
  //       //  color: 'red',
  //       // });
  //     }
  //     AddTransaction(transaction);
  //     AddCategory(transaction.category).catch(() => UpdateCategory(transaction.category));
  //     AddPayee(transaction.payee).catch(() => UpdatePayee(transaction.payee));
  //     // console.log('transaction: ', transaction);
  //   });

  //   const online_transactions = await ListTransactions();
  //   // online_transactions = online_transactions.filter((item) => item.category && item.payee)
  //   // colorLog({
  //   //  message: 'online_transactions.length: ' + online_transactions.length,
  //   //  color: 'blue',
  //   // });
  //   // console.log('online_transactions: ', online_transactions);

  //   // colorLog({
  //   //  message: `online_transactions: ${JSON.stringify(online_transactions, [
  //   //    'id',
  //   //    'amount',,
  //   //    'category',
  //   //    'name',
  //   //    'type',
  //   //    'version',
  //   //    'payee',
  //   //  ], 1)}`,
  //   //  color: 'magenta',
  //   // });

  //   const merged_transactions = online_transactions.map((transaction) => {
  //    if (!searchByID(transaction.id, storage.transactions)) {
  //      setCurrentTransactions([...currentTransactions, transaction]);
  //      storage.transactions.push(transaction);
  //      saveStorage(global.storageKey, storage);
  //      return transaction;
  //    }
  //    return transaction;
  //   });
  //   return storage.transactions;
  // };
  // const getMergedCategories = async () => {
  //   await loadStorage(global.storageKey).then(async (storage) => {
  //     // const online_categories = await ListCategories();
  //     // console.log('online_categories: ', online_categories);
  //     // categories.forEach((item) => {
  //     //  const found = categories.find((element) => element.id === item.id);
  //     //  // console.log('found: ', found);
  //     //  if (!found) categories.push(element);
  //     // });

  //     categories.forEach((item) => {
  //       UpdateCategory(item).catch(() => AddCategory(item));
  //     });
  //     return categories;
  //   });
  // };
  // function loopArrayAsync(ar, callback) {
  //     var index;

  //     index = 0;
  //     loop();

  //     function loop() {
  //         if (index < ar.length) {
  //             doSomething(ar[index++]);
  //             setTimeout(loop, 0);
  //         }
  //         else {
  //             callback();
  //         }
  //     }
  // }

  // let obj = {key1: true};
  // console.log('old obj: ', obj);
  // let newObj = {key2: false, key3: false};

  // Object.assign(obj, newObj);
  // console.log('modified obj: ', obj);

  const fetchData = async (offline_settings) => {
    // console.log('local: ', local);
    let online_settings = {};

    // add the previous settings to the new one
    Object.assign(online_settings, offline_settings);
    // console.log('online_settings: ', online_settings);

    // SET USER COGNITO INFO HERE (AVATAR, OPTIONS, ...);
    await Auth.currentAuthenticatedUser()
      .then(async (cognito) => {
        global.storageKey = cognito.attributes.sub;
        Object.assign(online_settings, {
          user: {
            id: cognito.attributes.sub,
            email: cognito.attributes.email,
            email_verified: cognito.attributes.email_verified,
            name: cognito.attributes.name,
            sub: cognito.attributes.sub,
          }
        });
        // console.log('online_settings: ', online_settings);
      }).catch((err) => {
        console.warn('cognito err: ', err);
      })
    // END COGNITO USER INFO FROM ONLINE

    const stored_image_url = await Storage.get(`@${global.storageKey}/picture.jpg`, {level:  'public'})
      .then((stored) => {
        // console.log('stored: ', stored);
        // setAvatarImage({ uri: stored });
        return stored;
    }).catch((err) => {
      console.log('err: ', err);
      return err;
    });

    Object.assign(online_settings.user, {
      image_url: stored_image_url,
    })

    // console.log('online_settings.user: ', online_settings.user);




    // ChECK IF USER IS ENABLED SYNCING
    if (!online_settings.isDeviceSyncEnabled) return online_settings;

    

    // SYNC TRANSACTIONS
    Object.assign(online_settings,
      { transactions: await ListTransactions()
      .then(async (online_transactions) => {
        // CHECK INTERNET CONNECTIVITY
        if (await isDeviceOnline() !== true) return online_settings;

        // DO TRANSACTION SYNCING
        console.log('offline_transactions.length: ', offline_settings.transactions.length);
        colorLog({ message: `online_transactions.length: ${online_transactions.length}`, color: 'blue' })
        const merged = online_transactions.concat(offline_settings.transactions);
        // console.log('merged: ', JSON.stringify(merged, ["id", "version"], 1));
        const list = merged.map((element) => {
          return getHighestVersionItemById({
            arr: merged,
            filter: element,
          })
        })

        colorLog({ message: `list.length: ${list.length}`, color: 'green' })

        // let test = await ListCategories().then((response) => {
        //   console.log('response: ', response);
        // })

        // REMOVE/DONT USE INVALID TRANSACTIONS
        const filtered_transactions = merged.filter((item) => {
          if (item.category) {
            return item;
          }
          else {

            if (!online_transactions.find((transaction) => transaction.id === item.id)) {
            

              // use item if a valid category replacement is found
              if (!item.category && item.type === 'INCOME') {
                const replacement_category = online_settings.categories.find((element) => item.type === element.type)
                if (replacement_category) {
                  

                  showMessage({
                    message: `Transaction category replaced: ${item.id}`,
                    description: (
                      JSON.stringify(
                        item, [
                          "amount",
                          "date",
                          "note",
                          "type",
                        ],
                        1,
                      )),
                    type: 'danger',
                    floating: true,
                    autoHide: false,
                  }) // end of display message

                  item.category = replacement_category;
                  return item;
                }


              }

            }
            // console.log('item: ', item);

           


          }
        });

        colorLog({ message: `filtered_transactions.length: ${filtered_transactions.length}`, color: 'green' })
        // console.log('merged_transactions: ', JSON.stringify(merged_transactions, ["id", "version"], 1));
        return getUniqueId(filtered_transactions);

        // console.log('transactions: ', transactions);
        // Object.assign(online_settings, { transactions: filtered_transactions, });
      }).catch((err) => {
        // catch ListTransactions
        colorLog({ message: err, color: 'red' });
        return online_settings.transactions;
      }), }); // END TRANSACTION FETCH HERE

       // // SYNC CATEGORIES
       Object.assign(online_settings,
      { categories: await ListCategories()
        .then(async (online_categories) => {
          // CHECK INTERNET CONNECTIVITY
          if (await isDeviceOnline() !== true) return online_settings;
            // DO ONLINE CATEGORY SYNCING
            // console.log('online_categories.length: ', online_categories.length);
            // console.log('online_categories: ', online_categories);
            const merged_categories = online_categories.concat(offline_settings.categories);
            // console.log('merged_categories.length: ', merged_categories.length);

            // CHECK FOR UNUSABLE CATEGORIES
            // console.log('JSON.stringify(merged_categories, ["id", "version", "name"], 1): ', JSON.stringify(merged_categories, ["id", "version", "name"], 1));

            let result = merged_categories.map((item) => {
              return getHighestVersionItemById({
                arr: merged_categories,
                filter: item,
              })
            })
            // REMOVE/DONT USE INVALID CATEGORIES
            result = result.filter((item) => item.name)

            // console.log('result.length: ', result.length);
            return result;
            // Object.assign(online_settings, { categories: result, });
          }).catch((err) => {
            // SOMETHING WRONG WITH THE CATEGORIES
            console.warn('sync categories err ', err);
            return online_settings.categories;
          }), }); // END CATEGORY FETCH HERE

    return online_settings;
  };
  const retrieveUserStoredSettings = async () => {
    // LOAD STORAGE VALUES FOR CCURRENT UNAUTORIZED USER
    let local_data = {};
    await loadStorage(global.storageKey).then((storage) => {
        // update user attributes
        global.storageKey = storage.user.id;

        // console.log('categories: ', categories);
        // UPDATE ALL STORED CATEGORIES WITH CURRENT OWNER
        let categories = storage.categories.map((category) => {
          category.owner = global.storageKey;
          return category;
        })
        local_data.categories = categories;
        // console.log('categories.length: ', categories.length);

        // update state variables
        setIsUserLoggedIn(false);

        // local_data.isDeviceSyncEnabled = storage.isDeviceSyncEnabled;
        // setIsDeviceSyncEnabled(storage.isDeviceSyncEnabled);

        // setAvatarImage({ uri: storage.user.image_url });
        // local_data.avatar = { uri: storage.user.image_url };
        Object.assign(local_data, {
          user: {
            image_url: storage.user.image_url,
            name: storage.user.name,
            email: storage.user.email,
          },
        })

        setAvatarImage({ uri: local_data.user.image_url })
        // // local_data.user.image_url = storage.user.image_url

        // setBoldMessage(local_data.user.name ? local_data.user.name : 'Get Cross-Device Sync');

        // // LEAVE BLANK FOR TEXT EMAIL INPUT
        // setNormalMessage(local_data.user.email ? local_data.user : '');

        // set displayed transactions
        // setCurrentTransactions(storage.transactions.filter((transaction) => transaction.category));
        setCurrentTransactions(storage.transactions);
        setCurrentCategories(storage.categories)

        Object.assign(local_data, {
          transactions: storage.transactions,
          categories: storage.categories,
          isDeviceSyncEnabled: storage.isDeviceSyncEnabled,
        })

        // local_data.transactions = storage.transactions;
        // set displayed categories
        // setCurrentCategories(categories);
        // setCurrentCategories(categories);
        // local_data.categories = storage.categories;
        // console.log('categories: ', categories);
        // console.log('local_data: ', local_data);

        saveStorage(global.storageKey, storage);
      }).catch((err) => {
        console.warn('retrieveUserStoredSettings err: ', err);
        return local_data;
      });
      return local_data;
  };
  const loadResources = async () => {
    setIsLoading(true);
    await retrieveUserStoredSettings()
    .then(async (storage) => {
        await getAuthentication()
        .then((bool) => {
          // if user logged in then =>
          setIsUserLoggedIn(bool);
          if (bool) {
            
            // set online user data/settings
            fetchData(storage).then((settings) => {
              setAvatarImage({ uri: settings.user.image_url });
              setBoldMessage((settings.user.name) ? settings.user.name : ((settings.isDeviceSyncEnabled) ? 'Cross-Device Sync Enabled' : 'Cross-Device Sync Disabled'));
              setNormalMessage(settings.user.email);
              setIsDeviceSyncEnabled(settings.isDeviceSyncEnabled);
              setIsUserLoggedIn(true);

              setCurrentTransactions(settings.transactions);
              setCurrentCategories(settings.categories);
              // console.log('settings: ', settings);

              setIsLoading(false);
            }).catch((err) => {
              console.warn('end of fetchData err: ', err);
              // setIsLoading(false);
            })
          }
          else {
            setCurrentCategories(storage.categories);
            setCurrentTransactions(storage.transactions);
            setIsLoading(false);
          }
        }).catch((err) => {
          setIsUserLoggedIn(false);
          setIsLoading(false);
          console.log('getAuthentication err: ', err);
        })
        
      }).catch((err) => {
        
        console.warn('loadResources err: ', err);
      });

      save();
  };
  const updateTransactionDate = (date) => {
    currentTransaction.date = date;
    if (isDeviceSyncEnabled) {
      UpdateTransaction(currentTransaction);
    }
    setCurrentTransactions(currentTransactions);
    setShouldRefresh(true);
  };
  const updateTransactionCategory = (category) => {
    currentTransaction.category = category;
    currentTransaction.type = category.type;
    if (isDeviceSyncEnabled) {
      UpdateTransaction(currentTransaction);
      UpdateCategory(currentTransaction.category);
    }
    setShouldRefresh(true);
  };
  const updateTransactionNote = (note) => {
    currentTransaction.note = note;
    currentTransaction.payee.name = note;
    if (isDeviceSyncEnabled) {
      UpdateTransaction(currentTransaction);
      UpdatePayee(currentTransaction.payee);
    }
    setShouldRefresh(true);
  };
  const handleNewAmountInput = (value) => {
    setCurrentAmount(value);
    if (String(value).length <= global.amountInputMaxLength) setCurrentAmount(value);
  };
  const updateTransactionAmount = (val) => {
    currentTransaction.amount = val;
  };
  const numberBtnPressed = (number) => {
    // truncate single AND leading zeros; concatenate old + new values
    const newValue = String(Math.trunc(Math.abs(currentAmount))) + String(number);
    handleNewAmountInput(newValue);
  };
  const createNewTransaction = async () => {
    if (!currentAmount || !currentCategory) return;

    // amount
    let amount = 0.00;
    if (currentCategory.type === 'EXPENSE') amount = (-Math.abs(currentAmount / (100)));
    else amount = (Math.abs(currentAmount / (100)));

    // date
    const date = new Date().toISOString();

    // category
    const category = currentCategory;

    // destructure type from current category
    const { type } = currentCategory;

    // combine input values
    const input = {
      amount,
      category,
      date,
      owner: global.storageKey,
      type,
      note: '',
      version: 0,
    };

    const transaction = new Transaction(input);

    // update current transactions diisplayed
    setCurrentTransactions([...currentTransactions, transaction]);

    // clear input values
    setCurrentAmount(0.00);
    setCurrentCategory(null);

    // refresh table items
    setShouldRefresh(true);

    if (await isDeviceOnline() && isDeviceSyncEnabled && await getAuthentication()) {
      AddTransaction(transaction);
      AddCategory(transaction.category).catch(() => UpdateCategory(transaction.category));
      AddPayee(transaction.payee);
    }

    showMessage({
      message: 'Success',
      type: 'success',
      description: 'New transaction created!',
      floating: true,
      position: 'bottom',
    });
  };
  const backspaceBtnPressed = () => {
    const strValue = String(currentAmount);
    // pop last char from string value
    const newStr = strValue.substring(0, strValue.length - 1);
    // return string as a number value
    const num = Number(newStr);
    // concatenate new string value to current amount input
    handleNewAmountInput(num);
  };
  async function loadCurrentBalances() {
    const balance = (calculateBalance(currentTransactions));
    setCurrentBalance(balance);
    const spent = (await calculateMonthSpent(currentTransactions));
    setCurrentBalanceSpent(spent);
  }
  const settingsBtnPressed = async () => {
    await loadStorage(global.storageKey)
      .then((storage) => {
        navigation.navigate('Settings', {
          storage,
          isDeviceSyncEnabled,
          setIsDeviceSyncEnabled,
          isUserLoggedIn,
        });
      });
  };
  const showWelcomeMessage = async () => {
    if (global.hasSeenWelcomeMessage !== true && await getAuthentication()) {
      showMessage({
        message: 'Welcome back',
        type: 'success',
        description: 'We missed you!',
        floating: true,
        position: 'bottom',
      });
      global.hasSeenWelcomeMessage = true;
    }
  };
  const onPullRefresh = () => loadResources();
  useEffect(() => {
    showWelcomeMessage();
    loadResources();

    return () => {
      setIsLoading(true);
      setShouldRefresh(true);
    }
    
  }, []);
  useEffect(() => {
    // console.log('shouldRefresh: ', shouldRefresh);
    if (shouldRefresh) {
      setShouldRefresh(false);

      // PERFORMANCE TESTING
      // setTableRefreshes(tableRefreshes + 1);
      // console.log('Refreshed table..:', tableRefreshes);

      save();
      loadCurrentBalances();
    }
    return () => {
      setShouldRefresh(false);
      save();
      // loadCurrentBalances();
    };
  }, [shouldRefresh, currentTransactions]);
  useEffect(() => {
    loadCurrentBalances();
  }, [currentTransactions]);
  const deleteBtnPressed = async (transaction) => {
    const pos = currentTransactions.indexOf(transaction);
    let list = currentTransactions;
    list.splice(pos, 1);
    setCurrentTransactions(list);

    // refresh table items
    setShouldRefresh(true);

    showMessage({
      message: 'Removed Transaction',
      type: 'danger',
      description: 'Transaction removed successfully',
      floating: true,
      position: 'bottom',
    });
    if (await isDeviceOnline() && isDeviceSyncEnabled && await getAuthentication()) {
      DeleteTransaction(transaction).then(() => DeletePayee(transaction.payee));
    }
  };
  const categoryBtnPressed = (category) => {
    setCurrentCategory((currentCategory === category) ? null : category);
    if (currentTransaction) {
      updateTransactionCategory(category);
      setShouldRefresh(true);
    }
  };
  const isCurrentCategory = (category) => (currentCategory === category);
  const transactionBtnPressed = (transaction) => {
    if (!currentTransaction !== transaction) {
      setCurrentTransaction(transaction);
      setCurrentAmount(transaction.amount);
      setCurrentCategory(transaction.category);
      setCurrentNote(transaction.note);
      setCurrentDate(transaction.date);
      resetSlideView();
      setVisible(true);
    } else if (currentTransaction && (currentTransaction === transaction)) {
      setCurrentTransaction(null);
    } else {
      setCurrentTransaction(transaction);
      setCurrentAmount(transaction.amount); // checked
      setCurrentNote(transaction.note);
      setCurrentDate(transaction.date);
      setVisible(true);
      resetSlideView();
    }
  };
  const view = (
    <View style={styles.container}>
      <NavigationEvents
        onWillBlur={loadResources}
        onWillFocus={loadResources}
      />
      <StatusBar style={statusBarStyle.type} />
      <Navbar
        boldMessage={boldMessage}
        normalMessage={normalMessage}
        avatarImage={avatarImage}
        settingsBtnPressed={settingsBtnPressed}
        navigation={navigation}
        isUserLoggedIn={isUserLoggedIn}
      />
      <View style={styles.northPanel}>
        <BalanceView
          currentBalanceValue={currentBalance}
          currentSpentValue={currentSpentBalance}
        />
      </View>
      <View style={styles.centerPanel}>

        <StickyTable
          currentTableHeight={currentTableHeight}
          currentTransactions={currentTransactions}
          currentTransaction={currentTransaction}
          key={currentTransactions}
          transactionBtnPressed={transactionBtnPressed}
          deleteBtnPressed={deleteBtnPressed}
          isSyncing={isSyncing}
          onPullRefresh={onPullRefresh}
          shouldRefresh={shouldRefresh}
        />

      </View>
      <Animated.View
        style={[
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
          styles.southPanelWithShadows,

        ]}
      >
        <TransactionInputPanel
          addBtnPressed={createNewTransaction}
          categoryBtnPressed={categoryBtnPressed}
          currentCategories={currentCategories}
          isCurrentCategory={isCurrentCategory}
          inputAmountValue={currentAmount}
          numberBtnPressed={numberBtnPressed}
          backspaceBtnPressed={backspaceBtnPressed}
          isAmountInputEditable={false}
        />
      </Animated.View>

      <BottomSheet
        visible={visible}
        onDismiss={onDismissBottomSheet}
      >
        <SlideView
          currentSlidePosition={currentSlidePosition}
          currentTransaction={currentTransaction}
          categoryBtnPressed={categoryBtnPressed}
          currentCategories={currentCategories}
          currentCategory={currentCategory}
          // resetSlideView={resetSlideView}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          currentAmount={Math.abs(currentAmount).toFixed(2)}
          setCurrentAmount={setCurrentAmount}
          updateTransactionCategory={updateTransactionCategory}
          updateTransactionNote={updateTransactionNote}
          updateTransactionAmount={updateTransactionAmount}
          updateTransactionDate={updateTransactionDate}
          currentDate={currentDate}
          closeSlideView={() => {}} // setVisible(false)}
        />
      </BottomSheet>

      {
        isLoading && spinnerMask
      }
    </View>
  );
  return view;
}
