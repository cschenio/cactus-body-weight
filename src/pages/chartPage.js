import React from 'react';
import { StyleSheet, Text } from 'react-native';
import * as RecordStore from "dataModel/recordStore";
import Button from "components/button";
import moment from "moment";

const ChartPage = () => {
  return (
    <> 
      <Text>chart</Text>
    </>
  );
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
