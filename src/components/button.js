import React, {useState} from 'react';
import { Text, Pressable } from 'react-native';
import * as Theme from "@assets/theme.json";
import { Icon } from "react-native-eva-icons";


const Button = (props) => {
  const { onPress, title = "Save", icon = null } = props;
  return (
    <Pressable 
      // style={[styles.button]} 
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? Theme["color-primary-700"]
            : Theme["color-primary-800"]
        },
        styles.button
      ]}
      onPress={onPress}
      >
      <Text style={styles.text}>
        {icon && <Icon style={styles.icon} name={icon} width={16} height={16} fill="white"/>}
        {title}
      </Text>
    </Pressable>
  );
}

export default Button;

const styles = {
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginVertical: 5,
    marginHorizontal: "5%",
    borderRadius: 5,
    elevation: 16,
    // backgroundColor: Theme["color-primary-800"],
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  style: {
    marginRight: 3,
  },
}
