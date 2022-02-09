import React from 'react';
import { View, Button } from 'react-native';

import InputPage from "pages/inputPage";
import ChartPage from "pages/chartPage";
import DataPage from "pages/dataPage";

const HomeScreen = () => {
  const [page, setPage] = React.useState("Input");

  return (
  <View style={styles.base}>
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Button style={styles.button} title="Input" onPress={() => setPage("Input")}/>
        <Button style={styles.button} title="Chart" onPress={() => setPage("Chart")}/>
        <Button style={styles.button} title="Data" onPress={() => setPage("Data")}/>
      </View>
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
  "base": {
    "position": "absolute",
    "top": 0,
    "bottom": 0,
    "left": 0,
    "right": 0,
    "padding": "2%",
    "background-color": "#333",
  },
  "container": {
    "position": "absolute",
    "top": "10%",
  },
  "buttonGroup": {
    "flex-direction": "row",
    "flex-wrap": "wrap"
  },
  "button": {
    "margin-left": "2px",
  }
};
