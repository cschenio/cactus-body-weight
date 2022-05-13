import React from 'react';
import * as Theme from "@assets/theme.json";
import {StyleSheet, Text, TextInput, View, ScrollView, Pressable} from 'react-native';
import Button from "components/button";

const DataPage = () => {
  return (
    <>
      <DataHeader/>
      <ScrollView style={styles.container}>
        <DataBox date="0123" weight="52.3" fat="26" />
        <DataBox date="1229" weight="54" fat="27" />
        <DataBox date="1109" weight="55" fat="21" />
        <DataBox date="1001" weight="54.2" fat="26.55" />
        <DataBox date="0931" weight="54.22" fat="29.00" />
      <DataPageFotter />
      </ScrollView>
    </>
  );
}

const DataPageFotter = () => {
  return (
    <View style={styles.buttonGroup}>
      <Button title="Export" icon="download-outline"/>
    </View>
  )
}

export const DataHeader = (pros) => {
  return (
    <Pressable style = {styles.dataContainer} >
      <View style = {styles.TextContainer}>
        <Text style = {styles.floatingText}>
          Date
        </Text>
      </View>
      <View style = {styles.TextContainer}>
        <Text style = {styles.floatingText}>
          Weight(kg)
        </Text>
      </View>
      <View style = {styles.TextLastContainer}>
        <Text style = {styles.floatingText}>
          Fat(%)
        </Text>
      </View>
    </Pressable>
  );
}
export const DataBox = (pros) => {
  const [isActive, setActive] = React.useState(false);

  return (
    <Pressable style = {isActive?styles.dataContainerFocus:styles.dataContainerBlur} onPressIn={()=>{setActive(true)}} onPressOut={()=>{setActive(false)}}>
      <View style = {styles.TextContainer}>
        <Text style = {styles.floatingText}>
          {pros.date}
        </Text>
      </View>
      <View style = {styles.TextContainer}>
        <Text style = {styles.floatingText}>
          {pros.weight}
        </Text>
      </View>
      <View style = {styles.TextLastContainer}>
        <Text style = {styles.floatingText}>
          {pros.fat}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingText:{
    fontSize: 18,
    textAlign: "center",
  },
  TextContainer:{
    paddingHorizontal: 2,
    paddingVertical: 12,
    width: "33%",
    borderRightColor: Theme["color-info-500"],
    borderRightWidth: 1,
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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: Theme["color-success-400"],
  },
  dataContainerFocus:{
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: Theme["color-info-400"],
  },
  dataContainerBlur:{
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: Theme["color-info-200"],
  },
  container:{
    height: "100%",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export const DataPageFooter = () => {
  return <Text>Data</Text>;
}

export default DataPage;
