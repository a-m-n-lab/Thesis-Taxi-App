import React from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/Colors";
import Logo from "../../components/Logo";

import Subtitle from "../../components/Subtitle";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import Card from "../../components/Card";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
//import Toast from "react-native-simple-toast";
import Toast, { DURATION } from "react-native-easy-toast";
import { HeaderTitle } from "react-navigation-stack";
export default class DriverLoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      isLoading: false,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  render() {
    return (
      <View style={styles.driverLoginContainer}>
        <Logo />
        {/* <Subtitle>
          {` LOG IN 
- DRIVER - `}
        </Subtitle> */}
        <Card style={styles.cardContainer}>
          <View style={styles.loginContainer}>
            <View style={styles.usernameIconContainer}>
              <FontAwesome name="user-o" size={26} color="grey" />
            </View>
            <View>
              <Input
                style={{ right: 65 }}
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
            {this.state.isLoading ? (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#9d6bb0" />
              </View>
            ) : null}
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
              <MainButton
                style={styles.loginButton}
                onPress={() => {
                  this.setState({ isLoading: true }, this.signInAsync);
                }}
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
  signInAsync = async () => {
    //await AsyncStorage.setItem('userToken', 'rider');

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
          AsyncStorage.setItem("driverId", firebase.auth().currentUser.uid);
          this.getDriverRole();
        },
        (error) => {
          this.toast.show("error:" + error.message, 500);
        }
      );
  };
  getDriverRole = () => {
    AsyncStorage.getItem("driverId") //**driverId
      .then((result) =>
        firebase
          .database()
          .ref("Drivers/" + result + "/Details")
          .once("value", (snapshot) => {
            if (snapshot.exists()) {
              var isDriver = snapshot.child("driver").val();
              console.log("Is user a driver?" + isDriver);
              console.log(snapshot.val());
              if (isDriver) {
                this.props.navigation.navigate("DriversPage");
              }
            } else {
              Alert.alert("Alert", "This user is not registered as a Driver", [
                {
                  text: "Cancel",
                  onPress: () => {
                    console.log("Cancel Pressed"),
                      this.setState({ isLoading: false });
                  },
                  style: "cancel",
                },
              ]);
            }
          })
      );
  };

  // getDriverRole = () => {
  //   AsyncStorage.getItem("driverId") //**driverId
  //     .then(
  //       (result) =>
  //         firebase
  //           .database()
  //           .ref("Drivers/" + result + "/Details")
  //           .once("value", function (snapshot) {
  //             if (snapshot.exists()) {
  //               var isDriver = snapshot.child("driver").val();
  //               // this.setState({ isDriver: isDriverD });
  //               console.log("Is user a driver? " + isDriver);
  //               console.log(snapshot.val());
  //             }
  //           })
  //       // .then(
  //       //   () => {
  //       //     if (!isRider) {
  //       //       this.props.navigation.navigate("Maps");
  //       //     } else {
  //       //       this.props.navigation.navigate("DriversPage");
  //       //     }
  //       //   }

  //       // .once("value")
  //       // .then((snapshot) => {
  //       //   var isRider = snapshot.child("driver").val();

  //       //   //this.setState({ isDriver: isDriverD });
  //       //   console.log("fine" + isRider);
  //       //   //     console.log(snapshot.val());
  //       // })
  //       // .ref("Drivers/" + result + "/Details")
  //       // .once("value", function (snapshot) {
  //       //   if (snapshot.exists()) {
  //       //     var isDriverD = snapshot.child("driver").val();

  //       //     this.setState({ isDriver: isDriverD });
  //       //     console.log("fine" + isDriver);
  //       //     console.log(snapshot.val());
  //       //   }
  //       // })
  //       // .then(() => {
  //       //   if (!isDriverD == "") {
  //       //     if (this.state.isDriver) {
  //       //       this.props.navigation.navigate("DriversPage");
  //       //     } else {
  //       //       this.props.navigation.navigate("Maps");
  //       //     }
  //       //   }
  //       // })
  //       // )
  //     );
  // };
}
DriverLoginScreen.navigationOptions = () => {
  return {
    headerTitle: "Driver Login",
  };
};
const styles = StyleSheet.create({
  driverLoginContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  loginContainer: {
    padding: 15,
    top: 10,
  },
  cardContainer: {
    width: 380,
    alignItems: "center",
    alignSelf: "center",
    top: Dimensions.get("window").height / 7,
    paddingBottom: 30,
    paddingRight: 35,
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
    left: 190,
    top: 10,
  },
  loginButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
    width: 150,
    alignItems: "center",
    //justifyContent: "center",
  },
  loading: {
    opacity: 0.6,
    position: "absolute",
    left: 25,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
