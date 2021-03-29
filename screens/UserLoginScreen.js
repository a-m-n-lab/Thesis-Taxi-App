import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import ApiKeys from "../constants/ApiKeys";
import Toast from "react-native-simple-toast";
//import   firebase from 'react-native-firebase';
import * as firebase from "firebase";

export default class RiderLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",

      color: "#ffffff",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  render() {
    //const animating = this.state.animating;
    const color = this.state.color;
    return (
      <View style={styles.userLoginContainer}>
        <Logo />
        <Subtitle>
          {` LOG IN 
- PASSENGER - `}
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
              onChangeText={(email) => this.setState({ email })}
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
            onChangeText={(password) => this.setState({ password })}
          />

          <View style={styles.loginButtonContainer}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            <MainButton style={styles.loginButton} onPress={this._signInAsync}>
              LOGIN
            </MainButton>
          </View>
        </View>
      </View>
    );
  }

  _signInAsync = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.trim() === "") {
      Toast.show("email input must be filled!", Toast.SHORT, Toast.TOP);
      return;
    }
    if (this.state.password.length == "") {
      Toast.show("password must be filled!", Toast.SHORT, Toast.TOP);
      return;
    }
    if (reg.test(this.state.email) === false) {
      Toast.show("INVALID EMAIL!", Toast.SHORT, Toast.TOP, ToastStyle);
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          AsyncStorage.setItem("riderId", firebase.auth().currentUser.uid);
          this.setState({ color: "#ffffff" });
          this.props.navigation.navigate("Maps");
        },
        (error) => {
          Toast.show("error:" + error.message, Toast.SHORT, Toast.TOP);
          this.setState({ color: "#ffffff" });
        }
      );
  };
}

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
