
import React, { useState, useEffect } from 'react';

import {
  // StyleSheet,
  View,
  Text,
  // SafeAreaView,
  TouchableOpacity,
  FlatList,
  // ScrollView,
  Alert,
} from 'react-native';

import Auth from '@aws-amplify/auth';

// import { TouchableOpacity } from 'react-native-gesture-handler';

// import SpinnerMask from '../SpinnerMask';

import SlideViewSeparator from '../SlideViewSeparator';

// ui colors
import colors from 'main/colors';

import styles from 'main/styles';

import getFormattedDateString from '../../functions/getFormattedDateString';

import getCurrencySymbol from '../../functions/getCurrencySymbol';

import NoteTextInput from '../NoteTextInput';

// import DatePicker from 'react-native-datepicker';

// import DateTimePicker from '@react-native-community/datetimepicker';

import MyDateTimePicker from 'main/storybook/stories/MyDateTimePicker';

import MyCalendarPicker from 'main/storybook/stories/MyCalendarPicker';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../storage/SettingsStorage';

// arbitrary size limits
const MAX_PILL_WIDTH = 156;
const MIN_PILL_WIDTH = 54;
// const MAX_PILL_HEIGHT = 32;

// find previous obj if exists
function searchByID(key, myArray) {
  // console.log(nameKey);
  let obj = null;
  let i = 0;
  for (i; i < myArray.length; i += 1) {
    // console.log(myArray[i].id, nameKey);
    if (myArray[i].id === key) {
      obj = myArray[i];
    }
  }
  return obj;
}

