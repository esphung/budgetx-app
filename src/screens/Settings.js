/*
FILENAME:   SettingsScreen.js
PURPOSE:    SettingsScreen
AUTHOR:     Eric Phung
CREATED:    Thu Oct 31 23:17:49 2019
*/
import React, { useState, useRef } from 'react';

import { BlurView } from 'expo-blur';

import * as MailComposer from 'expo-mail-composer';

import { showMessage } from 'react-native-flash-message';

import Dialog from 'react-native-dialog';

import {
  ActivityIndicator,
  View,
  Text,
  Alert,
  Share,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';

// import {
//   getAuthentication,
// } from '../controllers/Network';

import {
  resetData,
} from 'controllers/Storage';

import ProfileRectangle from '../components/settings/ProfileRectangle';

import SubscriptionRect from '../components/settings/SubscriptionRect';

import UserOptions from '../components/settings/UserOptions';

import BlueButton from '../components/BlueButton';

// import colors from '../../colors';

import styles from 'styles/Settings';

const spinner = (
  <View
    style={
      {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        opacity: 0.08,
        height: global.screenHeight,
      }
    }
  >
    <ActivityIndicator
      size="large"
      color="gray"
    />
  </View>
);
function SettingsScreen({ navigation }) {
  const storage = navigation.getParam('storage');

  const setIsDeviceSyncEnabled = navigation.getParam('setIsDeviceSyncEnabled');

  const isUserLoggedIn = navigation.getParam('isUserLoggedIn');

  // const setIsUserLoggedIn = navigation.getParam('setIsUserLoggedIn');

  const currentTransactions = navigation.getParam('storage').transactions;

  const [isExportTransactionsDisabled] = useState(currentTransactions.length <= 0);

  // Input refs
  const resetDialogInputRef = useRef(null);

  // State vars

  const [isResetingData, setIsResetingData] = useState(false);

  const [isRestoreDisabled] = useState(false);

  const [shouldShowResetDialog, setShowResetDialogBox] = useState(false);

  const [resetPromptInputValue, setResetPromptInputValue] = useState(null);

  const handleRoute = (path) => navigation.navigate(path);

  const handleCancel = () => setShowResetDialogBox(false);

  const resetNavigationBack = async () => {
    setIsResetingData(true);
    // 2nd code goes here
    await resetData().then(() => setIsResetingData(false))
    // .catch(() => setIsResetingData(false))
    // console.log('uh oh 2');
    handleRoute('AuthLoading');

    
    
  };
  const okBtnPressed = () => {
    // 1st code goes here
    // setIsResetingData(true);
    // console.log('uh oh 1'),
    resetNavigationBack();
    // Back to Hoome screenif logged in
    // handleRoute('AuthLoading');

    // setIsResetingData(false)
  };
  const inputFocus = (ref) => ref.current.focus();

  const handleConfirm = () => inputFocus(resetDialogInputRef);

  const onChangeResetPromptText = (value) => {
    if (value === ('DELETE')) {
      okBtnPressed();
    } else {
      setResetPromptInputValue(value);
    }
  };
  const blurComponentIOS = (
    <BlurView
      style={StyleSheet.absoluteFill}
      blurType="xlight"
      blurAmount={50}
    />
  );
  const resetBox = (
    <View style={styles.resetDataDialogBox}>
      <Dialog.Container
        style={styles.dialogContainer}
        visible={shouldShowResetDialog}
        blurComponentIOS={blurComponentIOS}
      >
        <Dialog.Title style={styles.dialogTitleText}>
          Remove all data from this device?
        </Dialog.Title>
        <Dialog.Description style={styles.dialogDescriptionText}>
          Please type DELETE
        </Dialog.Description>
        <TextInput
          ref={resetDialogInputRef}
          style={styles.dialogInputStyle}
          onChangeText={onChangeResetPromptText}
          maxLength={'DELETE'.length}
          autoCorrect
          value={resetPromptInputValue}
        />
        <Dialog.Button
          style={styles.buttonText}
          onPress={handleCancel}
          label="Cancel"
        />
        <Dialog.Button
          style={styles.buttonText}
          onPress={handleConfirm}
          label="Ok"
        />
      </Dialog.Container>
    </View>
  );
  const resetDataAlertPrompt = async () => {
    // RESET DATA PROMPT
    if (Platform.OS === 'ios') {
      // user on ios
      Alert.prompt(
        `Remove all device data ${(storage.isDeviceSyncEnabled) ? 'and online' : ''}?`,
        'This will only remove online data if device sync is enabled\nPlease type DELETE to confirm',
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          {
            text: 'OK',
            onPress: onChangeResetPromptText,
          },
        ],
        'plain-text',
      );
    } else {
      //  user on android
      setShowResetDialogBox(true);
    }
  };
  const sendContactSupportEmail = async () => {
    // console.log('userObject: ', userObject);
    try {
      await MailComposer.composeAsync({
        recipients: [global.adminEmailAddress],
        subject: `Contact Support | ${global.appName} ${global.appVersion}`,
        body: '',
        attachments: [],
        isHtml: false,
      });
    } catch (err) {
      showMessage(err.message);
    }
  };
  const onClick = () => {
    Share.share({
      ...Platform.select({
        ios: {
          message: `Download ${global.appName} at : \nhttps://apps.apple.com/us/app/financely/id1491309602/`,
        },
        android: {
          message: `Download ${global.appName} at : \nhttps://apps.apple.com/us/app/financely/id1491309602`,
        },
      }),
    });
  };
  const onExport = async () => {
    if (currentTransactions.length <= 0) {
      showMessage('You have no transactions');
      return;
    }
    try {
      await Share.share({
        title: 'My Transactions',
        subject: 'My Transactions',
        // tintColor: 'dark',
        message: JSON.stringify(currentTransactions, null, 2),
      });
    } catch (error) {
      showMessage({ message: error.message, type: 'danger' });
    }
  };
  const onShare = async () => {
    onClick();
  };

  const customizeCategoriesBtnPressed = () => navigation.navigate(
    'CustomizeCategoriesScreen',
    {
      storage,
      currentCategories: storage.categories,
      isUserLoggedIn: isUserLoggedIn,
      isDeviceSyncEnabled: storage.isDeviceSyncEnabled,
    },
  );
  const subscriptionPanelPressed = () => handleRoute('WelcomeScreen');

  const resetDataBtnPressed = () => resetDataAlertPrompt();

  const contactSupportBtnPressed = () => sendContactSupportEmail();

  const shareBtnPressed = () => onShare();

  const exportBtnPressed = () => onExport();

  const changePasswordBtnPressed = () => handleRoute(
    'ChangePassword',
    {
      storage,
      isUserLoggedIn,
    },
  );

  const signOutBtnPressed = () => handleRoute('SignOutScreen');

  const signInBtnPressed = () => handleRoute('SignIn');

  // const signUpBtnPressed = () => handleRoute('SignUp');
  const onPress = (name) => {
    if (name === 'Contact Support') {
      contactSupportBtnPressed();
    } else if (name === 'Export Transactions') {
      exportBtnPressed();
    } else if (name === 'Change Password') {
      changePasswordBtnPressed();
    } else if (name === 'Sign Out') {
      signOutBtnPressed();
    } else if (name === 'Sign In') {
      signInBtnPressed();
    } else if (name === 'Reset Data') {
      resetDataBtnPressed();
    } else if (name === 'Customize Categories') {
      customizeCategoriesBtnPressed();
    }
  };
  const view = (
    <View style={styles.container}>
      <View style={styles.rectangle5} />
      <View style={styles.topPanel}>
        <ProfileRectangle isUserLoggedIn={isUserLoggedIn} />
      </View>
      {/* SUBSCRIPTION PANEL */}
      <View style={styles.subscriptionPanel}>
        <SubscriptionRect
          isUserLoggedIn={isUserLoggedIn}
          isDeviceSyncEnabled={storage.isDeviceSyncEnabled}
          onPress={subscriptionPanelPressed}
          setIsDeviceSyncEnabled={setIsDeviceSyncEnabled}
        />
      </View>
      {/* User Options */}
      <View style={styles.container}>
        <UserOptions
          isExportTransactionsDisabled={isExportTransactionsDisabled}
          onPress={onPress}
          isRestoreDisabled={isRestoreDisabled}
          isUserLoggedIn={isUserLoggedIn}
        />
      </View>

      <View style={styles.userOptionsPanel}>
        <View style={styles.creditsView}>
          <Text style={styles.creditsText}>
            {`Developed by ${global.appDeveloper}`}
          </Text>
          <Text style={styles.creditsText}>
            {`Designed by ${global.appDesigner}`}
          </Text>
        </View>
        {/*
          <BlueButton title="Rate Us" onPress={rateUsBtnPressed} />
        */}
        <BlueButton title="Share Us" onPress={shareBtnPressed} />
        <View style={styles.footer}>
          <Text style={styles.creditsText}>
            { `Version ${global.appVersion}` }
          </Text>
        </View>
      </View>
      {
        // resetDataDialogBox
        resetBox
      }
      { isResetingData && spinner }
    </View>
  );
  return view;
}

export default SettingsScreen;
