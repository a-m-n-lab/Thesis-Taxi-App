import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Button,
  ImageBackground,
  Image,
  TextInput,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import Toast, { DURATION } from "react-native-easy-toast";
import { Card, Row } from "native-base";
//import Card from "../components/Card";
export default class EditUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentDidMount() {
    this.renderFunction();
    console.log("componentdidmount");
  }
  renderFunction = () => {
    userId = firebase.auth().currentUser.uid; //get the id first
    if (userId) {
      // AsyncStorage.setItem("RiderId", userId);
      firebase
        .database()
        .ref("RiderIds/" + userId + "/Details") //use id to check details
        .once(
          "value",
          function (snapshot) {
            var firstname = snapshot.child("firstname").val();
            var lastname = snapshot.child("lastname").val();
            var phone = snapshot.child("phone").val();
            var email = snapshot.child("email").val();
            this.setState({
              firstname,
              lastname,
              phone,
              email,
            });
          }.bind(this)
        );
    }
  };
  saveFunction = () => {
    userId = firebase.auth().currentUser.uid; //get the id first
    if (userId) {
      firebase
        .database()
        .ref("RiderIds/" + userId + "/Details") //use id to check details
        .update({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          phone: this.state.phone,
        });
      this.toast.show("Profile updated", 800);
    }

    this.props.navigation.goBack();
  };

  handleChange = (inputText) => {};
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
  }
  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <Toast ref={(toast) => (this.toast = toast)} />
        <Image
          style={{
            top: 30,
            width: 100,
            height: 100,
            borderRadius: 400 / 2,
            alignSelf: "center",
          }}
          source={require("../assets/images/user/user.jpg")}
        />
        <View style={styles.container}>
          <View style={styles.firstname}>
            <Text style={styles.profileText}>First Name:</Text>
            <TextInput
              style={styles.textInput}
              autoFocus
              onChangeText={(text) => this.setState({ firstname: text })}
            >
              {this.state.firstname}
            </TextInput>
          </View>

          <View style={styles.lastname}>
            <Text style={styles.profileText}> Last Name:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({ lastname: text })}
            >
              {this.state.lastname}
            </TextInput>
          </View>

          <View style={styles.phone}>
            <Text style={styles.profileText}> Phone: </Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({ phone: text })}
            >
              {this.state.phone}
            </TextInput>
          </View>

          <View style={styles.email}>
            <Text style={styles.emailText}> Email: </Text>
            <Text style={styles.emailStyle}>{this.state.email}</Text>
          </View>
          <View style={{ top: 150 }}>
            <MainButton style={styles.saveButton} onPress={this.saveFunction}>
              Save
            </MainButton>
          </View>
        </View>
      </View>
    );
  }
}

EditUserScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Edit Profile",

    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       color={Platform.OS === "android" ? "white" : "black"}
    //       title="Edit"
    //       iconName="save-outline"
    //       //onPress={() =>saveFunction()}
    //     />
    //   </HeaderButtons>
    // ),
  };
};
const styles = StyleSheet.create({
  container: {
    top: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: { width: 300, top: 5, fontFamily: "Lato3" },
  profileText: {
    right: 2,
    fontSize: 15,
    fontFamily: "Lato3",
  },
  emailText: { fontSize: 15, color: "grey", right: 3, fontFamily: "Lato3" },
  emailStyle: { fontSize: 15, color: "grey", fontFamily: "Lato3" },
  firstname: { padding: 15, top: 20, backgroundColor: "#f3f4f6" },
  lastname: { padding: 15, top: 40, backgroundColor: "#f3f4f6" },
  phone: { padding: 15, top: 60, backgroundColor: "#f3f4f6" },
  email: {
    color: "grey",
    width: 330,
    padding: 15,
    top: 80,
    backgroundColor: "#f3f4f6",
  },
  saveButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});
