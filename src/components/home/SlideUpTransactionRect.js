
import React, { useState, useEffect } from 'react';

import {
  // StyleSheet,
  View,
  Text,
  // SafeAreaView,
  TouchableOpacity,
  FlatList,
  // ScrollView,
  // Alert,
  ActivityIndicator,
} from 'react-native';

import { NavigationEvents } from 'react-navigation';

// import Auth from '@aws-amplify/auth';

// import { TouchableOpacity } from 'react-native-gesture-handler';

// import SpinnerMask from '../SpinnerMask';

import SlideViewSeparator from '../SlideViewSeparator';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

// import DatePicker from 'react-native-datepicker';

// import DateTimePicker from '@react-native-community/datetimepicker';

// import MyDateTimePicker from '../../../storybook/stories/MyDateTimePicker';

import MyCalendarPicker from '../../../storybook/stories/MyCalendarPicker';

import TouchableText from '../../../storybook/stories/TouchableText';

import getFormattedDateString from '../../functions/getFormattedDateString';

import getCurrencySymbol from '../../functions/getCurrencySymbol';

import NoteTextInput from '../NoteTextInput';

import searchByID from '../../../src/functions/searchByID';

import {
  loadSettingsStorage,
  // saveSettingsStorage,
} from '../../storage/SettingsStorage';

