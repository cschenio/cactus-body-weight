import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import {
    ApplicationProvider,
    Layout,
    Text,
    Card,
    Divider,
    List,
    ListItem,
    Button,
    ButtonGroup,
} from '@ui-kitten/components';
import { default as theme } from './theme.json';

import InputPage from "pages/inputPage";
import ChartPage from "pages/chartPage";
import DataPage from "pages/dataPage";

const HomeScreen = () => {
  const [page, setPage] = React.useState("Input");

  return (
  <Layout style={{position: "absolute", top: "10%"}}>
      <ButtonGroup>
        <Button onPress={() => setPage("Input")}>Input</Button>
        <Button onPress={() => setPage("Chart")}>Chart</Button>
        <Button onPress={() => setPage("Data")}>Data</Button>
      </ButtonGroup>
      { page == "Input" && <InputPage/> }
      { page == "Chart" && <ChartPage/> }
      { page == "Data" && <DataPage/> }
  </Layout>
  );
};

export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
    <HomeScreen />
  </ApplicationProvider>
);
