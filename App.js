import React from 'react';
import { View, Image } from 'react-native';

import InputPage from "pages/inputPage";
import ChartPage from "pages/chartPage";
import DataPage from "pages/dataPage";
import Button from "components/button";

const HomeScreen = () => {
  const [page, setPage] = React.useState("Input");

  return (
  <View style={styles.base}>
    <Image resizeMode="cover" style={styles.heroImg} source={require("@assets/hero.jpg")}></Image>
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button title="Input" icon="flash-outline" onPress={() => setPage("Input")}/>
        <Button title="Chart" icon="activity-outline" onPress={() => setPage("Chart")}/>
        <Button title="Data" icon="layers-outline" onPress={() => setPage("Data")}/>
      </View>
    </View>
    <View style={styles.container}>
      { page == "Input" && <InputPage/> }
      { page == "Chart" && <ChartPage/> }
      { page == "Data" && <DataPage/> }
    </View>
  </View>
  );
};

export default () => (
  <HomeScreen/>
);

const styles = {
  heroImg: {
    width: "100%",
    height: 100,
  },
  base: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
};
