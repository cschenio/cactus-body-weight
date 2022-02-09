import React, {useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';


const InputPage = () => {
  const refWeight = useRef();
  const refFat = useRef();
  return (
    <View style={styles.container}>
      <Text>input</Text>
      <FloatingBox name="Weight:" suffix="kg" refMain={refWeight} refSubmit={refFat}/>
      <FloatingBox name="Fat:" suffix="%" refMain={refFat} refSubmit={null}/>
    </View>
  );
}

const InputPageFotter = () => {
  return (
    <Button style={styles.button} title="Add" />
  )
}

const FloatingBox = (pros) => {
  const [number, onChangeNumber] = React.useState(null);
  const [isActive, setActive] = React.useState(false);

  return (
    <View style = {isActive?styles.boxContainerFocus:styles.boxContainerBlur} >
      <Text style = {styles.floatingText}>
        {pros.name}  
      </Text>
      <TextInput
        style = {styles.floatingInput}
        // value
        onChangeText={onChangeNumber}
        value = {number}
        placeholder = "0.0"
        keyboardType = "numeric"
        placeholderTextColor = "#61a0f8"
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
    </View>
  );
};

const styles = StyleSheet.create({
  floatingInput: {
  },
  floatingText:{
  },
  boxContainerFocus:{
    margin: 0,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  boxContainerBlur:{
    margin: 0,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#0a5a7ac6",
  },
  container:{
  }
});

export default InputPage;
