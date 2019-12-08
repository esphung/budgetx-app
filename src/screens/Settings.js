/*
FILENAME:   Settings.js
PURPOSE:    Settings
AUTHOR:     Eric Phung
CREATED:    Thu Oct 31 23:17:49 2019
UPDATED:    12/04/2019 07:44 PM Changed to hook state
            12/04/2019 08:37 PM
            12/04/2019 10:53 PM | Cleaned up code
            12/06/2019 02:20 AM | Added Log out functionality
            12/06/2019 03:15 PM
*/

import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  // Button,
  // TouchableOpacity,
  // Text,
  Image,
  // TextInput
  SafeAreaView,
} from 'react-native';

import * as StoreReview from 'expo-store-review';

import * as MailComposer from 'expo-mail-composer';

import { TouchableOpacity } from 'react-native-gesture-handler';

// import { NavigationEvents } from 'react-navigation';

import ProfileRectangle from '../components/settings/ProfileRectangle';

import SubscriptionRect from '../components/settings/SubscriptionRect';

import UserOptions from '../components/settings/UserOptions';

import RateUsButton from '../components/settings/RateUsButton';

import ShareButton from '../components/settings/ShareButton';

import DeveloperCredit from '../components/settings/DeveloperCredit';

import DesignerCredit from '../components/settings/DesignerCredit';

import VersionCredit from '../components/settings/VersionCredit';

import {
  loadUserObject,
  // saveUserObject,
} from '../storage/UserStorage';

// ui colors
import colors from '../../colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: colors.darkTwo,
  },
  backBtnImage: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// header rectangle
const rectangle5 = {
  flex: 0.15,
  backgroundColor: colors.dark,

  marginBottom: '5%',
};

// right X header btn
const combinedShape = {
  // width: 20.3,
  // height: 19.9,
  width: '100%',
  height: '100%',
  // backgroundColor: '#ffffff',
  shadowColor: '#0000002e.68f5c28f5c28',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 4,
  shadowOpacity: 1,
};

function convertObjectToHTML(item) {
  const array = [];
  // console.log(item);

  Object.keys(item).forEach((key) => {
    // parse nested opbj properties
    if (key === 'category') {
      // console.log(item[key].name);
      array.push(`<td>${item[key].name}</td>\n`);
    } else if (key === 'payee') {
      array.push(`<td>${item[key].name}</td>\n`);
    } else {
      array.push(`<td>${item[key]}</td>\n`);
    }
  });
  return array.join('');
}

function getHTMLObjectRows(array) {
  let string = '';
  let i = array.length - 1;
  for (i; i >= 0; i -= 1) {
    string += `<tr>${convertObjectToHTML(array[i])}</tr>${'\n'}`;
  }
  return string;
}

function getObjectKeysHTML(list) {
  const keys = [];

  let key;

  const item = list[0];

  Object.keys(item).forEach((key) => {
    // parse nested opbj properties
    keys.push(`<td>${key}</td>\n`);
  });
  return keys.join(''); 
}

const htmlTop = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
        /*
        th {
          border: 1px gray black;
        }
        */
        table {
            border-collapse: collapse;
            font: 12px sf-pro;
        }

        td {
            border: 1px lightgray solid;
        }

        th, td {
          padding: 8px;
          text-align: left;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, sf-pro;
        }
    </style>
    <title>${'Hello WOrld'}</title>
  </head>
    <body>
`;

const htmlTable = `
    <table style="width:100%">
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Age</th>
      </tr>
      <tr>
        <td>Jill</td>
        <td>Smith</td>
        <td>50</td>
      </tr>
      <tr>
        <td>Eve</td>
        <td>Jackson</td>
        <td>94</td>
      </tr>
    </table>
`;

const htmlBottom = `
  </body>
</html>
`

const data =  [
  {
    "id": "1575264547767",
    "date": "2019-12-02T05:29:07.767Z",
    "amount": 0.01,
    "payee": {},
    "category": {
     "id": 0,
     "name": "Income",
     "color": "#00e157",
     "type": "income"
    },
    "type": "income"
  },
   {
    "id": "1575264543544",
    "date": "2019-12-02T05:29:03.544Z",
    "amount": -11.24,
    "payee": {},
    "category": {
     "id": 2,
     "name": "Transport & Travel",
     "color": "#e05ceb",
     "type": "expense"
    },
    "type": "expense"
  }
];


function getCSVHTML (data) {
  let html = '';

  const keys = `${getObjectKeysHTML(data)}`;

  const tableHead = `${keys}`;

  const table = `
<div>
<table style="width:100%">
<tr>
${keys}
</tr>
${getHTMLObjectRows(data)}
</table>

</div>${'\n'}
`;

  const row  = `
