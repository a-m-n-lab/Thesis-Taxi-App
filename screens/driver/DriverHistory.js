import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import { Card } from "native-base";

export default class DriverHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
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
        .ref("Ride_History/" + userId + "/")
        .once("value", (snapshot) => {
          var order = [];
          snapshot.forEach((childSnapshot) => {
            // var key = childSnapshot.key;
            // console.log(key);
            // var orderList = snapshot.child(key + "/riderpickname").val();
            // order.push({ _name: order, _key: key });
            var key = childSnapshot.key;
            pkname = snapshot.child(key + "/riderpickname").val();
            dpname = snapshot.child(key + "/riderdropname").val();
            dt = snapshot.child(key + "/rideDate").val();
            order.push({
              pickupname: pkname,
              dropname: dpname,
              date: dt,
              // pickupname: snapshot.child("riderpickname").val(),
              // dropname: snapshot.child("riderdropname").val(),
              // date: snapshot.child("rideDate").val(),
            });

            this.setState({
              order: order,
            });
            console.log(order);
            return false;
          });
        });
    }
  };

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
  }
  render() {
    var myDate = new Date((this.state.order.date / 1000) * 1000);
    var hours = myDate.getHours();
    var min = myDate.getMinutes(); //Current Minutes
    //var sec = myDate.getSeconds();
    var current = hours + ":" + min;
    return (
      <ScrollView>
        <Card style={styles.card}>
          {this.state.order.map((u, i) => {
            return (
              <View key={i}>
                <Text>Pick up address: {u.pickupname}</Text>
                <Text>Drop off address: {u.dropname}</Text>
                <Text>
                  Date:
                  {new Date((u.date / 1000) * 1000).toLocaleDateString("ro-RO")}
                </Text>
                <Text>
                  Time: {new Date((u.date / 1000) * 1000).getHours()}:
                  {new Date((u.date / 1000) * 1000).getMinutes()}
                </Text>
                <Text></Text>
              </View>
            );
          })}
        </Card>
        {/* <View style={styles.container}>
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
        </View> */}
      </ScrollView>
    );
  }
}

DriverHistory.navigationOptions = (navData) => {
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
