import React, { useState } from 'react';

import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const screenHeight = Dimensions.get("window").height;

import colors from '../../colors';

import styles from '../../styles';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';

function BarChartExample(props) {
  const { data } = props;
  // console.log('data: ', data);

  const chartConfig = {
    backgroundGradientFrom: colors.darkTwo, // "#1E2923",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: colors.dark, // "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const pieChart = <PieChart
    data={data}
    width={screenWidth/3}
    height={((screenHeight) * (0.15))/3}
    chartConfig={chartConfig}
    accessor="count"
    backgroundColor="transparent"
    paddingLeft="25"
    absolute
    hasLegend={false}
  />

  return (
    <View style={{
      // backgroundColor: '#fff',
      justifyContent: 'center',
      flexDirection: 'row-reverse',
      alignItems: 'center',

      // borderWidth: 1,
      // borderColor: 'black',
      // borderStyle: 'solid',
    }}>
 
    {
      
      data && pieChart || null
    }
    </View>
  );
}

module.exports = { BarChartExample }

