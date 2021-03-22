import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import MainButton from "../components/MainButton";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

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
          User Login
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
          <MainButton style={styles.registerButton}>Register now</MainButton>
        </View>
      </View>
    </ImageBackground>
  );
};

WelcomeScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton} color="white">
        <Item
          color="white"
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
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
