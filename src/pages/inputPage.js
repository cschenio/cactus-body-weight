import React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';

const InputPage = () => {
  return (
    <View style={styles.container}>
      <Text>input</Text>
      <FloatingInput/>
    </View>
  );
}

const FloatingInput = () => {
  const [number, onChangeNumber] = React.useState(null);
  
  return (
    <TextInput
      style = {styles.floatingInput}
      onChangeText={onChangeNumber}
      value = {`${number}`}
      placeholder = "0.0"
      keyboardType = "numeric"
      placeholderTextColor = "#000"
    />
  );
};

const styles = StyleSheet.create({
  floatingInput: {
    height: 40,
    width: "90%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  container:{
    backgroundColor: "#0a5a7ac6",
  }
});

export default InputPage;
