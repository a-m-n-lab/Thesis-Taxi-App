import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  Image,
  YellowBox,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

import {
  Content,
  Container,
  Header,
  Left,
  Icon,
  Footer,
  Body,
} from "native-base";
//import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
//import AuthLoadingScreen from "../main/AuthLoadingScreen";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import DriverMainNavigator from "../navigation/DriverNavigator";
export default class DriverPageScreen extends React.Component {
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

    YellowBox.ignoreWarnings(["Encountered an error loading page"]);
    console.disableYellowBox = true;
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello </Text>
      </View>
    );
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Welcome");
  };
}

//drawerNavigator

DriverPageScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton} color="white">
        <Item
          color="white"
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42A5F5",
    justifyContent: "center",
  },
});
