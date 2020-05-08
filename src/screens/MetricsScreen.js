import React, { useEffect, useState } from 'react';

import Auth from '@aws-amplify/auth';

// import { NavigationEvents } from 'react-navigation';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { BarChartExample } from '../components/BarChartExample';

// import searchByID from '../functions/searchByID';

// import searchByName from '../functions/searchByName';

// function breakName(name) {
//   // return first token if name too long
//   if (name.length > 10) {
//     name = name.replace(/^(.{6}[^\s]*).*/, '$1');

   
    
    
//   }

//   if (name.length > 10) {
//     name = name.substring(0, 10) + '...'
//   }
//   return name
// }

import {
  loadSettingsStorage,
  saveSettingsStorage,
  // compareListTransactions,
  retrieveOnlineTransactions,
  // retrieveOnlineCategories,
  // retrieveLocalTransactions,
} from '../storage/SettingsStorage';

// import { data } from './data';

import colors from '../../colors';

import styles from '../../styles';

// const DATA = [
//   {
//     "id": "b35186f2-4b68-4e47-99d7-588596270185",
//     "date": "Thu May 14 2020 00:00:00 GMT-0500 (CDT)",
//     "amount": -965.33,
//     "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//     "payee": {
//       "id": "38bcc5a3-9e97-449d-a653-588622291794",
//       "name": "",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "category": {
//       "id": "aa5177a1-d6af-43ff-9de7-588622440699",
//       "name": "Chips",
//       "color": "#1cac78",
//       "type": "EXPENSE",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "type": "EXPENSE",
//     "note": "App Store",
//     "version": 6
//   },
//   {
//     "id": "0d6d6c8a-293d-4207-8997-588595890955",
//     "date": "2020-05-07T05:00:00.000Z",
//     "amount": -234.56,
//     "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//     "category": {
//       "id": "df26a80e-80a4-4aad-8e3d-588622394949",
//       "name": "Steaks",
//       "color": "#ff9200",
//       "type": "EXPENSE",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "payee": {
//       "id": "dfbb186e-61fe-4a82-b54f-588596435250",
//       "name": "",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "type": "EXPENSE",
//     "note": "Add note",
//     "version": 7
//   },
//   {
//     "id": "4b889660-b01e-4436-820e-588596339818",
//     "date": "2020-05-07T05:00:00.000Z",
//     "amount": -452.77,
//     "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//     "payee": {
//       "id": "a23e6273-9b6f-4e11-a193-588596699361",
//       "name": "",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "category": {
//       "id": "33ac558e-a012-4068-acdb-588622427266",
//       "name": "Soda",
//       "color": "#9aceeb",
//       "type": "EXPENSE",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "type": "EXPENSE",
//     "note": "1",
//     "version": 5
//   },
//   {
//     "id": "ed755c88-bca0-4073-b493-588596307378",
//     "date": "Wed May 06 2020 00:00:00 GMT-0500 (CDT)",
//     "amount": -656.68,
//     "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//     "payee": {
//       "id": "77812523-668a-4a6a-985c-588622291796",
//       "name": "",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "category": {
//       "id": "2d4402e6-df0a-4be6-8104-588596045948",
//       "name": "Home",
//       "color": "#ff6300",
//       "type": "EXPENSE",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "type": "EXPENSE",
//     "note": "Add note",
//     "version": 12
//   },
//   {
//     "id": "0a109f5a-ab6e-47b3-a826-588596529179",
//     "date": "Mon May 04 2020 07:48:24 GMT-0500 (CDT)",
//     "amount": 243.78,
//     "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//     "category": {
//       "id": "c2a4506f-8af9-47e6-9b0c-588596045948",
//       "name": "Income",
//       "color": "#00e157",
//       "type": "INCOME",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "payee": {
//       "id": "dda528b7-b12e-4596-8bae-588596577738",
//       "name": "",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "type": "INCOME",
//     "note": "Add note",
//     "version": 4
//   },
//   {
//     "id": "a626fb8b-7ce3-4c74-a709-588596251195",
//     "date": "2020-05-04T12:43:19.930Z",
//     "amount": -0.55,
//     "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//     "payee": {
//       "id": "d2563d13-392a-4890-b0fd-588597006553",
//       "name": "",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "category": {
//       "id": "644c093b-4ae8-4271-bbab-588596045948",
//       "name": "Bills",
//       "color": "#008aff",
//       "type": "EXPENSE"
//     },
//     "type": "EXPENSE",
//     "note": "Add note",
//     "version": 5
//   },
//   {
//     "id": "69823e65-b03d-49dd-82eb-588590247709",
//     "date": "Mon May 04 2020 06:03:57 GMT-0500 (CDT)",
//     "amount": -0.28,
//     "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//     "category": {
//       "id": "b553bd83-fea5-4fd7-8164-588596045948",
//       "name": "Transport & Travel",
//       "color": "#e05ceb",
//       "type": "EXPENSE"
//     },
//     "payee": {
//       "id": "50b91638-1f08-4b4c-b362-588596435303",
//       "name": "",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "type": "EXPENSE",
//     "note": "Add note",
//     "version": 0
//   },
//   {
//     "id": "0b759096-462a-4318-b99f-588596017456",
//     "date": "Sat May 02 2020 00:00:00 GMT-0500 (CDT)",
//     "amount": 20,
//     "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//     "payee": {
//       "id": "4d3a7229-d13b-4375-b0e6-588622291849",
//       "name": "",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "category": {
//       "id": "c2a4506f-8af9-47e6-9b0c-588596045948",
//       "name": "Income",
//       "color": "#00e157",
//       "type": "INCOME"
//     },
//     "type": "INCOME",
//     "note": "Add note",
//     "version": 2
//   },
//   {
//     "id": "cf853f0c-c8f7-449d-bd84-588596199788",
//     "date": "Fri May 01 2020 00:00:00 GMT-0500 (CDT)",
//     "amount": -5.18,
//     "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//     "payee": {
//       "id": "0d24452d-feb1-42d8-86a0-588622291851",
//       "name": "",
//       "owner": "b5abf059-0cd5-485b-a174-4e35404328ac",
//       "version": 0
//     },
//     "category": {
//       "id": "b553bd83-fea5-4fd7-8164-588596045948",
//       "name": "Transport & Travel",
//       "color": "#e05ceb",
//       "type": "EXPENSE"
//     },
//     "type": "EXPENSE",
//     "note": "Add note",
//     "version": 1
//   }
//   //   {
//   //   name: "Seoul",
//   //   count: 21500000,
//   //   color: "rgba(131, 167, 234, 1)",
//   //   legendFontColor: "#7F7F7F",
//   //   legendFontSize: 17
//   // },
// ]

