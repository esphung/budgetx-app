/*
FILENAME:   HeaderLeftView.js
PURPOSE:    left side of header in home view
AUTHOR:     eric phung
DATE:       Sun Nov  3 13:47:40 2019
UPDATED:    12/04/2019 05:07 PM   | commented out Font loader
            12/05/2019 11:22 PM   | fixed  bold, norrmal messages,
            image to show updated user image
*/


import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';

import { NavigationEvents } from 'react-navigation';

// ui colors
import colors from '../../../colors';

import {
  loadUserObject,
  // saveUserObject,
} from '../../storage/UserStorage';

const isValidEmail = require('../../functions/isValidEmail');

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 15,
    width: '100%',
    height: '100%',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },

  userImageMaskView: {
    flex: 0.1,
    width: 33,
    height: 33,
    backgroundColor: colors.darkGreyBlue,
    borderRadius: 50,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 17,

    // width: 27,// if user image available???
    // height: 27,// if user image available???
    // opacity: 0.2, // if no image available
    // backgroundColor: '#ffffff'
  },

  userMessageView: {
    flex: 1,
    // flexDirection: 'column',
    // height: '100%', // 36,
    // left: 12,
    // justifyContent: 'center',
    marginLeft: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
});


const HeaderLeftView = () => {
  // const [fontsAreLoaded, setFontsAreLoaded] = useState(false);

  const [text, setText] = useState('');

  const [boldMessage, setBoldMessage] = useState('Get cross-device sync');

  const [normalMessage, setNormalMessage] = useState('Enter your email');

  const [isInputEnabled, setIsInputEnabled] = useState(true);

  // const [user, setUser] = useState(null);

  const [isStoredUserLoaded, setIsStoredUserLoaded] = useState(false);

  const [userProfileImage, setUserProfileImage] = useState(null);

  // const retrieveFonts = async () => {
  //   // load sf pro fonts
  //   // await Font.loadAsync({
  //   //   'SFProDisplay-Regular': global.SFProDisplayRegularFont,
  //   //   'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
  //   // });
  //   setFontsAreLoaded(true);
  // };

  async function retrieveStoredUser() {
    // load stored user transactions
    try {
      const userObject = await loadUserObject();

      // set stored user image
      if (!userObject.user.profileImage) {
        setUserProfileImage(global.placeholder500x500);
      } else {
        setUserProfileImage({ uri: userObject.user.profileImage });
      }

      if (userObject.user.username) {
        setBoldMessage(`Hello ${userObject.user.username}`);
      }

      if (userObject.user.email) {
        setNormalMessage(`${userObject.user.email}`);
      }

      setIsInputEnabled(false);

      setIsStoredUserLoaded(true);
    } catch (e) {
      // statements
      // console.log('Could not load stored user');
    }
  }

  function clearState() {
    retrieveStoredUser(); // load stored user
  }

  const handleTextChange = (value) => {
    setText(value);
    // console.log(text);
  };

  const submitBtnPressed = (value) => {
    setText(value);
    // if (isValidEmail(text)) {
    //   // create new user with text email
    //   // console.log(text);
    //   setUser(new User(text));
    // }
  };

  // useEffect(fn) // all state
  // useEffect(fn, []) // no state
  // useEffect(fn, [these, states])

  useEffect(() => {
    // retrieveFonts();
    retrieveStoredUser();
  }, []);

  // // mount user
  // useEffect(() => {
  //   if (user) {
  //     const fullName = user.getFullName();
  //     setBoldMessage(`Welcome ${fullName}`);
  //     setNormalMessage(user.email);
  //     // console.log(user)
  //   }

  //   // return () => {
  //   //   // console.log('user clean up');
  //   //   // setBoldMessage('Enter a name')//user.getFullName());
  //   //   // setNormalMessage(user.email);

  //   //   // setIsInputEnabled(false);
  //   // };
  // }, [user]);


  const spinnerView = (
    <View style={{ marginLeft: 15, marginTop: 20, backgroundColor: colors.darkTwo }}>
      <ActivityIndicator size="large" color="#ffffff7f" />
    </View>
  );

  let view = spinnerView;

  if (isStoredUserLoaded) {
    view = (
      <SafeAreaView style={styles.container}>

        <NavigationEvents
          // try only this. and your component will auto refresh when this is the active component
          onWillFocus={() => clearState()} // {(payload) => clearState()}
          // other props
          // onDidFocus={payload => console.log('did focus',payload)}
          // onWillBlur={payload => console.log('will blur',payload)}
          // onDidBlur={payload => console.log('did blur',payload)}
        />

        <TouchableOpacity
          style={styles.userImageMaskView}
        >
          <Image
            resizeMode="contain"
            style={styles.userImage}
            source={userProfileImage} // {global.placeholder500x500}
          />
        </TouchableOpacity>

        <View style={styles.userMessageView}>
          <Text style={
            {
              fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
              fontSize: 15,
              fontStyle: 'normal',
              letterSpacing: 0.12,
              color: '#ffffff',
              fontWeight: '600',
            }

          }
          >
            { boldMessage }

          </Text>

          <TextInput
            style={
              {
                fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
                fontSize: 15,
                fontStyle: 'normal',
                letterSpacing: 0.1,
                color: '#ffffff',
              }
            }

            placeholder={normalMessage}

            placeholderTextColor="#ffffff"

            autoCompleteType="email" // android

            keyboardAppearance="dark" // ios

            textContentType="emailAddress" // ios

            keyboardType="email-address"

            returnKeyType="next"

            autoCorrect={false}

            autoCapitalize="none"

            maxLength={22}

            onSubmitEditing={() => submitBtnPressed(text)}

            onChangeText={handleTextChange}

            editable={isInputEnabled}

            value={text}

            onEndEditing={() => {
              if (isValidEmail(text) === true) {
                // send email ??
                // create user to send aws cred
              } else {
                // clear text field
                setText('');
                // console.log('Ended:', text);
              }
            }}
          />

        </View>

      </SafeAreaView>
    );
  }
  return view;
};

