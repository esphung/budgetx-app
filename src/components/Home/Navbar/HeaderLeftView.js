/*
FILENAME:   HeaderLeftView.js
PURPOSE:    left side of header in home view
AUTHOR:     eric phung
DATE:       Sun Nov  3 13:47:40 2019
*/
import React, { useRef } from 'react';

import { View } from 'react-native';

import {
  Input,
} from 'native-base';

import { showMessage } from 'react-native-flash-message';

// ui colors
import colors from 'src/colors';

// import styles from '../../../../styles';
import styles from 'styles/Navbar';

import isValidEmail from 'functions/isValidEmail';

import AvatarDisplay from './AvatarDisplay';

const HeaderLeftView = ({
  boldMessage,
  normalMessage,
  avatarImage,
  navigation,
  isUserLoggedIn,
}) => {
  const [emailAddress, setEmailInputText] = React.useState('');

  const emailInputRef = useRef(null);

  const placeholder = 'Enter your email';

  const imageView = (
    <AvatarDisplay avatarImage={avatarImage} isUserLoggedIn={isUserLoggedIn} />
  );

  function clearEmailInput() {
    // console.log('emailInputRef.current._root.focus(): ', emailInputRef.current._root.focus());
    emailInputRef.current._root.clear();
  }

  const onChangeEmailText = (text) => setEmailInputText(text.trim());

  const onSubmitEditing = (sender) => {
    if (isValidEmail(sender.nativeEvent.text)) {
      // valid email input format
      navigation.navigate('SignUp', {
        emailAddress,
      });
    } else {
      showMessage({
        message: 'Enter valid email address',
        duration: 1150,
        position: 'top',

        // description: "My message description",
        type: 'danger', // "success", "info", "warning", "danger"
        backgroundColor: colors.dark, // "purple", // background color
        color: colors.white, // "#606060", // text color
        textStyle: styles.textStyle,
        icon: { icon: 'auto', position: 'right' }, // "none" (default), "auto" (guided by type)
      });
    }
    clearEmailInput();
  };
  const view = (
    <View
      style={styles.headerLeftView}
    >
      { imageView }
      <View style={styles.labelsContainer}>
        <Input
          editable={false}
          style={styles.boldMessage}
        >
          { boldMessage }
        </Input>
        <Input
          editable={!isUserLoggedIn}
          placeholder={placeholder} // {((normalMessage) ? normalMessage : placeholder)}
          placeholderTextColor={colors.white}
          style={styles.normalMessage}
          onChangeText={onChangeEmailText}
          ref={emailInputRef}
          onSubmitEditing={onSubmitEditing}
          clearTextOnFocus
          value={emailAddress}
          clearButtonMode="while-editing"
          // clearTextOnFocus
          autoCorrect={false}
          autoCapitalize="none"
          // enablesReturnKeyAutomatically
          autoCompleteType="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          maxLength={global.maxEmailLength}
          keyboardAppearance="dark"
        >
          { normalMessage }
        </Input>
      </View>
    </View>
  );
  return view;
};

export default HeaderLeftView;
