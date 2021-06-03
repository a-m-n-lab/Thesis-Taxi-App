import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  Switch,
  Button,
  Alert,
} from "react-native";
import { Content, Container, Header, Body } from "native-base";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { ThemeContext } from "../../Themes/dark";
import { Dimensions } from "react-native";

const DriverCustomDrawerContentComponent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    userId = firebase.auth().currentUser.uid; //get the id first
    if (userId) {
      // AsyncStorage.setItem("RiderId", userId);
      firebase
        .database()
        .ref("Drivers/" + userId + "/Details") //use id to check details
        .once("value", function (snapshot) {
          //  firstName = snapshot.child("firstname").val();
          // lastName = snapshot.child("lastname").val();
          setFirstName(snapshot.child("firstname").val());
          //console.log(snapshot.val());
          setLastName(snapshot.child("lastname").val());
          // setLastName(lastName);
          console.log(firstName);
        });
    }
  }, []);

  logoutAlertHandler = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        //style: "cancel",
        onPress: () => props.navigation.navigate("DriversPage"),
      },
      { text: "Yes", onPress: signOutHandler },
    ]);
  };
  signOutHandler = async () => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => props.navigation.navigate("Welcome"));
      // signed out
    } catch (e) {
      // an error
    }
  };
  // signOutHandler = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(() => props.navigation.navigate("Welcome"));
  // };

  return (
    <Container style={{ flex: 1, width: "100%", backgroundColor: "white" }}>
      <View style={{ backgroundColor: "#eee" }}>
        <Image
          style={StyleSheet.absoluteFill}
          // source={require("../../assets/images/navigation/dr.jpg")}
          source={{
            uri: "https://www.primaryengineer.com/wp-content/uploads/2017/07/rka-header-plain.png",
          }}
        />
        <Header style={{ height: 150, backgroundColor: "transparent" }}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 20,
              alignItems: "flex-start",
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("DriverProfile")}
            >
              <Image
                source={require("../../assets/images/driver/driver.jpg")}
                style={{ width: 70, height: 70, borderRadius: 100 }}
              />
              <View style={styles.headerIcon}>
                <Text style={[styles.userHeader, { color: "white" }]}>
                  {firstName} {lastName}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={26}
                  color="black"
                  style={{ left: 150, position: "absolute", bottom: 10 }}
                />
              </View>
              <Text
                style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}
              >
                <View style={styles.editButton}>
                  <Text style={[styles.button, { color: "white" }]}>
                    See your profile
                  </Text>
                </View>
              </Text>
            </TouchableOpacity>
          </View>
        </Header>
      </View>
      <Content>
        <DrawerNavigatorItems {...props} />
        <View
          style={{
            padding: 10,
            left: 15,
            top: Dimensions.get("window").height / 20,
          }}
        >
          <TouchableOpacity
            onPress={logoutAlertHandler}
            style={styles.logOutButton}
          >
            <Ionicons
              name="log-out-outline"
              size={25}
              style={{
                fontWeight: "bold",
              }}
            />
            <Text
              style={[
                styles.profileText,
                { left: 5, top: 3, fontSize: 18, fontWeight: "bold" },
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  profileText: {
    width: 120,
    height: 50,
    // backgroundColor: "#99aab5",
  },
  editButton: {
    justifyContent: "center",
    top: 30,
  },
  headerIcon: {
    //  top: 10,

    //  flexDirection: "row",
    width: "100%",
    // flex: 1,
  },
  userHeader: { fontSize: 20, fontWeight: "bold" },
  button: { fontSize: 17 },
  preferences: { top: 60, padding: 5, fontSize: 15, fontWeight: "bold" },
  containerSwitch: {
    flexDirection: "row",
    padding: 15,
    top: 60,
    marginBottom: 50,
  },
  logOutButton: { color: "black", flexDirection: "row" },
});

export default DriverCustomDrawerContentComponent;
