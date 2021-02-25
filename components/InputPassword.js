import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import colors from "../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
const { mainPink, grey, lightGrey, darkGrey } = colors;

const InputPassword = ({ placeholder, setFunction }) => {
  const [secure, setSecure] = useState(true);
  return (
    <View style={styles.passwordInput}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secure}
        style={styles.password}
        placeholderTextColor={lightGrey}
        onChangeText={(text) => {
          setFunction(text);
        }}
      ></TextInput>
      <FontAwesome
        style={styles.passwordEye}
        name={secure ? "eye" : "eye-slash"}
        size={20}
        color="gray"
        onPress={() => setSecure(!secure)}
      />
    </View>
  );
};
export default InputPassword;

const styles = StyleSheet.create({
  passwordInput: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: grey,
    marginBottom: 40,
    paddingBottom: 5,
  },
  password: {
    flex: 1,
  },
});
