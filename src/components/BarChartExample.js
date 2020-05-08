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
  // LineChart,
  // BarChart,
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

  if (name.length > 10) {
    name = name.substring(0, 10) + '...'
  }
  return name
}

// const progressData = {
//   labels: ["Swim", "Bike", "Run"], // optional
//   data: [0.4, 0.6, 0.8]
// };

// const progressData =  { labels: [ 'INCOME', 'EXPENSE' ], data: [ 0.16, 0.7 ] }


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

// console.log('incomes:', incomes)
// console.log('expenses:', expenses)


  let result = {
    labels: labels,
    data: [
      (incomes)/100,
      (expenses)/100,
    ]
  }
  return result
}



function getProgressChartData(transactions) {
  let labels = getCategoryNames(transactions) // [ 'EXPENSE', 'INCOME',];
  let first = 0;
  let second = 0;

  let data = [
  // labels[1]/100
  // 0,0,0,0,0,0,0,0
  ]

  for (var i = labels.length - 1; i >= 0; i--) {
    data[i] = 0
  }


  // console.log('labels: ', labels);


  for (var i = labels.length - 1; i >= 0; i--) {
    // labels[i]
  
    transactions.forEach((transaction) => {
      if (transaction.category.name.includes(labels[i])){
        data[i]++
      }
    //   else if (transaction.type.includes(labels[1])){
    //     second++
    // }
    // console.log(JSON.stringify(transaction))
    })

    data[i] = data[i].toFixed(2)/100
  }

  
  // console.log('data: ', data);

  // console.log('incomes:', incomes)
  // console.log('expenses:', expenses)

  // let total = transactions.length

  // let expensesDecimal = (expenses/total).toFixed(2)
  // console.log('expensesDecimal: ', expensesDecimal);

  // console.log('calculateTotalAmount(transactions): ', calculateTotalAmount(transactions));

  // let total = calculateTotalAmount(transactions)
  let result = {
    labels: labels,
    data: data
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
      category.count++;

      return

    } else {
      // new list item
      let category = transaction.category
      // console.log('category: ', category);
      category.count = 0;

      // for (var i = transactions.length - 1; i >= 0; i--) {
      //   // console.log('(transactions[i].category.id: ', (transactions[i].category.id))
      //   if (transactions[i].category.id === category.id) {
          category.count += 1
      //   }
      // }

      category.legendFontColor = styles.textStyle.color // '#ddd' // element.category.color

      category.legendFontSize = styles.textStyle.fontSize

      category.name = breakName(category.name)

      result.push(category);

      return
    }
  });
  return result;
};

export function BarChartExample(props) {
  const { data } = props;
  // console.log('data: ', data);

  // const [showLegend, setShowLegend] = useState(false);

  // const [showAbsolute, setShowAbsolute] = useState(false);

  const [progressData, setProgressData] = useState(getProgressChartTypeData(data))

  const [showingTypeData, setShowingTypeData] = useState(true);

  const chartConfig = {
    backgroundGradientFrom: colors.dark,
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo:  colors.darkTwo,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const pieChart = <PieChart
    data={(getPieChartData(data))}
    width={screenWidth}
    height={(screenHeight)/4}
    chartConfig={chartConfig}
    accessor="count"
    backgroundColor="transparent"
    paddingLeft="5"
    // paddingLeft={screenWidth/4}
    // absolute
    // hasLegend
    hasLegend={false}
  />

  const progressChart = <ProgressChart
      style={{
        
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid',
      }}
      data={getProgressChartData(data)}

      // data={}
      width={screenWidth}
      height={((screenHeight)/2)/1.2}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfig}
      hideLegends={true}
    />

    const progressChartType = <ProgressChart
      style={{
        
        // borderWidth: 1,
        // borderColor: 'red',
        // borderStyle: 'solid',
      }}
      data={progressData}

      // data={}
      width={screenWidth}
      height={((screenHeight)/2)/1.2}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfig}
      hideLegends={true}
    />



  useEffect(() => {
    // setProgressData(getProgressChartTypeData(data))
    return () => {
      // effect
    };
  }, [])

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={{
      flex: 1,
      alignItems: 'center',
      // width: screenWidth,
      // height:screenHeight,
      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'solid',
    }}>
    

   
    <TouchableOpacity
    onPress={() => {
      if (showingTypeData) {
        setProgressData(getProgressChartData(data))
        setShowingTypeData(false)
      } else  {
         setProgressData(getProgressChartTypeData(data))
          setShowingTypeData(true)}
      }
      
      }
      >
      {
        !showingTypeData && progressChart || progressChartType
      }

      </TouchableOpacity>

      {
        
        pieChart
      }

    </ScrollView>
    </SafeAreaView>
  );
}


// module.exports = { BarChartExample }

