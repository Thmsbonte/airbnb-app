import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
const { mainPink, grey, lightGrey, darkGrey } = colors;

const StarRating = ({ rating, reviews }) => {
  let stars = [];

  for (let i = 0; i < 5; i++) {
    let star = <Ionicons name="star" size={24} color="#FFB000" key={i} />;
    if (i >= rating) {
      star = <Ionicons name="star" size={24} color={lightGrey} key={i} />;
    }
    stars.push(star);
  }
  return (
    <View style={styles.container}>
      {stars}
      <Text style={styles.reviews}>{reviews} reviews</Text>
    </View>
  );
};
export default StarRating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  reviews: {
    color: lightGrey,
    marginLeft: 5,
  },
});
