import React from 'react';
import { View, ImageBackground, ScrollView, Text } from 'react-native';

const FooterLayout =({children}) => {
  return(
    <View style={styles.footerLayout}>
      {children}
    </View>
  )
};

export default FooterLayout;

const styles = {
  footerLayout: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#999",
  }
}
