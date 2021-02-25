import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Logo = ({ height, width }) => {
  return (
    <Image
      source={require("../assets/img/logo.png")}
      style={{ height: height, width: width }}
      resizeMode={"contain"}
    />
  );
};
export default Logo;
