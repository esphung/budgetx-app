/*
FILENAME:  network.js
PURPOSE:   network functions for app
AUTHOR:    Eric Phung
CREATED:   04/02/2020 03:40 PM
UPDATED:   04/02/2020 03:40 PM
*/

import NetInfo from '@react-native-community/netinfo';

async function isDeviceOnline() {
  let bool = false;
  await NetInfo.fetch().then((state) => {
    bool = state.isConnected;
    // console.log("Connection type", state.type);
    // console.log('Is connected?', state.isConnected);
  });
  // console.log('bool: ', bool);
  return bool;
};


/* Utils.js */
/* This file contains functions you can use anywhere in your application */

function formatName(label) {
   // your logic
}

function formatDate(date) {
   // your logic
}

// Now you have to export each function you want
export {
  isDeviceOnline,
   // formatName,
   // formatDate,
};