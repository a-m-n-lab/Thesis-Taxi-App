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
import { Feather } from "@expo/vector-icons";
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
      isDriver: false,
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
        {/* <Subtitle>
          {` SIGN UP 
- PASSENGER- `}
        </Subtitle> */}

        <View style={styles.registerContainer}>
          <View style={styles.firstNameIconContainer}>
            <FontAwesome name="user-o" size={26} color="black" />
          </View>
          <View style={styles.firstNameTextContainer}>
            <TextInput
              style={{
                left: 10,
                height: 45,
              }}
              autoFocus={true}
              id="firstname"
              autoFocus={true}
              placeholder="First-Name"
              onChangeText={(firstname) => this.setState({ firstname })}
            />
            <View style={styles.verticalLine}></View>
            <TextInput
              style={{
                right: 60,
                height: 45,
              }}
              id="lastname"
              placeholder="Last-Name"
              onChangeText={(lastname) => this.setState({ lastname })}
              initialValue=""
            />
          </View>
          <View style={styles.phoneIconContainer}>
            <Ionicons name="call-outline" size={26} color="black" />
          </View>

          <Input
            id="phone"
            placeholder="Phone"
            autoCapitalize="none"
            onChangeText={(mobile) => this.setState({ mobile })}
            initialValue=""
          />
          <View style={styles.emailIconContainer}>
            <Feather name="at-sign" size={26} color="black" />
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
            <Ionicons name="key-outline" size={26} color="black" />
          </View>
          <View style={styles.passwordTextContainer}>
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
          </View>
          <CheckBox
            title="Click here if you want to receive promotional offers"
            // checkedIcon={<Image source={require("../checked.png")} />}
            // uncheckedIcon={<Image source={require("../unchecked.png")} />}
            checked={this.state.promotional}
            onPress={() =>
              this.setState({ promotional: !this.state.promotional })
            }
          />
          <View style={styles.registerButtonContainer}>
            <MainButton
              style={styles.registerButton}
              onPress={this._VerifyAsync}
            >
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
                  currentDate: firebase.database.ServerValue.TIMESTAMP,
                  driver: this.state.isDriver,
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
    padding: 15,
  },
  registerationContainer: {
    backgroundColor: "white",
    //top: 10,
  },
  firstNameIconContainer: {
    justifyContent: "center",
    top: 40,
  },
  firstNameTextContainer: {
    flexDirection: "row",
    width: 150,
    justifyContent: "space-between",
    left: 35,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    width: 300,
    alignItems: "center",
  },
  verticalLine: {
    height: "90%",
    width: 1,
    backgroundColor: Colors.grey,
  },
  phoneIconContainer: { top: 40 },
  emailIconContainer: { top: 40 },
  passwordIconContainer: {
    marginVertical: 15,
    top: 30,
  },
  passwordTextContainer: { bottom: 30 },
  registerButtonContainer: {
    left: 190,
    //top: 20,
    width: 150,
  },
  registerButton: {
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