// test label
const dateLabel = {
  // width: 242,
  height: 28,

  // flex: 1,


  // width: '100%',
  // height: '30%',
  fontFamily: 'SFProDisplay-Regular',
  // fontSize: 15,
  // fontWeight: 'normal',
  // fontStyle: 'normal',
  // letterSpacing: 0.13,
  textAlign: 'center',
  color: colors.tangerine,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

// amountlabel style
const amountLabel = {
  // width: 66,
  height: 30,

  // flex: 1,


  // width: '90%',
  height: '50%',
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 25,
  // fontWeight: 'normal',
  // fontStyle: 'normal',
  // letterSpacing: 0.13,
  textAlign: 'center',
  color: colors.white,

  // backgroundColor: colors.dark,

  // paddingBottom: 10,
  // paddingTop: 6,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};


function SlideUpTransactionRect(props) {
  let { transaction, updateTransactionCategory, updateTransactionNote, updateTransactionDate, shouldShowCalendarPicker, setShouldShowCalendarPicker, setTop, isUpdatingTransaction } = props;


  // const [dataIsLoaded, setDataIsLoaded] = useState(false);

  // const [textLabel, setTextLabel] = useState('');

  const [currentAmount, setCurrentAmount] = useState(0);

  const [currentDate, setCurrentDate] = useState(null);

  // const [transaction, setTransaction] = useState(props.transaction);

  // const [shouldShowCategoryBox, setShouldShowCategoryBox] = useState(true);

  const [categories, setCategories] = useState([]);

  const [isReady, setIsReady] = useState(false);

  // const [currentTransaction, setCurrentTransaction] = useState(null);

  // const [currentCategory, setCurrentCategory] = useState(null);

  // const [currentCategories, setCurrentCategories] = useState([]);

  // const [transactions, setTransactions] = useState(null);

  // const [storageKey, setStorageKey] = useState('CURRENT_USER');

  const [flatListData, setFlatListData] = useState([]);

  // const [pickerDate, setPickerDate] = useState("2016-05-15");

  // const showCategoryPicker = () => {
  //   console.log('Choose Category');

  //   setShouldShowCategoryBox(true);
  // };

  // const [shouldShowCalendarPicker, setShouldShowCalendarPicker] = useState(false);

  const [pickerBtnText, setPickerBtnText] = useState('Pick a currentDate');

  // const [shouldShowNoteInput, setShouldShowNoteInput] = useState(true);

  // const [shouldShowNoteInputBtn, setShouldShowNoteInputBtn] = useState(true);

  // const updateStoredTransactionCategory = async (category) => {
  //   // load stored user transactions
  //   try {
  //     const storageObj = await loadSettingsStorage(storageKey);

  //     const found = searchByID(transaction.id, storageObj.transactions);

  //     if (found) {
  //       found.category = category;

  //       found.type = category.type;

  //       const pos = storageObj.transactions.indexOf(found);

  //       if (storageObj.transactions[pos].type === 'income' && storageObj.transactions[pos].amount < 0) {
  //         storageObj.transactions[pos].amount = storageObj.transactions[pos].amount * -1;
  //       } else if (storageObj.transactions[pos].type === 'expense' && storageObj.transactions[pos].amount >= 0) {
  //         storageObj.transactions[pos].amount = storageObj.transactions[pos].amount * -1;
  //       }

  //       // console.log(storageObj.transactions[pos]);

  //       saveSettingsStorage(storageKey, storageObj);

  //       props.handleTransactionChange(storageObj.transactions, storageObj.transactions[pos]);
  //     }
  //   } catch (e) {
  //     // statements
  //     Alert.alert('Could not update transaction');
  //     // console.log(e);
  //   }
  // };


  function Item({ item }) {
    // return (
    //   <View style={styles.item}>
    //     <Text style={styles.title}>{title}</Text>
    //   </View>
    // );

    let { color } = item.value;

    let backgroundColor = 'transparent';

    let borderColor = color;

    if (transaction.category) {
      if (transaction.category.name === item.value.name) {
      backgroundColor = color;
      borderColor = 'transparent';
      color = colors.white;

      if (backgroundColor === colors.white) {
        color = colors.darkTwo;
      }
    }
    }

    

    const view = (
      <TouchableOpacity
        // disabled={!isEnabled}
        style={
          {
            // maxHeight: MAX_PILL_HEIGHT,
            minWidth: MIN_PILL_WIDTH,
            maxWidth: MAX_PILL_WIDTH,

            // height: 28,

            alignItems: 'center',
            // justifyContent: 'center',

            marginHorizontal: 4,
            // marginVertical: 10,

            borderRadius: 17,
            borderWidth: 1,
            borderStyle: 'solid',

            borderColor,

            backgroundColor,
          }
        }

        // key={id}

        onPress={() => {
          // find existing category
          const found = searchByID(item.value.id, categories);

          if (found) {
            transaction.category = found;
            updateTransactionCategory(item.value);
          }
        }}
      >

        <Text
          style={[
            styles.textStyle,
            {
              paddingHorizontal: 12,
              // paddingBottom: 1,
              color
            }
          ]}
        >

          { item.value.name }
        </Text>
      </TouchableOpacity>
    );

    return view;
  }


  async function retrieveCognitoUserKey() {
    // console.log('loading');
    // Auth.currentAuthenticatedUser()
    //   .then((cognito) => {
    //     setStorageKey(cognito.username);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     console.log(err);
    //   });
  }

  const retrieveStoredCategories = async () => {
    // console.log(key);
    // load stored user categories
    try {
      const userObject = await loadSettingsStorage(global.storageKey);

      // user categories from stored user
      setCategories(userObject.categories);
      // console.log('userObject.categories: ', userObject.categories);
      // console.log('User:', userObject.categories);
      // setCurrentCategory(props.currentCategory);
      // setCurrentCategories(props.currentCategories);
    } catch (e) {
      // statements
      console.log('Could not retrieve stored user categories\n', e);
    }
  };

  const clearState = async () => {
    setIsReady(false);
    // setShouldShowCategoryBox(true);
    setShouldShowCalendarPicker(false);
    setFlatListData([])
    setCurrentDate(null)
    setCurrentAmount(0)
    setCategories([])
    // setShouldShowNoteInput(true);
    // setShouldShowNoteInputBtn(true);
    // setShadowOffset(props.shadowOffset);
    // setShadowRadius(props.shadowRadius);
    // setShadowOpacity(props.shadowOpacity);
    // setTopPosition(props.topPosition);
    // setZIndex(props.zIndex);

    // await retrieveCognitoUserKey();
    retrieveStoredCategories();
    // console.log('Finished');
    // setIsReady(true);
  };

  const chooseCategoryBtnPressed = () => {
    if (shouldShowCategoryBox) {
      setShouldShowCategoryBox(false);
    } else {
      setShouldShowCategoryBox(true);
    }
  };

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
    // console.log(flatListData);
    return list;
  }

  // function showNoteInput() {
  //   setShouldShowNoteInput(true);
  // }

  // function hideNoteInput() {
  //   setShouldShowNoteInput(false);
  // }

  // function showNoteInputBtn() {
  //   setShouldShowNoteInputBtn(true);
  // }

  // function hideNoteInputBtn() {
  //   setShouldShowNoteInputBtn(false);
  // }

  // function noteInputBtnPressed() {
  //   if (shouldShowNoteInput) {
  //     hideNoteInput();
  //     showNoteInputBtn();
  //   } else {
  //     showNoteInput();
  //     hideNoteInputBtn();
  //   }
  // }

  // console.log(getFlatListDataFromObject(colors));

  useEffect(() => {
    // clearState();
    retrieveStoredCategories();
  }, []);

  useEffect(() => {
    if (shouldShowCalendarPicker) {
      setTop(-180);
      // setIsNoteInputEditable(false);
    } else if (!shouldShowCalendarPicker) {
      setTop(80);
      // setIsNoteInputEditable(true);
    }
    return () => {
      // effect
    };
  }, [shouldShowCalendarPicker]);

  // useEffect(() => {
  //   if (storageKey) {
  //     // console.log(storageKey);
  //     retrieveStoredCategories(storageKey); // for user categories
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [storageKey]);

  useEffect(() => {
    if (categories) {
      setFlatListData(getFlatListDataFromObject(categories));

      // setIsReady(true);
    }
    return () => {
      // effect
    };
  }, [categories]);

  useEffect(() => {
    // console.log('Mount');
    if (transaction) {
      setCurrentAmount(transaction.amount);

      setCurrentDate(transaction.date);

      setPickerBtnText(`${getFormattedDateString(transaction.date)}`);



      setIsReady(true)

      // setShouldShowCalendarPicker(false);

      // setPickerBtnText(transaction.currentDate);

      // setShouldShowCalendarPicker(false);
      // setIsNoteInputEditable(true);
    }
    return () => {
      setShouldShowCalendarPicker(false);
    }

  }, [transaction]);

  function pickerBtnPressed() {
    // console.log(shouldShowCalendarPicker);
    if (!shouldShowCalendarPicker) {
      setShouldShowCalendarPicker(true); // show cal
    } else {
      setShouldShowCalendarPicker(false);
    }
  }

  // let categoryBox = (
  //   <FlatList
  //     horizontal
  //     showsHorizontalScrollIndicator={false}
  //     decelerationRate={0}
  //     snapToAlignment="center"

  //     flatListData={flatListData}
  //     renderItem={({ item }) => <Item item={item} transaction={transaction} />}
  //     keyExtractor={(item) => item.key}
  //   />
  // );

  // const datePicker = (
  //   <MyDateTimePicker currentDate={new Date(currentDate)} />
  // );

  let calendarPicker = (
    <View style={
      {
        // flex: 1,
        // borderTopWidth: 0.5,
        // borderColor: 'lightgray',
        // borderStyle: 'solid',

        // padding: 3,

        // marginBottom: 6,
        alignItems: 'center',
        // justifyContent: 'center',

        // paddingVertical: 3,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }
    }>
      <MyCalendarPicker isUpdatingTransaction={isUpdatingTransaction} initalDate={new Date(currentDate)} updateTransactionDate={updateTransactionDate} />
    </View>
  );

  let noteInput = (
    <NoteTextInput
      transaction={transaction}
      updateTransactionNote={updateTransactionNote}
      setShouldShowCalendarPicker={setShouldShowCalendarPicker}
      // isUpdatingTransaction={isUpdatingTransaction}
    />
  );

  // let noteInputBtn = <TouchableText title="Add Note" onPress={noteInputBtnPressed} />;


  // let view = <View style={
  //   {
  //     flex: 1,
  //     borderWidth: 1,
  //     borderColor: 'white',
  //     borderStyle: 'solid',
  //   }
  // }><ActivityIndicator /></View>
  // let view = null;

  // let box = null;

  // let pickerBtn = null;

  // let noteInputBtn = null;

  const touchableText = (
    <TouchableText
      style={
        dateLabel
        // {
        //   color: colors.tangerine,
        // }
      }
      title={pickerBtnText}
      onPress={pickerBtnPressed}

    />
  );

  // if (!shouldShowCategoryBox) {
  //   categoryBox = null;
  // }

  // if (!shouldShowNoteInput) {
  //   noteInput = null;
  // }

  // // Calendar
  // if (shouldShowCalendarPicker) {
  //   // showing calendar
  //   // set slide window height
  //   props.setWindowHeight('38%');
  //   // noteInputBtn = null;
  //   // noteInput = null;
  // } else if (!shouldShowCalendarPicker) {
  //   // hiding calendar
  //   props.setWindowHeight('58%');
  //   calendarPicker = null;

  //   // pickerBtn = touchableText;
  // }

  // if (!shouldShowNoteInputBtn) {
  //   noteInputBtn = null;
  // }

  let updatingTransactionIndicator = (
    <View style={
      {
        flex: 1,
        left: 0,
        right: 0,
        top: -100,
        bottom: -100,

        justifyContent: 'center',

        backgroundColor: colors.dark,

        position: 'absolute',

        opacity: 0.1,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }
    }>
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );

  // if (isReady && dataIsLoaded && transaction) {
  let view = (
    <View style={
          [
            styles.slideUpTransactionRect,
            {
              borderTopWidth: 1,
              borderTopColor: colors.dark,
              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',

              zIndex: -1,
            }
          ]
        }
      >
  {
    transaction &&
      <View>
        <NavigationEvents
          // try only this. and your component will auto refresh when this is the active component
          onWillFocus={() => {
          clearState()
          }} // {(payload) => clearState()}
          // other props
          // onDidFocus={payload => console.log('did focus',payload)}
          // onWillBlur={clearState} // console.log('will blur',payload)}
          // onDidBlur={payload => console.log('did blur',payload)}
        />
      
      <View
        style={
          {
            // flexDirection: 'row',

            // justifyContent: 'center',
            alignItems: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',

            // paddingHorizontal: 6,
            // marginTop: 10,

          }
        }
      >

        <SlideViewSeparator />

        {
          isReady && (
            <View style={styles.dateAmountRectangle}>
              <View style={
                {

                  // position: 'absolute',
                }
              }>
              {
                touchableText
              }
              </View>
            <Text style={amountLabel}>
              <Text style={{ color: colors.offWhite }}>
                {`${getCurrencySymbol(currentAmount)}`}
              </Text>
              {`${Math.abs(currentAmount).toFixed(2)}`}
            </Text>
          </View>
          )
        }
        </View>

        <View
          style={{
            // height: '50%',
            // backgroundColor: colors.darkTwo,

            // borderWidth: 1,
            // borderColor: 'red',
            // borderStyle: 'solid',

            padding: 2,

            // backgroundColor: colors.darkTwo,
          }}
        >
         {
              shouldShowCalendarPicker && (
              <View style={
                {
                  // position: 'absolute',
                  // left: 0,
                  // right: 0,
                  top: -75,
                }
              }>
              {
                calendarPicker
              }

              {
                <TouchableText
                  style={
                    dateLabel
                    // {
                    //   color: colors.tangerine,
                    // }
                  }
                  title="Go Back"
                  onPress={pickerBtnPressed}

                />
              }
              </View>
              )
            }

             <FlatList
                contentContainerStyle={{
                  // alignItems: 'center',
                  paddingHorizontal: 5,
                  paddingVertical: 6,

                  // marginVertical: 3,

                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                // decelerationRate={0}
                // snapToAlignment="cesnter"

                data={flatListData}
                renderItem={({ item }) => <Item item={item} transaction={transaction} />}
                keyExtractor={(item) => item.key}
              />

              {
                // !isUpdatingTransaction &&
                noteInput
              }

              {
                !isReady && updatingTransactionIndicator
              }

          </View>

          
      </View>
  }
  </View>
);
  return view;
}


export default SlideUpTransactionRect;
