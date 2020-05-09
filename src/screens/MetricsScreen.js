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
