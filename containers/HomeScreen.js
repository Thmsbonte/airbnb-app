import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import HomeOffer from "../components/HomeOffer";
import colors from "../assets/colors";
const { mainPink, grey, lightGrey, darkGrey } = colors;

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [offersData, setOffersData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setOffersData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" color={mainPink} />
      ) : (
        <FlatList
          data={offersData}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <View>
              <HomeOffer item={item} />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
