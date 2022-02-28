
import React, {useState, useEffect} from 'react';
import { Dimensions, View} from 'react-native';
import * as Theme from "@assets/theme.json";
import * as _ from "lodash";
import moment from "moment";
import {DataBox, DataHeader} from "pages/dataPage"
import {
    LineChart,
  } from "react-native-chart-kit";

const ChartCanvas = (props) => {
    const { records, legend = "Weight-Month", yKey = 'weight', interval = 50, ySuffix = "kg"} = props;
  
    const [focusLocation, setFocusLocation] = useState(null);
    // Use tmpDotArray only when rendering in the fist time.
    const tmpDotXArray = []; 
    const [dotXArray, setDotXArray] = useState(null);
    
    // Compute the closest dot when focusLocation changing.
    const [closestDotIdx, setClosestDotIdx] = useState(null);
    useEffect(() => {
      setClosestDotIdx(findClosestDot(dotXArray, focusLocation));
    }, [focusLocation]);
    
    // When closest dot changing, modify the xHidden array to show less dot and avoid wasting too much effort.
    const [focusRecords, setFocusRecords] = useState({date: "", weight: "", fat: ""});
    const [xHidden, setXHidden] = useState([]);
    useEffect(() => {
      if (!_.isNull(closestDotIdx)) {
        setXHidden(_.range(0, closestDotIdx).concat(_.range(closestDotIdx+1, dotXArray.length)));
        setFocusRecords({
          date: moment(props.records[closestDotIdx]["date"]).format("YYYY-MM-DD"),
          weight: props.records[closestDotIdx]["weight"].toFixed(2),
          fat: props.records[closestDotIdx]["fat"].toFixed(2),
        });
      }
    }, [closestDotIdx]);
  
    const resetAllState = () => {
      setFocusLocation(null); 
      setClosestDotIdx(null);
      setXHidden([]);
      setFocusRecords({date: "", weight: "", fat: ""});
    }
    const saveDotXArrayInFirstTime = (tmpArray) => {
      if(_.isNull(dotXArray)){
        setDotXArray(tmpArray);
      }
    }
  
    //Compute yMax and yMin
    const yMax = (props.records.length>0)?Math.ceil(_.max(props.records.map((d)=>d[props.yKey]))/props.interval+1)*props.interval : 100;
    const yMin = (props.records.length>0)?Math.max(0,Math.floor(_.min(props.records.map((d)=>d[props.yKey]))/props.interval-1)*props.interval) : 0;
  
    const yRange = [yMin, yMax];
    const data = {
      labels: (props.records.length>0)?props.records.map((d) => moment(d["date"]).format("MM-DD")):[],
      datasets:[
        {
          data: yRange,
          color: (opacity = 1) => Theme["color-primary-900"],
        },
        {
          data: (props.records.length>0)?props.records.map((d) => d[props.yKey]):[],
        }
      ],
      legend: [props.legend],
    };
    const chartConfig = {
      backgroundGradientFrom: Theme["color-primary-900"],
      backgroundGradientTo: Theme["color-primary-900"],
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      propsForDots: {
        r: "5",
        strokeWidth: "1",
        stroke: 'rgb(255,255,255)',
      }
    };
  
    return (
      <View>
        <View 
          onStartShouldSetResponder = {() => {
            return true;
          }}
          onMoveShouldSetResponder = {() => {
            return true;
          }}
          onResponderGrant = {(event)=>{
            saveDotXArrayInFirstTime(tmpDotXArray);
            setFocusLocation(getFocusLocation(event));
          }}
          onResponderMove = {(event)=>{
            saveDotXArrayInFirstTime(tmpDotXArray);
            setFocusLocation(getFocusLocation(event));
          }}
          onResponderRelease = {() => {
            resetAllState();
          }}
          onResponderReject = {() => {
            resetAllState();
          }}
          >
          <LineChart
            data = {data}
            width={Dimensions.get("window").width * 0.95} // from react-native
            height={Dimensions.get("window").height * 0.4}
            yAxisSuffix={" " + props.ySuffix}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            hidePointsAtIndex={xHidden}
            withShadow = {false}
            withVerticalLines = {false}
            withVerticalLabels = {false}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            getDotProps={(value, index) => {
              if (_.isNull(closestDotIdx)) {
                return null;
              }
  
              if (index === 0 && value === yRange[0]) {
                return null;
              }
              if (index === 1 && value === yRange[1]) {
                return null;
              }
              
              if (index === closestDotIdx) {
                return {
                  r: "5",
                  strokeWidth: "1",
                  stroke: 'rgb(0,155,255)',
                };
              } else {
                return null;
              }
              
            }}
            renderDotContent={({ x, y, index, indexData }) => {
              // Record all dots' location
              if (_.isNull(dotXArray) && tmpDotXArray[index] === undefined) {
                tmpDotXArray[index] = x;
              } 
            }
          }/>
      </View>
        <DataHeader />
        <DataBox date={focusRecords["date"]} weight={focusRecords["weight"]} fat={focusRecords["fat"]} />
      </View>
    );
    
  }
  
  const getFocusLocation = (event) =>{
    const { pageX, pageY } = event.nativeEvent;
    return [pageX, pageY];
  };
  
  const findClosestDot = (dotArray, location) => {
    if (!location) {
      return null;
    }
  
    // Magic number 15 is left padding.
    const xLocation = location[0] - 15;
    const closestIdx = _.sortedIndex(dotArray, xLocation);
    return closestIdx;
  };

  export default ChartCanvas;