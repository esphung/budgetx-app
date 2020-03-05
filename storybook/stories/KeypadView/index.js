// import React from 'react';

// import { View } from 'react-native';

// import PropTypes from 'prop-types';

// // import KeypadButton from './KeypadButton';

// // ui colors
// // import colors from '../../../colors';

// import styles from '../../../styles';

// export default function KeypadView(props) {
//   const { handlePress, addBtnPressed, backspaceBtnPressed } = props;

//   return (
//     <View style={styles.container}>
//       <View style={styles.keypadRow}>
//         <KeypadButton value={1} onPress={handlePress} />
//         <KeypadButton value={2} onPress={handlePress} />
//         <KeypadButton value={3} onPress={handlePress} />
//       </View>

//       <View style={styles.keypadRow}>
//         <KeypadButton value={4} onPress={handlePress} />
//         <KeypadButton value={5} onPress={handlePress} />
//         <KeypadButton value={6} onPress={handlePress} />
//       </View>

//       <View style={styles.keypadRow}>
//         <KeypadButton value={7} onPress={handlePress} />
//         <KeypadButton value={8} onPress={handlePress} />
//         <KeypadButton value={9} onPress={handlePress} />
//       </View>

//       <View style={styles.keypadRow}>
//         <KeypadButton value="Add" onPress={addBtnPressed} />
//         <KeypadButton value={0} onPress={handlePress} />
//         <KeypadButton value={'<'} onPress={backspaceBtnPressed} />
//       </View>
//     </View>
//   );
// }


// KeypadView.propTypes = {
//   handlePress: PropTypes.func.isRequired,
//   addBtnPressed: PropTypes.func.isRequired,
//   backspaceBtnPressed: PropTypes.func.isRequired,
// };
