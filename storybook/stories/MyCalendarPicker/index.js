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
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
 
  onDateChange(date) {
    // console.log(new Date(date));
    this.props.onDateChange(date);
    this.setState({
      selectedStartDate: date,
    });
  }

  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={{
        // flex: 1,
        // backgroundColor: '#FFFFFF',
        // marginTop: 100,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }}>
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

          // scaleFactor={550}

          initialDate={this.props.date}

          // width={250}
          // height={250}

          enableSwipe={false}

          // dayShape="square"

          previousTitleStyle={[
            // styles.buttonText,
            {
              // paddingLeft: 4,
            }
          ]}

          nextTitleStyle={[
            // styles.buttonText,
            {
              // paddingRight: 4,
            }
          ]}

        />
 
{/*        <View>
          <Text>SELECTED DATE:{ startDate }</Text>
        </View>*/}
      </View>
    );
  }
}
