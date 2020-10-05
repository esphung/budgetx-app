// https://www.npmjs.com/package/react-native-calendar-picker

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';

// ui colors
import colors from 'colors';

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: colors.white, // '#fff',
    // opacity: 0.6,
    // fontSize: 17,

    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
    fontWeight: '600',
    fontStyle: 'normal',
    // lineHeight: 28,
    letterSpacing: 0.13,
    textAlign: 'center',
  },
 textStyle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // lineHeight: 28,
    // lineHeight: 26,
    // letterSpacing: 0.13,
    // textAlign: 'center',

    fontSize: 17,
    color: colors.white, // '#ffffff',

    padding: 5,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
});
export default function MyCalendarPicker ({ updateTransactionDate }) {
    return (
       <View style={[ 
        {
              // justifyContent: 'center',
              // alignItems: 'center',
      
              margin: 8,
              paddingBottom: 50,
              // flex: 1,
              // backgroundColor: '#FFFFFF',
              // marginTop: 100,
      
              backgroundColor: colors.dark,
      
              borderRadius: 9,

              // shadowColor: '#0a101b',
              // shadowOffset: {
              //   width: 1,
              //   height: 1,
              // },
              // shadowRadius: 26,
              // shadowOpacity: 1,
      
              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }]}>
        <CalendarPicker
          onDateChange={updateTransactionDate}
          allowRangeSelection={false}
          // previousTitle="<"
          // nextTitle=">"
          selectedDayColor={colors.azure}
          // selectedDayStyle
          todayBackgroundColor={colors.pinkRed}
          // todayTextStyle={[
          //   // styles.textStyle,
          //   {
          //     // opacity: 0.3,
          //   }
          // ]}

          textStyle={styles.textStyle}

          // scaleFactor={500}
          // initialDate={date}

          // width={350}
          // height={300}

          enableSwipe // ={false}

          // dayShape="square"

          previousTitleStyle={[
            styles.buttonText,
            {
              padding: 4,
              color: colors.tangerine,
            }
          ]}

          nextTitleStyle={[
            styles.buttonText,
            {
              padding: 4,
              color: colors.tangerine,
            }
          ]}

        />

      </View>
    );
  // }
}
