import React from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Image,
  Text,
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
      // <View style={{ flex: 1, backgroundColor: "black" }}>
      <ImageBackground
        style={styles.screenWrapper}
        imageStyle={styles.backgroundStyle}
        source={require("../../assets/images/5.jpg")}
      >
        {/* <View style={styles.driverLoginContainer}> */}
        {/* <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/blacklogo.jpg")}
          />
          <Text style={styles.logoText}> BLINK </Text>
        </View> */}
        {/* <Subtitle>
          {` LOG IN 
- DRIVER - `}
        </Subtitle> */}
        {/* <View>
          <Text style={styles.enjoy}>
            {` Enjoy the trip 
  with me `}
          </Text>
        </View> */}
        <Card style={styles.cardContainer}>
          <Text style={styles.newAcc}> Welcome back, driver</Text>
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
        {/* </View> */}
      </ImageBackground>
      // </View>
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
    headerTitle: () => {
      "";
    },
  };
};
const styles = StyleSheet.create({
  logo: { marginLeft: 40, top: 50, width: 40, height: 50 },
  logoText: {
    top: 55,
    fontSize: 30,
    color: Colors.purple,
    fontFamily: "PostNoBills",
    left: 10,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    maxHeight: Dimensions.get("window").height,
    alignItems: "center",
    alignSelf: "center",
    top: 150,
    paddingBottom: 30,
    paddingRight: 35,
  },
  loginContainer: {
    padding: 10,
    //top: 10,
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
  newAcc: {
    fontSize: 25,
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 25,
    fontWeight: "bold",
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
  screenWrapper: {
    flex: 1,
    position: "relative",
  },
  backgroundStyle: {
    resizeMode: "cover",
    // position: "absolute",
    // top: 0,
    bottom: "60%",
  },
  enjoy: {
    color: "white",
    top: 100,
    marginLeft: 20,
    fontSize: 40,
    fontFamily: "Lato3",
  },
});
