import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Offer from "../components/Offer";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import colors from "../assets/colors";
const { mainPink, grey, lightGrey, darkGrey } = colors;

const RoomScreen = () => {
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [offerData, setOfferData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setOfferData([response.data]);
        setIsLoading(false);
        console.log("toto", offerData);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="small" color={mainPink} />
  ) : (
    <FlatList
      data={offerData}
      keyExtractor={(item) => String(item._id)}
      renderItem={({ item }) => (
        <View>
          <Offer item={item} />
        </View>
      )}
    />
  );
};
export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
