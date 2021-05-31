import React, { useState, useEffect, useContext } from "react";
import { Image, Text, StyleSheet, View, Switch } from "react-native";
import { Content, Container, Header, Body } from "native-base";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { ThemeContext } from "../../Themes/dark";

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

  return (
    <Container style={{ flex: 1, width: "100%", backgroundColor: "white" }}>
      <Header style={{ height: 150, backgroundColor: "#bcb4e4" }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("DriverProfile")}
          >
            <Image
              source={require("../../assets/images/user/user.jpg")}
              style={{ width: 90, height: 90, borderRadius: 100 }}
            />
            <View style={styles.headerIcon}>
              <Text style={styles.userHeader}>
                Hello, {firstName} {lastName}
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
                <Text style={styles.button} color="black" title="">
                  See your profile
                </Text>
              </View>
            </Text>
          </TouchableOpacity>
        </View>
      </Header>
      <Content>
        <DrawerNavigatorItems {...props} />
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
    top: 10,
    //  flexDirection: "row",
    width: "100%",
    flex: 1,
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
});

export default DriverCustomDrawerContentComponent;
