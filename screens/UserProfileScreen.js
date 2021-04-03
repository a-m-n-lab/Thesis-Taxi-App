import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Input,
  AsyncStorage,
  LogBox,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import { Card } from "native-base";
//import Card from "../components/Card";
export default class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      email: "",
      firstname: "",
      lastname: "",
      phone: "",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentDidMount() {
    this.renderFunction();
  }
  renderFunction = () => {
    userId = firebase.auth().currentUser.uid; //get the id first
    if (userId) {
      AsyncStorage.setItem("RiderId", userId);
      firebase
        .database()
        .ref("RiderIds/" + userId + "/Details") //use id to check details
        .once(
          "value",
          function (snapshot) {
            var email = snapshot.child("email").val();
            var firstname = snapshot.child("firstname").val();
            var lastname = snapshot.child("lastname").val();
            var phone = snapshot.child("phone").val();
            //console.log(snapshot.val());
            this.setState({
              email,
              firstname,
              lastname,
              phone,
            });
          }.bind(this)
        );
    }
  };
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
  }
  render() {
    return (
      <Card>
        <View style={styles.container}>
          <Text style={styles.profileText}> Email: {this.state.email}</Text>
          <Text style={styles.profileText}>
            First Name: {this.state.firstname}
          </Text>
          <Text style={styles.profileText}>
            Last Name: {this.state.lastname}
          </Text>
          <Text style={styles.profileText}> Phone: {this.state.phone}</Text>
        </View>
      </Card>
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
  profileText: {
    fontSize: 30,
  },
});
