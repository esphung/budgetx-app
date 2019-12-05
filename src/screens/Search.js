/*
FILENAME:   Search.js
PURPOSE:    search screen for budget x app
AUTHOR:     eric phung
UPDATED:    11/13/2019 05:26 AM
            12/02/2019 02:40 AM
            12/03/2019 12:00 PM
*/
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  // ActivityIndicator,
  // ScrollView,
  Animated,
  // Keyboard,
  // TouchableWithoutFeedback,
  // AsyncStorage
  Button,
  Text
} from 'react-native';

import * as Font from 'expo-font';

import {
  loadUserObject,
  saveUserObject
} from '../storage/UserStorage';

// components
import MyStickyTable from '../components/TransactionsTable/MyStickyTable';
import SpinnerMask from '../components/SpinnerMask';

import ScrollingPillCategoriesView from '../components/home/ScrollingPillCategoriesView';
import SlideUpView from '../components/home/SlideUpView';

// models
// import Transaction from '../models/Transaction';

// ui colors
import colors from '../../colors';

// date operators
// import { dates } from '../functions/dates';

// const headerRight = (
//   <View style={{
//     flex: 1,
//     width: 45,
//     height: '100%', // 19.9,
//     backgroundColor: colors.darkTwo,

//     shadowColor: '#0000002e.68f5c28f5c28',
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowRadius: 4,
//     shadowOpacity: 1,

//     borderWidth: 1,
//     borderColor: 'white',
//     borderStyle: 'dotted',
//   }}
//   />
// );

