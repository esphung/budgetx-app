import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  Switch,
  AsyncStorage,
} from 'react-native';

import ToggleSwitch from 'toggle-switch-react-native'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TouchableOpacity, } from 'react-native-gesture-handler';

// import { NetworkConsumer } from 'react-native-offline';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

// import InfoBox from '../../../storybook/stories/InfoBox';

// import { isDeviceOnline } from '../../../network-functions';

// text style
const copy3 = {
  // width: 215,
  // width: '80%',
  // height: 40,
  fontFamily: 'SFProDisplay-Semibold',
  fontSize: 17,
  // fontWeight: '600',
  // fontStyle: 'normal',
  // letterSpacing: 0.13,
  color: colors.shamrockGreen,

  textAlign: 'center',

  paddingHorizontal: 6,
};

// const getIsDeviceSyncOn = async () => {
//   JSON.parse(await AsyncStorage.getItem('someBoolean'))

// }




// const message = `Thank you for using ${global.appName} version ${global.appVersion}!`;

function SubscriptionRect(props) {
  const { onPress } = props;

  const [value, setValue] = useState(false);

  async function loadValue () {
    if (JSON.parse(await AsyncStorage.getItem('someBoolean'))) setValue(JSON.parse(await AsyncStorage.getItem('someBoolean')));
    else setValue(false);
    // console.log('(JSON.parse(await AsyncStorage.getItem(\'someBoolean\'))): ', (JSON.parse(await AsyncStorage.getItem('someBoolean'))));
  }

  

  useEffect(() => {
    loadValue()
    // console.log('global.someBoolean: ', global.someBoolean);
    return () => {
      // effect
    };
  }, [])


  

  // const toggleSwitch = (
  //    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Switch
  //       value={value}
  //       // disabled={switchValue}
  //       onValueChange={v => {
  //         AsyncStorage.setItem('isDeviceSyncOn', JSON.stringify(switchValue));
  //         global.isDeviceSyncOn = v

  //         setValue(v);
  //       }}
  //     />
  //   </View>
  // );

  const toggleSwitch = 
  <ToggleSwitch
    isOn={value}
    onColor={colors.shamrockGreen}
    offColor={colors.darkTwo}
    // label="Example label"
    // labelStyle={{ color: colors.white, fontWeight: "300" }}
    size="medium"
    onToggle={
      async (v)  => {
        // global.isDeviceSyncOn = v
        // console.log('global.isDeviceSyncOn: ', global.isDeviceSyncOn);
        // AsyncStorage.setItem('isDeviceSyncOn', JSON.stringify(v))
        // Saves to storage as a JSON-string
        // Saves to storage as a JSON-string
        AsyncStorage.setItem('someBoolean', JSON.stringify(v))

        
        setValue(v)
      }
    }
  />

  const bankIcon = <MaterialCommunityIcons name="bank-outline" size={36} color={colors.white} />;

  let text = `Download us on any device and sync it to access your account :D`;

  if (global.authenticated) {
    text = `Device sync is ${(value) ? 'enabled' : 'disabled'}`
  }

  if (!global.authenticated) {
    text = `Tap here to sign up`;
    // return <InfoBox title='Tap here to sign up and access features.' />
  }
  // else {
  //   text = `Thank you for using ${global.appName} version ${global.appVersion}! More stuff coming...`
  // }

  const view = (
    <View
      style={{
        flex: 1,
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'space-between',
        
        paddingLeft: 4,
        paddingHorizontal: 4,


        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 9,
        backgroundColor: colors.dark,
        shadowColor: '#0f1725',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowRadius: 16,
        shadowOpacity: 1,


        width: global.screenWidth * 0.95,

        height: global.screenHeight / 12,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }}
    >
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          padding: 20,
          // width: '100%', // global.screenWidth * 0.9,
          
          // height: '100%',

          alignItems: 'center',
          justifyContent: 'center',
        
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',

        }}
        >



        

        {/* Toggle Switch or Icon */}
        <View
        style={{
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          // flexDirection: 'column',
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',


        }}
        >
        <View style={{
    // flex: 1,
    // width: 50,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 14,

  }}>
      {
        global.authenticated && toggleSwitch || bankIcon
      }
    </View>


      </View>

       <TouchableOpacity
        onPress={onPress}
        disabled={global.authenticated}
        style={
          {
            // flex: 1,
            // width: '100%',
            // alignItems: 'center',
            // justifyContent: 'center',
            paddingLeft:30,

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
            marginRight: 16,
          }

        }
        >
          <Text numberOfLines={3} style={[
            // styles.infoBoxGreenTextStyle,
            copy3,
            {
              
            }
          ]}>{ text }</Text>
                    <Text numberOfLines={1} style={[
            styles.infoBoxGreenTextStyle,
            {
              color: colors.offWhite
            }
          ]}>Access your data from anywhere</Text>
        </TouchableOpacity>

    </View>
    </View>
  );
  return view;
}

export default SubscriptionRect;
