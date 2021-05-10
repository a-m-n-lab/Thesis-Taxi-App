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
import { createDrawerNavigator, DrawerItem } from "react-navigation-drawer";

import { createStackNavigator } from "react-navigation-stack";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import UserHomeContents from "./user/UserHomeContents";
import UserPickup from "./user/UserPickup";
import MyDrawerNav from "../navigation/UserNavigator";

LogBox.ignoreLogs(["Require cycle:"]);

export default class UserHome extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  componentDidMount() {
    /* firebase.database().ref('/Riders/' + firebase.auth().currentUser.uid+'/Details').once('value').then(function(snapshot) {
     firstname = snapshot.child('firstname').val();
     lastname = snapshot.child('lastname').val();

   }).then(()=>{
    console.log("fine");

   },(error)=>{
    console.error("error"+error);
   });*/
    //AsyncStorage.clear();
    AsyncStorage.getItem("riderId")
      .then((result) =>
        firebase
          .database()
          .ref("/Riders/" + result + "/Details")
          .once("value")
          .then(function (snapshot) {
            firstname = snapshot.child("firstname").val();
            lastname = snapshot.child("lastname").val();
          })
          .then(
            () => {
              //console.log("fine"+result);
            },
            (error) => {
              console.error("error" + error);
              console.log("the user id:" + userId);
            }
          )
      )
      .catch((e) => console.log("err", e));

    // YellowBox.ignoreWarnings(["Encountered an error loading page"]);
    // console.disableYellowBox = true;
  }
  render() {
    return <View style={styles.container}>{/* <UserMainNavigator /> */}</View>;
  }
  // _signOutAsync = async () => {
  //   await AsyncStorage.clear();
  //   this.props.navigation.navigate("Welcome");
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
});
