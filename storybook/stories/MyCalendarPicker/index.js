// https://www.npmjs.com/package/react-native-calendar-picker

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

export default function MyCalendarPicker(props) {
  const { initialDate, updateTransactionDate, isUpdatingTransaction } = props;

  // let date = initialDate;

  let updatingTransactionIndicator = (
    <View style={
      {
        // flex: 1,
        left: 0,
        right: 0,
        top: 50,
        bottom: 0,

        opacity: 0.2,


        backgroundColor: colors.darkTwo,

        justifyContent: 'center',

        position: 'absolute',

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }
    }>
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );

  let view = (
    <View style={[ 
      {
            // justifyContent: 'center',
            // alignItems: 'center',
    
            // marginHorizontal: 7,

            width: '95%',

            // paddingBottom: 10,

            marginBottom: 4,
            // flex: 1,
            // backgroundColor: '#FFFFFF',
            // marginTop: 100,
    
            backgroundColor: colors.dark,
    
            borderRadius: 9,

            shadowColor: '#0a101b',
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowRadius: 26,
            shadowOpacity: 1,
    
            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        ]}>
      {
        // !isUpdatingTransaction &&
        (
          <CalendarPicker
          onDateChange={(date) => {
            updateTransactionDate(date);
          }}

          allowRangeSelection={false}
          previousTitle="<"
          nextTitle=">"
          // selectedDayColor="orange" // {colors.azure}
          selectedDayColor={colors.tangerine} // "#7300e6"
          selectedDayTextColor={colors.offWhite}
          // selectedDayStyle={
          //   {
          //     // opacity: 0.4,
          //     color: 'pink',
          //   }
          // }

          todayBackgroundColor="transparent"
          todayTextStyle={[
            styles.textStyle,
            {
              opacity: 0.5,
            }
          ]}

          textStyle={styles.textStyle}

          // scaleFactor={600}

          initialDate={initialDate}

          // width={250}
          height={350}

          // enableSwipe // ={false}

          // dayShape="square"

          previousTitleStyle={[
            styles.textStyle,
            {
              // paddingLeft: 4,
              color: colors.white,
            }
          ]}

          nextTitleStyle={[
            styles.textStyle,
            {
              // paddingLeft: 4,
              color: colors.white,
            }
          ]}
        />
      )
    }

    {
      isUpdatingTransaction && updatingTransactionIndicator
    }

    </View>
  );

  return view;
}


// export default class MyCalendarPicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // selectedStartDate: null,s
//       initialDate: this.props.date,
//     };
//     this.updateTransactionDate = this.updateTransactionDate.bind(this);
//   }
 
//   updateTransactionDate(date) {
//     // console.log(new Date(date));
//     // this.setState({
//     //   selectedStartDate: date,
//     // });

//     this.props.updateTransactionDate(date);
//   }

//   render() {
//     // const { selectedStartDate } = this.state;
//     // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
//     return (
//        <View style={[ 
//         {
//               // justifyContent: 'center',
//               // alignItems: 'center',
      
//               margin: 14,

//               // paddingBottom: 14,
//               // flex: 1,
//               // backgroundColor: '#FFFFFF',
//               // marginTop: 100,
      
//               backgroundColor: colors.dark,
      
//               borderRadius: 9,

//               // shadowColor: '#0a101b',
//               // shadowOffset: {
//               //   width: 1,
//               //   height: 1,
//               // },
//               // shadowRadius: 26,
//               // shadowOpacity: 1,
      
//               // borderWidth: 1,
//               // borderColor: 'white',
//               // borderStyle: 'solid',
//             }]}>
//         <CalendarPicker
//           updateTransactionDate={this.updateTransactionDate}

//           allowRangeSelection={false}
//           previousTitle="<"
//           nextTitle=">"
//           selectedDayColor={colors.azure}
//           // selectedDayStyle

//           todayBackgroundColor="transparent"
//           todayTextStyle={[
//             // styles.textStyle,
//             {
//               opacity: 0.3,
//             }
//           ]}

//           textStyle={styles.textStyle}

//           // scaleFactor={600}

//           initialDate={this.props.date}

//           // width={250}
//           height={300}

//           enableSwipe={false}

//           // dayShape="square"

//           previousTitleStyle={[
//             styles.buttonText,
//             {
//               paddingLeft: 4,
//               color: colors.tangerine,
//             }
//           ]}

//           nextTitleStyle={[
//             styles.buttonText,
//             {
//               paddingRight: 4,
//               color: colors.tangerine,
//             }
//           ]}

//         />

//       </View>
//     );
//   }
// }
