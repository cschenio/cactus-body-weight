import React from 'react';
import { Text, Pressable, View } from 'react-native';
import * as Theme from "@assets/theme.json";
import { Icon } from "react-native-eva-icons";


const Tab = (props) => {
  const { icon = null, onClick, highlight } = props;
  return (
    <Pressable style={styles.tab} onPress={onClick}>
      {highlight && <ActiveTab icon={icon}/>}
      {!highlight && <InactiveTab icon={icon}/>}
    </Pressable>
  );
}

const ActiveTab = (props) => {
  const { icon } = props;
  return (<View style={styles.tab.active}>
    <Text style={styles.text}>
      {icon && <Icon style={styles.icon} name={icon} width={24} height={24} fill={Theme["color-primary-800"]}/>}
    </Text>
  </View>);
}

const InactiveTab = (props) => {
  const { icon } = props;
  return (<View style={styles.tab.inactive}>
    <Text style={styles.text}>
      {icon && <Icon style={styles.icon} name={icon} width={24} height={24} fill="#333"/>}
    </Text>
  </View>);
}

const styles = {
  tab: {
    active: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 28,
      borderBottomWidth: 3,
      borderBottomColor: Theme["color-primary-800"],
    },
    inactive: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 28,
    }
  },
  text: {
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
}

export default Tab;
