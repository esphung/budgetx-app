import React, {
  useState,
  useEffect,
} from 'react';

import {
  StyleSheet, Text, View, Button, Dimensions,
  SafeAreaView,
  ScrollView,
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

import {
  calculateEachMonthTotalSpent,
  calculateEachDayTotalSpent,
  calculateEachMonthTotalEarned,
} from '../functions/calculateEachMonthTotalSpent';

let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

import {
  // LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  // ContributionGraph,
  // StackedBarChart
} from 'react-native-chart-kit';

function breakName(name) {
  // return first token if name too long
  if (name.length > 10) {
    name = name.replace(/^(.{6}[^\s]*).*/, '$1');
  }

  // if (name.length > 10) {
  //   name = name.substring(0, 6) + '...'
  // }
  return name
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
    console.log('transaction.amount: ', transaction.amount);
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
      category.count += Math.abs(transaction.amount)

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

      category.legendFontColor = category.color // '#ddd' // element.category.color

      category.legendFontSize = styles.textStyle.fontSize

      category.name = breakName(category.name)

      result.push(category);

      return
    }
  });

  result = result.sort(function(a, b) {
    return b.count - a.count
  })

  result = result.slice(0,8);

// console.log(objList.slice(0,3))

//   console.log('result: ', result);
  return result;
};


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


      category.legendFontColor = category.color // '#ddd' // element.category.color

      category.legendFontSize = styles.textStyle.fontSize

      category.name = (category.name)

      result.push(category);

      return
    }
  });
  return result;
};

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

export function BarChartExample(props) {
  const { data } = props;

  const [showingTypeData, setShowingTypeData] = useState(false);

  const [showingSpentData, setShowingSpentData] = useState(true);

  const [showingTopFive, setShowingTopFive] = useState(true);

  let lastMonth = new Date().getMonth() - 1

  let sameDateLastMonth = new Date(new Date().getFullYear(), lastMonth, new Date().getDay())

  let budget = calculateEachMonthTotalSpent(data, sameDateLastMonth);

  let totalThisMonth = calculateEachMonthTotalSpent(data, new Date());

  const chartConfig = {
    backgroundGradientFrom: colors.dark,
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo:  colors.darkTwo,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
    // color: (opacity = 1) => `${colors.offWhite}`,
    strokeWidth: 2, // optionsal, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
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

    data[i] = (data[i]/totalThisMonth)

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


  const pieChart = <View  style={{
    opacity: 0.7,
        shadowColor: '#0f1725',
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowRadius: 16,
    shadowOpacity: 1,


  }}>
  <PieChart
    data={((showingTopFive) ? getPieChartTopFiveData(data) :  getPieChartData(data))}
    width={screenWidth}
    height={(screenHeight)/4}
    chartConfig={chartConfig}
    accessor="count"
    backgroundColor="transparent"
    paddingLeft={(showingTopFive) ? "5" : screenWidth/4 }
    // paddingLeft={screenWidth/4}
    // absolute
    hasLegend={(showingTopFive) ? true : false}
    // hasLegend={false}
  />
  </View>

  const barChartData = ((showingSpentData) ? getBarChartExpenseData(data) : getBarChartEarnedData(data))

  const progressData = ((showingTypeData) ? getProgressChartTypeData(data) : getProgressChartExpenseData(data, budget))

  const progressChart = <ProgressChart
      style={{
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid',
      }}
      data={progressData}

      // data={}
      width={screenWidth}
      height={((screenHeight)/2.5)/1.2}
      strokeWidth={(showingTypeData) ? 8 : 4}
      // radius={(!showingTypeData) ? 24 : 32}
      radius={16}
      chartConfig={chartConfig}
      // hideLegends={true}
    />


  const barChart = <BarChart
      // style={graphStyle}
      style={{
        // flex: 1,
        alignSelf: 'center',

        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',

        // marginLeft: 20,
        // marginRight: 20,
      }}
      data={barChartData}
      width={screenWidth}
      height={screenHeight/2}
      yAxisLabel={(showingSpentData) ? '- $' : '$'}
      chartConfig={chartConfig}
      verticalLabelRotation={90}
    />



  return (
    <SafeAreaView style={
      {
        // flex: 1,
        alignItems: 'center',

      }
    }>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        // flex: 1,
        // alignItems: 'center',
        // width: screenWidth,
        // height:screenHeight,
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
        // backgroundColor: colors.dark,



      }}>
    {/*        <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
         width: screenWidth*1.2,
      }}
      horizontal
      >*/}
      <TouchableOpacity
        // disabled
        onPress={() => setShowingTopFive(!showingTopFive)}
      >
      <Text style={[styles.textStyle,{
        // alignItems: 'center',
        // flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
        justifyContent: 'center',
        textAlign: 'center'
      }]}>{(showingTopFive) ? 'Top' : 'All'} categories</Text>

        {
          
          pieChart
        }

      </TouchableOpacity>
 {/*     </ScrollView>
*/}
      

     
    <TouchableOpacity
        // disabled
        onPress={() => setShowingTypeData(!showingTypeData)}
      >
       <Text style={[styles.textStyle,{
        // alignItems: 'center',
        // flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
        justifyContent: 'center',
        textAlign: 'center'
      }]}>${(totalThisMonth.toFixed(2))} spent this month compared to{'\n'} ${(budget.toFixed(2))} last month</Text>
        {
          progressChart
        }

        </TouchableOpacity>







    <TouchableOpacity
      // disabled
      onPress={() => setShowingSpentData(!showingSpentData)}>
      <Text style={[styles.textStyle,{
        // alignItems: 'center',
        // flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'white',
        // borderStyle: 'solid',
        justifyContent: 'center',
        textAlign: 'center'
      }]}>{(showingSpentData) ? 'Spending' : 'Earning'} by month</Text>
       {
        barChart
       }

        </TouchableOpacity>




      </ScrollView>

    </SafeAreaView>
  );
}


// module.exports = { BarChartExample }