const Search = () => {
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  const [transactions, setTransactions] = useState(null);

  const [isStoredUserLoaded, setIsStoredUserLoaded] = useState(false);

  const [currentCategory, setCurrentCategory] = useState(null);

  const [currentTransaction, setCurrentTransaction] = useState(null);

  const [slideViewBounceValue, setSlideViewBounceValue] = useState(new Animated.Value(300));

  const [isSlideViewHidden, setIsSlideViewHidden] = useState(true);

  const [currentCategories, setCurrentCategories] = useState([]);

  const clearState = () => {
    retrieveStoredUser(); // load stored user

    setCurrentCategory(null);

    setCurrentTransaction(null);

    setSlideViewBounceValue(new Animated.Value(300));

    setIsSlideViewHidden(true);

    setCurrentCategories([]);
  };

  const retrieveStoredFonts = async () => {
    // load fonts
    await Font.loadAsync({
      'SFProDisplay-Regular': global.SFProDisplayRegularFont,
      'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
    });

    // set fonts  are loaded
    setFontsAreLoaded(true);
  };

  const retrieveStoredUser = async () => {
    // load stored user transactions
    try {
      const userObject = await loadUserObject();

      // set stored user transactions
      setTransactions(userObject.user.transactions);

      setIsStoredUserLoaded(true);
    } catch (e) {
      // statements
      // console.log('Could not load stored user');
    }
  };

  const transactionBtnPressed = (transaction) => {
    if (currentTransaction === transaction) {
      setCurrentTransaction(null);
      if (isSlideViewHidden !== true) {
        hideSlideView();
      }
    } else if (currentTransaction !== transaction) {
      // not same transaction
      setCurrentTransaction(transaction);
    } else {
      setCurrentTransaction(transaction);
    }
  };

  const showSlideView = () => {
    Animated.spring(
      slideViewBounceValue,
      {
        toValue: 0,
        velocity: 30,
        tension: 2,
        friction: 8,
      }
    ).start();
    setIsSlideViewHidden(false);
  };

  const hideSlideView = () => {
    Animated.spring(
      slideViewBounceValue,
      {
        toValue: 300,
        velocity: 30,
        tension: 2,
        friction: 8,
      }
    ).start();
    setIsSlideViewHidden(true);
  };


  const categoryBtnPressed = (category) => {
    // set or unset current category
    if (currentCategory === category) {
      // item is current category already, unset it
      setCurrentCategory(null);
    } else if (currentCategory !== category) {
      // item is a new category, set as current
      setCurrentCategory(category);
    }

    // set category to current categories list
    if (currentCategories.includes(category)) {
      // item already exists, remove from list
      // get item id from array
      const itemPos = currentCategories.indexOf(category);
      // remove item from array by index
      currentCategories.splice(itemPos, 1); // starting at itemPos, remove 1 element
    } else {
      // current  categories does not contain item already
      // set item to list
      currentCategories.unshift(category);
    }
  };

  // const getFilteredTransactions = () => {
  //   const array = [];
  //   currentCategories.forEach((element, index) => {
  //     // filter thru transaction by categories selected
  //     const list = transactions.filter((items) => {
  //       return (items.category.name === element.name);
  //     });
  //     let i = list.length - 1;
  //     for (i; i >= 0; i -= 1) {
  //       array.push(list[i]);
  //     }
  //   });
  //   // console.log(array)
  //   return array;
  // };

  const deleteBtnPressed = (transaction) => {
    removeTransaction(transaction);
  };

  const removeTransaction = async (transaction) => {
    // retrieve stored user object
    const userObject = await loadUserObject();

    // remove transaction by id
    let i = userObject.user.transactions.length - 1;

    for (i; i >= 0; i -= 1) {
      if (userObject.user.transactions[i].id === transaction.id) {
        userObject.user.transactions.splice(i, 1);
      }
    }

    saveUserObject(userObject);

    clearState();
  };

  // component did mount
  useEffect(() => {
    // console.log('Mount');
    retrieveStoredFonts();
    retrieveStoredUser();

    setCurrentCategories([]);

    return () => {
      // effect
      // console.log('Cleaned up Search');
    };
  }, []);

  useEffect(() => {
    // console.log('Mount current transaction');
    // console.log(currentTransaction);
    if (currentTransaction) {
      showSlideView();
    } else {
      hideSlideView();
    }
    return () => {
      // effect
      // console.log('clean up current transaction');
    };
  }, [currentTransaction]);

  // useEffect(() => {
  //   if (getFilteredTransactions().length > 0) {
  //     console.log(getFilteredTransactions());
  //   }
  // });

  let view = (<View style={styles.container}><SpinnerMask /></View>);

  if (fontsAreLoaded && isStoredUserLoaded) {
    // page body view
    view = (
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.container}
      >

        {/* scrolling pills */}
        <ScrollingPillCategoriesView
          onPress={(category) => categoryBtnPressed(category)}
          currentCategory={currentCategory}
          currentCategories={currentCategories}
          isEnabled={true} // {enableCategoryPills}
          topPosition="12%"
          zIndex={1}
        />

        {/* separator line */}
        <View style={line} />

        {/* Date Picker Box */}
        <View style={datePickerBox} />

        <MyStickyTable
          transactions={transactions}
          currentTransaction={currentTransaction}
          key={transactions}

          tableTop="25.5%"
          tableHeight="65%"
          tablePosition="absolute"

          onPress={(transaction) => transactionBtnPressed(transaction)}
          deleteBtnPressed={(transaction) => deleteBtnPressed(transaction)}
        />

        <SlideUpView
          toggleSlideView={() => {}} // toggleSlideView()}
          slideViewBounceValue={slideViewBounceValue}
        />
      </ScrollView>
    );
  }
  return view;
}; // end Search definition

// Search navigation
Search.navigationOptions = ({ navigation }) => {
  function goBack() {
    navigation.navigate('Home')
  }

  const header = {
    headerTransparent: {},
    headerTintColor: colors.white,
    title: 'Filter by Category',
    // headerRight,
    headerLeft: (<View><Button title="Go Back" onPress={goBack} /></View>)
  };
  return header;
};// end search navigation def

// Search styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.darkTwo,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  }
}); // end search styles

// separator line style
const line = {
  width: '100%',
  height: 0.1,
  opacity: 0.1,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: colors.white,

  top: '19%',

  zIndex: 1, // display ontop of datepickerbox
};

const datePickerBox = {
  width: '100%',
  height: '24%', // 196,
  backgroundColor: colors.darkTwo,
  shadowColor: '#0a101b',
  shadowOffset: {
    width: 1,
    height: 1
  },
  shadowRadius: 26,
  shadowOpacity: 1
};

export default Search;


// // models
// // import Transaction from '../models/Transaction';

// // ui colors
// import colors from '../../colors';


// class Search extends Component {


