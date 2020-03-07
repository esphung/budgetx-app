/*
FILENAME:  index.js
PURPOSE:   storybook index
AUTHOR:    Eric Phung
CREATED:   03/05/2020 01:44 PM
UPDATED:   03/05/2020 01:43 PM
*/


import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, Text } from 'react-native';

import colors from '../../colors';

import EmptyListMessage from '../../src/components/table/EmptyListMessage';

import BalanceView from '../../src/components/home/BalanceView';

const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.darkTwo, // '#F5FCFF',
};

// const CenteredView = ({ children }) => <View style={style}>{children}</View>;

// storiesOf('CenteredView', module).add('default view', () => (
//   <CenteredView>
//     <Text>Hello Storybook</Text>
//   </CenteredView>
// ));


const CenteredView = ({ children }) => <View style={style}>{children}</View>;

storiesOf('CenteredView', module)
.add('EmptyListMessage', () => (
  <CenteredView>
    <EmptyListMessage />
  </CenteredView>
))



// import React from 'react';
// // import { Text } from 'react-native';

// import {YellowBox} from 'react-native';
// YellowBox.ignoreWarnings(['Warning:']);

// import { randomName, capFirst, randomInt } from '../../src/functions/generateRandomName';

// import { storiesOf } from '@storybook/react-native';
// // import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// // import Button from './Button';
// import CenterView from './CenterView';
// // import Welcome from './Welcome';

// // eslint-disable-next-line import/extensions
// // import Welcome from './Welcome';
// import Button from './Button';
// import BlueButton from './BlueButton';
// import HelpMessage from './HelpMessage';
// import InfoBox from './InfoBox';
// import TouchableText from './TouchableText';

// import BalanceView from './BalanceView' //


// // Transactions Table Components
// import EmptyListMessage from './EmptyListMessage';
// import CategoryLabel from './CategoryLabel';
// import TransactionItemCell from './TransactionItemCell';
// // import MyDateTimePicker from './MyDateTimePicker';
// import MyCalendarPicker from './MyCalendarPicker';


// // import KeypadView from './KeypadView';

// console.disableYellowBox = true;


// // test variables
// const message = 'Hello World';

// const test_date = new Date(1998, 7, 2);

// let random_double = randomInt(0, 100) + randomInt(0, 100) / 100
// // console.log('random_double: ', random_double);



// storiesOf('Login', () => module)

// .add('to Welcome Screen', () => <CenterView/>)

// .add('Button', () => 
//   <CenterView>
//     <Button
//       title="Button"
//       onPress={() => console.log(message)}
//     />
//   </CenterView>
// )
// .add('TouchableText', () => 
//   <CenterView>
//     <TouchableText
//       title="TouchableText"
//       onPress={() => console.log(message)}
//     />
//   </CenterView>
// )

// .add('BlueButton', () => 
//   <CenterView>
//     <BlueButton
//       title="Blue Button"
//       onPress={() => console.log(message)}
//     />
//   </CenterView>
// )

// .add('HelpMessage', () => 
//   <CenterView>
//     <HelpMessage message={message} />
//   </CenterView>
// )

// .add('InfoBox', () => 
//   <CenterView>
//     <InfoBox title={message} />
//   </CenterView>
// )

// storiesOf('HomeScreen', module)
// .add('BalanceView', () =>
//   <CenterView>
//     <BalanceView
//       currentBalanceValue={-1 * random_double}
//       currentSpentValue={random_double}
//     />
//   </CenterView>
// )


// Transactions Table

// storiesOf('HomeScreen', module)
// .add('EmptyListMessage', () => 
//   <CenterView>
//     <EmptyListMessage />
//   </CenterView>
// )

// .add('TransactionItemCell', () => 
//   <CenterView>
//     <TransactionItemCell
//       item={
//         {
//           payee: {
//             name: 'Joe Budden'
//           },
//           date: new Date(),
//           amount: 3423.23,
//           category: {
//             name: 'Groceries',
//             color: 'pink',
//           },
//         }
//       }

//       // onPress={() => alert('Hello')}
//     />
//   </CenterView>
// )

// .add('CategoryLabel', () => 
//   <CenterView>
//     <CategoryLabel name={message} textColor="gray" />
//   </CenterView>
// )



// .add('MyDateTimePicker',() => 
//   <CenterView>
//     <MyDateTimePicker date={new Date()} />
//   </CenterView>
// )


// .add('MyCalendarPicker',() => 
//   <CenterView>
//     <MyCalendarPicker
//       date={test_date}
//       onDateChange={() => console.log('Hello')}
//     />
//   </CenterView>
// )


// .add('KeypadView',() => 
//   <CenterView>
//     <KeypadView
//       handlePress={() => console.log('Hello')}
//       addBtnPressed={() => console.log('Hello')}
//       backspaceBtnPressed={() => console.log('Hello')}
//     />
//   </CenterView>
// )




