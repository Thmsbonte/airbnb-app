import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from "react-native";
import colors from "../assets/colors";
import StarRating from "./StarRating";
const { mainPink, grey, lightGrey, darkGrey } = colors;

import MapView from "react-native-maps";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const Offer = ({ item }) => {
  return (
    <ScrollView>
      <View style={styles.photoContent}>
        <SwiperFlatList
          showPagination
          data={item.photos}
          renderItem={({ item }) => {
            return (
              <View>
                <Image
                  style={styles.photo}
                  source={{
                    uri: item.url,
                  }}
                  resizeMode={"cover"}
                />
              </View>
            );
          }}
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
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: item.location[1],
          longitude: item.location[0],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: item.location[1],
            longitude: item.location[0],
          }}
        />
      </MapView>
    </ScrollView>
  );
};
export default Offer;

const { width } = Dimensions.get("window");
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
    width: width,
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
  mapView: {
    marginTop: 15,
    height: 250,
    width: "100%",
  },
});
