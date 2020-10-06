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

// import AsyncStorage from '@react-native-community/async-storage';

// import { showMessage } from 'react-native-flash-message';

import { StatusBar } from 'expo-status-bar';

import { NavigationEvents } from 'react-navigation';

// import GestureRecognizer from 'react-native-swipe-gestures';

// import colors from 'src/colors';

import styles from 'styles/Home';

// Home Components
// import SpinnerMask from 'components/SpinnerMask';

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

// import Category from 'models/Category';

import calculateBalance from 'functions/calculateBalance';

import calculateMonthSpent from 'functions/calculateMonthSpent';

// import searchByID from 'functions/searchByID';

// import incrementVersion from 'functions/incrementVersion';

// import filterOutNewestTransactions from 'functions/filterOutNewestTransactions';

// import filterCategories from 'functions/filterCategories';

// import getUniqueId from 'functions/getUniqueId';

/* my custom queries */
// import {
//   // DeleteTransaction,
//   // DeletePayee,
//   // DeleteCategory,
// } from '../storage/my_queries';

// import {
//   // UpdateCategory,
//   // AddCategory,
//   // ListCategories,
// } from '../queries/Category';

// import {
//   // UpdatePayee,
//   // AddPayee,
// } from '../queries/Payee';

import {
  // isDeviceOnline,
  // getAuthentication,
  // syncCategories,
  // getCognitoIdentity,
  getS3ProfileImage,
} from '../controllers/Network';

import {
  loadStorage,
  saveStorage,
  // storeUserCategories,
} from '../controllers/Storage';

// import {
//   UpdateTransaction,
//   // AddTransaction,
//   // ListTransactions,
// } from '../queries/Transaction';

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

// const spinnerMask = (
//   <View
//     style={{
//       position: 'absolute',
//       top: 0,
//       bottom: 0,
//       left: 0,
//       right: 0,
//       opacity: 0.2,
//     }}
//   >
//     <SpinnerMask />
//   </View>
// );

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

  // const [isLoading, setIsLoading] = useState(false);

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
  const saveTramsactions = async () => {
    await loadStorage(global.storageKey)
      .then((storage) => {
        storage.transactions = currentTransactions;
        saveStorage(global.storageKey, storage);
      });

    // if (await isDeviceOnline() && isDeviceSyncEnabled && await getAuthentication()) {
    //   currentTransactions.forEach((transaction) => {
    //     // statements
    //     UpdatePayee(transaction.payee);
    //     UpdateCategory(transaction.category);
    //     UpdateTransaction(transaction);
    //   });
    // }
  };
  const fetchData = async () => {
    // const online_transactions = await ListTransactions();
    // // console.log('online_transactions.length: ', online_transactions.length);

    // let list = online_transactions.filter((item) => {
    //   // console.log('item: ', item);
    //   if (!item.payee || !item.category) DeleteTransaction(item);
    //   return currentTransactions.find((element) => element !== item);
    // });
    Auth.currentAuthenticatedUser()
      .then(async (cognito) => {
        global.storageKey = cognito.attributes.sub;

        const bucketImageUrl = await getS3ProfileImage(cognito.attributes.sub);
        // console.log('bucketImageUrl: ', bucketImageUrl);
        setAvatarImage({ uri: bucketImageUrl });
        // console.log('cognito: ', cognito);

        await loadStorage(cognito.attributes.sub)
          .then((result) => {
            result.user.id = cognito.attributes.sub;
            result.user.email = cognito.attributes.email;
            result.user.email_verified = cognito.attributes.email_verified;
            result.user.name = cognito.attributes.name;
            result.user.sub = cognito.attributes.sub;
            result.user.image_url = bucketImageUrl;

            setBoldMessage((result.user.name) ? result.user.name : ((result.isDeviceSyncEnabled) ? 'Cross-Device Sync Enabled' : 'Cross-Device Sync Disabled'));

            setNormalMessage(result.user.email);

            setCurrentTransactions(result.transactions);

            setCurrentCategories(result.categories);

            setIsDeviceSyncEnabled(result.isDeviceSyncEnabled);

            setIsUserLoggedIn(true);
          });
      });
  };
  const retrieveUserStoredSettings = async () => {
    await loadStorage(global.storageKey)
      .then((storage) => {
        // update user attributes
        global.storageKey = storage.user.id;

        // update state variables
        setIsUserLoggedIn(false);

        setIsDeviceSyncEnabled(storage.isDeviceSyncEnabled);

        setAvatarImage({ uri: storage.user.image_url });

        if (storage.user.name) setBoldMessage(storage.user.name);

        if (storage.user.email) setNormalMessage(storage.user.email);

        // set displayed transactions
        setCurrentTransactions(storage.transactions);
        // set displayed categories
        setCurrentCategories(storage.categories);

        saveStorage(global.storageKey, storage);
      });
  };

  const loadResources = () => {
    retrieveUserStoredSettings();
    fetchData();
  };
  const updateTransactionDate = (date) => {
    currentTransaction.date = date;
    setShouldRefresh(true);
  };
  const updateTransactionCategory = (category) => {
    currentTransaction.category = category;
    currentTransaction.type = category.type;
  };
  const updateTransactionNote = (note) => {
    currentTransaction.note = note;
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
  const createNewTransaction = () => {
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
  // const displayByCategory = async () => {
  //   const storage = await loadStorage(global.storageKey);
  //   setCurrentTransactions(filterTransactionsByCategory(storage.transactions, currentCategory));
  // };
  const settingsBtnPressed = async () => {
    await loadStorage(global.storageKey).then(async (storage) => {
      navigation.navigate('Settings', {
        storage,
        isDeviceSyncEnabled,
        setIsDeviceSyncEnabled,
        isUserLoggedIn,
      });
    });
  };
  const onPullRefresh = () => loadResources();
  useEffect(() => {
    loadResources();
  }, []);
  useEffect(() => {
    // console.log('shouldRefresh: ', shouldRefresh);
    if (shouldRefresh) {
      setShouldRefresh(false);

      // PERFORMANCE TESTING
      // setTableRefreshes(tableRefreshes + 1);
      // console.log('Refreshed table..:', tableRefreshes);
    }
    return () => {
      setShouldRefresh(false);
      saveTramsactions();
      loadCurrentBalances();
    };
  }, [shouldRefresh]);
  useEffect(() => {
    loadCurrentBalances();
  }, [currentTransactions]);
  const deleteBtnPressed = async (transaction) => {
    const pos = currentTransactions.indexOf(transaction);
    currentTransactions.splice(pos, 1);
    // refresh table items
    setShouldRefresh(true);
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
      setCurrentAmount(transaction.amount); // checked
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
      resetSlideView();
      setVisible(true);
    }
  };
  const view = (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={loadResources} onWillFocus={loadResources} />
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
        />
      </BottomSheet>
      {
        // isLoading && spinnerMask
      }
    </View>
  );
  return view;
}
