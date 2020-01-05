/*
FILENAME:  ScrollingPillCategoriesView.js
PURPOSE:   Scrolling Pills
AUTHOR:    Eric Phung
CREATED:   03/11/2019 10:43 PM
UPDATED:   08/11/2019 03:00 AM
           11/12/2019 09:12 PM

*/

import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native';

import { AppLoading } from 'expo';

import Auth from '@aws-amplify/auth';

// ui colors
import colors from '../../../colors';

import CategoryPill from './CategoryPill';

import { NavigationEvents } from 'react-navigation';

// import {
//   loadCategories,
//   // saveCategories
// } from '../../storage/CategoriesStorage';

// import {
//   loadUserObject,
//   // saveUserObject
// } from '../../storage/UserStorage';

import {
  loadSettingsStorage,
  saveSettingsStorage,
} from '../../storage/SettingsStorage';


const ScrollingPillCategoriesView = (props) => {
  const [shadowOffset, setShadowOffset] = useState(null); // { width: 1, height: 1 }

  const [shadowRadius, setShadowRadius] = useState(0); // 26

  const [shadowOpacity, setShadowOpacity] = useState(0); // 1

  const [topPosition, setTopPosition] = useState(0); // 57%

  const [zIndex, setZIndex] = useState(0); // 1

  const [categories, setCategories] = useState(null);

  const [isReady, setIsReady] = useState(false);

  const [currentCategory, setCurrentCategory] = useState(null);

  const [currentCategories, setCurrentCategories] = useState([]);

  const [transactions, setTransactions] = useState(null);

  const [storageKey, setStorageKey] = useState(null);

  async function retrieveCognitoUserKey() {
    // console.log('loading');
    Auth.currentAuthenticatedUser()
      .then((cognito) => {
        setStorageKey(cognito.username);
      })
      .catch((err) => {
        // console.log(err);
        Alert.alert(err);
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
      console.log('Could not retrieve stored user categories.');
    }
  };



  const categoryBtnPressed = (item) => {
    props.onPress(item);
    if (currentCategory === item) {
      setCurrentCategory(null); // set off
    } else if (currentCategory !== item) {
      setCurrentCategory(item); // set on
    } else {
      // set new current category
      setCurrentCategory(null);
    }
  };

  async function clearState() {
    setShadowOffset(props.shadowOffset);
    setShadowRadius(props.shadowRadius);
    setShadowOpacity(props.shadowOpacity);
    setTopPosition(props.topPosition);
    setZIndex(props.zIndex);

    retrieveCognitoUserKey();
    // console.log('Finished');
  };

  // useEffect(() => {
  //   // console.log('Mount pills');

  //   // setShadowOffset(props.shadowOffset);
  //   // setShadowRadius(props.shadowRadius);
  //   // setShadowOpacity(props.shadowOpacity);
  //   // setTopPosition(props.topPosition);
  //   // setZIndex(props.zIndex);

  //   retrieveCognitoUserKey();

  //   // retrieveStoredCategories(); // for user categories
  //   // return () => {
  //   //   // effect
  //   //   console.log('Clean up pills');

  //   clearState();
  //   // };
  // }, []);

  useEffect(() => {
    if (storageKey) {
      retrieveStoredCategories(storageKey); // for user categories
    }
    return () => {
      // effect
    };
  }, [storageKey]);

  useEffect(() => {
    if (categories) {
      setIsReady(true);
    }
    return () => {
      // effect
    };
  }, [categories])

  useEffect(() => {
    // console.log('mount');
    // console.log(currentCategories.length)

    return () => {
      // effect
      // console.log('clean up')
    };
  }, [categoryBtnPressed]);


  const getCategoryPill = (items) => {
    // const { isEnabled } = this.props;
    // console.log(isEnabled)
    let view = <View />;
    if (items) {
      view = items.map((item) => (
        <CategoryPill
          item={item}
          id={item.id}
          name={item.name}
          color={item.color}
          textColor={item.color}
          key={item.id}
          onPress={() => categoryBtnPressed(item)}
          // currentCategory={currentCategory}
          isSelected={props.isSelected(item)}
          isEnabled={true}
        />
      ));
    }
    return view;
  };

  const appLoading = (
    <AppLoading
      startAsync={clearState}
      onFinish={() => {}}
      // onFinish={() => {}}
      onError={console.warn}
    />
  );

  if (!isReady) {
    return appLoading;
  } else {


  return (
    <SafeAreaView style={
      {
        width: '100%',
        height: '6%', // 53,

        shadowColor: '#0a101b',
        shadowOffset,
        shadowRadius,
        shadowOpacity,

        position: 'absolute',

        top: topPosition, // '57%', // 462,

        backgroundColor: colors.darkTwo,

        zIndex, // display ontop of datepickerbox

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'dashed',
      }
    }
    >
    <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        onWillFocus={clearState} // {(payload) => clearState()}
        // other props
        // onDidFocus={payload => console.log('did focus',payload)}
        // onWillBlur={payload => console.log('will blur',payload)}
        onDidBlur={payload => console.log('did blur',payload)}
      />
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        // snapToInterval={MIN_PILL_WIDTH} // your element width
        snapToAlignment="center"

        style={styles.scrollView}
      >
        { getCategoryPill(categories) }

      </ScrollView>
    </SafeAreaView>
  );
}
};


// class ScrollingPillCategoriesView extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       categories: []
//     };
//   }

//   async componentDidMount() {
//     // load default settings
//     const storage = await loadCategories();
//     const { categories } = storage;
//     await this.setState({ categories });
//   }

//   getCategoryPill(items) {
//     const { isEnabled } = this.props;
//     // console.log(isEnabled)
//     let view = <View />;
//     if (items) {
//       view = items.map((item) => (
//         <CategoryPill
//           item={item}
//           id={item.id}
//           name={item.name}
//           color={item.color}
//           textColor={item.color}
//           key={item.id}
//           onPress={() => this.categoryBtnPressed(item)}
//           isSelected={this.isCurrentCategory(item)}
//           isEnabled={true}
//         />
//       ));
//     }
//     return view;
//   }

//   isCurrentCategory(category) {
//     const { currentCategory } = this.props;
//     if (!currentCategory) {
//       return false;
//     }
//     if (currentCategory === category) {
//       return true;
//     }
//     return false;
//   }

//   categoryBtnPressed(item) {
//     const { onPress } = this.props;
//     onPress(item);
//   }

//   render() {
//     const { categories } = this.state;
//     const {
//       isEnabled,
//       topPosition,
//       shadowOffset,
//       shadowRadius,
//       shadowOpacity,
//       zIndex
//     } = this.props;
//     // console.log(categories)
//     return (
//       <SafeAreaView style={
//         {
//           width: '100%',
//           height: '6%', // 53,

//           shadowColor: '#0a101b',
//           shadowOffset: shadowOffset,
//           shadowRadius: shadowRadius,
//           shadowOpacity: shadowOpacity,

//           position: 'absolute',

//           top: topPosition, // '57%', // 462,

//           backgroundColor: colors.darkTwo,

//           zIndex: zIndex, // display ontop of datepickerbox

//           // borderWidth: 1,
//           // borderColor: 'white',
//           // borderStyle: 'dashed',
//         }
//       }
//       >
//         <ScrollView
//           contentContainerStyle={{
//             alignItems: 'center',
//           }}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           decelerationRate={0}
//           // snapToInterval={MIN_PILL_WIDTH} // your element width
//           snapToAlignment="center"

//           style={styles.scrollView}
//         >
//           { this.getCategoryPill(categories) }

//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '6%', // 53,
    backgroundColor: colors.darkTwo,
    shadowColor: '#0a101b',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 26,
    shadowOpacity: 1,

    position: 'absolute',
    top: '57%', // '57%', // 462,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
  separator: {
    width: 2,
    marginVertical: 10,
    backgroundColor: 'white' // 'rgba(0,0,0,0.5)'
  }

});


export default ScrollingPillCategoriesView;