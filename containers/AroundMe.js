import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AroundMe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [coords, setCoords] = useState();
  const [aroundMeOffers, setArroundMeOffers] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const obj = {
          lat: location.coords.latitude,
          long: location.coords.longitude,
        };
        setCoords(obj);
        fetchData(true, obj.lat, obj.long);
      } else {
        fetchData(false);
      }
    };
    const fetchData = async (permission, lat, long) => {
      try {
        if (permission) {
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${lat}&longitude=${long}`
          );
          console.log("granted ", response.data);
          setArroundMeOffers(response.data);
        } else {
          const response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms"
          );
          console.log("denied ", response.data);
          setArroundMeOffers(response.data);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(response.error.data.error);
        setIsLoading(false);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <Text>Loading ...</Text>
  ) : error ? (
    <Text>Permission refusée</Text>
  ) : (
    <MapView
      style={styles.mapView}
      showsUserLocation={true}
      initialRegion={{
        latitude: coords ? coords.lat : 48.854307,
        longitude: coords ? coords.long : 2.347457,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {aroundMeOffers.map((item, index) => {
        console.log(item.location[0], item.location[1]);
        return (
          <MapView.Marker
            coordinate={{
              latitude: item.location[1],
              longitude: item.location[0],
            }}
            key={index}
            onPress={() => {
              navigation.navigate("RoomAround", { id: item._id });
            }}
          />
        );
      })}
    </MapView>
  );
};
export default AroundMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapView: {
    height: "100%",
    width: "100%",
  },
});
