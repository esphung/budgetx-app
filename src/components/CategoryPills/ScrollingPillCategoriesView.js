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

// ui colors
import colors from '../../../colors';

import CategoryPill from './CategoryPill';

// import {
//   loadCategories,
//   // saveCategories
// } from '../../storage/CategoriesStorage';

import {
  loadUserObject,
  // saveUserObject
} from '../../storage/UserStorage';


const ScrollingPillCategoriesView = (props) => {
  const [shadowOffset, setShadowOffset] = useState(null); // { width: 1, height: 1 }

  const [shadowRadius, setShadowRadius] = useState(0); // 26

  const [shadowOpacity, setShadowOpacity] = useState(0); // 1

  const [topPosition, setTopPosition] = useState(0); // 57%

  const [zIndex, setZIndex] = useState(0); // 1

  const [categories, setCategories] = useState(null);

  const [isStoredUserLoaded, setIsStoredUserLoaded] = useState(false);

  const [currentCategory, setCurrentCategory] = useState(null);

  const [currentCategories, setCurrentCategories] = useState([]);

  const [transactions, setTransactions] = useState(null);

  const retrieveStoredUser = async () => {
    // load stored user
    try {
      const userObject = await loadUserObject();

      // user categories from stored user
      setCategories(userObject.user.categories);
      // console.log('User:', userObject.user.categories);

      setTransactions(userObject.user.transactions);

      setIsStoredUserLoaded(true);
    } catch (e) {
      // statements
      // console.log('Could not retrieve stored user.');
    }
  };

  const isCurrentCategory = (category) => {
    if (currentCategory !== category) { // (!currentCategories.includes(category)) {
      return false;
    }
    if (currentCategory === category) { // || (currentCategories.includes(category))) {
      return true;
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

  useEffect(() => {
    // console.log('Mount pills')
    setShadowOffset(props.shadowOffset);
    setShadowRadius(props.shadowRadius);
    setShadowOpacity(props.shadowOpacity);
    setTopPosition(props.topPosition);
    setZIndex(props.zIndex);

    retrieveStoredUser(); // for user categories
    // return () => {
    //   // effect
    //   console.log('Clean up pills');

    // };
  }, []);

  useEffect(() => {
    // console.log('mount')
    // console.log(currentCategories.length)

    setCurrentCategory(props.currentCategory);
    setCurrentCategories(props.currentCategories);

    return () => {
      // effect
      // console.log('clean up')
    };
  })


  const getCategoryPill = (items) => {
    // const { isEnabled } = this.props;
    // console.log(isEnabled)
    let view = <View />;
    if (items && isStoredUserLoaded) {
      view = items.map((item) => (
        <CategoryPill
          item={item}
          id={item.id}
          name={item.name}
          color={item.color}
          textColor={item.color}
          key={item.id}
          onPress={() => categoryBtnPressed(item)}
          currentCategory={currentCategory}
          isSelected={isCurrentCategory(item)}
          isEnabled={true}
        />
      ));
    }
    return view;
  };


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
