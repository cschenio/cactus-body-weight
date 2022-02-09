import React, {useRef} from 'react';
import * as Theme from "@assets/theme.json";
import {StyleSheet, Text, TextInput, View, ScrollView, Pressable} from 'react-native';
import Button from "components/button";
import DatePicker from 'react-native-date-picker'


const InputPage = () => {
  const refWeight = useRef();
  const refFat = useRef();
  return (
    <ScrollView style={styles.container}>
      <DateBox name="Date:"/>
      <FloatingBox name="Weight:" suffix="kg" maxNum="200" refMain={refWeight} refSubmit={refFat}/>
      <FloatingBox name="Fat:" suffix="%" maxNum="100" refMain={refFat} refSubmit={null}/>
      <InputPageFotter />
    </ScrollView>
  );
}

const InputPageFotter = () => {
  return (
    <View style={styles.buttonGroup}>
      <Button title="Done" icon="done-all-outline"/>
      <Button title="Add" icon="plus-square-outline"/>
    </View>
  )
}

const DateBox = (pros) => {
  return (
    <View>

    </View>
  );
};

const FloatingBox = (pros) => {
  const [number, onChangeNumber] = React.useState(null);
  const [isActive, setActive] = React.useState(false);

  return (
    <Pressable style = {isActive?styles.boxContainerFocus:styles.boxContainerBlur} onPress={()=>{pros.refMain.current.focus()}}>
      <Text style = {styles.floatingText}>
        {pros.name}  
      </Text>
      <TextInput
        style = {styles.floatingInput}
        // value
        onChangeText={onChangeNumber}
        value = {parseFloat(number)>parseFloat(pros.maxNum)?pros.maxNum:number}
        placeholder = "0.0"
        keyboardType = "numeric"
        // placeholderTextColor = Theme["color-info-300"],
        maxLength = {5}
        // reference
        onSubmitEditing = {pros.refSubmit?() => pros.refSubmit.current.focus():null}
        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
        ref = {pros.refMain}
        // focus style
        onFocus={() => setActive(true)} 
        onBlur={() => setActive(false)}
      />
      <Text style = {styles.floatingText}>
        {pros.suffix}  
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingInput: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 20,
    width: "60%",
    fontWeight: "bold",
  },
  floatingText:{
    paddingHorizontal: 2,
    paddingVertical: 12,
    fontSize: 18,
    width: "20%",
    textAlign: "center",
  },
  boxContainerFocus:{
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Theme["color-info-400"],
  },
  boxContainerBlur:{
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Theme["color-info-200"],
  },
  container:{
    height: "100%",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export default InputPage;
