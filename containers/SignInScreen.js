import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import Logo from "../components/Logo";
import colors from "../assets/colors";
const { mainPink, grey, lightGrey, darkGrey } = colors;
import AppButton from "../components/AppButton";
import ErrorMessage from "../components/ErrorMessage";

const SignInScreen = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onPressSignIn = async () => {
    if (email && password) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        setIsLoading(false);
        Alert.alert("Connexion réussie !");
        const userToken = response.data.token;
        setToken(userToken);
      } catch (error) {
        setIsLoading(false);
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  return (
    <SafeAreaView style={styles.safeTopView}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContent}>
          <Logo height={125} width={116} />
          <Text style={styles.logoSignIn}>Sign in</Text>
        </View>
        <View style={styles.signInForm}>
          <Input placeholder={"email"} setFunction={setEmail} />
          <InputPassword placeholder={"password"} setFunction={setPassword} />
          <View style={styles.buttonArea}>
            <ErrorMessage isLoading={isLoading} errorMessage={errorMessage} />
            <AppButton
              text={"Sign in"}
              onPressFunction={onPressSignIn}
              isLoading={isLoading}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.signUpLink}>No account ? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  safeTopView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    flex: 1,
  },
  container: {
    marginLeft: 30,
    marginRight: 30,
    flex: 1,
  },
  logoContent: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  logoSignIn: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: "bold",
    color: mainPink,
  },
  signInForm: {
    justifyContent: "center",
  },
  buttonArea: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  signUpLink: {
    color: darkGrey,
    marginTop: 15,
  },
});
