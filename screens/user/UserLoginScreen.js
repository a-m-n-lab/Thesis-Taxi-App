import React from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Alert,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../../constants/Colors";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
//import { Card } from "native-base";
import Card from "../../components/Card";
import ApiKeys from "../../constants/ApiKeys";
//import Toast from "react-native-simple-toast";
import Toast, { DURATION } from "react-native-easy-toast";
import * as firebase from "firebase";

export default class UserLoginScreen extends React.Component {
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
      <ImageBackground
        style={styles.screenWrapper}
        imageStyle={styles.backgroundStyle}
        source={require("../../assets/images/5.jpg")}
      >
        <View>
          <Text style={styles.enjoy}>
            {` Enjoy the trip 
 with Blink `}
          </Text>
        </View>
        <Card style={styles.cardContainer}>
          <KeyboardAvoidingView>
            <Text style={styles.newAcc}> Welcome back</Text>
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
                style={{ bottom: 20 }}
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
                  onPress={() => {
                    this.setState({ isLoading: true }, this.signInAsync);
                  }}
                >
                  LOGIN
                </MainButton>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Card>
        <Toast ref={(toast) => (this.toast = toast)} />
      </ImageBackground>
    );
  }

  signInAsync = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.trim() === "") {
      this.toast.show("Email input must be filled!", 500);
      return;
    }
    if (this.state.password.length == "") {
      this.toast.show("Password must be filled!", 500);
      return;
    }
    if (reg.test(this.state.email) === false) {
      this.toast.show("INVALID EMAIL!", 500);
      return;
    }

    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          AsyncStorage.setItem("riderId", firebase.auth().currentUser.uid);
          this.getRiderRole();
          //  this.props.navigation.navigate("Maps");
        },
        (error) => {
          this.toast.show("error:" + error.message, 500);
        }
      )
      .catch((e) => console.log("err", e));
  };
  getRiderRole = async () => {
    await AsyncStorage.getItem("riderId") //**driverId
      .then((result) =>
        firebase
          .database()
          .ref("RiderIds/" + result + "/Details")
          .once("value", (snapshot) => {
            if (snapshot.exists()) {
              var isRider = snapshot.child("driver").val();
              //console.log("Is user a driver?" + isRider);
              //console.log(snapshot.val());
              if (!isRider) {
                this.props.navigation.navigate("Maps");
              }
            } else {
              Alert.alert(
                "Alert",
                "This user is not registered as a Passenger",
                [
                  {
                    text: "Cancel",
                    onPress: () => {
                      console.log("Cancel Pressed"),
                        this.setState({ isLoading: false });
                    },
                    style: "cancel",
                  },
                ]
              );
            }
          })
      )
      .catch((e) => console.log("err", e));
  };

  //   goToMaps = () => {};
}

UserLoginScreen.navigationOptions = () => {
  return {
    headerTitle: () => {
      "";
    },
  };
};
const styles = StyleSheet.create({
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
  // userLoginContainer: {
  //   maxHeight: Dimensions.get("window").height,
  //   maxWidth: Dimensions.get("window").width,
  //   flex: 1,
  //   backgroundColor: "white",
  // },
  loginContainer: {
    //padding: 10,
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    maxHeight: Dimensions.get("window").height,
    alignItems: "center",
    alignSelf: "center",
    top: 130,
    paddingBottom: 30,
    paddingRight: 35,
  },
  usernameIconContainer: {
    justifyContent: "center",
    top: 30,
  },
  passwordIconContainer: {
    marginVertical: 15,
    top: 35,
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
  loading: {
    opacity: 0.6,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  newAcc: {
    fontSize: 25,
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 25,
    fontWeight: "bold",
  },
});
