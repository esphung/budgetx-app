import React from 'react';
// import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// eslint-disable-next-line import/extensions
import Welcome from './Welcome';
import Button from './Button';
import BlueButton from './BlueButton';
import HelpMessage from './HelpMessage';
import InfoBox from './InfoBox';

import TouchableText from './TouchableText';

// import Button from './Button';
import CenterView from './CenterView';
// import Welcome from './Welcome';

storiesOf('Components', module)
// .add('to Welcome Screen', () => <Welcome />)

.add('Button', () => 
  <CenterView>
    <Button
      title="Button"
      onPress={() => console.log('Button')}
    />
  </CenterView>
)
.add('TouchableText', () => 
  <CenterView>
    <TouchableText
      title="TouchableText"
      onPress={() => console.log('TouchableText')}
    />
  </CenterView>
)

.add('BlueButton', () => 
  <CenterView>
    <BlueButton
      title="Blue Button"
      onPress={() => console.log('Blue Button')}
    />
  </CenterView>
)

.add('HelpMessage', () => 
  <CenterView>
    <HelpMessage message="HelpMessage" />
  </CenterView>
)

.add('InfoBox', () => 
  <CenterView>
    <InfoBox title="InfoBox" />
  </CenterView>
)








