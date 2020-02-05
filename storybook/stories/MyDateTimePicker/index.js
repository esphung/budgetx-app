
// import React, { useState } from 'react';
// import {
//   Button,
//   View,
//   Text,
// } from 'react-native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

// import styles from 'main/styles';

// import colors from 'main/colors';

// // date picker custom components
// const header = (
//   <View
//     style={
//       {
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: 14,

//         borderWidth: 1,
//         borderColor: 'blue',
//         borderStyle: 'dashed',
//       }
//     }
//   >
//     <Text
//       style={
//         [
//           styles.textStyle,
//           {
//             color: colors.azure,
//           }
//         ]
//       }
//     >
//     Pick new date
//     </Text>
//   </View>
// );

// const Example = () => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     console.log('A date has been picked: ', date);
//     hideDatePicker();
//   };

//   return (
//     <View>
//       <Button title="Show Date Picker" onPress={showDatePicker} />
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}

//         // customPickerIOS={() => {
//         //   return <View><Text>Hello World</Text></View>
//         // }}

//         // my props
//         // cancelTextIOS="Hello"
//         // confirmTextIOS="Submit"
//         // customCancelButtonIOS={() => {
//         //   const btn = <View><Button title="Cancel" onPress={() => console.log('Cancel Button Pressed')} /></View>;
//         //   return btn;
//         // }}

//         // customHeaderIOS={() => {
//         //   return header;
//         // }}

//         // date={new Date()} // initial date shown

//         // headerTextIOS="Hello Picker"

//         // isDarkModeEnabled // Is the device using a dark theme?

//         // isVisible // Show the datetime picker?

//         // modalStyleIOS={{
//         //   backgroundColor: 'orange',

//         //   // opacity: 0.1,

//         //   borderWidth: 1,
//         //   borderColor: 'white',
//         //   borderStyle: 'solid',
//         // }}

//         // onCancel // func called on dismiss
//         // onConfirm // Function called on date or time picked. It returns the date or time as a JavaScript Date object

//         // titleStyle={styles.listItemTitleStyle} // The style of the title text (iOS)
//       />
//     </View>
//   );
// };

// export default Example;
