import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  FlatList,
  ScrollView,
  Image,
  LogBox,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import { Card } from "native-base";
import Dash from "react-native-dash";
import { Dimensions } from "react-native";

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
    LogBox.ignoreAllLogs();
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
            price = snapshot.child(key + "/ridePrice").val();

            order.push({
              pickupname: pkname,
              dropname: dpname,
              date: dt,
              price: price,
              // pickupname: snapshot.child("riderpickname").val(),
              // dropname: snapshot.child("riderdropname").val(),
              // date: snapshot.child("rideDate").val(),
            });

            this.setState({
              order: order,
            });
            //console.log("order");
            // console.log(this.state.order);
            return false;
          });
        })
        .catch((e) => console.log("err", e));
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
      <View style={styles.orders}>
        <ScrollView>
          <Text style={styles.history}> Your orders</Text>
          {this.state.order.map((u, i) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Card key={i.id} style={styles.card}>
                  {/* key={i} */}
                  <View style={styles.calendarTime}>
                    <View style={styles.date}>
                      <Image
                        source={require("../../assets/images/history/calendar.png")}
                        style={styles.calendar}
                      />
                      <Text style={styles.dateTime}>
                        {new Date((u.date / 1000) * 1000).toLocaleDateString(
                          "ro-RO"
                        )}
                      </Text>
                    </View>
                    <View style={styles.time}>
                      <Image
                        source={require("../../assets/images/history/time.png")}
                        style={styles.calendar}
                      />
                      <Text style={styles.dateTime}>
                        {new Date((u.date / 1000) * 1000).getHours()}:
                        {new Date((u.date / 1000) * 1000).getMinutes()}
                      </Text>
                    </View>
                    <View style={styles.price}>
                      <Text style={{ color: "#745cc4", fontWeight: "bold" }}>
                        {parseFloat(u.price).toFixed(2)} RON
                      </Text>
                    </View>
                  </View>
                  <View style={styles.address}>
                    <View style={styles.pickup}>
                      <Image
                        source={require("../../assets/images/user/from.png")}
                        style={styles.calendar}
                      />
                      <Text> {u.pickupname}</Text>
                    </View>
                    <Dash style={styles.dash} />
                    <View style={styles.dropoff}>
                      <Image
                        source={require("../../assets/images/to.png")}
                        style={styles.calendar}
                      />
                      <Text> {u.dropname}</Text>
                    </View>
                  </View>
                </Card>
              </View>
            );
          })}
        </ScrollView>
      </View>
      // <ScrollView>
      //   <Card style={styles.card}>
      //     {this.state.order.map((u, i) => {
      //       return (
      //         <View key={i}>
      //           <Text>Pick up address: {u.pickupname}</Text>
      //           <Text>Drop off address: {u.dropname}</Text>
      //           <Text>
      //             Date:
      //             {new Date((u.date / 1000) * 1000).toLocaleDateString("ro-RO")}
      //           </Text>
      //           <Text>
      //             Time: {new Date((u.date / 1000) * 1000).getHours()}:
      //             {new Date((u.date / 1000) * 1000).getMinutes()}
      //           </Text>
      //           <Text></Text>
      //         </View>
      //       );
      //     })}
      //   </Card>
      //   {/* <View style={styles.container}>
      //     <Text style={styles.profileText}>
      //       PickUp: {this.state.pickupname}
      //     </Text>
      //     <Text style={styles.profileText}>DropUp: {this.state.dropname}</Text>
      //     <Text style={styles.profileText}>
      //       Date:
      //       {new Date((this.state.date / 1000) * 1000).toLocaleDateString(
      //         "ro-RO"
      //       )}
      //     </Text>
      //     <Text>Hours : {current}</Text>
      //   </View> */}
      // </ScrollView>
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
  orders: {
    width: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "white",
    borderRadius: 4,
  },
  container: {},
  history: {
    fontWeight: "bold",
    padding: 5,
    fontSize: 50,
  },
  card: {
    padding: 10,
    width: "85%",
    backgroundColor: "#eaecf9",
    justifyContent: "center",
    borderRadius: 10,
  },
  profileText: {
    fontSize: 30,
  },
  calendarTime: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bcb4e4",
    padding: 7,
  },
  date: { flexDirection: "row" },
  calendar: { width: 18, height: 18 },
  time: { left: 20, flexDirection: "row" },
  dateTime: { fontSize: 17 },
  price: { left: 50 },
  address: { padding: 15 },

  pickup: { flexDirection: "row", padding: 10 },
  dash: {
    width: 1,
    height: 16,
    left: 17,
    flexDirection: "column",
  },
  dropoff: { flexDirection: "row", padding: 10 },
});
