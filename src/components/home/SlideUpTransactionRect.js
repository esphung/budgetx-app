
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

import AmountInputView from './AmountInputView'

import searchByID from '../../../src/functions/searchByID';

import {
  loadSettingsStorage,
  // saveSettingsStorage,
} from '../../storage/SettingsStorage';

// test label
const dateLabel = {
  // width: 242,
  // height: 28,

  // flex: 1,


  width: '100%',
  // height: '30%',
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 16,
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
  // height: 30,

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
  const {
    transaction,
     updateTransactionCategory,
     updateTransactionNote,
     updateTransactionDate,
    isEditable,
    value,
    handleChange,
     shouldShowCalendarPicker,
     setShouldShowCalendarPicker,
     setTop, isUpdatingTransaction
   } = props;

  const [currentAmount, setCurrentAmount] = useState(0);

  const [currentDate, setCurrentDate] = useState(null);

  const [currentCategories, setCurrentCategories] = useState([]);

  const [isReady, setIsReady] = useState(true);

  const [flatListData, setFlatListData] = useState([]);

  const [pickerBtnText, setPickerBtnText] = useState('Pick a currentDate');

  const [currentTransaction, setCurrentTransaction] = useState(null);

  const clearState = async () => {
    setIsReady(false);
    setCurrentTransaction(null);
    setShouldShowCalendarPicker(false);
    setFlatListData([])
    setCurrentDate(null)
    setCurrentAmount(0)
    setCurrentCategories([]);
    setIsReady(true)
  };

  function Item({ item }) {

    let { color } = item.value;

    let backgroundColor = 'transparent';

    let borderColor = color;

    if (currentTransaction.category) {
      if (currentTransaction.category.name === item.value.name) {
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
        style={
          {
            minWidth: MIN_PILL_WIDTH,
            maxWidth: MAX_PILL_WIDTH,
            alignItems: 'center',
            marginHorizontal: 4,
            borderRadius: 17,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor,
            backgroundColor,
          }
        }
        onPress={() => {
          // find existing category
          const found = searchByID(item.value.id, currentCategories);

          if (found) {
            currentTransaction.category = found;
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

  const retrieveStoredCategories = async () => {
    // console.log(key);
    // load stored user currentCategories
    let categories = [];
    try {
      const userObject = await loadSettingsStorage(global.storageKey);

      // setCurrentCategories(userObject.categories);
      categories = userObject.categories;
    } catch (e) {
      // statements
      console.log('Could not retrieve stored user currentCategories\n', e);
    }
    console.log(...categories);
    return categories;
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

  const loadCategories = async () => {
    let categories = await retrieveStoredCategories();
    setCurrentCategories(categories);
  };

  useEffect(() => {
    clearState();
    loadCategories();
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
  //     retrieveStoredCategories(storageKey); // for user currentCategories
  //   }
  //   return () => {
  //     // effect
  //   };
  // }, [storageKey]);

  useEffect(() => {
    if (currentCategories) {
      setFlatListData(getFlatListDataFromObject(currentCategories));

      // setIsReady(true);
    }
    return () => {
      // effect
    };
  }, [currentCategories]);

  useEffect(() => {
    // console.log('Mount');
    if (transaction) {
      setCurrentTransaction(transaction);

      setCurrentAmount(transaction.amount);

      setCurrentDate(transaction.date);

      setPickerBtnText(`${getFormattedDateString(transaction.date)}`);
    }
    return () => {
      // clearState();
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
        alignItems: 'center',
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

  const touchableText = (
    <TouchableText
      style={dateLabel}
      title={pickerBtnText}
      onPress={pickerBtnPressed}
    />
  );

  const updatingTransactionIndicator = (
    <View style={
      {
        left: 0,
        right: 0,
        top: 200,
        bottom: 0,
        // justifyContent: 'center',
        // backgroundColor: colors.dark,
        // position: 'absolute',
        // opacity: 0.1,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
        // zIndex: 0,
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
              // zIndex: -1,
            }
          ]
        }
      >
  {
    transaction &&
      <View>
        <NavigationEvents
          // try only this and your component will auto refresh when this is the active component
          onWillFocus={
            async (payload) =>
            {
              clearState();
              loadCategories();
            }
          } // {(payload) => clearState()}
          // other props
          // onDidFocus={payload => console.log('did focus',payload)}
          // onWillBlur={clearState} // console.log('will blur',payload)}
          // onDidBlur={payload => console.log('did blur',payload)}
        />
      
      <View style={{ alignItems: 'center', }}>
        <SlideViewSeparator />

        {/* date label */}
        {
          isReady &&

          (
            <View style={[
              styles.dateAmountRectangle,
              {

              }
              ]}>
         { 
                touchableText
              }
              <AmountInputView
              isEditable={true}
              value={value}
              handleChange={handleChange} />
{/*
              <Text style={[amountLabel, {
                // fontSize: 19,
              }] }>
                {
                  `${getCurrencySymbol(currentAmount)}`
                }
                {`${Math.abs(currentAmount).toFixed(2)}`}
              </Text>*/}
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
/*                <TouchableText
                  style={
                    dateLabel
                    // {
                    //   color: colors.tangerine,
                    // }
                  }
                  title="Go Back"
                  onPress={pickerBtnPressed}

                />*/
              }

              </View>
              )
            }

             <FlatList
                contentContainerStyle={{
                  alignItems: 'center',
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
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                height: 100,
                width: '90%',
                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }}>
             
                
              </View>

              {
                // !isReady && updatingTransactionIndicator
              }

          </View>

          
      </View>
  }
  </View>
);
  return view;
}


export default SlideUpTransactionRect;
