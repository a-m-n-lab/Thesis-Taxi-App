import React from "react";
import { View, StyleSheet, Platform, Text, AsyncStorage } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import { Card } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

export default class UserHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driverId: [],
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
    //if (userId) {
    firebase
      .database()
      .ref("Ride_History/" + userId + "/") //use id to check details
      .once("value", (snapshot) => {
        var driverId = [];
        snapshot.forEach((childSnapshot) => {
          var key = childSnapshot.key;
          // childSnapshot.forEach((childChildSnapshot) => {
          ids = childSnapshot.child("/driverID").val(); //snapshot.child("key" + )
          driverId.push({
            id: ids,
          });
          var uniqueIds = [];
          driverId.map((dID) => {
            if (uniqueIds.indexOf(dID.id) === -1) {
              //check for unique DriverIDS
              uniqueIds.push(dID.id);
            }
          });
          this.setState({
            driverId: uniqueIds,
          });

          return false;
          //});
        });

        // console.log(ids);
        // console.log("this.state.driverId: ");
        // console.log(this.state.driverId);
      });

    firebase
      .database()
      .ref(
        "Ride_History/" +
          this.state.driverId.map((y) => {
            var y = y.id;
          }) +
          "/"
      )
      .once("value", (snapshot) => {
        var order = [];
        snapshot.forEach((childSnapshot) => {
          var key2 = childSnapshot.key;
          // console.log("key2 : ");
          // console.log(key2);
          //   if (key == y) {
          childSnapshot.forEach((childChildSnapshot) => {
            var key3 = childSnapshot.key;
            //  console.log("key3 : ");
            // console.log(key3);
            pkname = childChildSnapshot.child("/riderpickname").val();
            dpname = childChildSnapshot.child("/riderdropname").val();
            dt = childChildSnapshot.child("/rideDate").val();
            riderId = childChildSnapshot.child("/riderID").val();
            price = childChildSnapshot.child("/ridePrice").val();
            if (pkname != null && userId == riderId) {
              order.push({
                pickupname: pkname,
                dropname: dpname,
                date: dt,
                price: price,
              });
              //  console.log(childSnapshot);
              this.setState({
                order: order,
              });
              //console.log(y.id);
              return false;
            }
            // console.log("Key " + key);
          });
          //  }
        });
        //   console.log("userId " + userId);
        // console.log("riderId " + riderId);
      });
    //  });
    //});
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
                <Text> Price: {u.price} RON</Text>
                <Text></Text>
              </View>
            );
          })}
        </Card>
      </ScrollView>
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
