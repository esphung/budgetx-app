import React from 'react';

import {
  // StyleSheet,
  View,
  // Button,
  // TouchableOpacity,
  Text,
  // Image,
  TextInput
} from 'react-native';

// ui colors
import colors from '../../../colors';

function UserNameInput() {
  let view = <View />;
  view = (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={
          {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
        >
          {/* User Name input */}
          <Text style={
            {
              flex: 0.2,
              // width: 44,
              // height: 20,
              fontFamily: 'SFProDisplay-Regular',
              fontSize: 17,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.13,
              color: colors.white,

              marginLeft: 5,
              marginBottom: 4,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
          >
          Name
          </Text>
          <TextInput
            style={
              {
                flex: 0.8,
                // width: 120,
                // height: 20,
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.13,
                textAlign: 'right',
                color: colors.offWhite, // '#ffffff7f.8',

                marginRight: 10,
                marginBottom: 4,

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }
            placeholder="John Smith"

            placeholderTextColor={colors.offWhite}

            keyboardAppearance="dark" // ios

            // textContentType="name" // ios

            // keyboardType="name-phone-pad"

            returnKeyType="done"

            // autoCorrect={true}

            autoCapitalize="sentences" // "words"

            maxLength={24}

            // onSubmitEditing={() => this.submitBtnPressed(text)}

            // onChangeText={this.handleTextChange}

            // editable={this.isInputEnabled}

            // value={text}

          />

        </View>
        <View style={line2} />
        <View style={
          {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',

            // borderWidth: 1,
            // borderColor: 'white',
            // borderStyle: 'solid',
          }
        }
        >
          {/* User Email input */}
          <Text style={
            {
              flex: 0.2,
              // width: 44,
              // height: 20,
              fontFamily: 'SFProDisplay-Regular',
              fontSize: 17,
              fontWeight: 'normal',
              fontStyle: 'normal',
              letterSpacing: 0.13,
              color: colors.white,

              marginLeft: 5,
              marginBottom: 4,

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
          >
          Email
          </Text>
          <TextInput
            style={
              {
                flex: 0.8,
                // width: 120,
                // height: 20,
                fontFamily: 'SFProDisplay-Regular',
                fontSize: 17,
                fontWeight: 'normal',
                fontStyle: 'normal',
                letterSpacing: 0.13,
                textAlign: 'right',
                color: colors.offWhite, // '#ffffff7f.8',

                marginRight: 10,
                marginBottom: 4,

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }
            placeholder="mail@budgetx.com"

            placeholderTextColor={colors.offWhite}

            keyboardAppearance="dark" // ios

            // textContentType="name" // ios

            // keyboardType="name-phone-pad"

            returnKeyType="done"

            // autoCorrect={true}

            autoCapitalize="sentences" // "words"

            maxLength={24}

            // onSubmitEditing={() => this.submitBtnPressed(text)}

            // onChangeText={this.handleTextChange}

            // editable={this.isInputEnabled}

            // value={text}

          />

        </View>
      </View>
  );
  return view;
}

export default UserNameInput;