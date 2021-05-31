import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import Card from "../../components/Card";
import { Content, Container } from "native-base";
import Colors from "../../constants/Colors";
//import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GooglePlacesInput from "../../components/GooglePlacesInput";
import GooglePlacesDropOff from "../../components/GooglePlacesDropOff";
//import Toast from "react-native-simple-toast";
import DestinationCard from "../../components/userprofile/DestinationCard";
import Toast, { DURATION } from "react-native-easy-toast";
import Dash from "react-native-dash";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 47.368816531416826, lng: 24.67733126020572 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 47.374934475629715, lng: 24.659682324481643 } },
};
export default class UserPickup extends React.Component {
  static pickupName;
  static pickupLatitude;
  static pickupLongitude;
  //dropOff data
  static dropOffName;
  static dropOffLatitude;
  static dropOffLongitude;

  constructor(props) {
    super(props);
    this.state = {
      myCoord: [],
      destinations: [],
      driverId: [],
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  componentDidMount() {
    this.recentDestination();
  }
  componentDidUpdate() {
    // this.recentDestination();
  }
  render() {
    return (
      <Container style={{ flex: 1 }}>
        <KeyboardAvoidingView>
          <DestinationCard style={styles.fromToContainer}>
            <View style={styles.destinationContainer}>
              <GooglePlacesInput predefinedPlaces={[homePlace, workPlace]} />
            </View>
            <Dash style={styles.dash} />
            <View style={styles.toContainer}>
              <GooglePlacesDropOff predefinedPlaces={[homePlace, workPlace]} />
            </View>
          </DestinationCard>
          <View style={styles.recentView}>
            <Text style={styles.history}> RECENT </Text>
            {this.state.destinations.slice(0, 2).map((u, i) => {
              return (
                <View item={i} key={i.id}>
                  <View style={styles.recent}>
                    <Image
                      style={{ width: 30, height: 30, borderRadius: 50 }}
                      source={require("../../assets/images/user/dest.png")}
                    />
                    <Text style={styles.destinationsText}> {u.pickupname}</Text>
                  </View>
                  <View style={styles.recent}>
                    <Image
                      style={{ width: 30, height: 30, borderRadius: 20 }}
                      source={require("../../assets/images/user/dest.png")}
                    />
                    <Text style={styles.destinationsText}> {u.dropname}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.requestButtonsContainer}>
            <TouchableOpacity
              style={styles.request}
              onPress={this._validatePickUpAndDropOffLocations}
            >
              <Text style={styles.requestText}>Request ride</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.completed}
              onPress={() => {
                this.props.navigation.state.params.returnData(
                  this.state.myCoord
                );
                this.props.navigation.goBack();
              }}
            >
              <Text style={styles.requestText}>Request completed</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <Toast ref={(toast) => (this.toast = toast)} />
      </Container>
    );
  }
  recentDestination() {
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
          var ids = childSnapshot.child("/driverID").val(); //snapshot.child("key" + )
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

          childSnapshot.forEach((childChildSnapshot) => {
            var key3 = childSnapshot.key;
            var pkname = childChildSnapshot.child("/riderpickname").val();
            var dpname = childChildSnapshot.child("/riderdropname").val();
            if (pkname != null && userId == riderId) {
              order.push({
                pickupname: pkname,
                dropname: dpname,
              });

              this.setState({
                destinations: order,
              });

              return false;
            }
          });
        });
      });
  }
  _validatePickUpAndDropOffLocations = () => {
    // alert("good"+GooglePlacesInput.pickupLatitude);
    if (
      GooglePlacesInput.pickupName == null ||
      GooglePlacesInput.pickupLatitude == null ||
      GooglePlacesInput.pickupLongitude == null
    ) {
      this.toast.show("SET YOUR PICK UP LOCATION PLEASE", 500);
      return;
    } else {
      var latLongObj1 = {
        latitude: parseFloat(GooglePlacesInput.pickupLatitude),
        longitude: parseFloat(GooglePlacesInput.pickupLongitude),
      };
      this.setState(
        (prevState) => ({
          myCoord: [...prevState.myCoord, latLongObj1],
        })
        // () => {
        //   console.log("this.state.myCoord" + this.state.myCoord);
        // }
      );

      //this.setState({ myCoord: [...this.state.myCoord, latLongObj1] });
    }

    if (
      GooglePlacesDropOff.dropOffName == null ||
      GooglePlacesDropOff.dropOffLatitude == null ||
      GooglePlacesDropOff.dropOffLongitude == null
    ) {
      this.toast.show("SET YOUR DROP OFF LOCATION PLEASE", 500);
      return;
    } else {
      let latLongObj = {
        latitude: parseFloat(GooglePlacesDropOff.dropOffLatitude),
        longitude: parseFloat(GooglePlacesDropOff.dropOffLongitude),
      };
      // this.setState(
      //   {
      //     myCoord: [
      //       ...this.state.myCoord,
      //       {
      //         lat: parseFloat(GooglePlacesDropOff.dropOffLatitude),
      //         lng: parseFloat(GooglePlacesDropOff.dropOffLongitude),
      //       },
      //     ],
      //   }
      //   // () => {
      //   //   console.log(this.state.myCoord);
      //   // }
      // );

      this.setState(
        (prevState) => ({
          myCoord: [...prevState.myCoord, latLongObj],
        })
        // () => {
        //   console.log(this.state.myCoord);
        // }
      );
      // this.setState({
      //   myCoord: [...this.state.myCoord, latLongObj],
      // });
    }

    this.toast.show("Good", 500);
    this._getNearbyDrivers();
  };

