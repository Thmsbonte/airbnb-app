import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import colors from "../assets/colors";
const { mainPink, grey, lightGrey, darkGrey } = colors;

const InputLarge = ({ placeholder, setFunction }) => {
  return (
    <View style={styles.inputLarge}>
      <TextInput
        placeholder={placeholder}
        style={styles.inputLargeInput}
        placeholderTextColor={lightGrey}
        multiline={true}
        onChangeText={(text) => {
          setFunction(text);
        }}
      />
    </View>
  );
};
export default InputLarge;

const styles = StyleSheet.create({
  inputLarge: {
    borderWidth: 2,
    borderColor: grey,
    marginBottom: 40,
    paddingBottom: 5,
    height: 100,
  },
  inputLargeInput: {
    padding: 10,
  },
});
