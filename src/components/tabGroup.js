import React from 'react';
import { Text, Pressable, View } from 'react-native';
import * as Theme from "@assets/theme.json";
import { Icon } from "react-native-eva-icons";
import Tab from "components/tab";

const TabGroup = (props) => {
  const { onClick, page } = props;

  return (
    <View style={styles.tabGroup}>
      <Tab
        style={styles.tab}
        icon="flash"
        onClick={() => onClick("Input")}
        highlight={page == "Input"}/>
      <Tab
        style={styles.tab}
        icon="activity"
        onClick={() => onClick("Chart")}
        highlight={page == "Chart"}/>
      <Tab
        style={styles.tab}
        icon="layers"
        onClick={() => onClick("Data")}
        highlight={page == "Data"}/>
    </View>
  );
}

const styles = {
  tabGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tab: {
    flex: 1,
  }
}

export default TabGroup;
