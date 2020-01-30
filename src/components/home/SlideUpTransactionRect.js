
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  // SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

import Auth from '@aws-amplify/auth';

// import { TouchableOpacity } from 'react-native-gesture-handler';

// import SpinnerMask from '../SpinnerMask';

import SlideViewSeparator from '../SlideViewSeparator';

// ui colors
import colors from 'main/colors';

import styles from 'main/styles';

import { getCurrencySymbol, getFormattedDateString } from '../functions';

import NoteTextInput from '../NoteTextInput';

import BlueButton from 'main/storybook/stories/BlueButton';

import Dialog from 'react-native-dialog';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../storage/SettingsStorage';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//     color: 'white',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//     color: 'white',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//     color: 'white',
//   },
// ];

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





const SlideUpTransactionRect = (props) => {
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

  // const showCategoryPicker = () => {
  //   console.log('Choose Category');

  //   setShouldShowCategoryBox(true);
  // };

  const updateStoredTransactionCategory = async (category) => {
    // console.log(category)
    // console.log(string);

    // console.log(currentTransaction.id);

    
    // load stored user transactions
    try {
      const storageObj = await loadSettingsStorage(storageKey);
      // console.log(transaction);
      const list = storageObj.transactions;

      const found = searchByID(transaction.id, list);

      if (found) {
        found.category = category

        found.type = category.type

        const pos = list.indexOf(found);
        // console.log(pos);
        // console.log(list[pos]);

        list[pos] = found

        storageObj.transactions[pos] = list[pos]

        if (storageObj.transactions[pos].type === 'income' && storageObj.transactions[pos].amount < 0) {
          storageObj.transactions[pos].amount = storageObj.transactions[pos].amount * -1
        } else if (storageObj.transactions[pos].type === 'expense' && storageObj.transactions[pos].amount >= 0) {
          storageObj.transactions[pos].amount = storageObj.transactions[pos].amount * -1
        }

        // console.log(storageObj.transactions[pos]);

        saveSettingsStorage(storageKey, storageObj);

        props.handleTransactionChange(storageObj.transactions)

        // props.handleTransactionChange(storageObj.transactions[pos])




        // setData(getFlatListDataFromObject(categories))

        // setTransactions(list);

        // setCurrentPayee(null);
        // setCurrentNote(null);
        // setCurrentAmount(initialState.currentAmount);
        // setCurrentCategory(initialState.currentCategory);
        // setCurrentTransaction(list[pos]);
        // setCurrentType(initialState.currentType);

        // return from here
        // return;



        // let i = storageObj.transactions.length - 1;
        // for (i; i >= 0; i -= 1) {
        //   if (storageObj.transactions[i].id === found.id) {
        //     // set user transaction payee
        //     storageObj.transactions[i] = found;

        //     // console.log(storageObj.transactions[i]);

        //     // save transactions list
        //     // saveUserObject(userObject);
        //     // saveSettingsStorage(this.state.storageKey, userObject);

        //     saveSettingsStorage(storageKey, storageObj);

        //     setTransactions(storageObj.transactions);

        //     // setCurrentPayee(null);
        //     // setCurrentNote(null);
        //     // setCurrentAmount(initialState.currentAmount);
        //     // setCurrentCategory(initialState.currentCategory);
        //     setCurrentTransaction(storageObj.transactions[i]);
        //     // setCurrentType(initialState.currentType);

        //     // return from here
        //     // return;
        //   }
        // }
        }
      } catch (e) {
        // statements
        // Alert.alert('Could not load settings');
        // console.log(e);
      }
  };


  function Item({ item }) {
  // return (
  //   <View style={styles.item}>
  //     <Text style={styles.title}>{title}</Text>
  //   </View>
  // );

  let color = item.value.color;

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

          // height: '60%', // 37,

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
        // console.log(item.value); // category picked

        if (searchByID(item.value.id, categories)) {
          // console.log(true);
          transaction.category = item.value

          updateStoredTransactionCategory(item.value)

          // clearState();

          // props.dismiss();

          // clearState()

          // console.log(props);
        }

        // console.log(transaction);


      }}
    >

      <Text style={
        {
          paddingHorizontal: 12,
          paddingBottom: 1,

          fontFamily: 'SFProDisplay-Regular',
          fontSize: 17,
          fontWeight: 'normal',
          fontStyle: 'normal',
          letterSpacing: 0.12,

          color: color,
        }
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
  }

  const chooseCategoryBtnPressed = () => {
    if (shouldShowCategoryBox) {
      setShouldShowCategoryBox(false);
    } else {
      setShouldShowCategoryBox(true);
    }
  };

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
    // console.log(data);
    return data;
  }

  // console.log(getFlatListDataFromObject(colors));

  useEffect(() => {
    clearState()
    // return () => {
    //   // effect
    // };
  }, [])

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
    <View style={[
      // styles.container,
      {
      // paddingTop: 12,
      // justifyContent: 'center',


      alignItems: 'center',


      // height: 200,
      // width: 300,

      // backgroundColor: 'gray',

      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'dashed',
    }]}
    >
        <View style={
          {
            flexDirection: 'row',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',

            padding: 6,

          }
        }>
        {/*<Dialog.Button label="Cancel" onPress={() => {
          setShouldShowCategoryBox(false);
        }} />*/}
       {/* <BlueButton title="Cancel" onPress={() => setShouldShowCategoryBox(false)}/>*/}
{/*        <Dialog.Button label="Ok" onPress={() => {
          console.log('Select Pressed');
        }} />*/}



