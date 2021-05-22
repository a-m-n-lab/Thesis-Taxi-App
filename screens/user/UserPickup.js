import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Content, Container } from "native-base";
import Colors from "../../constants/Colors";
//import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GooglePlacesInput from "../../components/GooglePlacesInput";
import GooglePlacesDropOff from "../../components/GooglePlacesDropOff";
//import Toast from "react-native-simple-toast";
import DestinationCard from "../../components/userprofile/DestinationCard";
import Toast, { DURATION } from "react-native-easy-toast";
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
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  render() {
    return (
      <Container style={{ flex: 1, alignItems: "center" }}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <DestinationCard style={styles.fromToContainer}>
            <View style={styles.destinationContainer}>
              <GooglePlacesInput predefinedPlaces={[homePlace, workPlace]} />
            </View>
            <View style={styles.fromToDash}></View>
            <View style={styles.destinationContainer}>
              <GooglePlacesDropOff predefinedPlaces={[homePlace, workPlace]} />
            </View>
          </DestinationCard>
          <View style={styles.requestButtonsContainer}>
            <TouchableOpacity
              style={styles.requestContainer}
              onPress={this._validatePickUpAndDropOffLocations}
            >
              <Text style={styles.requestText}>REQUEST</Text>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity
              style={styles.requestContainer}
              onPress={() => {
                // this.props.navigation.navigate("Maps", {
                //   myArray: this.state.myCoord,
                // });
                // this.props.navigation.goBack();
                this.props.navigation.state.params.returnData(
                  this.state.myCoord
                );
                this.props.navigation.goBack();
              }}
            >
              <Text style={styles.requestText}>REQUEST COMPLETED</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <Toast ref={(toast) => (this.toast = toast)} />
      </Container>
    );
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
        //   console.log(this.state.myCoord);
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
    top: 5,
    padding: 20,
  },
  destinationContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
  },
  requestText: {
    color: "#fff",
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
  requestButtonsContainer: {
    top: 250,
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
  fromToDash: {
    marginLeft: 15,
    width: 2,
    height: 100,
    borderLeftWidth: 1,
    borderLeftColor: "#000",
  },
});