function SlideUpTransactionRect(props) {
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const [textLabel, setTextLabel] = useState('');

  const [amount, setAmount] = useState(0.00);

  const [date, setDate] = useState(null);

  const [transaction, setTransaction] = useState(props.transaction);

  const [shouldShowCategoryBox, setShouldShowCategoryBox] = useState(true);


  const [categories, setCategories] = useState(null);

  const [isReady, setIsReady] = useState(false);

  // const [currentCategory, setCurrentCategory] = useState(null);

  // const [currentCategories, setCurrentCategories] = useState([]);

  // const [transactions, setTransactions] = useState(null);

  const [storageKey, setStorageKey] = useState(null);

  const [data, setData] = useState(null);

  const [pickerDate, setPickerDate] = useState("2016-05-15");

  // const showCategoryPicker = () => {
  //   console.log('Choose Category');

  //   setShouldShowCategoryBox(true);
  // };

  const updateStoredTransactionCategory = async (category) => {
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(storageKey);

      const found = searchByID(transaction.id, storageObj.transactions);

      if (found) {
        found.category = category;

        found.type = category.type;

        const pos = storageObj.transactions.indexOf(found);

        if (storageObj.transactions[pos].type === 'income' && storageObj.transactions[pos].amount < 0) {
          storageObj.transactions[pos].amount = storageObj.transactions[pos].amount * -1
        } else if (storageObj.transactions[pos].type === 'expense' && storageObj.transactions[pos].amount >= 0) {
          storageObj.transactions[pos].amount = storageObj.transactions[pos].amount * -1
        }

        // console.log(storageObj.transactions[pos]);

        saveSettingsStorage(storageKey, storageObj);

        props.handleTransactionChange(storageObj.transactions, storageObj.transactions[pos]);
      }
    } catch (e) {
      // statements
      Alert.alert('Could not update transaction');
      // console.log(e);
    }
  };


  function Item({ item }) {
    // return (
    //   <View style={styles.item}>
    //     <Text style={styles.title}>{title}</Text>
    //   </View>
    // );

    let { color } = item.value;

    let backgroundColor = 'transparent';

    let borderColor = color;

    if (transaction.category.name === item.value.name) {
      backgroundColor = color;
      borderColor = 'transparent'
      color = colors.white;
    }

    const view = (
      <TouchableOpacity
        // disabled={!isEnabled}
        style={
          {
            // maxHeight: MAX_PILL_HEIGHT,
            minWidth: MIN_PILL_WIDTH,
            maxWidth: MAX_PILL_WIDTH,

            height: 28,

            alignItems: 'center',
            justifyContent: 'center',

            marginHorizontal: 4,
            // marginVertical: 10,

            borderRadius: 17,
            borderWidth: 1,
            borderStyle: 'solid',

            borderColor: borderColor,

            backgroundColor: backgroundColor,
          }
        }

        // key={id}

        onPress={() => {
          // find existing category
          const found = searchByID(item.value.id, categories);

          if (found) {
            transaction.category = found;
            updateStoredTransactionCategory(item.value)
          }

        }}
      >

        <Text style={[
          styles.textStyle,
          {
            paddingHorizontal: 12,
            paddingBottom: 1,
            color: color
          }
          ]
          // {
          //   // paddingHorizontal: 12,
          //   // paddingBottom: 1,

          //   // fontFamily: 'SFProDisplay-Regular',
          //   // fontSize: 17,
          //   // fontWeight: 'normal',
          //   // fontStyle: 'normal',
          //   // letterSpacing: 0.12,

          //   color: color,
          // }
        }
        >

          { item.value.name }
        </Text>
      </TouchableOpacity>
    );

    return view;
  }


  async function retrieveCognitoUserKey() {
    // console.log('loading');
    Auth.currentAuthenticatedUser()
      .then((cognito) => {
        setStorageKey(cognito.username);
      })
      .catch((err) => {
        // console.log(err);
        console.log(err);
      });
  }

  const retrieveStoredCategories = async (key) => {
    // console.log(key);
    // load stored user categories
    try {
      const userObject = await loadSettingsStorage(key);

      // user categories from stored user
      setCategories(userObject.categories);
      // console.log('User:', userObject.categories);
      // setCurrentCategory(props.currentCategory);
      // setCurrentCategories(props.currentCategories);
    } catch (e) {
      // statements
      console.log('Could not retrieve stored user categories\n', e);
    }
  };

  const clearState = async () => {
    // setIsReady(false);
    setShouldShowCategoryBox(false);
    // setShadowOffset(props.shadowOffset);
    // setShadowRadius(props.shadowRadius);
    // setShadowOpacity(props.shadowOpacity);
    // setTopPosition(props.topPosition);
    // setZIndex(props.zIndex);

    retrieveCognitoUserKey();
    // console.log('Finished');
    // setIsReady(true);
  };

  // const chooseCategoryBtnPressed = () => {
  //   if (shouldShowCategoryBox) {
  //     setShouldShowCategoryBox(false);
  //   } else {
  //     setShouldShowCategoryBox(true);
  //   }
  // };

  function getFlatListDataFromObject(obj) {
    // console.log(obj);
    const list = [];
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    // console.log(Object.values(obj));
    // console.log(Object.keys(obj));
    // body...
    keys.forEach((key, index) => {
      // statements
      const item = {
        key,
        value: values[index],
      };
      // console.log('id', index, key, values[index]);
      list.push(item);
    });
    // console.log(data);
    return list;
  }

  // console.log(getFlatListDataFromObject(colors));

  useEffect(() => {
    clearState();
  }, []);

  useEffect(() => {
    if (storageKey) {
      // console.log(storageKey);
      retrieveStoredCategories(storageKey); // for user categories
    }
    return () => {
      // effect
    };
  }, [storageKey]);

  useEffect(() => {
    if (categories) {
      setIsReady(true);

      setData(getFlatListDataFromObject(categories));

      // console.log(getFlatListDataFromObject(categories));

      // setData(
      //   [
      //     {
      //       id: '3098432l',
      //       title:'Hello',
      //       color: 'orange'
      //     }
      //   ]
      // );
    }
    return () => {
      // effect
    };
  }, [categories]);


  const categoryBox = (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToAlignment="center"

        data={data}
        renderItem={({ item }) => <Item item={item} transaction={transaction} />}
        keyExtractor={(item) => item.key}
      />

    </View>
  );

  const datePicker = (
    <MyDateTimePicker date={new Date(date)} />
  );

  const calendarPicker = (
    <MyCalendarPicker date={new Date(date)} onDateChange={props.onDateChange} />
  );


  useEffect(() => {
    // console.log('Mount');
    setTransaction(props.transaction);

    if (transaction) {
      // console.log('transaction');

      setAmount(transaction.amount);

      setDate(transaction.date);

      setTextLabel(`${getFormattedDateString(date)}`); // 'Amount Spent on'
    }
  });

  useEffect(() => {
    if (amount && date && transaction && data) {
      setDataIsLoaded(true);
      // setIsReady(true)
    }
    return () => {
      // effect
    };
  }, [amount, date, transaction, data]);

  // let view = <SpinnerMask />;
  let view = <View />;

  let box = null;

  if (shouldShowCategoryBox) {
    box = categoryBox;
  }

  if (isReady && dataIsLoaded && transaction) {
    view = (
      <View
        style={
          [
            // styles.container,
            styles.slideUpTransactionRect
          ]
        }
      >

        <SlideViewSeparator />

        <View style={styles.dateAmountRectangle}>

          <Text style={dateLabel}>{ textLabel }</Text>

          <Text style={amountLabel}>
            <Text style={{ color: colors.offWhite }}>
              {`${getCurrencySymbol(amount)}`}
            </Text>
            {`${Math.abs(amount).toFixed(2)}`}
          </Text>
        </View>


        <View
          style={{
            // height: '100%',
            // backgroundColor: colors.darkTwo,

            // borderWidth: 1,
            // borderColor: 'red',
            // borderStyle: 'solid',
          }}
        >

          <View
            style={[
              // styles.container,
              {
                alignItems: 'center',

                // backgroundColor: 'gray',

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'dashed',
              }]}
          >
            <View
              style={
                {
                  flexDirection: 'row',

                  // borderWidth: 1,
                  // borderColor: 'white',
                  // borderStyle: 'solid',

                  padding: 6,

                }
              }
            >

              <FlatList
                contentContainerStyle={{
                  alignItems: 'center',
                  height: 28,
                  // paddingHorizontal: 10,

                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                decelerationRate={0}
                snapToAlignment="center"

                data={data}
                renderItem={({ item }) => <Item item={item} transaction={transaction} />}
                keyExtractor={(item) => item.key}
              />
            </View>
          </View>

          { box }

          <NoteTextInput
            transaction={transaction}
            // handleNoteChange={handleNoteChange}
            updateStoredTransactionNote={props.updateStoredTransactionNote}
          />

          {/* Date Picker */}

          {
            // datePicker
          }

          {
            calendarPicker
          }

        </View>
      </View>
    );
  }
  return view;
}


// test label
const dateLabel = {
  // width: 242,
  // height: 28,

  // flex: 1,


  width: '100%',
  height: '30%',
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 15,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0.1,
  textAlign: 'center',
  color: colors.tangerine,

  // paddingTop: 8,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

// amountlabel style
const amountLabel = {
  // width: 66,
  // height: 30,

  // flex: 1,


  width: '100%',
  height: '50%',
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 25,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0.29,
  textAlign: 'center',
  color: colors.white,

  backgroundColor: colors.dark,

  // paddingBottom: 10,
  // paddingTop: 6,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

export default SlideUpTransactionRect;
