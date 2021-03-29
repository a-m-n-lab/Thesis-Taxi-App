import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import Toast from "react-native-simple-toast";

export default class DriverLogin extends React.Component {
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
            onChangeText={(password) => this.setState({ password })}
            autoCapitalize="none"
          />

          <View style={styles.loginButtonContainer}>
            <MainButton style={styles.loginButton} onPress={this._signInAsync}>
              LOGIN
            </MainButton>
          </View>
        </View>
      </View>
    );
  }
  _signInAsync = async () => {
    //await AsyncStorage.setItem('userToken', 'rider');

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
          AsyncStorage.setItem("driverId", firebase.auth().currentUser.uid);
          //AsyncStorage.setItem('userToken', 'rider');
          //create a rider node with:firstname,lastname,phone,profile

          this.props.navigation.navigate("Driver");
        },
        (error) => {
          Toast.show("error:" + error.message, Toast.SHORT, Toast.TOP);
        }
      );
  };
}

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
