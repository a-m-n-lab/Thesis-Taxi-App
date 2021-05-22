import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Image,
  AsyncStorage,
  LogBox,
  Switch,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import { Card } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { ThemeContext } from "../Themes/dark";

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
      date: "",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  static contextType = ThemeContext;

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
            var date = snapshot.child("currentDate").val();
            //console.log(snapshot.val());
            this.setState({
              email,
              firstname,
              lastname,
              phone,
              date,
            });
          }.bind(this)
        );
    }
  };
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
  }
  render() {
    const { dark, theme, toggle } = this.context;

    return (
      <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        <View style={styles.profileDetails}>
          <View
            style={{
              flexDirection: "row",
              padding: 25,
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 400 / 2,
              }}
              source={require("../assets/images/user/user.jpg")}
            ></Image>
            <Text style={[styles.name, { color: theme.color }]}>
              Hello, {""}
              {this.state.firstname} {""}!
            </Text>
          </View>
        </View>
        <View
          style={[styles.details, { backgroundColor: theme.backgroundCard }]}
        >
          <View style={styles.firstname}>
            <Ionicons
              name="person-outline"
              size={26}
              color="grey"
              style={{
                fontWeight: "bold",
              }}
            />
            <Text style={[styles.profileText, { color: theme.color }]}>
              {this.state.firstname} {this.state.lastname}
            </Text>
          </View>
          <View style={styles.email}>
            <Ionicons name="mail-outline" size={26} color="grey" />
            <Text style={[styles.profileText, { color: theme.color }]}>
              {this.state.email}
            </Text>
          </View>
          <View style={styles.phone}>
            <Ionicons name="call-outline" size={26} color="grey" />
            <Text style={[styles.profileText, { color: theme.color }]}>
              {this.state.phone}
            </Text>
          </View>
        </View>
        <View
          style={[styles.member, { backgroundColor: theme.backgroundCard }]}
        >
          <Text style={[styles.profileText, { color: theme.color }]}>
            Registration date:
          </Text>
          <Text style={[styles.profileText, { color: theme.color }]}>
            {" "}
            {new Date((this.state.date / 1000) * 1000).toLocaleDateString(
              "ro-RO"
            )}
          </Text>
        </View>
        {/* <Text style={styles.profileText}>
            Registered since
            {new Date((this.state.date / 1000) * 1000).toLocaleDateString(
              "ro-RO"
            )}
          </Text> */}

        <View style={styles.containerSwitch}>
          <Ionicons
            name="moon-outline"
            size={20}
            //color={{ color: theme.color }}
            style={{
              color: theme.color,
              fontWeight: "bold",
            }}
          />
          <Text style={[styles.profileText, { color: theme.color }]}>
            Dark Mode
          </Text>
          <Switch
            style={{ left: 220 }}
            trackColor={{ false: "#767577", true: "purple" }}
            thumbColor={dark ? "#fff" : "#f4f3f4"}
            onChange={toggle}
            value={dark}
          />
        </View>
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
          // color={Platform.OS === "android" ? "white" : "black"}
          color={"purple"}
          title="Edit"
          onPress={() => navData.navigation.navigate("EditProfile")}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  container: {},
  profileDetails: {
    width: "100%",
  },
  name: {
    fontSize: 35,
    left: 35,
    top: 25,
    fontWeight: "bold",
    fontFamily: "Lato3",
  },
  profileText: {
    fontSize: 20,
    left: 15,
    fontFamily: "Lato3",
  },
  firstname: {
    width: "100%",
    flexDirection: "row",
    top: 10,
    padding: 10,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  email: {
    width: "100%",
    flexDirection: "row",
    top: 30,
    padding: 10,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  phone: {
    width: "100%",
    flexDirection: "row",
    top: 40,
    padding: 10,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  member: { top: 10, padding: 10, backgroundColor: "white" },
  details: {
    minHeight: 250,
    top: 10,
    backgroundColor: "white",
    padding: 15,
  },
  containerSwitch: {
    flexDirection: "row",
    padding: 15,
    top: 60,
    marginBottom: 50,
  },
});
