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

const HomeOffer = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate("Room", { id: item._id })}
    >
      <View style={styles.container}>
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
        <View style={styles.detailsContent}>
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
      </View>
    </TouchableHighlight>
  );
};
export default HomeOffer;

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: lightGrey,
  },
  photoContent: {
    position: "relative",
  },
  photo: {
    height: 180,
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
