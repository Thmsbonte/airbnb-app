import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AroundMe = () => {
  return (
    <View style={styles.container}>
      <Text>This is the AroundMe component</Text>
    </View>
  );
};
export default AroundMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
