import React, { useState, useEffect } from "react";
import { Image, Text, StyleSheet, Button, View } from "react-native";
import {
  Content,
  Container,
  Header,
  Left,
  Icon,
  Footer,
  Body,
} from "native-base";
import Colors from "../../constants/Colors";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";

const CustomDrawerContentComponent = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    userId = firebase.auth().currentUser.uid; //get the id first
    if (userId) {
      // AsyncStorage.setItem("RiderId", userId);
      firebase
        .database()
        .ref("RiderIds/" + userId + "/Details") //use id to check details
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
    <Container style={{ flex: 1, width: "100%" }}>
      <Header style={{ height: 200, backgroundColor: "#f4e3ff" }}>
        <Body>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("UserProfile")}
          >
            <Image
              source={require("../../assets/images/user/user.jpg")}
              style={{ width: 90, height: 90, borderRadius: 100, right: 30 }}
            />
            <View style={styles.headerIcon}>
              <Text style={styles.userHeader}>
                {firstName} {lastName}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={26}
                color="black"
                style={{ left: 80 }}
              />
            </View>
            <Text
              style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}
            >
              <View style={styles.editButton}>
                <Text style={styles.button} color="black" title="">
                  Edit your profile
                </Text>
              </View>
            </Text>
          </TouchableOpacity>
        </Body>
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
    backgroundColor: "#99aab5",
  },
  editButton: {
    justifyContent: "center",
    top: 30,
  },
  headerIcon: { top: 10, flexDirection: "row", right: 30 },
  userHeader: { fontSize: 30, fontWeight: "bold" },
  button: { top: 15, right: 30, fontSize: 15 },
});

export default CustomDrawerContentComponent;
