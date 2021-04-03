import React from "react";
import { View, StyleSheet, Platform, Text, Input } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";

export default class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstname: "",
      phone: "",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentDidMount() {
    this.authUnsubscriber = firebase.auth().onAuthStateChanged((authData) => {
      if (authData) {
        console.log("User firstname: ", authData.email);
        this.setState({ authData });
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Email</Text>
        <Text> LastName: Clark</Text>
        <Text> Phone: 54552155</Text>
      </View>
    );
  }
}

UserProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "User Profile",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color={Platform.OS === "android" ? "white" : "black"}
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color={Platform.OS === "android" ? "white" : "black"}
          title="Edit"
          iconName="create-outline"
          onPress={() => navData.navigation.navigate("EditProfile")}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
