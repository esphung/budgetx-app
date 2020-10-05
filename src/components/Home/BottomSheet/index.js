// https://medium.com/@ndyhrdy/making-the-bottom-sheet-modal-using-react-native-e226a30bed13
import React, { useRef, useState, useEffect } from 'react';

import {
  Animated,
  PanResponder,
  View,
  Dimensions,
  Modal,
  StyleSheet,
} from 'react-native';

// import GestureRecognizer from 'react-native-swipe-gestures';

// import styles from 'styles/BottomSheet';

const screen = Dimensions.get('screen');

import colors from 'colors';

const BottomSheet = ({
  children,
  // top,
  // closeAnim,
  // resetSlideView,
  onDismiss,
  // fullSlideView,
  // currentSlidePosition,
  // closeSlideView,
  // setCurrentTransaction,
  visible,
  height,
}) => {

  const [panY, setPanY] = useState(new Animated.Value(Dimensions.get('screen').height))

  // const pan = useRef(new Animated.ValueXY()).current;

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  // const _handleDismiss = () => {
  //   alert('message?: DOMString');
  //   resetPositionAnim.start();
  // };
  // const raiseSlide = () => resetSlideView();

  // const lowerSlide = () => closeAnim.start();

  // const onPanResponderMove = (d) => {
  //   console.log('d.nativeEvent.locationY: ', d.nativeEvent.locationY);
  //     // {
  //     //   translateY: d.nativeEvent.locationY
  //     // }
  
  // };

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: () => true,
      
  //     onPanResponderMove: onPanResponderMove,
  //     onPanResponderRelease: (d) => {
  //       // console.log('d.nativeEvent.locationX: ', d.nativeEvent.locationX)
  //       panY.flattenOffset();
  //     },
  //   }),
  // ).current;

  // const onSwipeDown = () => {
  //   // console.log('currentSlidePosition: ', currentSlidePosition);
  //   if (currentSlidePosition === 'RESET' || currentSlidePosition === 'CLOSED') {
  //     setCurrentTransaction(null);
  //   }
  //   else {
  //     closeSlideView();
  //   }
  //   // console.log('Swiped Down');
  // };

  const _resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
  });
  const _closeAnim = Animated.timing(panY, {
    toValue: Dimensions.get('screen').height * 0.8,
    duration: 500,
  });


  // console.log('top: ', top);

  const _handleDismiss = () => {
    _closeAnim.start(() => onDismiss());
  };

  const _panResponders = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: Animated.event([
      null, {
        dy: panY,
      }
    ]),
    onPanResponderRelease: (e, gs) => {
      // console.log('e: ', e);
      // ill decide if it should dismiss or reset the modal,
      // based on the direction (dy) and speed (vy) of the gesture
      if (gs.dy > 0 && gs.vy > 2) {
        return _closeAnim.start(() => onDismiss());
      }
      return _resetPositionAnim.start();
    },
  });

  useEffect(() => {
    // console.log('panY: ', panY);
    if (!visible)  _resetPositionAnim.start();
    // return () => {
    //   // effect
    // };
  }, [visible]);

  const view = (
    <Modal
      animated
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={() => _handleDismiss()}
    >
      <View style={styles.overlay}>

        <Animated.View style={[styles.container, { top }]}
          {..._panResponders.panHandlers}
        >
          { children }
        </Animated.View>
      </View>
    </Modal>
    
   
  );
  return view;
};

const styles = StyleSheet.create({
  container: {
    height: screen.height * 0.75, // 700,
    // borderTopRightRadius: 12,
    // borderTopLeftRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default BottomSheet;
