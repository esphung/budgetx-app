import React, {
  // useState
} from 'react';

import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

const screenWidth = Dimensions.get("window").width;

const screenHeight = Dimensions.get("window").height;

import colors from '../../colors';

import styles from '../../styles';

import {
  // LineChart,
  // BarChart,
  PieChart,
  // ProgressChart,
  // ContributionGraph,
  // StackedBarChart
} from 'react-native-chart-kit';


function BarChartExample(props) {
  const { data, pieChartPressed, showLegend } = props;
  // console.log('data: ', data);

  // const [showLegend, setShowLegend] = useState(false);

  // const [showAbsolute, setShowAbsolute] = useState(false);

  const chartConfig = {
    // backgroundGradientFrom: "#1E2923",
    // backgroundGradientFromOpacity: 1,
    // backgroundGradientTo:  "#08130D",
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 155, 146, ${opacity})`,
    // strokeWidth: 2, // optional, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false // optional
  };

  const pieChart = <PieChart
    data={data}
    width={screenWidth}
    height={(screenHeight)/4}
    chartConfig={chartConfig}
    accessor="count"
    backgroundColor="transparent"
    // paddingLeft="5"
    paddingLeft={screenWidth/4}
    // absolute
    hasLegend={showLegend}
    // hasLegend={showLegend}
  />

  return (
    <TouchableOpacity
    onPress={pieChartPressed}
    style={{
      width: screenWidth,
      // paddingRight: 10,
      // opacity: 0.5
      // borderWidth: 1,
      // borderColor: 'white',
      // borderStyle: 'solid',

    }}
    //   onPress={
    //     () => setShowLegend(!showLegend)
    //     // () => setShowAbsolute(!showAbsolute)
    //   }
    >
    {
      
      data && pieChart
    }
    </TouchableOpacity>
  );
}


module.exports = { BarChartExample }

