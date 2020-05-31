import React, {
  useState,
  // useEffect,
} from 'react';

import {
  StyleSheet, Text, View, Button, Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
  ActivityIndicator,
 } from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

const screenWidth = Dimensions.get("window").width;

const screenHeight = Dimensions.get("window").height;

import colors from '../../colors';

import styles from '../../styles';

import searchByID from '../functions/searchByID';

import searchByName from '../functions/searchByName';

import { getFakeTransactions } from '../functions/getFakeTransactions';

// import {
//   calculateEachMonthTotalSpent,
//   calculateEachDayTotalSpent,
//   calculateEachMonthTotalEarned,
// } from '../functions/calculateEachMonthTotalSpent';

// let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

import {
  // LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  // ContributionGraph,
  // StackedBarChart
} from 'react-native-chart-kit';

function breakName(name) {
  name = name.replace('$', '')

  // return first token if name too long
  if (name.length > 14) {
    name = name.replace(/^(.{6}[^\s]*).*/, '$1');
  }

  // if (name.length > 10) {
  //   name = name.substring(0, 6) + '...'
  // }
  return `${name}`
}

function getCategoryNames(transactions) {
  let obj = transactions

  let names = []

  for (const val of Object.values(obj)) {
      // use val
      // console.log('Object.values(val): ', Object.values(val));
      for (const a of Object.values(val)) {
        // use val
        // console.log('Object.keys(val): ', Object.keys(a));
        if (Object.keys(a).includes('name')) {
          let name = Object.values(a)[1];

          if (name && names.includes(name) !== true  && (name !== 'None')) {
            // console.log('name: ', name);
            names.push(name)
          }
        }
    }

  } 
  return names
}


function calculateTotalAmount (transactions) {
  // body... 
  let total = 0
  transactions.forEach((transaction) => {
    // console.log('transaction.amount: ', transaction.amount);
    total = total + Math.abs(transaction.amount)
  })
  return total
}

function getProgressChartTypeData(transactions) {
  let labels = ['INCOME', 'EXPENSE'];
  let incomes = 0;
  let expenses = 0;

  transactions.forEach((transaction) => {
    if (transaction.type.includes('INCOME')){
      incomes++
    } else if (transaction.type.includes('EXPENSE')){
      expenses++
  }
  })
  let result = {
    labels: labels,
    data: [
      (incomes)/transactions.length,
      (expenses)/transactions.length,
    ]
  }
  return result
}


const getPieChartData = (transactions) => {
  let result = [];

  transactions.forEach((transaction) => {
    if (!transaction.category) {
      return
    }
    let category = searchByID(transaction.category.id, result);

    if (category) {
      // alert(transaction.category.name)
      // add to existing item count and return
      category.count += Math.abs(transaction.amount);

      return

    } else {
      // new list item
      let category = transaction.category
      // console.log('category: ', category);
      category.count = 0;

      // for (var i = transactions.length - 1; i >= 0; i--) {
      //   // console.log('(transactions[i].category.id: ', (transactions[i].category.id))
      //   if (transactions[i].category.id === category.id) {
          category.count += Math.abs(transaction.amount)
      //   }
      // }


      category.legendFontColor = 'white' // category.color + '9f' // '#ddd' // element.category.color

      category.legendFontSize = 10 // styles.textStyle.fontSize

      category.name = breakName(category.name)

      result.push(category);

      // return
    }
  });
  return result;
};









// let currentTopNumber = 0

