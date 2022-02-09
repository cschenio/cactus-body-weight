import React, {useRef} from 'react';
import * as Theme from "@assets/theme.json";
import {StyleSheet, Text, TextInput, View, ScrollView, Pressable} from 'react-native';
import Button from "components/button";
import DateTimePicker from '@react-native-community/datetimepicker'

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
  // const refDate = useRef();

  const [date, setDate] = React.useState(new Date());

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <DateTimePicker
      style = {styles.DateContainer}
      value = {date}
      mode = {'date'}
      is24Hour = {true}
      display = "default"
      onChange = {onChange}
    />
  )
};

const FloatingBox = (pros) => {
  const [number, setNumber] = React.useState(null);
  const [isActive, setActive] = React.useState(false);

  return (
    <Pressable style = {isActive?styles.boxContainerFocus:styles.boxContainerBlur} onPress={()=>{pros.refMain.current.focus()}}>
      <Text style = {styles.floatingText}>
        {pros.name}  
      </Text>
      <TextInput
        style = {styles.floatingInput}
        // Check the input number in TextInput.
        onChangeText={setNumber}
        value = {parseFloat(number)>parseFloat(pros.maxNum)?pros.maxNum:number}
        placeholder = "0.0"
        keyboardType = "numeric"
        placeholderTextColor = {Theme["color-info-300"]}
        maxLength = {5}
        // Handle the references.
        onSubmitEditing = {pros.refSubmit?() => pros.refSubmit.current.focus():null}
        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
        ref = {pros.refMain}
        // Set the focus/blur style by using isActive.
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
    width: "33%",
    textAlign: "center",
    fontWeight: "bold",
  },
  floatingText:{
    paddingHorizontal: 2,
    paddingVertical: 12,
    fontSize: 18,
    width: "33%",
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
  DateContainer:{
    margin: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Theme["color-info-100"],
    height: "25%",
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