<div>${getHTMLObjectRows(data)}</div>
`;

  html = htmlTop + table + htmlBottom;

  // console.log(html);
  return html;
}

function getShortDate(date) {
  // short human readable date
  let str = '';
  if (date) {
    const dateObj = new Date(date);
    const dd = dateObj.getDate();
    const mm = dateObj.getMonth() + 1; // January is 0!
    const yyyy = dateObj.getFullYear();

    // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
    str = `${mm}/${parseInt(dd, 10)}/${yyyy}`;
  }
  return str;
}

function getObjectKeys (list) {
  let keys = [];

  let key;

  let item = list[0];


  for ( key in item ) {
    keys.push(key);
  }
  return keys.join(','); 
}

function convertObjectToCSV (item) {
  let key;
    // item = {
    //   name: "John",
    //   surname: "Smith",
    //   phone: "253 689 4555"
    // },
  let array = [];

  for ( key in item ) {
    if ( item.hasOwnProperty( key ) ) {
      // parse nested opbj properties
      if (key === 'category') {
        // console.log(item[key].name);
        array.push(item[key].name);
      } else if (key === 'payee') {
         array.push(item[key].name);
      } else {
        array.push(item[key]);
      }
    }
  }
  return array.join( ',' );
}

function getCSVObjects(array) {
  let string = '';
  let i = array.length - 1;
  for (i; i >= 0; i -= 1) {
    string += `${convertObjectToCSV(array[i])} ${'\n'}`
  }
  return string;
}

function Settings(props) {
  const send = async () => {
    const userObject = await loadUserObject();
    MailComposer.composeAsync({
      recipients: [global.adminEmailAddress],
      subject: `Contact Support ${Date.now()} ${userObject.user.username}`,
      body: '',
      attachments: [],
      isHtml: false,
    });
  };

  const sendTransactions = async () => {
    const userObject = await loadUserObject();
    
    // console.log(JSON.stringify(userObject.user.transactions, null, 1))

    const transactions = userObject.user.transactions;

    

    const list = transactions.reverse();

    for (var i = list.length - 1; i >= 0; i--) {
      list[i].date = getShortDate(list[i].date)
    }
    // console.log(getCSVHTML(data));

    // const values = [
    //   ['build', 'Hello'],
    //   ['deploy', 'World']
    // ];

    // let dirs = RNFetchBlob.fs.dirs;

    // const dirs = RNFetchBlob.fs.dirs
    // console.log(dirs.DocumentDir)
    // console.log(dirs.CacheDir)
    // console.log(dirs.DCIMDir)
    // console.log(dirs.DownloadDir)


    // // construct csvString
    // const headerString = 'event,timestamp\n';
    // const rowString = values.map(d => `${d[0]},${d[1]}\n`).join('');
    // const csvString = `${headerString}${rowString}`;

    // // write the current list of answers to a local csv file
    // const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/data.csv`;
    // console.log('pathToWrite', pathToWrite);
    // // pathToWrite /storage/emulated/0/Download/data.csv
    // RNFetchBlob.fs
    //   .writeFile(pathToWrite, csvString, 'utf8')
    //   .then(() => {
    //     console.log(`wrote file ${pathToWrite}`);
    //     // wrote file /storage/emulated/0/Download/data.csv
    //   })
    //   .catch(error => console.error(error));






    // let csv = '';

    // csv += `${getObjectKeys(transactions)} ${'\n'}`;

    // csv += `${getCSVObjects(transactions)} ${'\n'}`;

    // console.log(csv)

    // ================

    // var csv = transactions.map(function(d){
    //    return JSON.stringify(d.date);
    // })
    // .join(',') 
    // //.replace(/(^\[)|(\]$)/mg, ''); // remove opening [ and closing ] brackets from each line 


    // console.log(csv)

