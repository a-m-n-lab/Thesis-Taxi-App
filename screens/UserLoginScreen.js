import React, { useReducer, useCallback, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Alert,
} from "react-native";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
//import { Card } from "native-base";
import Card from "../components/Card";
import ApiKeys from "../constants/ApiKeys";
//import Toast from "react-native-simple-toast";
import Toast, { DURATION } from "react-native-easy-toast";

import * as firebase from "firebase";

export default class UserLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  render() {
    return (
      <View style={styles.userLoginContainer}>
        <Logo />
        {/* <Subtitle>
          {` LOG IN 
- PASSENGER - `}
        </Subtitle> */}
        <Card style={styles.cardContainer}>
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
              <Text style={styles.forgotPasswordText}>
                Forgot your password?
              </Text>
              <MainButton
                style={styles.loginButton}
                onPress={this._signInAsync}
              >
                LOGIN
              </MainButton>
            </View>
          </View>
        </Card>
        <Toast ref={(toast) => (this.toast = toast)} />
      </View>
    );
  }

  _signInAsync = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.trim() === "") {
      this.toast.show("email input must be filled!", 500);
      return;
    }
    if (this.state.password.length == "") {
      this.toast.show("password must be filled!", 500);
      return;
    }
    if (reg.test(this.state.email) === false) {
      this.toast.show("INVALID EMAIL!", 500);
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          AsyncStorage.setItem("riderId", firebase.auth().currentUser.uid);

          //  this.props.navigation.navigate("Maps");
        },
        (error) => {
          this.toast.show("error:" + error.message, 500);
        }
      );
    this.getRiderRole();
  };
  getRiderRole = () => {
    AsyncStorage.getItem("riderId") //**driverId
      .then((result) =>
        firebase
          .database()
          .ref("RiderIds/" + result + "/Details")
          .on("value", (snapshot) => {
            if (snapshot.exists()) {
              var isRider = snapshot.child("driver").val();

              console.log("Is user a driver?" + isRider);
              console.log(snapshot.val());
              if (!isRider) {
                this.goToMaps();
              }
            } else {
              Alert.alert(
                "Alert",
                "This user is not registered as a Passenger",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                ]
              );
            }
          })
      );
  };

  goToMaps = () => {
    this.props.navigation.navigate("Maps");
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
    top: 10,
  },
  cardContainer: {
    alignItems: "center",
    alignSelf: "center",
    top: Dimensions.get("window").height / 7,
    paddingBottom: 30,
  },
  usernameIconContainer: {
    justifyContent: "center",
    top: 30,
  },
  passwordIconContainer: {
    marginVertical: 15,
    top: 50,
  },
  loginButtonContainer: {
    flexDirection: "row",
    top: 10,
    width: "100%",
  },
  forgotPasswordText: {
    color: "black",
    top: 20,
    marginHorizontal: 30,
  },
  loginButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
    width: 150,
    alignSelf: "center",
  },
});
