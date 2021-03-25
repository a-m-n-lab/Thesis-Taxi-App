import React from "react";
import { TextInput, Text, View, StyleSheet, Platform } from "react-native";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const UserLoginScreen = (props) => {
  return (
    <View style={styles.userLoginContainer}>
      <Logo />
      <Subtitle>
        {` LOG IN 
- USER - `}
      </Subtitle>
      <View style={styles.loginContainer}>
        <View style={styles.usernameIconContainer}>
          <FontAwesome name="user-o" size={26} color="grey" />
        </View>
        <View>
          <Input
            id="email"
            autoFocus={true}
            placeholder="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            initialValue=""
          />
        </View>

        <View style={styles.passwordIconContainer}>
          <Ionicons name="key-outline" size={28} color="grey" />
        </View>

        <Input
          id="password"
          placeholder="Password"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
        />

        <View style={styles.loginButtonContainer}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          <MainButton
            style={styles.loginButton}
            onPress={() => {
              props.navigation.navigate({ routeName: "Maps" });
            }}
          >
            LOGIN
          </MainButton>
        </View>
      </View>
    </View>
  );
};

// UserLoginScreen.navigationOptions = {
//   headerTitle: "Login",
//   headerStyle: {},
// };
const styles = StyleSheet.create({
  userLoginContainer: {
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
    flexDirection: "row",
    top: 60,
    width: "100%",
  },
  forgotPasswordText: {
    color: "black",
    top: 30,
    marginHorizontal: 30,
  },
  loginButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
    width: 150,
    alignSelf: "center",
  },
});

export default UserLoginScreen;