//   constructor(props) {
//     super(props);

//     this.state = {
//       fontsAreLoaded: false,
//       currentCategory: null,
//       currentTransactions: [],
//       isSlideViewHidden: true,
//       enableCategoryPills: true,
//       slideViewBounceValue: new Animated.Value(300), // initial position of the slide view
//       currentTransaction: null,
//       isTableEnabled: true,

//       currentCategories: []
//     };

//     // this.transactionBtnPressed = this.transactionBtnPressed.bind(this);

//     this.categoryBtnPressed = this.categoryBtnPressed.bind(this);

//     this.deleteBtnPressed = this.deleteBtnPressed.bind(this);
//   }

//   async storeNewTransaction(transaction) {
//     const storageObj = await loadTransactionsObject(); // load storage object

//     const { transactions } = storageObj; // get transactions from storage object

//     // check if transaction already exists
//     const previous = searchByID(transaction.id, transactions);
//     if (previous) {
//       return;
//     }

//     // add transaction
//     transactions.unshift(transaction); // add new transaction to transactions

//     // console.log(storageObj); // debug console

//     saveTransactionsObject(storageObj); // save updated storage object

//     // update current transactions list view with storage object
//     await this.setState({ currentTransactions: transactions });
//   }

//   clearCurrentInputs() {
//     this.setState({ currentCategory: null });
//     this.setState({ currentCategories: [] });

//     const {
//       enableCategoryPills,
//       isSlideViewHidden
//     } = this.state;

//     if (isSlideViewHidden === false) {
//       this.toggleSlideView();
//     }

//     if (enableCategoryPills !== true) {
//       this.setState({ enableCategoryPills: true });
//     }
//   }


//   render() {
//     const {
//       fontsAreLoaded,
//       currentCategory,
//       enableCategoryPills,
//       currentTransactions,
//       currentTransaction,
//       isTableEnabled
//     } = this.state;

//     // font loading spinner
//     const spinnerView = (
//       <View style={styles.container}>
//         <SpinnerMask />
//       </View>
//     );

//     let view = spinnerView;;

//     if (fontsAreLoaded) {
//       // page body view
//       view = (
//         <ScrollView
//           scrollEnabled={false}
//           contentContainerStyle={styles.container}
//         >

//           {/* scrolling pills */}
//           <ScrollingPillCategoriesView
//             onPress={this.categoryBtnPressed}
//             currentCategory={currentCategory}
//             isEnabled={enableCategoryPills}
//             topPosition="12%"
//             zIndex={1}
//           />

//           {/* separator line */}
//           <View style={line} />

//           {/* Date Picker Box */}
//           <View style={datePickerBox} />

//         <MyStickyTable
//           transactions={currentTransactions}
//           currentTransaction={currentTransaction}
//           key={currentTransactions}

//           tableTop="25.5%"
//           tableHeight="65%"
//           tablePosition="absolute"

//           onPress={(transaction) => this.transactionBtnPressed(transaction)}
//           deleteBtnPressed={(transaction) => this.deleteBtnPressed(transaction)}
//         />

//           <SlideUpView
//             toggleSlideView={() => this.toggleSlideView()}
//             slideViewBounceValue={this.state.slideViewBounceValue}
//           />
//         </ScrollView>
//       );
//     }


//     // // which page to show; loading vs body
//     // if (!fontsAreLoaded) {
//     //   view = spinnerView;
//     // }
//     return view;
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: colors.darkTwo,

//     // borderWidth: 1,
//     // borderColor: 'white',
//     // borderStyle: 'dashed',
//   }
// });

// // separator line style
// const line = {
//   width: '100%',
//   height: 0.1,
//   opacity: 0.1,
//   borderStyle: 'solid',
//   borderWidth: 1,
//   borderColor: colors.white,

//   top: '19%',

//   zIndex: 1, // display ontop of datepickerbox
// };

// const datePickerBox = {
//   width: '100%',
//   height: '24%', // 196,
//   backgroundColor: colors.darkTwo,
//   shadowColor: '#0a101b',
//   shadowOffset: {
//     width: 1,
//     height: 1
//   },
//   shadowRadius: 26,
//   shadowOpacity: 1
// };

// export default Search;
