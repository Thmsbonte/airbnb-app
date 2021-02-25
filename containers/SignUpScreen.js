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
} from "react-native";
import Constants from "expo-constants";
import colors from "../assets/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import Logo from "../components/Logo";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import ErrorMessage from "../components/ErrorMessage";
import AppButton from "../components/AppButton";
import InputLarge from "../components/InputLarge";

const { mainPink, grey, lightGrey, darkGrey } = colors;

const SignUpScreen = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [secure, setSecure] = useState(true);

  const onPressSignUp = async () => {
    if (password === confirmPassword) {
      if (email && password && username && confirmPassword && description) {
        try {
          setIsLoading(true);
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log(response);
          setIsLoading(false);
          Alert.alert("Inscription réussie !");
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
    } else {
      setErrorMessage("Password must be the same");
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
          <Text style={styles.logoSignUp}>Sign up</Text>
        </View>
        <View style={styles.signUpForm}>
          <Input placeholder={"email"} setFunction={setEmail} />
          <Input placeholder={"username"} setFunction={setUsername} />
          <InputLarge
            placeholder={"Describe yourself in a fiew words"}
            setFunction={setDescription}
          />

          <InputPassword placeholder={"password"} setFunction={setPassword} />
          <InputPassword
            placeholder={"confirm password"}
            setFunction={setConfirmPassword}
          />
          <View style={styles.buttonArea}>
            <ErrorMessage isLoading={isLoading} errorMessage={errorMessage} />
            <AppButton
              text={"Sign up"}
              onPressFunction={onPressSignUp}
              isLoading={isLoading}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.signInLink}>
                Already have an account ? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
  logoSignUp: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: "bold",
    color: mainPink,
  },
  signUpForm: {
    justifyContent: "center",
  },

  password: {
    flex: 1,
  },
  buttonArea: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  errorMessage: {
    color: "red",
  },
  signInLink: {
    color: darkGrey,
    marginTop: 15,
  },
});
