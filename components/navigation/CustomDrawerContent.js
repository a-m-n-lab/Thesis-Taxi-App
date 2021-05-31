import React, { useState, useEffect, useContext } from "react";
import { Image, Text, StyleSheet, View, Switch } from "react-native";
import { Content, Container, Header, Body } from "native-base";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { ThemeContext } from "../../Themes/dark";

const CustomDrawerContentComponent = (props) => {
  const { dark, light, theme, toggle } = useContext(ThemeContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [lightTheme, setLightTheme] = useState(true);
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

  const changeTheme = () => {
    if (lightTheme) {
      setLightTheme(false);
    } else {
      setLightTheme(true);
    }
  };
  return (
    <Container
      style={{ flex: 1, width: "100%", backgroundColor: theme.backgroundColor }}
    >
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
            onPress={() => props.navigation.navigate("UserProfile")}
          >
            <Image
              source={require("../../assets/images/user/user.jpg")}
              style={{ width: 90, height: 90, borderRadius: 100 }}
            />
            <View style={styles.headerIcon}>
              <Text style={styles.userHeader}>
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
                <Text style={styles.button} color="black" title="">
                  Edit your profile
                </Text>
              </View>
            </Text>
          </TouchableOpacity>
        </View>
      </Header>
      <Content>
        <DrawerNavigatorItems {...props} />
        <View
          style={{
            padding: 10,
            top: 60,
            backgroundColor: theme.backgroundColor,
          }}
        >
          <Text style={[styles.preferences, { color: theme.color }]}>
            Preferences
          </Text>
          {lightTheme ? (
            <View style={styles.containerSwitch}>
              <Ionicons
                name="moon-outline"
                size={20}
                color={{ color: theme.color }}
                style={{
                  color: theme.color,
                  fontWeight: "bold",
                }}
              />

              <Text
                style={[
                  styles.profileText,
                  { color: theme.color, left: 5, top: 3 },
                ]}
              >
                Dark Theme
              </Text>
              <Switch
                style={{ left: 50 }}
                trackColor={{ false: "#767577", true: "purple" }}
                thumbColor={dark ? "#fff" : "#f4f3f4"}
                onChange={() => {
                  toggle();
                  changeTheme();
                }}
                value={dark}
              />
            </View>
          ) : (
            <View style={styles.containerSwitch}>
              <Ionicons
                name="sunny-outline"
                size={20}
                color={{ color: theme.color }}
                style={{
                  color: theme.color,
                  fontWeight: "bold",
                }}
              />

              <Text
                style={[
                  styles.profileText,
                  { color: theme.color, left: 5, top: 3 },
                ]}
              >
                Light Theme
              </Text>
              <Switch
                style={{ left: 50 }}
                trackColor={{ false: "#767577", true: "purple" }}
                thumbColor={light ? "#fff" : "#f4f3f4"}
                onChange={() => {
                  toggle();
                  changeTheme();
                }}
                value={light}
              />
            </View>
          )}
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

export default CustomDrawerContentComponent;