// const getTransactionCategories = (transactions) => {
//   let result = [];

//   transactions.forEach((transaction) => {
//     if (!transaction.category) {
//       return
//     }
//     let category = searchByID(transaction.category.id, result);

//     if (category) {
//       // alert(transaction.category.name)
//       // add to existing item count and return
//       category.count++;

//       return

//     } else {
//       // new list item
//       let category = transaction.category
//       // console.log('category: ', category);
//       category.count = 0;

//       // for (var i = transactions.length - 1; i >= 0; i--) {
//       //   // console.log('(transactions[i].category.id: ', (transactions[i].category.id))
//       //   if (transactions[i].category.id === category.id) {
//           category.count += 1
//       //   }
//       // }

//       category.legendFontColor = styles.textStyle.color // '#ddd' // element.category.color

//       category.legendFontSize = styles.textStyle.fontSize

//       category.name = breakName(category.name)

//       result.push(category);

//       return
//     }
//   });
//   return result;
// };

export default function MetricsScreen() {
  const [data, setData] = useState([]);

  const pieChartPressed = () => {
    // console.log('Hello: ');
  };

  async function loadResources() {
    const storage = await loadSettingsStorage(global.storageKey);
    // console.log('storage.transactions.length: ', storage.transactions.length);

    setData(storage.transactions)
  }

  useEffect(() => {
    loadResources()
    // return () => {
    //   // 
    // };
  }, []);

  return (
    <SafeAreaView style={
      [
        // styles.container,
        {
          alignItems: 'center',
          // marginTop: 50,

        }
      ]}>
    {/* <NavigationEvents
        // try only this. and your component will auto refresh when this is the active component
        // onWillFocus={() => {
        //   console.log('Hello')
        //   loadResources()
        //   // setData(getTransactionCategories(data))
          
        // }} // {(payload) => clearState()}
        
        // other props
        // onDidFocus={() =>  {
        //   if (currentTransactions.length <= 0) startWalkthrough(addTransactionWalkthrough)
        // }}
        // onWillBlur={}
        // onDidBlur={retrieveUserStoredSettings}
      />*/}
      <BarChartExample data={data} />
    </SafeAreaView>
  );
}

MetricsScreen.navigationOptions = () => {
  // get user name and email from passed props
  // const header = {
  //   // headerTransparent: {},
  //   headerLeft: '',
  //   headerTintColor: colors.white,
  //   // headerLeft: (
  //   // <HeaderLeftView />),
  //   // headerRight: <HeaderRightView />,
  // };
  const header = {
    // title: 'Metrics',
    // headerTransparent: {},
    headerStyle: {
      backgroundColor: colors.dark,

    },
    headerTintColor: colors.white,

    // headerRight: signOutBtn,
  }
  return header;
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
