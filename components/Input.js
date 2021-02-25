import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import colors from "../assets/colors";
const { mainPink, grey, lightGrey, darkGrey } = colors;

const Input = ({ placeholder, setFunction }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      placeholderTextColor={lightGrey}
      onChangeText={(text) => {
        setFunction(text);
      }}
    />
  );
};
export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: grey,
    marginBottom: 40,
    paddingBottom: 5,
  },
});
