import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Button,
  ImageBackground,
  Image,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import * as firebase from "firebase";
import ApiKeys from "../constants/ApiKeys";
import { Card, Row } from "native-base";
//import Card from "../components/Card";
export default class EditUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

            this.setState({
              firstname,
              lastname,
              phone,
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
      console.log("SaveF");
    }
  };

  handleChange = (inputText) => {};
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
  }
  render() {
    return (
      <Card>
        <View style={styles.container}>
          <Text style={styles.profileText}>First Name:</Text>
          <View style={styles.inputContainer}>
            <Input
              autoFocus
              onChangeText={(text) => this.setState({ firstname: text })}
            >
              {this.state.firstname}
            </Input>
          </View>
          <Text style={styles.profileText}> Last Name:</Text>
          <Input onChangeText={(text) => this.setState({ lastname: text })}>
            {this.state.lastname}
          </Input>
          <Text style={styles.profileText}> Phone: </Text>
          <Input onChangeText={(text) => this.setState({ phone: text })}>
            {this.state.phone}
          </Input>
          <View>
            <MainButton style={styles.saveButton} onPress={this.saveFunction}>
              Save
            </MainButton>
          </View>
        </View>
      </Card>
    );
  }
}

EditUserScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Edit Screen",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color={Platform.OS === "android" ? "white" : "black"}
          title="Edit"
          iconName="save-outline"
          //onPress={() =>saveFunction()}
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
  inputContainer: {},
  saveButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});
