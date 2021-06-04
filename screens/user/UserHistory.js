import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  AsyncStorage,
  Image,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import { Card } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import Dash from "react-native-dash";

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
        });
      })
      .catch((e) => console.log("err", e));

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

              this.setState({
                order: order,
              });

              return false;
            }
          });
        });
      })
      .catch((e) => console.log("err", e));
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
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.history}> Your trips</Text>
          {this.state.order.map((u, i) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Card key={i} style={styles.card}>
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
    );
  }
}

UserHistory.navigationOptions = (navData) => {
  return {
    headerTitle: false,
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
    flex: 1,
    backgroundColor: "white",
    borderRadius: 4,
  },
  history: {
    fontWeight: "bold",
    padding: 5,
    fontSize: 50,
  },
  card: {
    padding: 10,
    width: "85%",
    justifyContent: "center",
    backgroundColor: "#eaecf9",
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
  price: { left: 115 },
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
