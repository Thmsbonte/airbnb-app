import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import colors from "../assets/colors";
import StarRating from "./StarRating";
const { mainPink, grey, lightGrey, darkGrey } = colors;
import { useNavigation } from "@react-navigation/core";

const Offer = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.photoContent}>
        <Image
          style={styles.photo}
          source={{
            uri: item.photos[0].url,
          }}
          resizeMode={"cover"}
        />
        <View style={styles.priceContent}>
          <Text style={styles.price}>{item.price} €</Text>
        </View>
      </View>
      <View style={[styles.detailsContent, styles.container]}>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <StarRating
            rating={item.ratingValue}
            reviews={item.reviews}
            key={item._id}
          />
        </View>
        <Image
          style={styles.userPicture}
          source={{
            uri: item.user.account.photo.url,
          }}
          resizeMode={"cover"}
        />
      </View>
      <Text
        style={[styles.description, styles.container]}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {item.description}
      </Text>
    </View>
  );
};
export default Offer;

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  photoContent: {
    position: "relative",
  },
  photo: {
    height: 260,
    width: "100%",
  },
  priceContent: {
    position: "absolute",
    backgroundColor: "black",
    height: 40,
    width: 80,
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  detailsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  userPicture: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginTop: 5,
  },
});
