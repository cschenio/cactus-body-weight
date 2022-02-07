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
    ListItem
} from '@ui-kitten/components';
import { default as theme } from './theme.json';

const HomeScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category='h1' status='primary'>HOME</Text>
    <Text category='h2'>
        Hi
    </Text>
    <Text>
        I am a boy. This is a pen.
    </Text>
    <ListDividersShowcase/>
  </Layout>
);

const data = new Array(8).fill({
    title: 'Item',
    description: 'Description for Item',
});

const ListDividersShowcase = () => {

    const renderItem = ({ item, index }) => (
      <ListItem
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
      />
    );

    return (
      <List
        style={styles.container}
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    );
};

const styles = StyleSheet.create({
    container: {
      width: 400,
      maxHeight: 200,
    },
});

export default () => (
  <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
    <HomeScreen />
  </ApplicationProvider>
);