//     let string = '';
//     for (var i = transactions.length - 1; i >= 0; i--) {
//       string += `
// ${getShortDate(transactions[i].date)}, ${transactions[i].amount}, ${transactions[i].category.name}
// \n`
//     }

    // console.log(string);


    MailComposer.composeAsync({
      recipients: [global.adminEmailAddress],
      subject: `${userObject.user.username} Exported Transactions on ${getShortDate(new Date())}`,
      body: getCSVHTML(list), // '<div>Hello</div>', // <JSONPretty id="json-pretty" data={transactions}></JSONPretty>, // JSON.stringify(transactions, null, ' '), // '',
      attachments: [],
      isHtml: true,
    });
  };


  function rateUsBtnPressed() {
    // store review
    console.log('Rate Us button pressed')
    StoreReview.requestReview();
  }

  function contactSupportBtnPressed() {
    // send contact support email
    send();
  }

  function termsOfServiceBtnPressed() {
    // console.log('Terms');
    props.navigation.navigate('Terms');
  }

  function shareBtnPressed() {
    console.log('Share button pressed');
  }

  function exportBtnPressed() {
    // console.log('Export btn pressed');
    sendTransactions();
  }

  function onPress(btn) {
    const name = btn.key;

    // console.log(btn);
    if (name === 'Contact Support') {
      contactSupportBtnPressed();
    } else if (name === 'Terms of Service') {
      termsOfServiceBtnPressed();
    } else if (name === 'Export Transactions') {
      exportBtnPressed();
    }
  }

  return (
    <SafeAreaView
      style={
        {
          flex: 1,
          backgroundColor: colors.dark,
        }
      }
    >
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.container}
      >
        {/*
        <NavigationEvents
            // try only this. and your component will auto refresh when this is the active component
            onWillFocus={() => console.log('Settings')} // {(payload) => clearState()}
            // other props
            // onDidFocus={payload => console.log('did focus',payload)}
            // onWillBlur={payload => console.log('will blur',payload)}
            // onDidBlur={payload => console.log('did blur',payload)}
          />
        */}

        <View style={rectangle5} />

        <ProfileRectangle />

        <SubscriptionRect />

        {/* User Options */}

        <UserOptions
          onPress={onPress}
        />

        <View
          style={
            {
              flex: 0.4,

              // top: '55%',

              // borderWidth: 1,
              // borderColor: 'white',
              // borderStyle: 'solid',
            }
          }
        >
          <View
            style={
              {
                flex: 1,
                justifyContent: 'center',

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }
          >

            <DeveloperCredit />

            <DesignerCredit />

          </View>

          <View
            style={
              {
                flex: 1,
                flexDirection: 'row',

                alignItems: 'center',
                justifyContent: 'center',

                // borderWidth: 1,
                // borderColor: 'white',
                // borderStyle: 'solid',
              }
            }
          >
            <RateUsButton onPress={() => rateUsBtnPressed()} />

            <ShareButton onPress={() => shareBtnPressed()} />

          </View>

          <View style={{
            flex: 0.5,
            justifyContent: 'center',
          }}
          >
            <VersionCredit />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

Settings.navigationOptions = ({ navigation }) => {
  const backBtnPressed = () => {
    navigation.navigate('Home');
  };

  // async function logUserOut() {
  //   await global.setIsStoredUserLoggedIn(false);
  //   navigation.navigate('Login');
  // }

  const navbar = {
    title: 'Settings',
    headerTransparent: {},
    headerTintColor: colors.white,

    headerRight: (
      <View
        style={{

          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 8,
          width: '100%',
          height: '100%',
        }}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => backBtnPressed()}>
          <View style={combinedShape}>
            <Image source={global.xIconWhite} style={styles.backBtnImage} />
          </View>
        </TouchableOpacity>
      </View>
    ),

    headerLeft: null,

    // headerTitleStyle: {
    //   // borderWidth: 1,
    //   // borderColor: 'white',
    //   // borderStyle: 'solid',
    // },

    // headerLeft: (
    //   <View style={
    //     {
    //       marginHorizontal: 14,
    //       // borderWidth: 1,
    //       // borderColor: 'white',
    //       // borderStyle: 'solid',
    //     }
    //   }
    //   >
    //     <TouchableOpacity onPress={() => logUserOut()}>
    //       <Text style={copy18}>Log Out</Text>
    //     </TouchableOpacity>
    //   </View>
    // ),

  };
  return navbar;
};

export default Settings;

// // Settings.js
// // Thu Oct 31 23:17:49 2019
// // eric phung
// //  settings screen for budget x app
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   View,

//   Button,
//   AsyncStorage
// } from 'react-native';

// // ui colors
// import colors from '../../colors';

// class Settings extends Component {
//   static navigationOptions = ({ navigation }) => {
//     const obj = {
//       title: 'Settings',

//       headerStyle: {
//         backgroundColor: colors.dark,
//       },
//       headerLeft: (
//         <Button title='Back' onPress={() => navigation.goBack(null)} />
//       ),

//       headerTintColor: colors.white
//     };
//     // const props = navigation.getScreenProps('props');

//     return obj;
//   }

//   clearAll() {
//     const { navigation } = this.props;
//     AsyncStorage.clear();
//     navigation.goBack(null);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title='Reset' onPress={() => this.clearAll()} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.darkTwo
//   },

//   logOutBtnView: {
//     flex: 1,
//     marginLeft: 15,
//     marginBottom: 6
//   },

//   logOutBtnText: {
//     width: 58,
//     height: 20,
//     fontFamily: 'SFProDisplay-Regular',
//     fontSize: 17,
//     fontWeight: 'normal',
//     fontStyle: 'normal',
//     letterSpacing: 0.13,
//     textAlign: 'right',
//     color: colors.pinkRed,
//   }
// });

// export default Settings;