  _getNearbyDrivers = () => {
    var DriverKeys = [];
    var counts = [];
    var randomIndex;
    var urlRef = firebase.database().ref("/Drivers/");
    urlRef.once("value", (snapshot) => {
      snapshot.forEach(function (child) {
        //console.log("keys"+child.key);
        DriverKeys.push(child.key);
      });
      for (let i = 0; i < DriverKeys.length; i++) {
        counts.push(DriverKeys[i]);
      }

      randomIndex = Math.floor(Math.random() * DriverKeys.length);

      this._requestDriver(counts[randomIndex]);
    });
  };
  //------------------------------------------------------------------
  _requestDriver = (driverID) => {
    /*firebase.database().ref('/Ride_Request/' +driverID).once('value').then(function(snapshot) {
          
          if(snapshot.exists()){
            Toast.show("This driver is busy,Try another one",Toast.SHORT);
            return;
          }
          
         
          
          }).then(()=>{
            
          },(error)=>{
            console.error("error"+error);
            //console.log("the user id:"+userId);
          });
  */
    //store rider informations
    AsyncStorage.getItem("riderId")
      .then((riderID) =>
        //riderId=result,

        firebase
          .database()
          .ref("Ride_Request/" + riderID)
          .set({
            driverID: driverID,
          })
          .then(
            () => {
              this.toast.show("Driver requested successful", 500);
            },
            (error) => {
              this.toast.show(error.message, 500);
            }
          )
      )
      .catch((e) => console.log("err", e));

    AsyncStorage.getItem("riderId")
      .then((riderID) =>
        //riderId=result,

        firebase
          .database()
          .ref("Ride_Request/" + driverID + "/")
          .set({
            date: firebase.database.ServerValue.TIMESTAMP,
            riderID: riderID,
            pickUpName: GooglePlacesInput.pickupName,
            dropOffName: GooglePlacesDropOff.dropOffName,
            pickupLatitude: GooglePlacesInput.pickupLatitude,
            pickupLongitude: GooglePlacesInput.pickupLongitude,
            dropOffLatitude: GooglePlacesDropOff.dropOffLatitude,
            dropOffLongitude: GooglePlacesDropOff.dropOffLongitude,
          })
          .then(
            () => {},
            (error) => {
              //Toast.show(error.message,Toast.SHORT);
              console.error("error:" + error);
            }
          )
      )
      .catch((e) => console.log("err", e));
  };
}

const styles = StyleSheet.create({
  fromToContainer: {
    top: 10,
    alignSelf: "center",
    paddingLeft: 25,
    borderRadius: 25,
    width: "80%",
  },
  destinationContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // paddingTop: 20,
  },
  toContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 15,
  },
  requestText: {
    color: "white",
    fontWeight: "bold",
  },
  containerView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  map: {
    height: 600,
    marginTop: 0,
  },
  searchIcon: {
    marginTop: 8,
    marginLeft: 8,
  },
  recentView: { marginTop: 30 },
  history: {
    marginLeft: 15,
    color: "gray",
    paddingBottom: 20,
  },
  requestButtonsContainer: {
    //  top: 250,
  },
  requestContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 350,
    marginLeft: 5,
    borderRadius: 25,
    backgroundColor: Colors.darkGrey,
  },
  recent: {
    marginLeft: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#dde4e7",
    paddingBottom: 10,
    paddingTop: 5,
    alignItems: "center",
  },
  destinationsText: { fontSize: 15, fontFamily: "Lato3", marginLeft: 5 },
  request: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    top: 50,
    // bottom: 100,
    width: 300,
    marginLeft: 5,
    borderRadius: 8,
    backgroundColor: "#7c6ccc",
  },
  completed: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    top: 70,
    width: 300,
    marginLeft: 5,
    borderRadius: 8,
    backgroundColor: "#7c6ccc",
  },
  fromToDash: {
    marginLeft: 15,
    width: 2,
    height: 100,
    borderLeftWidth: 1,
    borderLeftColor: "#000",
  },
  dash: {
    margin: 0,
    width: 80,
    height: 45,
    left: 9,

    flexDirection: "column",
  },
});
