// import React, { useState } from 'react'

// import {
//   Text,
//   TouchableHighlight,

// } from 'react-native'

// import Tooltip from 'react-native-walkthrough-tooltip';

// import styles from '../../styles';

// export default function ToolTip(props) {
//   const [toolTipVisible, setToolTipVisible] = useState(global.showToolTip);
//   return (
//     <Tooltip
//       isVisible={toolTipVisible}
//       content={<Text>Hello</Text>}
//       placement="top"
//       onClose={() => {
//         // this.setState({ toolTipVisible: false })
//         setToolTipVisible(false);
        
//       }}
//     >
//       <TouchableHighlight style={styles.touchable}>
//         <Text>Press me</Text>
//       </TouchableHighlight>
//     </Tooltip>
//   );
// }