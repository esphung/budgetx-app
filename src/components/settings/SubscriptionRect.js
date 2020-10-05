import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
} from 'react-native';

import { NetworkConsumer } from 'react-native-offline';

import ToggleSwitch from 'toggle-switch-react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from 'src/colors';

import styles from 'styles/Settings';

import {
  loadStorage,
  saveStorage,
} from 'controllers/Storage';

function SubscriptionRect({
  onPress,
  isDeviceSyncEnabled,
  setIsDeviceSyncEnabled,
  isUserLoggedIn,
}) {
  const [value, setValue] = useState(isDeviceSyncEnabled);

  const loadResources = async () => {
    const storage = await loadStorage(global.storageKey);
    setValue(storage.isDeviceSyncEnabled)
  }

  // useEffect(() => {
  //   setValue(loadResources())
  //   return () => {
  //     // effect
  //   };
  // }, [])

  const toggleSwitch = (
    <ToggleSwitch
      isOn={value}
      onColor={colors.shamrockGreen}
      offColor={colors.darkTwo}
      // label="Example label"
      // labelStyle={{ color: colors.white, fontWeight: "300" }}
      size="medium"
      onToggle={
        async (v) => {
          await loadStorage(global.storageKey).then(async (storage) => {
            storage.isDeviceSyncEnabled = v;
            setIsDeviceSyncEnabled(v)
            await saveStorage(global.storageKey, storage).then(setValue(v))
          })
          
          // console.log('JSON.stringify(storage, ["isDeviceSyncEnabled"]): ', JSON.stringify(storage, ['isDeviceSyncEnabled']));
          
        }
      }
    />
  );

  const bankIcon = <MaterialCommunityIcons name="bank-outline" size={36} color={colors.white} />;

  let text = 'Download us on any device and sync it to access your account :D';

  if (isUserLoggedIn) {
    text = `Device sync is ${(value) ? 'enabled' : 'disabled'}`;
  } else if (!isUserLoggedIn) {
    text = 'Tap here to sign up';
  }
  const view = (
    <View style={styles.subscriptionRect}>
      <View style={styles.subPanel}>
        <View style={styles.subscriptionRectRowView}>
          {/* Toggle Switch or Icon */}
          <View style={styles.toggleSwitchOrIcon}>
            <NetworkConsumer>
              {
                ({ isConnected }) => (
                  isConnected ? (
                    <View style={styles.bankIcon}>
                      {
                        (isUserLoggedIn && toggleSwitch) || bankIcon
                      }
                    </View>
                  ) : (
                    <View style={styles.bankIcon}>
                      <MaterialCommunityIcons name="wifi-off" size={36} color="white" />
                    </View>
                  )
                )
              }
            </NetworkConsumer>
          </View>

          <NetworkConsumer>
            {
              ({ isConnected }) => (
                isConnected ? (
                  <TouchableOpacity
                    onPress={onPress}
                    disabled={Boolean(isUserLoggedIn)}
                    style={
                      {
                        paddingLeft: 30,
                        marginRight: 16,
                        // borderWidth: 1,
                        // borderColor: 'white',
                        // borderStyle: 'solid',
                      }

                    }
                  >
                    <Text
                      numberOfLines={3}
                      style={styles.subscriptionRectGreenText}
                    >
                      { text }
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.infoBoxGreenTextStyle,
                        {
                          color: colors.offWhite,
                        },
                      ]}
                    >
                      Access your data from anywhere
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={onPress}
                    disabled
                    style={
                      {
                        paddingLeft: 30,
                        marginRight: 16,
                        // borderWidth: 1,
                        // borderColor: 'white',
                        // borderStyle: 'solid',
                      }

                    }
                  >
                    <Text
                      numberOfLines={3}
                      style={styles.subscriptionRectGreenText}
                    >
                      No internet
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.infoBoxGreenTextStyle,
                        {
                          color: colors.offWhite,
                        },
                      ]}
                    >
                      You have no internet connection
                    </Text>
                  </TouchableOpacity>
                )
              )
            }
          </NetworkConsumer>
        </View>
      </View>
    </View>
  );
  return view;
}

export default SubscriptionRect;
