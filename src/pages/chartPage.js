import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import * as RecordStore from "dataModel/recordStore";
import * as _ from "lodash";
import Button from "components/button";
import ChartCanvas from 'components/chartCanvas';
import moment from "moment";



const ChartPage = () => {
  const [records, setRecords] = useState([])
  const [legend, setLegend] = useState("-Day (10 days ago)")
  useEffect(async() =>{
    setRecords(await getPassRecords(10));
  }, []);

  return( 
    <View style={styles.buttonGroup}>
      <Button
        title="1 week"
        onPress={async () => {
          const newRecords = await getPassRecords(7);
          setRecords(newRecords);
          setLegend("-Day (1 week ago)");
        }}/>
      <Button
      title="1 month"
      onPress={async () => {
        const newRecords = await getPassRecords(30);
        setRecords(newRecords);
        setLegend("-Day (1 month ago)");
      }}/>
      <Button
      title="3 month"
      onPress={async () => {
        const newRecords = await getPassRecords(90);
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
  return <View></View>;
}

const getPassRecords = async(dayCount) =>{
  const today = new Date();
  const newRecords = await RecordStore.getRange(
    moment(today).subtract(dayCount, "days"),
    today
  );
  return newRecords;
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export default ChartPage;
