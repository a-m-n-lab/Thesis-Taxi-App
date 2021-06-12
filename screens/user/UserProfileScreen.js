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
import { ThemeContext } from "../../Themes/dark";

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
      screenState: false,
      info: [],
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  static contextType = ThemeContext;

  componentDidMount() {
    this.renderFunction();
    // const { navigation } = this.props;
    // navigation.addListener("willFocus", () => this.renderFunction());
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
      AsyncStorage.setItem("RiderId", userId);
      firebase
        .database()
        .ref("RiderIds/" + userId + "/Details") //use id to check details
        .on(
          "value",
          (snapshot) => {
            let info = [];
            info = snapshot.val();
            //console.log(snapshot.val());
            this.setState({
              info: info,
            });
          }

          //   let riderInfo = [];
          //   riderInfo = snapshot.val();
          //   this.setState({
          //     riderInfo: riderInfo,
          //   });
          // });
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
              margin: 10,
              // backgroundColor: "#7674ca",
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              // borderBottomLeftRadius: 50,
              borderBottomRightRadius: 30,
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
            <Text style={[styles.name, { color: theme.color, flex: 1 }]}>
              Hello, {""}
              {this.state.info.firstname} {""}!
            </Text>
          </View>
        </View>
        <View
          style={[styles.details, { backgroundColor: theme.backgroundColor }]}
        >
          <View
            style={[
              styles.firstname,
              {
                backgroundColor: dark ? theme.backgroundCard : "#eaecf9",
              },
            ]}
          >
            <Ionicons
              name="person-outline"
              size={26}
              color="grey"
              style={{
                fontWeight: "bold",
              }}
            />
            <Text style={[styles.profileText, { color: theme.color, flex: 1 }]}>
              {this.state.info.firstname} {this.state.info.lastname}
            </Text>
          </View>
          <View
            style={[
              styles.email,
              {
                backgroundColor: dark ? theme.backgroundCard : "#eaecf9",
              },
            ]}
          >
            <Ionicons name="mail-outline" size={26} color="grey" />
            <Text style={[styles.profileText, { color: theme.color }]}>
              {this.state.info.email}
            </Text>
          </View>
          <View
            style={[
              styles.phone,
              {
                backgroundColor: dark ? theme.backgroundCard : "#eaecf9",
              },
            ]}
          >
            <Ionicons name="call-outline" size={26} color="grey" />
            <Text style={[styles.profileText, { color: theme.color }]}>
              {this.state.info.phone}
            </Text>
          </View>
        </View>
        <View
          style={[styles.member, { backgroundColor: theme.backgroundColor }]}
        >
          <Text style={[styles.profileText, { color: theme.color }]}>
            Registration date:
          </Text>
          <Text style={[styles.profileText, { color: theme.color }]}>
            {" "}
            {
              new Date((this.state.date / 1000) * 1000).toLocaleDateString(
                "en-GB"
              )
              // this.state.date.getDate() +
              //   "-" +
              //   (this.state.date.getMonth() + 1) +
              //   "-" +
              //   this.state.date.getFullYear()
              // (this.state.date / 1000) * 1000)
              // .toString("dd-MM-yyyy")
              // .toLocaleDateString(
              //   "en-GB"
              // )
            }
          </Text>
          {/* <Button title="Refresh" onPress={this.changeFunction} /> */}
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
        {/* <Item
          iconName="refresh-outline"
          // color={Platform.OS === "android" ? "white" : "black"}
          color={"purple"}
          onPress={this.changeFunction}
        /> */}
        <Item
          // color={Platform.OS === "android" ? "white" : "black"}
          color={"#846ccc"}
          title="Edit"
          onPress={() => {
            navData.navigation.navigate("EditProfile");
          }}
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
    padding: 20,
    height: 80,
    backgroundColor: "#eaecf9",
    borderRadius: 15,
    alignItems: "center",
  },
  email: {
    width: "100%",
    flexDirection: "row",
    top: 20,
    padding: 20,
    height: 80,
    backgroundColor: "#eaecf9",
    borderRadius: 15,
    alignItems: "center",
  },
  phone: {
    width: "100%",
    flexDirection: "row",
    top: 30,
    padding: 20,
    height: 80,
    backgroundColor: "#eaecf9",
    borderRadius: 15,
    alignItems: "center",
  },
  member: { top: 30, padding: 20, backgroundColor: "white" },
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
