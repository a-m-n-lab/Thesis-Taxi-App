import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import { Card } from "native-base";

export default class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupname: "",
      dropname: "",
      date: "",
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
      // AsyncStorage.setItem("RiderId", userId);
      firebase
        .database()
        .ref("Ride_Confirm/" + userId) //use id to check details
        .once(
          "value",
          function (snapshot) {
            var pickupname = snapshot.child("riderpickname").val();
            var dropname = snapshot.child("riderdropname").val();
            var date = snapshot.child("rideDate").val();
            console.log(snapshot.val());
            this.setState({
              pickupname,
              dropname,
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
    var myDate = new Date((this.state.date / 1000) * 1000);
    var hours = myDate.getHours();
    var min = myDate.getMinutes(); //Current Minutes
    //var sec = myDate.getSeconds();
    var current = hours + ":" + min;
    return (
      <Card>
        <View style={styles.container}>
          <Text style={styles.profileText}>
            PickUp: {this.state.pickupname}
          </Text>
          <Text style={styles.profileText}>DropUp: {this.state.dropname}</Text>
          <Text style={styles.profileText}>
            Date:
            {new Date((this.state.date / 1000) * 1000).toLocaleDateString(
              "ro-RO"
            )}
          </Text>
          <Text>Hours : {current}</Text>
        </View>
      </Card>
    );
  }
}

UserHistory.navigationOptions = (navData) => {
  return {
    headerTitle: "History",
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
