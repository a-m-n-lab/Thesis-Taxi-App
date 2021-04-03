import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
} from "react-native";
import * as firebase from "firebase";
//import RNRestart from "react-native-restart";

// Immediately reload the React Native Bundle

import { NavigationActions, NavigationEvents } from "react-navigation";
//import AuthLoadingScreen from "../main/AuthLoadingScreen";

export default class UserLogout extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();

    // RNRestart.Restart();
  }
  //   static navigationOptions = {
  //     drawerIcon: ({ tintColor }) => (
  //       <Image
  //         source={require("../assetsImages/logout.png")}
  //         style={{ width: 25, height: 25 }}
  //       />
  //     ),
  //   };
  // signOutUser = async () => {
  //   try {
  //     await firebase.auth().signOut();
  //     navigate("Welcome");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  componentDidMount() {
    AsyncStorage.clear();
    // navigation.navigate("Welcome");
    // Expo.Updates.reload();
  }
  // Fetch the token from storage then navigate to our appropriate place

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ backgroundColor: "red" }}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
