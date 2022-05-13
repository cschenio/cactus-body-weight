import React, {useEffect} from 'react';
import * as Theme from "@assets/theme.json";
import {StyleSheet, Text, Alert, View, ScrollView, Pressable} from 'react-native';
import Button from "components/button";
import moment from "moment";
import * as _ from "lodash";
import * as RecordStore from "dataModel/recordStore";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";

const DataPage = () => {
  const [records, setRecords] = React.useState([]);
  useEffect(async () => { 
    setRecords(await RecordStore.getAll());
  }, []);

  return (
    <>
      <DataHeader/>
      <ScrollView style={styles.container}>
        <DataBoxTable records={records} />
      </ScrollView>
    </>
  );
}

export const DataPageFooter = () => {
  const [info, setInfo] = React.useState("");
  const [firstTime, setFirstTime] = React.useState(true);
  useEffect(()=>{
    setFirstTime(false);
  });
  useEffect(() => { 
    if (!firstTime){
      // No idea how to set useEffect to avoid runining alert in the first render.
      alertWithoutButtons(info);
    }
  }, [info]);

  return (
    <View style={styles.buttonGroup}>
      <Button 
        title="Export" 
        icon="download-outline" 
        onPress = {async () => {
          const newRecords = await RecordStore.getAll();
          const exportStatus = await exportRecords(newRecords);
          setInfo(exportStatus["info"]);
      }}/>
    </View>
  )
}

const DataBoxTable = (props) => {
  if(props.records.length == 0){
    return <View></View>;
  }
  // reverse the records from new to old
  _.reverse(props.records);

  return props.records.map((r) =>{
    return (
      <DataBox date={moment(r['date']).format("YYYY-MM-DD")} weight={r["weight"].toFixed(2)} fat={r['fat'].toFixed(2)} />
    );
  });
};

const alertWithoutButtons = (msg) => {
  const title = 'Export CSV';
  const message = msg;
  const emptyArrayButtons = [
  ];
  const alertOptions = {
    cancelable: true,
  };
  Alert.alert(title, message, emptyArrayButtons, alertOptions);
};

const fetchData = async (endDay) => {
  const today = new Date();
  const newRecords = await RecordStore.getRange(
    moment(today).subtract(endDay, "days"),
    moment(today).add(1, "days"),
  );
  return newRecords;
}

const exportRecords = async (records) => {
  var status={};

  // CSV comtent.
  const today = new Date();
  const nameSuffix = moment(today).format("YYYYMMDD");
  const headerString = 'date,weight,fat\n';
  const rowString = records.map(d=>d["date"]+","+d["weight"]+","+d["fat"]+"\n").join('');
  const csvString = `${headerString}${rowString}`;

  // Ask permission and save the file
  const pathToWrite = FileSystem.documentDirectory+"CactusBodyWeight_"+nameSuffix+".csv";
  const permissions = await MediaLibrary.requestPermissionsAsync();
  status['permission'] = permissions;
  if(permissions.granted){
    await FileSystem.writeAsStringAsync(pathToWrite,csvString,{encoding: FileSystem.EncodingType.UTF8})
    .then(()=>{
      status['error'] = "";
    }).catch((e)=>{
      status['error'] = e.toString();
      status['info'] = "Can't generate file."
      return status;
    });
    // Save tofile to 'CactusBodyWeight' folder in Album('Picture').
    if (Platform.OS === 'android'){
      const asset = await MediaLibrary.createAssetAsync(pathToWrite);
      await MediaLibrary.createAlbumAsync("CactusBodyWeight", asset, false);
    }
    // Share the file
    // Reference: https://www.farhansayshi.com/post/how-to-save-files-to-a-device-folder-using-expo-and-react-native/
    if (Platform.OS === 'ios'){
      const UTI = 'public.item';
      const shareResult = await Sharing.shareAsync(pathToWrite, {UTI});
    }
    status['info'] = "Done saving."
  }
  else{
    status['info'] = "Can't get access."
  }

  return status;
}

export const DataHeader = (props) => {
  return (
    <Pressable style = {styles.dataContainer} >
      <View style = {styles.HeaderContainer}>
        <Text style = {styles.HeaderFloatingText}>
          Date
        </Text>
      </View>
      <View style = {styles.HeaderContainer}>
        <Text style = {styles.HeaderFloatingText}>
          Weight(kg)
        </Text>
      </View>
      <View style = {styles.HeaderLastContainer}>
        <Text style = {styles.HeaderFloatingText}>
          Fat(%)
        </Text>
      </View>
    </Pressable>
  );
}
export const DataBox = (props) => {
  const [isActive, setActive] = React.useState(false);

  return (
    <Pressable style = {isActive?styles.dataContainerFocus:styles.dataContainerBlur} onPressIn={()=>{setActive(true)}} onPressOut={()=>{setActive(false)}}>
      <View style = {styles.TextContainer}>
        <Text style = {styles.FloatingText}>
          {props.date}
        </Text>
      </View>
      <View style = {styles.TextContainer}>
        <Text style = {styles.FloatingText}>
          {props.weight}
        </Text>
      </View>
      <View style = {styles.TextLastContainer}>
        <Text style = {styles.FloatingText}>
          {props.fat}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  FloatingText:{
    fontSize: 14,
    textAlign: "left",
    paddingHorizontal: 15,
  },
  HeaderFloatingText:{
    fontSize: 14,
    textAlign: "left",
    paddingHorizontal: 15,
    color: "white",
    fontWeight: "bold",
  },
  HeaderContainer:{
    paddingHorizontal: 2,
    paddingVertical: 12,
    width: "33%",
  },
  TextContainer:{
    paddingHorizontal: 2,
    paddingVertical: 12,
    width: "33%",
  },
  HeaderLastContainer:{
    paddingHorizontal: 2,
    paddingVertical: 12,
    width: "33%",
  },
  TextLastContainer:{
    paddingHorizontal: 2,
    paddingVertical: 12,
    width: "33%",
  },
  dataContainer:{
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 8,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: Theme["color-primary-700"],
  },
  dataContainerFocus:{
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 8,
    backgroundColor: Theme["color-info-300"],
    paddingTop: 6,
    paddingBottom: 6,
  },
  dataContainerBlur:{
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: Theme["color-info-200"],
    margin: 1.5,
  },
  container:{
    height: "100%",
    paddingTop: 8,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});


export default DataPage;
