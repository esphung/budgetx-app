import React from 'react';
// import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// import Button from './Button';
import CenterView from './CenterView';
// import Welcome from './Welcome';

// eslint-disable-next-line import/extensions
// import Welcome from './Welcome';
import Button from './Button';
import BlueButton from './BlueButton';
import HelpMessage from './HelpMessage';
import InfoBox from './InfoBox';
import TouchableText from './TouchableText';


// Transactions Table Components
import EmptyListMessage from './EmptyListMessage';
import CategoryLabel from './CategoryLabel';
import TransactionItemCell from './TransactionItemCell';
// import MyDateTimePicker from './MyDateTimePicker';
import MyCalendarPicker from './MyCalendarPicker';


// test variables
const message = 'Hello World';

const test_date = new Date(1998, 7, 2);

storiesOf('Components', module)
// .add('to Welcome Screen', () => <Welcome />)

.add('Button', () => 
  <CenterView>
    <Button
      title="Button"
      onPress={() => console.log(message)}
    />
  </CenterView>
)
.add('TouchableText', () => 
  <CenterView>
    <TouchableText
      title="TouchableText"
      onPress={() => console.log(message)}
    />
  </CenterView>
)

.add('BlueButton', () => 
  <CenterView>
    <BlueButton
      title="Blue Button"
      onPress={() => console.log(message)}
    />
  </CenterView>
)

.add('HelpMessage', () => 
  <CenterView>
    <HelpMessage message={message} />
  </CenterView>
)

.add('InfoBox', () => 
  <CenterView>
    <InfoBox title={message} />
  </CenterView>
)

// Transactions Table

.add('EmptyListMessage', () => 
  <CenterView>
    <EmptyListMessage />
  </CenterView>
)

.add('TransactionItemCell', () => 
  <CenterView>
    <TransactionItemCell
      item={
        {
          payee: {
            name: 'Joe Budden'
          },
          date: new Date(),
          amount: 3423.23,
          category: {
            name: 'Groceries',
            color: 'pink',
          },
        }
      }

      // onPress={() => alert('Hello')}
    />
  </CenterView>
)

.add('CategoryLabel', () => 
  <CenterView>
    <CategoryLabel name={message} textColor="gray" />
  </CenterView>
)



// .add('MyDateTimePicker',() => 
//   <CenterView>
//     <MyDateTimePicker date={new Date()} />
//   </CenterView>
// )


.add('MyCalendarPicker',() => 
  <CenterView>
    <MyCalendarPicker
      date={test_date}
      onDateChange={() => console.log('Hello')}
    />
  </CenterView>
)