export function BarChartExample(props) {
  let { data, isChartsEnabled, isLoading, getBarChartEarnedData, getBarChartExpenseData } = props;

  const limits = [5, 0, 10]

  const MAX_TOP_NUMBER = limits.length - 1;

  const [currentTopNumber, setCurrentTopNumber] = useState(MAX_TOP_NUMBER);

  /* TESTNG */
  // global.debugMode = true
  if (global.debugMode) {
    data = getFakeTransactions(100)
    global.debugMode = false
    // console.log('data: ', data); 
  }


  const [showingTypeData, setShowingTypeData] = useState(false);

  const [showingSpentData, setShowingSpentData] = useState(false);

  const [showingTopFive, setShowingTopFive] = useState(true);

  let lastMonth = new Date().getMonth() - 1

  let sameDateLastMonth = new Date(new Date().getFullYear(), lastMonth, new Date().getDay())

  // let budget = calculateEachMonthTotalSpent(data, sameDateLastMonth);

  // let totalThisMonth = calculateEachMonthTotalSpent(data, new Date());

  const chartConfig = {
    backgroundGradientFrom: colors.dark,
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo:  colors.darkTwo,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => ((showingSpentData) ? (`${colors.pinkRed + '5f'}`) : (`${colors.shamrockGreen + '5f'}`)),
    // color: (opacity = 1) => `${colors.offWhite}`,
    // strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const pieChartConfig = {
    // backgroundGradientFrom: colors.dark,
    // backgroundGradientFromOpacity: 0.1,
    // backgroundGradientTo:  colors.darkTwo,
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `${colors.white}`,
    // color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
    // color: (opacity = 1) => `${colors.offWhite}`,
    // strokeWidth: 2, // optionsal, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false // optional
  };

const getPieChartTopFiveData = (transactions) => {
  let result = [];

  transactions.forEach((transaction) => {
    if (!transaction.category) {
      return
    }
    let category = searchByID(transaction.category.id, result);

    if (category) {
      // alert(transaction.category.name)
      // add to existing item count and return
      category.count = category.count + Math.abs(transaction.amount)

      return

    } else {
      // new list item
      let category = transaction.category
      // console.log('category: ', category);
      category.count = 0;

      // for (var i = transactions.length - 1; i >= 0; i--) {
      //   // console.log('(transactions[i].category.id: ', (transactions[i].category.id))
      //   if (transactions[i].category.id === category.id) {
          category.count += Math.abs(transaction.amount)
          // category.count += Math.abs((transaction.amount).toFixed(0))
      //   }
      // }

      // category.legendFontColor = category.color +  '9f' // '#ddd' // element.category.color

      category.legendFontColor = category.color + '9f' // '#ddd' // element.category.color

      category.legendFontSize = ((limits[currentTopNumber] === 5) ? 12 : 10) // styles.textStyle.fontSize

      category.name = breakName(category.name)

      result.push(category);

      // return
    }
  });

  result = result.sort(function(a, b) {
    return b.count - a.count
  })

  result = result.slice(0, limits[currentTopNumber]);

// console.log(objList.slice(0,3))

//   console.log('result: ', result);
  return result;
};


function getProgressChartExpenseData(transactions, total) {
  let labels = getCategoryNames(transactions) // [ 'EXPENSE', 'INCOME',];



  // console.log('labels.length: ', labels.length);
  let first = 0;
  let second = 0;

  let data = [
  // labels[1]/100
  // 0,0,0,0,0,0,0,0
  ]

  let list = []

  for (var i = labels.length - 1; i >= 0; i--) {
    if (labels[i].toLowerCase().includes('income') !== true) {
      list.push(labels[i])
    }
  }

  labels = list

  for (var i = labels.length - 1; i >= 0; i--) {
    data[i] = 0
  }

  // console.log('labels: ', labels);


  for (var i = labels.length - 1; i >= 0; i--) {
    // labels[i]
  
    transactions.forEach((transaction) => {
      // if (transaction.category.type === 'EXPENSE') {
        if (transaction.category.name.includes(labels[i])){
          data[i] += Math.abs(transaction.amount)
        }
      // }

    //   else if (transaction.type.includes(labels[1])){
    //     second++
    // }
    // console.log(JSON.stringify(transaction))
    })

    data[i] = (data[i]/100)

    // console.log('(data[i]/total)*1000: ', (data[i]/total)*1000);
  }

  // labels.forEach((label) => {
  //   label = breakName(label)
  //   // console.log('label: ', label);
  // },)



  // let total = calculateTotalAmount(transactions)
  let result = {
    labels: labels,
    data: data
  }

    return result
  }

  const pieChart = <View
    style={{
      opacity: 0.7,
      shadowColor: Platform.OS === 'ios' ? '#0f1725' : null,
      shadowOffset: Platform.OS === 'ios' ? {
        width: 5,
        height: 5
      } : null,
      shadowRadius: Platform.OS === 'ios' ? 16 : 0,
      shadowOpacity: Platform.OS === 'ios' ? 1 : 0,
    }}
  >
  <PieChart
    data={((showingTopFive && (limits[currentTopNumber] !== 0)) ? getPieChartTopFiveData(data) :  getPieChartData(data))}
    width={(showingTopFive) ? (screenWidth) : (screenWidth)}
    height={((showingTopFive) ? ((screenHeight)/3.4) : (screenHeight)/3)}
    // chartConfig={chartConfig}
    chartConfig={pieChartConfig}
    accessor="count"
    backgroundColor="transparent"
    // backgroundColor={colors.dark}
    paddingLeft={(showingTopFive && (limits[currentTopNumber] !== 0)) ? 20 : screenWidth/4 }
    // paddingLeft={screenWidth/4}
    // absolute
    hasLegend={(showingTopFive && (limits[currentTopNumber] !== 0)) ? true : false}
    // hasLegend={false}
  />
  </View>

  const barChartData = ((showingSpentData) ? getBarChartExpenseData(data) : getBarChartEarnedData(data))

  // const progressData = ((showingTypeData) ? getProgressChartTypeData(data) : getProgressChartExpenseData(data, budget))

  // const progressChart = <ProgressChart
  //     style={{
  //       // borderWidth: 1,
  //       // borderColor: 'red',
  //       // borderStyle: 'solid',
  //     }}
  //     data={progressData}

  //     // data={}
  //     width={screenWidth}
  //     height={((screenHeight)/2.5)/1.2}
  //     strokeWidth={(showingTypeData) ? 8 : 4}
  //     // radius={(!showingTypeData) ? 24 : 32}
  //     radius={16}
  //     chartConfig={chartConfig}
  //     // hideLegends={true}
  //   />

  const blockAccessOverlay = <View style={
  {
    
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    // backgroundColor: 'transparent',
    backgroundColor: colors.dark,
    opacity: 0.5,
    zIndex: 1,
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  }
}></View>

  const overlaySpinner = <View style={
  {
    
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    // backgroundColor: 'transparent',
    backgroundColor: colors.dark,
    opacity: 0.9,
    zIndex: 1,
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  }
}><ActivityIndicator size="large"  color={colors.offWhite} /></View>


  const barChart = <BarChart
      style={{
        alignSelf: 'center',

        // backgroundColor: colors.darkTwo,

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
      }}
      data={barChartData}
      width={screenWidth}
      height={screenHeight/2}
      // yAxisLabel={(showingSpentData) ? '- $' : '$'}
      yAxisLabel="$"
      chartConfig={chartConfig}
      verticalLabelRotation={110}

      showBarTops={!isLoading}

      showValuesOnTopOfBars

      // yAxisSuffix="$"

      withInnerLines={!isChartsEnabled || isLoading}

      fromZero

    />

    console.log('colors: ', colors);

  return (
    <SafeAreaView style={
      {
        flex: 1,
        // alignItems: 'center',
      }
    }>
    {
      isLoading && overlaySpinner
    }
    {
      !isChartsEnabled && blockAccessOverlay
    }

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ }}>

      <View style={{
          width: screenWidth,
          // height: ((showingTopFive) ? (screenHeight/(3)) : (screenHeight)/(2.5)),
          height:  (screenHeight/(3)),

          // borderWidth: 1,
          // borderColor: 'red',
          // borderStyle: 'solid',
        }}>

        <View  style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <Text style={[styles.textStyle, { color: colors.heliotrope }]}>

      {

        (showingTopFive && (limits[currentTopNumber] !== 0)) &&
        
        <Text style={{ color: colors.tangerine + '9f', opacity: 0.7 }}>Top 
{/*        <Text style={{ color: colors.azure }}>{
          `${String(limits[currentTopNumber])} `
        }</Text>*/}
        </Text> || (
          <Text style={{ color: colors.heliotrope + '9f', opacity: 0.7 }}>All </Text>
      )

      }


      <Text style={{ color: colors.offWhite }}> Transactions</Text>



      </Text>

            <View
        style={{
          position: 'absolute',
          bottom: '50%',

          left: '38%',
          // height: 1,
          width: '70%',
          borderWidth: 0.5,
          // borderColor: 'white',
          borderColor: colors.dark,
          borderStyle: 'solid',
         }} />
  
      </View>

      <TouchableOpacity
        disabled={!isChartsEnabled}
        onPress={() => {
          if (currentTopNumber - 1 === 0) {
            setShowingTopFive(false)
            
            setCurrentTopNumber(currentTopNumber - 1)
          }
          
          if (currentTopNumber === 0) {
            setShowingTopFive(true)
            setCurrentTopNumber(MAX_TOP_NUMBER)
          }
          else {
            setShowingTopFive(true)
            setCurrentTopNumber(currentTopNumber - 1)
          }
        }}
      >
        { 
          pieChart
        }
      </TouchableOpacity>
      </View>


     
{/*    <TouchableOpacity
        // disabled
        onPress={() => setShowingTypeData(!showingTypeData)}
      >
   <Text style={[
        styles.textStyle,
        {
        // alignItems: 'center',
        // flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
        justifyContent: 'center',
        textAlign: 'center'
      }]}>
      ${(totalThisMonth.toFixed(2))} spent this month compared to{'\n'} ${(budget.toFixed(2))} last month
      </Text>
        {
          // progressChart
        }

        </TouchableOpacity>
*/}

    
    <View style={{
      width: screenWidth,
      height: screenHeight/2,
      justifyContent: 'center',

      marginTop: 20,

      // borderTopWidth: 1,
      // borderBottomWidth: 1,
      // borderLeftWidth: 1,
      // borderRightWidth: 1,
      // borderTopLeftRadius: 360,
      // borderBottomLeftRadius: 360,


      // borderColor: colors.dark,

      // borderStyle: 'solid',
    }}>



   
      
    <TouchableOpacity

      style={{
        paddingHorizontal: 10,
      }}

      disabled={!isChartsEnabled}
      onPress={() => {
        setShowingSpentData(!showingSpentData)
      }}>

      {/* BarChart Title */}
      <View style={[
        // styles.textStyle,
        {
        flexDirection: 'row',

      }]}>

      <Text style={[
        styles.textStyle,
        {
          color: colors.offWhite,
          // // alignItems: 'center',
          // // flexDirection: 'row',
          // borderWidth: 1,
          // borderColor: 'white',
          // borderStyle: 'solid',
          // alignItems: 'flex-end',
          // textAlign: 'center',
          // opacity: 0.7

      }]}>
      
      {
        (showingSpentData) ? <Text style={{ color: colors.pinkRed + '9f' }}>Spent </Text> : <Text style={{ color: colors.shamrockGreen + '9f' }}>Income </Text>
      }
      <Text>Monthly</Text>

      </Text>

      <View
        style={{
          position: 'absolute',
          bottom: '50%',

          left: '38%',
          // height: 1,
          width: '70%',
          borderWidth: 0.5,
          // borderColor: 'white',
          borderColor: colors.dark,
          borderStyle: 'solid',
         }} />
      </View>
    
       {
          barChart
       }
        </TouchableOpacity>
        </View>




      </ScrollView>

    </SafeAreaView>
  )
}

// const separatorLine = {
//   // flex: 1,
//   // height: 0.5,
//   // marginRight: 20,
//   width: screenWidth * 0.65,
//   // left: 50,

//   background: 'white',
//   position: 'absolute',
//   top: '50%',
//   bottom: '50%',
//   right: 0,

//   // left: 20,
//   // height: 1,
//   // width: 1,
//   borderWidth: 0.5,
//   // borderColor: 'white',
//   borderColor: colors.dark,
//   // borderStyle: 'solid',
// }

// module.exports = { BarChartExample }

