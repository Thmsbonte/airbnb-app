import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "../assets/colors";
const { mainPink, grey, lightGrey, darkGrey } = colors;

const AppButton = ({ text, onPressFunction, isLoading }) => {
  console.log(text);
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      style={styles.appButton}
      disabled={isLoading ? true : false}
    >
      <Text style={styles.appButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};
export default AppButton;

const styles = StyleSheet.create({
  appButton: {
    borderWidth: 2,
    borderColor: mainPink,
    borderRadius: 50,
    padding: 15,
    width: "60%",
    alignItems: "center",
    marginTop: 10,
  },
  appButtonText: {
    color: darkGrey,
  },
});
