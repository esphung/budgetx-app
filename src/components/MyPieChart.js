// import React, { useState } from 'react';

// import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

// const screenWidth = Dimensions.get("window").width;

// const screenHeight = Dimensions.get("window").height;

// // import { data } from './data';

// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from 'react-native-chart-kit';


// // console.log('DATA: ', DATA);

// // let data  = []

// // const data =  [
// //   {
// //     id: 'aa5177a1-d6af-43ff-9de7-588622440699',
// //     name: 'Chips',
// //     color: '#1cac78',
// //     type: 'EXPENSE',
// //     owner: 'b5abf059-0cd5-485b-a174-4e35404328ac',
// //     version: 0,
// //     count: 1,
// //     legendFontColor: '#1cac78',
// //     legendFontSize: 12,
// //   },
// //   {
// //     id: 'df26a80e-80a4-4aad-8e3d-588622394949',
// //     name: 'Steaks',
// //     color: '#ff9200',
// //     type: 'EXPENSE',
// //     owner: 'b5abf059-0cd5-485b-a174-4e35404328ac',
// //     version: 0,
// //     count: 1,
// //     legendFontColor: '#ff9200',
// //     legendFontSize: 12,
// //   },
// //   {
// //     id: '33ac558e-a012-4068-acdb-588622427266',
// //     name: 'Soda',
// //     color: '#9aceeb',
// //     type: 'EXPENSE',
// //     owner: 'b5abf059-0cd5-485b-a174-4e35404328ac',
// //     version: 0,
// //     count: 1,
// //     legendFontColor: '#9aceeb',
// //     legendFontSize: 12,
// //   },
// //   {
// //     id: '2d4402e6-df0a-4be6-8104-588596045948',
// //     name: 'Home',
// //     color: '#ff6300',
// //     type: 'EXPENSE',
// //     owner: 'b5abf059-0cd5-485b-a174-4e35404328ac',
// //     version: 0,
// //     count: 1,
// //     legendFontColor: '#ff6300',
// //     legendFontSize: 12,
// //   },
// //   {
// //     id: 'c2a4506f-8af9-47e6-9b0c-588596045948',
// //     name: 'Income',
// //     color: '#00e157',
// //     type: 'INCOME',
// //     owner: 'b5abf059-0cd5-485b-a174-4e35404328ac',
// //     version: 0,
// //     count: 2,
// //     legendFontColor: '#00e157',
// //     legendFontSize: 12,
// //   },
// //   {
// //     id: '644c093b-4ae8-4271-bbab-588596045948',
// //     name: 'Bills',
// //     color: '#008aff',
// //     type: 'EXPENSE',
// //     count: 1,
// //     legendFontColor: '#008aff',
// //     legendFontSize: 12,
// //   },
// //   {
// //     id: 'b553bd83-fea5-4fd7-8164-588596045948',
// //     name: 'Transport & Travel',
// //     color: '#e05ceb',
// //     type: 'EXPENSE',
// //     count: 2,
// //     legendFontColor: '#e05ceb',
// //     legendFontSize: 12,
// //   },
// //   {
// //     id: 'c2a4506f-8af9-47e6-9b0c-588596045948',
// //     name: 'Income',
// //     color: '#00e157',
// //     type: 'INCOME',
// //     count: 2,
// //     legendFontColor: '#00e157',
// //     legendFontSize: 12,
// //   },
// //   {
// //     id: 'b553bd83-fea5-4fd7-8164-588596045948',
// //     name: 'Transport & Travel',
// //     color: '#e05ceb',
// //     type: 'EXPENSE',
// //     count: 2,
// //     legendFontColor: '#e05ceb',
// //     legendFontSize: 12,
// //   }
// // ]


// // const getTransactionCCategories = (transactions) => {
// //   let result = []

// //   transactions.forEach( function(element, index) {
// //     // statements
// //     console.log('element.category: ', element.category);
// //     element.category.count = 0

// //     for (var i = transactions.length - 1; i >= 0; i--) {
// //       if (transactions[i].category.id === element.category.id) {
// //         element.category.count += 1
// //       }
// //     }

// //     element.category.legendFontColor = element.category.color

// //     element.category.legendFontSize = 14

// //     result.push(element.category)
// //   });
// //   return result;
// // };


// function BarChartExample(props) {
//   const { data } = props;

//   const chartConfig = {
//     // backgroundGradientFrom: "#1E2923",
//     // backgroundGradientFromOpacity: 1,
//     // backgroundGradientTo: "#08130D",
//     // backgroundGradientToOpacity: 0.5,
//     color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
//     // strokeWidth: 3, // optional, default 3
//     // barPercentage: 0.5,
//     // useShadowColorFromDataset: false // optional
//     // labelColor: (opacity = 1) => `rgba(205, 65, 100s, ${opacity})`,
//     //   style: {
//     //     // borderRadius: 16
//     //   },
//   };

//   const pieChart = <PieChart
//     data={data}
//     width={screenWidth * 0.8}
//     height={screenHeight}
//     chartConfig={chartConfig}
//     accessor="count"
//     backgroundColor="transparent"
//     paddingLeft="15"
//     // absolute
//   />

//   return (
//     <View style={{
//       // backgroundColor: '#ddd',
//       // borderWidth: 1,
//       // borderColor: 'black',
//       // borderStyle: 'solid',
//     }}>
 
//     {
      
//       data && pieChart || null
//     }
//     </View>
//   );
// }

// module.exports = { BarChartExample }

