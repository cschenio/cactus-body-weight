import React, {useState, useEffect} from 'react';
import { View} from 'react-native';
import * as RecordStore from "dataModel/recordStore";
import * as _ from "lodash";
import Button from "components/button";
import ChartCanvas from 'components/chartCanvas';
import moment from "moment";



const ChartPage = () => {
  const today = new Date();
  // I don't know how to initial records 
  // The app will crash when touching empty ChartCanvas
  // const [records, setRecords] = useState(
  //   async () => await RecordStore.getRange(
  //     moment(today).subtract(7, "days"),
  //     moment(today).add(2, "days"),
  //   ));
  const [records, setRecords] = useState([])
  const [legend, setLegend] = useState("-Day (1 week ago)")
  
  return( 
    <View>
      <Button
        title="Fetch data a week ago"
        icon="cloud-download-outline"
        onPress={async () => {
          const newRecords = await RecordStore.getRange(
            moment(today).subtract(7, "days"),
            today
          );
          setRecords(newRecords);
          setLegend("-Day (1 week ago)");
        }}/>
      <Button
      title="Fetch data a month ago"
      icon="cloud-download-outline"
      onPress={async () => {
        const newRecords = await RecordStore.getRange(
          moment(today).subtract(30, "days"),
          today
          );
        setRecords(newRecords);
        setLegend("-Day (1 month ago)");
      }}/>
      <Button
      title="Fetch data 3 months ago"
      icon="cloud-download-outline"
      onPress={async () => {
        const newRecords = await RecordStore.getRange(
          moment(today).subtract(90, "days"),
          today,
        );
        setRecords(newRecords);
        setLegend("-Day (3 months ago)");
      }}/>
      <ChartCanvas
        records = {records}
        legend = {"Weight"+legend}
        yKey = {"weight"}
        interval = {10}
        ySuffix = {"kg"}
      />
      <ChartCanvas
        records = {records}
        legend = {"Fat"+legend}
        yKey = {"fat"}
        interval = {1}
        ySuffix = {"%"}
      />
    </View>
  )
  
         
}


export const ChartPageFooter = () => {
  return (
      <Button
        title = "Generate Fake Data"
        icon = "archive-outline"
        onPress= {async()=>{
          await GenerateFakeData();
        }}
      />
  );
}

// Below is for testing RecordStore.
const GenerateFakeData = async () => {
  const today = new Date()
  for(var i=0; i<100; i++){
    var random_num = Math.random() * 10 - 5;
    await RecordStore.save({
      date: moment(today).subtract(i, "days"),
      weight: 50.0 + i + random_num,
      fat: 25.0 + i * 0.3 + random_num * 0.3,
    });
  }
}

export default ChartPage;
