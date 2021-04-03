import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  ActivityIndicator,
  LogBox,
} from "react-native";
import { CheckBox } from "react-native-elements";

import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
//import Toast from "react-native-simple-toast";

import Toast, { DURATION } from "react-native-easy-toast";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
//import { YellowBox } from "react-native";
LogBox.ignoreLogs(["Require cycle:"]);
export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      promotional: false,
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
    LogBox.ignoreLogs(["Encountered an error loading page"]);
    //console.disableYellowBox = true;
    //this.firestoreUnsubscriber = this.ref.onSnapshot(this.onCollectionUpdate)
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (authData) => {
      return;
    };
  }
  render() {
    return (
      <View style={styles.registerContainer}>
        <Toast ref={(toast) => (this.toast = toast)} />
        <Logo />
        <Subtitle>
          {` SIGN UP 
- PASSENGER- `}
        </Subtitle>
        <View style={styles.loginContainer}>
          <Input
            autoFocus={true}
            id="firstname"
            autoFocus={true}
            placeholder="First-Name"
            onChangeText={(firstname) => this.setState({ firstname })}
          />
          <Input
            id="lastname"
            placeholder="Last-Name"
            onChangeText={(lastname) => this.setState({ lastname })}
            initialValue=""
          />
          <Input
            id="phone"
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

          <CheckBox
            title="Click here if you want to receive promotional offers"
            // checkedIcon={<Image source={require("../checked.png")} />}
            // uncheckedIcon={<Image source={require("../unchecked.png")} />}
            checked={this.state.promotional}
            onPress={() =>
              this.setState({ promotional: !this.state.promotional })
            }
          />
          <View style={styles.loginButtonContainer}>
            <MainButton style={styles.loginButton} onPress={this._VerifyAsync}>
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
      this.toast.show("All inputs must be filled!", 500);
      return;
    }
    if (reg.test(this.state.email) === false) {
      this.toast.show("INVALID EMAIL!", 500);
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (authData) => {
          //user node with:firstname,lastname,phone,profile, promotional

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
                  //if ( promotional) then promotional: "yes"
                  //profile_image: "default",
                  promotional: this.state.promotional,
                })
                .then(
                  () => {
                    this.toast.show("User added successfully", 500);

                    this.props.navigation.navigate("UserLogin");
                  },
                  (error) => {
                    this.toast.show(error.message, 500);
                  }
                );
            }
          }

          //this.props.navigation.navigate('App1');
        },
        (error) => {
          this.toast.show("error:" + error.message, 500);
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
    top: 30,
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
    top: 20,
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
// const ToastStyle = {
//   backgroundColor: "#4ADDFB",
//   width: 300,
//   height: Platform.OS === "ios" ? 50 : 100,
//   color: "#ffffff",
//   fontSize: 15,
//   lineHeight: 2,
//   lines: 4,
//   borderRadius: 15,
//   fontWeight: "bold",
//   yOffset: 40,
// };
