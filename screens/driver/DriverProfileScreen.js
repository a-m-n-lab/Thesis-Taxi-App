import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  Image,
  AsyncStorage,
  Button,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import Colors from "../../constants/Colors";

export default class DriverProfileScreen extends React.Component {
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

  componentDidMount() {
    this.renderFunction();
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => this.renderFunction());
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    //console.log("componentDidup");
    // const screenSt = this.props.navigation.getParam("stateS");
    // console.log(screenSt);
    // console.log(this.state.screenState);
    // this.setState({ screenState: screenSt });
    // if (this.state.screenState == screenSt) {
    //   //   console.log(this.state.phone);
    //   this.changeFunction();
    // }
    // AppState.addEventListener("change", this.storeUserLocation());
  }
  changeFunction = () => {
    //  this.setState({ screenState: screenState });
    //this.setState({ stateOfScreen: stateS });
    // const result = this.props.navigation.getParam("stateOfScreen");
    this.renderFunction();
    //this.screenState(result);
  };
  renderFunction = () => {
    userId = firebase.auth().currentUser.uid; //get the id first
    if (userId) {
      // AsyncStorage.setItem("RiderId", userId);
      firebase
        .database()
        .ref("Drivers/" + userId + "/Details") //use id to check details
        .once(
          "value",
          function (snapshot) {
            var email = snapshot.child("email").val();
            var firstname = snapshot.child("firstname").val();
            var lastname = snapshot.child("lastname").val();
            var phone = snapshot.child("phone").val();
            //   var date = snapshot.child("currentDate").val();
            //console.log(snapshot.val());
            this.setState({
              email,
              firstname,
              lastname,
              phone,
              //  date,
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
      <View style={{ flex: 1 }}>
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
              source={require("../../assets/images/user/user.jpg")}
            ></Image>
            <Text style={[styles.name, { flex: 1 }]}>
              Hello, {""}
              {this.state.firstname} {""}!
            </Text>
          </View>
        </View>
        <View style={[styles.details, { backgroundColor: "white" }]}>
          <View style={styles.firstname}>
            <Ionicons
              name="person-outline"
              size={26}
              color="grey"
              style={{
                fontWeight: "bold",
              }}
            />
            <Text style={[styles.profileText, { flex: 1 }]}>
              {this.state.firstname} {this.state.lastname}
            </Text>
          </View>
          <View style={styles.email}>
            <Ionicons name="mail-outline" size={26} color="grey" />
            <Text style={styles.profileText}>{this.state.email}</Text>
          </View>
          <View style={styles.phone}>
            <Ionicons name="call-outline" size={26} color="grey" />
            <Text style={[styles.profileText]}>{this.state.phone}</Text>
          </View>
        </View>

        {/* <Text style={styles.profileText}>
            Registered since
            {new Date((this.state.date / 1000) * 1000).toLocaleDateString(
              "ro-RO"
            )}
          </Text> */}
      </View>
    );
  }
}

DriverProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Driver Profile",
    // headerLeft: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       color={Platform.OS === "android" ? "white" : "black"}
    //       title="Menu"
    //       iconName="ios-menu"
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
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