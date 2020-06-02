import React, { useState } from 'react';

import PropTypes from 'prop-types';

import {
  View,
  TextInput,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

// ui colors
import colors from '../../../colors';

import styles from '../../../styles';

import searchByID from '../../functions/searchByID';

import Category from '../../models/Category';

export default function CellItem({
  id,
  name,
  selected,
  onSelect,
  color,
  currentCategory,
  data,
  setCurrentCategory,
}) {
  const [text, setText] = useState(name);

  const textColor = selected ? color : color;
  return (
    <TouchableOpacity
      activeOpacity={1.0}
      style={[
        styles.tableItemStyle,
        {
          backgroundColor: selected ? colors.darkGreyBlue : colors.dark,
        },
      ]}
      selected={selected}
      onPress={() => {
        onSelect(id);
        const category = searchByID(id, data);
        if (!currentCategory || currentCategory.id !== id) {
          setCurrentCategory(category);
        } else {
          setCurrentCategory(null);
        }
      }}
    >
      <View
        style={
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',


          }
        }
      >
        <TextInput
          style={
            [
              styles.listItemTitleStyle,
              {
                color: textColor,
              },
            ]
          }

          placeholder={name}

          placeholderTextColor={color}

          // editable={(selected) ? true : false}
          editable={false}

          returnKeyType="done"

          keyboardAppearance="dark"

          autoCapitalize="words"

          autoCorrect

          onChangeText={(value) => {
            setText(value);
          }}

          // onSubmitEditing={() => handleTextSubmit(text)}

          // onEndEditing={(value) => setText(value)}

          maxLength={14}

          value={text}
        />

        <View
          style={
            {
              flex: 1,
            }
          }
        />
      </View>
    </TouchableOpacity>
  );
}

CellItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  color: PropTypes.string,
  currentCategory: PropTypes.instanceOf(Category),
  data: PropTypes.arrayOf(PropTypes.string),
  setCurrentCategory: PropTypes.func,
  // onTap: PropTypes.func.isRequired,
};


CellItem.defaultProps = {
  id: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  color: PropTypes.string,
  currentCategory: PropTypes.instanceOf(Category),
  data: PropTypes.arrayOf(PropTypes.string),
  setCurrentCategory: PropTypes.func,
};
