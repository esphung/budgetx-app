// https://www.npmjs.com/package/react-native-calendar-picker

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import styles from 'main/styles';

import colors from 'main/colors';
 
export default class MyCalendarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedStartDate: null,s
      initialDate: this.props.date,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
 
  onDateChange(date) {
    // console.log(new Date(date));
    // this.setState({
    //   selectedStartDate: date,
    // });

    this.props.onDateChange(date);
  }

  render() {
    // const { selectedStartDate } = this.state;
    // const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
       <View style={[ 
        {
              // justifyContent: 'center',
              // alignItems: 'center',
      
              margin: 14,

              // paddingBottom: 14,
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
          onDateChange={this.onDateChange}

          allowRangeSelection={false}
          previousTitle="<"
          nextTitle=">"
          selectedDayColor={colors.azure}
          // selectedDayStyle

          todayBackgroundColor="transparent"
          todayTextStyle={[
            // styles.textStyle,
            {
              opacity: 0.3,
            }
          ]}

          textStyle={styles.textStyle}

          // scaleFactor={600}

          initialDate={this.props.date}

          // width={250}
          height={300}

          enableSwipe={false}

          // dayShape="square"

          previousTitleStyle={[
            styles.buttonText,
            {
              paddingLeft: 4,
              color: colors.tangerine,
            }
          ]}

          nextTitleStyle={[
            styles.buttonText,
            {
              paddingRight: 4,
              color: colors.tangerine,
            }
          ]}

        />

      </View>
    );
  }
}
