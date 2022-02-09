import React from 'react';
import { View, ImageBackground, ScrollView, Text } from 'react-native';

import InputPage, { InputPageFooter } from "pages/inputPage";
import ChartPage, { ChartPageFooter } from "pages/chartPage";
import DataPage, { DataPageFooter } from "pages/dataPage";
import Button from "components/button";
import TabGroup from "components/tabGroup";
import FooterLayout from 'layout/footerLayout';

const HomeScreen = () => {
  const [page, setPage] = React.useState("Input");

  return (
  <View style={styles.base}>
    <View style={styles.heroImg}>
      <View style={styles.stickyBottom}>
        <View style={styles.container}>
          <TabGroup page={page} onClick={(page) => setPage(page)}/>
        </View>
      </View>
    </View>
    <ScrollView>
      <View style={styles.container}>
        { page == "Input" && <InputPage/> }
        { page == "Chart" && <ChartPage/> }
        { page == "Data" && <DataPage/> }
      </View>
    </ScrollView>
    <FooterLayout>
        { page == "Input" && <InputPageFooter/> }
        { page == "Chart" && <ChartPageFooter/> }
        { page == "Data" && <DataPageFooter/> }
    </FooterLayout>
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
    flex: 1,
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
  stickyBottom: {
    position: "absolute",
    bottom: 10,
  },
};