{/*      <FlatList
        data={getFlatListDataFromObject(colors)}
        // renderItem={({ item }) => <Item item={item} onPress={() => updateCategoryColor(item.key, colors[item.key])} />}
        keyExtractor={(item) => item.key}
      />*/}

{/*      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          paddingLeft: 10,

          paddingRight: 12,

          borderWidth: 1,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        // snapToInterval={MIN_PILL_WIDTH} // your element width
        snapToAlignment="center"

        style={styles.scrollView}
      >
        */}

        <FlatList
        contentContainerStyle={{
          alignItems: 'center',


          // paddingHorizontal: 10,

        }}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToAlignment="center"

          data={data}
          renderItem={({ item }) => <Item item={item} transaction={transaction} />}
          keyExtractor={item => item.key}
        />

      {/*</ScrollView>*/}

      


          {/*<BlueButton title="Ok" onPress={() =>  console.log('Select Pressed')}/>*/}
        

        </View>
      
    </View>
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
    // return () => {
    //   // effect
    //   // console.log('clean up');
    // };
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
    box = categoryBox
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


        <View style={{
          
          // flex: 1,

          alignSelf: 'stretch',

          // width: '100%',

          // height: '60%',

          backgroundColor: colors.dark,

          // borderWidth: 1,
          // borderColor: 'red',
          // borderStyle: 'solid',
        }}>


{/*          <TouchableOpacity
            style={[
              styles.tableItemStyle,
              {
                // backgroundColor: colors.dark,
                flexDirection: 'row',
                // marginVertical: 1,
              }]}
            onPress={() =>  {
              chooseCategoryBtnPressed();
            }}
          >
            <View style={{
              flex: 1,
            }}><Text style={styles.listItemTitleStyle}>Choose Category</Text></View>

            <View style={{
              // flex: 0.1,
              // justifyContent: 'center',
              // alignItems: 'flex-end',
              // height: '100%',
              // borderWidth: 1,
              // borderColor: 'red',
              // borderStyle: 'solid',
            }}
            >
              <Text style={styles.arrow}>></Text>
            </View>
          </TouchableOpacity>*/}


          <View style={[
      // styles.container,
      {
      // paddingTop: 12,
      // justifyContent: 'center',


      alignItems: 'center',


      // height: 200,
      // width: 300,

      // backgroundColor: 'gray',

      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'dashed',
    }]}
    >
        <View style={
          {
            flexDirection: 'row',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',

            padding: 6,

          }
        }>
        {/*<Dialog.Button label="Cancel" onPress={() => {
          setShouldShowCategoryBox(false);
        }} />*/}
       {/* <BlueButton title="Cancel" onPress={() => setShouldShowCategoryBox(false)}/>*/}
{/*        <Dialog.Button label="Ok" onPress={() => {
          console.log('Select Pressed');
        }} />*/}



{/*      <FlatList
        data={getFlatListDataFromObject(colors)}
        // renderItem={({ item }) => <Item item={item} onPress={() => updateCategoryColor(item.key, colors[item.key])} />}
        keyExtractor={(item) => item.key}
      />*/}

{/*      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          paddingLeft: 10,

          paddingRight: 12,

          borderWidth: 1,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        // snapToInterval={MIN_PILL_WIDTH} // your element width
        snapToAlignment="center"

        style={styles.scrollView}
      >
        */}

        <FlatList
        contentContainerStyle={{
          alignItems: 'center',


          // paddingHorizontal: 10,

        }}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToAlignment="center"

          data={data}
          renderItem={({ item }) => <Item item={item} transaction={transaction} />}
          keyExtractor={item => item.key}
        />

      {/*</ScrollView>*/}

      


          {/*<BlueButton title="Ok" onPress={() =>  console.log('Select Pressed')}/>*/}
        

        </View>
      
    </View>


                  


{/*          <View style={{
            alignSelf: 'center',
            width: '80%',
            borderWidth: 0.5,
            borderColor: 'gray',

            opacity: 0.3,
            // borderStyle: 'solid',
          }} />*/}


          { box }

{/*          <NoteTextInput
            transaction={transaction}
            // handleNoteChange={handleNoteChange}
            updateStoredTransactionNote={props.updateStoredTransactionNote}
          />*/}
        </View>
      </View>
    );
  }

  // if (shouldShowCategoryBox) {
  //   view = categoryBox;
  // }

  return view;
};

// const styles = StyleSheet.create({
//   container: {

//     // alignItems: 'center',

//     // borderWidth: 1,
//     // borderColor: 'pink',
//     // borderStyle: 'dashed',
//   },

//   dateAmountRectangle: {
    
//     alignSelf: 'center',
//     // justifyContent: 'center',
//     width: '95%', // 346,
//     // height: '50%', // 74,

//     // marginTop: '2%',

//     borderRadius: 9,
//     backgroundColor: colors.dark,
//     shadowColor: '#0f1725',
//     shadowOffset: {
//       width: 5,
//       height: 5,
//     },
//     shadowRadius: 16,
//     shadowOpacity: 1,

//     // borderWidth: 2,
//     // borderColor: 'white',
//     // borderStyle: 'dashed',
//   },
// });

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
  height: 30,

  // flex: 1,


  width: '100%',
  // height: '50%',
  fontFamily: 'SFProDisplay-Regular',
  fontSize: 25,
  fontWeight: 'normal',
  fontStyle: 'normal',
  letterSpacing: 0.29,
  textAlign: 'center',
  color: colors.white,

  // paddingBottom: 10,
  // paddingTop: 6,

  // borderWidth: 1,
  // borderColor: 'white',
  // borderStyle: 'solid',
};

export default SlideUpTransactionRect;
