import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Image,
  LogBox,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerItems,
  createStackNavigator,
} from "react-navigation";
import DriverHomeContents from "./driver/DriverHomeContents";
//import { YellowBox } from "react-native";

//import RiderDriverScreenChoice from "../main/RiderDriverScreenChoice";
//import AuthLoadingScreen from "../main/AuthLoadingScreen";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

export default class DriverHome extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.setState = {
      userId: "",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  componentDidMount() {
    //AsyncStorage.clear();

    AsyncStorage.getItem("driverId")
      .then((result) =>
        firebase
          .database()
          .ref("/Drivers/" + result + "/Details")
          .once("value")
          .then(function (snapshot) {
            firstname = snapshot.child("firstname").val();
            lastname = snapshot.child("lastname").val();
          })
          .then(
            () => {
              // console.log("fine"+result);
            },
            (error) => {
              console.error("error" + error);
              console.log("the user id:" + userId);
            }
          )
      )
      .catch((e) => console.log("err", e));

    LogBox.ignoreLogs(["Encountered an error loading page"]);
    LogBox.ignoreAllLogs(); // in ComponentDidMount
  }
  render() {
    return <View style={styles.container}>{/* <MyDrawerNav /> */}</View>;
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42A5F5",
    justifyContent: "center",
  },
});
