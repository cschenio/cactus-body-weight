import React from 'react';
import { View, ImageBackground, ScrollView, Text } from 'react-native';

import InputPage, { InputPageFooter } from "pages/inputPage";
import ChartPage, { ChartPageFooter } from "pages/chartPage";
import DataPage, { DataPageFooter } from "pages/dataPage";
import TabGroup from "components/tabGroup";
import FooterLayout from 'layout/footerLayout';
import { useSwipe } from './src/hooks/useSwipe';

const HomeScreen = () => {
  const [page, setPage] = React.useState("Input");

  const onSwipeRight = () => {
    if (page === "Input") {
      setPage("Input");
    } else if (page === "Chart") {
      setPage("Input");
    } else if (page === "Data") {
      setPage("Chart");
    }
  }

  const onSwipeLeft = () => {
    if (page === "Input") {
      setPage("Chart");
    } else if (page === "Chart") {
      setPage("Data");
    } else if (page === "Data") {
      setPage("Data");
    }
  }

  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight);

  return (
  <View style={styles.base}>
    <View style={styles.heroImg}>
      <View style={styles.stickyBottom}>
        <View style={styles.container}>
          <TabGroup page={page} onClick={(page) => setPage(page)}/>
        </View>
      </View>
    </View>
    <ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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
