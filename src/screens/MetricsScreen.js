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

import {
  calculateEachMonthTotalSpent,
  calculateEachDayTotalSpent,
  calculateEachMonthTotalEarned,
} from '../functions/calculateEachMonthTotalSpent';

// import { data } from './data';

import colors from '../../colors';

import styles from '../../styles';

let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getBarChartEarnedData(data) {
  // let dates = getDates(data)

  let amounts = []

  let months = monthNames[0,6].length

  let spent = 0

  let currentDate = new Date();

  for (var i = 0; i < 12; i++) {
    // months[i]
    

    let date = new Date(currentDate.getYear(), i, 1)
    // console.log('date: ', date);

    spent = calculateEachMonthTotalEarned(data, date);
    // console.log('monthlySpentData: ', monthlySpent);

    amounts.push(spent)
  }
  return {
    // labels: dates,
    labels: shortMonths,
    datasets: [
      {
        data: amounts
      }
    ]
  };
}

function getBarChartExpenseData(data) {
  // let dates = getDates(data)

  let amounts = []

  let months = monthNames.length

  let spent = 0

  let currentDate = new Date();

  for (var i = 0; i < 12; i++) {
    // months[i]
    

    let date = new Date(currentDate.getYear(), i, 1)
    // console.log('date: ', date);

    spent = calculateEachMonthTotalSpent(data, date);
    // console.log('monthlySpentData: ', monthlySpent);

    amounts.push(spent)

  }
  return {
    // labels: dates,
    labels: shortMonths,
    datasets: [
      {
        data: amounts
      }
    ]
  };
}



export default function MetricsScreen() {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true)

  // const [isChartsEnabled, setIsChartsEnabled] = useState(false)

  const pieChartPressed = () => {
    // console.log('Hello: ');
  };

  async function loadResources() {
    const storage = await loadSettingsStorage(global.storageKey);
    // console.log('storage.transactions.length: ', storage.transactions.length);

    setData(storage.transactions);

    setIsLoading(false)

    // if (storage.transactions &&  storage.transactions.length > 0) {
    //   setIsChartsEnabled(true)
    // }
  }

  useEffect(() => {
    // setIsLoading(true)
    loadResources();
    // return () => {
    //   // 
    // };
  }, []);

  return (
    <View style={
      [
        styles.container,
        {
          // alignItems: 'center',
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
      {
        data && <BarChartExample
          data={data}
          isChartsEnabled={data.length > 0}
          isLoading={isLoading}
          getBarChartEarnedData={getBarChartEarnedData}
          getBarChartExpenseData={getBarChartExpenseData}
        />
      }
    </View>
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
