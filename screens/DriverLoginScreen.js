import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const DriverLoginScreen = (props) => {
  return (
    <View style={styles.driverLoginContainer}>
      <Logo />
      <Subtitle>
        {` LOG IN 
- DRIVER - `}
      </Subtitle>
      <View style={styles.loginContainer}>
        <View style={styles.usernameIconContainer}>
          <FontAwesome name="user-o" size={26} color="grey" />
        </View>
        <View>
          <Input autoFocus={true} placeholder="Username" />
        </View>

        <View style={styles.passwordIconContainer}>
          <Ionicons name="key-outline" size={28} color="grey" />
        </View>

        <Input placeholder="Password" />

        <View style={styles.loginButtonContainer}>
          <MainButton
            style={styles.loginButton}
            onPress={() => {
              props.navigation.navigate({ routeName: "DriversPage" });
            }}
          >
            LOGIN
          </MainButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  driverLoginContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  loginContainer: {
    padding: 15,
    top: 60,
  },
  usernameIconContainer: {
    justifyContent: "center",
    top: 40,
  },
  passwordIconContainer: {
    marginVertical: 15,
    top: 60,
  },
  loginButtonContainer: {
    left: 190,
    top: 60,
    width: 150,
  },
  loginButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DriverLoginScreen;
