import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import colors from "../assets/colors";
const { mainPink, grey, lightGrey, darkGrey } = colors;

const ErrorMessage = ({ isLoading, errorMessage }) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" color={mainPink} />
      ) : (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};
export default ErrorMessage;

const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
  },
});
