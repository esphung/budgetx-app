import React, {
  useState,
} from 'react';

import {
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

import {
  BarChart,
  PieChart,
} from 'react-native-chart-kit';

import colors from '../../colors';

import styles from '../../styles';

import searchByID from '../functions/searchByID';

import { getFakeTransactions } from '../functions/getFakeTransactions';

const screenWidth = Dimensions.get('window').width;

const screenHeight = Dimensions.get('window').height;

function breakName(name) {
  name = name.replace('$', '');

  // return first token if name too long
  if (name.length > 14) {
    name = name.replace(/^(.{6}[^\s]*).*/, '$1');
  }
  // if (name.length > 10) {
  //   name = name.substring(0, 6) + '...'
  // }
  return `${name}`;
}

const getPieChartData = (transactions) => {
  const result = [];

  transactions.forEach((transaction) => {
    if (!transaction.category) {
      return;
    }
    const category = searchByID(transaction.category.id, result);

    if (category) {
      // add to existing item count and return
      category.count += Math.abs(transaction.amount);
    } else {
      // new list item
      const { category } = transaction;
      // console.log('category: ', category);
      category.count = 0;

      category.count += Math.abs(transaction.amount);

      category.legendFontColor = 'white' // category.color + '9f' // '#ddd' // element.category.color

      category.legendFontSize = 10 // styles.textStyle.fontSize

      category.name = breakName(category.name)

      result.push(category);
    }
  });
  return result;
};

export function BarChartExample(props) {
  let { data, isChartsEnabled, isLoading, getBarChartEarnedData, getBarChartExpenseData } = props;

  const limits = [10, 0];

  const MAX_TOP_NUMBER = limits.length - 1;

  const [currentTopNumber, setCurrentTopNumber] = useState(MAX_TOP_NUMBER);

  /* TESTNG */
  // global.debugMode = true;
  if (global.debugMode) {
    data = getFakeTransactions(100);
    global.debugMode = false;
  }

  const [showingSpentData, setShowingSpentData] = useState(false);

  const [showingTopFive, setShowingTopFive] = useState(true);

  const chartConfig = {
    backgroundGradientFrom: colors.dark,
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo: colors.darkTwo,
    backgroundGradientToOpacity: 0.5,
    color: () => ((showingSpentData) ? (`${colors.pinkRed}5f`) : (`${colors.shamrockGreen}5f`)),
    // color: (opacity = 1) => `${colors.offWhite}`,
    // strokeWidth: 1, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const pieChartConfig = {
    // backgroundGradientFrom: colors.dark,
    // backgroundGradientFromOpacity: 0.1,
    // backgroundGradientTo:  colors.darkTwo,
    // backgroundGradientToOpacity: 0.5,
    color: () => `${colors.white}`,
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
        return;
      }
      let category = searchByID(transaction.category.id, result);

      if (category) {
        // alert(transaction.category.name)
        // add to existing item count and return
        category.count += Math.abs(Number((transaction.amount * 1).toFixed(0)));
      } else {
        // new list item
        category = transaction.category;

        category.count = 0;

        category.count += Math.abs(transaction.amount);

        category.legendFontColor = `${category.color}9f`; // '#ddd' // element.category.color

        category.legendFontSize = 12; // styles.textStyle.fontSize

        category.name = breakName(`${category.name}`);

        result.push(category);
      }
    });

    result = result.sort(function (a, b) {
      return b.count - a.count;
    });

    result = result.slice(0, limits[currentTopNumber]);

    // console.log(objList.slice(0,3))

    // console.log('result: ', result);
    return result;
  };
  const pieChart = (<View
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
  );

  const barChartData = ((showingSpentData) ? getBarChartExpenseData(data) : getBarChartEarnedData(data));

  const blockAccessOverlay = (
    <View
      style={
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
      }
    >
    </View>
  );
  const overlaySpinner = (
    <View
      style={
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
      }
    >
      <ActivityIndicator size="large" color={colors.offWhite} />
    </View>
  );
  const barChart = (
    <BarChart
      style={{
        alignSelf: 'center',
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
  );
  return (
    <SafeAreaView
      style={
        {
          flex: 1,
          // alignItems: 'center',
        }
      }
    >
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
