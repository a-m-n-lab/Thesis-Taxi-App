import React from "react";
import {
  StyleSheet,
  Text,
  View,
  YellowBox,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  ActivityIndicator,
  LogBox,
} from "react-native";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-simple-toast";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
    };
    //firebase initialize
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  componentDidMount() {
    this.authUnsubscriber = firebase.auth().onAuthStateChanged((authData) => {
      this.setState({ authData });
    });
    YellowBox.ignoreWarnings(["Encountered an error loading page"]);
    console.disableYellowBox = true;
    //this.firestoreUnsubscriber = this.ref.onSnapshot(this.onCollectionUpdate)
  }
  render() {
    return (
      <View style={styles.registerContainer}>
        <Logo />
        <Subtitle>
          {` SIGN UP 
- PASSENGER- `}
        </Subtitle>
        <View style={styles.loginContainer}>
          <Input
            id="firstname"
            autoFocus={true}
            placeholder="First-Name"
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <Input
            id="lastname"
            autoFocus={true}
            placeholder="Last-Name"
            onChangeText={(lastname) => this.setState({ lastname })}
            initialValue=""
          />
          <Input
            id="phone"
            autoFocus={true}
            placeholder="Phone"
            autoCapitalize="none"
            onChangeText={(mobile) => this.setState({ mobile })}
            initialValue=""
          />
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
            <MainButton style={styles.loginButton} onPress={this._VerifyAsync}>
              <MainButton onPress={() => {}}>Let's go </MainButton>
              SIGNUP
            </MainButton>
          </View>
        </View>
      </View>
    );
  }
  _VerifyAsync = async () => {
    //await AsyncStorage.setItem('userToken', 'rider');
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      this.state.firstname.trim() === "" ||
      this.state.email.trim() === "" ||
      this.state.mobile.trim() === "" ||
      this.state.lastname.trim() === "" ||
      this.state.password.length == ""
    ) {
      Toast.show(
        "All inputs must be filled!",
        Toast.SHORT,
        Toast.TOP,
        ToastStyle
      );
      return;
    }
    if (reg.test(this.state.email) === false) {
      Toast.show("INVALID EMAIL!", Toast.SHORT, Toast.TOP, ToastStyle);
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (authData) => {
          //create a rider node with:firstname,lastname,phone,profile

          if (firebase.auth().currentUser) {
            userId = firebase.auth().currentUser.uid;
            if (userId) {
              AsyncStorage.setItem("RiderId", userId);
              firebase
                .database()
                .ref(`RiderIds/${userId}/Details`)
                .set({
                  firstname: this.state.firstname,
                  lastname: this.state.lastname,
                  email: this.state.email,
                  phone: this.state.mobile,
                  profile_image: "default",
                })
                .then(
                  () => {
                    Toast.show("User added successfully", Toast.SHORT);

                    this.props.navigation.navigate("UserLogin");
                  },
                  (error) => {
                    Toast.show(error.message, Toast.SHORT);
                  }
                );
            }
          }

          //this.props.navigation.navigate('App1');
        },
        (error) => {
          Toast.show("error:" + error.message, Toast.SHORT, Toast.TOP);
        }
      );

    //.catch(error => this.setState({ errorMessage: error.message }))
  };
}

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  loginContainer: {
    padding: 15,
    //top: 60,
  },
  usernameIconContainer: {
    justifyContent: "center",
    //top: 40,
  },
  passwordIconContainer: {
    marginVertical: 15,
    //top: 60,
  },
  loginButtonContainer: {
    left: 190,
    //top: 60,
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