export default HeaderLeftView;

// class HeaderLeftView extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       text: '',
//       fontsAreLoaded: false
//     };

//     this.boldMessage = (props.boldMessage) ? props.boldMessage : 'Get cross-device sync';

//     this.normalMessage = (props.normalMessage) ? props.normalMessage : 'Enter your email';

//     this.isInputEnabled = props.isInputEnabled;

//     this.handleTextChange = this.handleTextChange.bind(this);

//     this.submitBtnPressed = this.submitBtnPressed.bind(this);
//   }

//   async componentWillMount() {
//     // load sf pro fonts
//     await Font.loadAsync({
//       'SFProDisplay-Regular': global.SFProDisplayRegularFont,
//       'SFProDisplay-Semibold': global.SFProDisplaySemiboldFont
//     });

//     this.setState({ fontsAreLoaded: true });
//   }

//   getView() {
//     const { fontsAreLoaded, text } = this.state;

//     const spinnerView = (
//       <View style={{ marginLeft: 15, marginTop: 20, backgroundColor: colors.darkTwo }}>
//         <ActivityIndicator size="large" color="#ffffff7f" />
//       </View>
//     );

//     let view = spinnerView;

//     if (fontsAreLoaded) {
//       view = (
//         <SafeAreaView style={styles.container}>

//           <TouchableOpacity testID="userImageBtn" style={styles.userImageMaskView}>
//             <Image
//               resizeMode="contain"
//               style={styles.userImage}
//               source={global.placeholder500x500}
//             />
//           </TouchableOpacity>

//           <View style={styles.userMessageView}>
//             <Text style={
//               {
//                 fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Semibold',
//                 fontSize: 15,
//                 fontStyle: 'normal',
//                 letterSpacing: 0.12,
//                 color: '#ffffff',
//                 fontWeight: '600',
//               }

//             }
//             >

//               { this.boldMessage }

//             </Text>

//             <TextInput
//               style={
//                 {
//                   fontFamily: Platform.OS === 'ios' ? 'System' : 'SFProDisplay-Regular',
//                   fontSize: 15,
//                   fontStyle: 'normal',
//                   letterSpacing: 0.1,
//                   color: '#ffffff',
//                 }
//               }

//               placeholder={this.normalMessage}

//               placeholderTextColor="#ffffff"

//               autoCompleteType="email" // android

//               keyboardAppearance="dark" // ios

//               textContentType="emailAddress" // ios

//               keyboardType="email-address"

//               returnKeyType="next"

//               autoCorrect={false}

//               autoCapitalize="none"

//               maxLength={22}

//               onSubmitEditing={() => this.submitBtnPressed(text)}

//               onChangeText={this.handleTextChange}

//               editable={this.isInputEnabled}

//               value={text}

//               onEndEditing={() => {
//                 if (isValidEmail(text) === true) {
//                   // send email ??
//                   // create user to send aws cred
//                 } else {
//                   // clear text field
//                   this.setState({ text: '' });
//                   // console.log('Ended:', text);
//                 }
//               }}
//             />

//           </View>

//         </SafeAreaView>

//       );
//     }
//     return view;
//   }

//   handleTextChange(text) {
//     this.setState({ text });
//     // console.log(text);
//   }

//   submitBtnPressed(text) {
//     this.setState({ text });

//     if (isValidEmail(text)) {
//       console.log(text);
//       const user = new User(text);
//       console.log(user);
//     }
//     // console.log('Submit:', text);
//   }


//   render() {
//     // console.log('Rendered HeaderLeftView Fonts Are Loaded:', this.state.fontsAreLoaded)
//     return (
//       this.getView()
//     );
//   }
// }

// export default HeaderLeftView;
