import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import MainButton from "../components/MainButton";
import Colors from "../constants/Colors";

const WelcomeScreen = (props) => {
  return (
    <ImageBackground
      source={require("../assets/images/tsl.jpg")}
      style={styles.backgroundImage}
    >
      <Image
        source={require("../assets/images/slogan.jpg")}
        style={styles.logo}
      />
      <View style={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            props.navigation.navigate({
              routeName: "UserLogin",
            });
          }}
        >
          Passenger Login
        </MainButton>
        <MainButton
          onPress={() => {
            props.navigation.navigate({ routeName: "DriverLogin" });
          }}
        >
          Driver Login
        </MainButton>
        <View style={styles.newAccountContainer}>
          <Text style={styles.newAccountText}>Don't have an account?</Text>
        </View>
        <View style={styles.registerContainer}>
          <MainButton
            style={styles.registerButton}
            onPress={() => {
              props.navigation.navigate({ routeName: "UserSignup" });
            }}
          >
            Passenger Signup
          </MainButton>
          <MainButton
            style={styles.registerButton}
            onPress={() => {
              props.navigation.navigate({ routeName: "DriverSignup" });
            }}
          >
            Driver Signup
          </MainButton>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 150,
    position: "absolute",
    top: 10,
  },
  newAccountText: {
    fontFamily: "Lato3",
    color: "#fff",
    textAlign: "center",
  },
  newAccountContainer: {
    top: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    height: Dimensions.get("window").height / 2, //for smaller devices - so it will be half the screen
    width: "60%",
    top: 200,
  },
  registerButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
  },
  registerContainer: {
    top: 30,
  },
});

export default WelcomeScreen;
