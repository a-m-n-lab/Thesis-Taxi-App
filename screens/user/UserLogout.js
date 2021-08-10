import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Alert,
  Text,
  Card,
} from "react-native";
import * as firebase from "firebase";
import Colors from "../../constants/Colors";
//import RNRestart from "react-native-restart";

// Immediately reload the React Native Bundle

import { NavigationActions, NavigationEvents } from "react-navigation";
import MainButton from "../../components/MainButton";

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

  render() {
    logoutAlertHandler = () => {
      Alert.alert("Logout", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          //style: "cancel",
          onPress: () => this.props.navigation.navigate("Maps"),
        },
        { text: "Yes", onPress: signOutHandler },
      ]);
    };
    signOutHandler = () => {
      firebase
        .auth()
        .signOut()
        .then(() => this.props.navigation.navigate("Welcome"));
    };
    return (
      <View style={{ backgroundColor: "white" }}>
        <View>
          <Text>
            Press here if you want to log out from your passenger account
          </Text>
        </View>
        <View style={{}}>
          <MainButton style={styles.logoutButton} onPress={logoutAlertHandler}>
            LOGOUT
          </MainButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
  },
});
