import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  AppRegistry,
  AsyncStorage,
  Alert,
  LogBox,
} from "react-native";
import { Content, Container, Card } from "native-base";
import Toast, { DURATION } from "react-native-easy-toast";
//import RiderPickUp from './RiderPickUp';
///import {createStackNavigator} from 'react-navigation';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//-----------------------------------------------------------------------------------//

export default class DriverHomeContents extends React.Component {
  static RiderPickUpName = "";
  static RiderDropUpName = "";
  static RiderPickUpLatitude;
  static RiderPickUpLongitude;
  static RiderDropUpLatitude;
  static RiderDropUpLongitude;
  static RiderID = "";
  static Firstname = "";
  static Lastname = "";

  static D_RiderPickUpName = "";
  static D_RiderDropUpName = "";
  static D_RiderPickUpLatitude;
  static D_RiderPickUpLongitude;
  static D_RiderDropUpLatitude;
  static D_RiderDropUpLongitude;
  static D_RiderID = "";
  static D_Firstname = "";
  static D_Lastname = "";

  static RideDate;
  static RD_Distance;
  static RD_Price;

  static PaymentMode = "";
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      isModalVisible: false,
      isModal2Visible: false,
      isStartTripButtonVisible: true,
      isStopTripButtonVisible: false,
      isMounted: false,
    };
    this.callFunc = this.callFunc.bind(this);

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  callFunc() {
    if (this.isModalVisible) {
      this.setState({ isModalVisible: false });
    } else {
      this.setState({ isModalVisible: true });
    }
  }

  componentDidMount() {
    //this.isMounted = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      },
      (error) => console.log(error.message),
      {
        enableHighAccuracy: false, // allows you to get the most accurate location,
        maximumAge: 10000, // (milliseconds) if a previous location exists in the cache, how old for it to be considered acceptable
        //distanceFilter: 10, // (meters) how many meters the user has to move before a location update is triggered
        timeout: 15000,
      }
    );

    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
        });
      },

      (error) => this.setState({ error: error.message }),
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 20,
      }
    );
    this.getRiderAcceptDetails();
    //when a new request is added
    this.getRiderRequestDetails();
    //
    //disable the warnings in yellow box
    LogBox.ignoreLogs(["Encountered an error loading page"]);
    DriverHomeContents.RD_Distance = this.GetDriverRiderDistance(
      DriverHomeContents.RiderPickUpLatitude,
      DriverHomeContents.RiderPickUpLongitude,
      DriverHomeContents.RiderDropUpLatitude,
      DriverHomeContents.RiderPickUpLongitude

      // DriverHomeContents.RiderDropUpLatitude,
      // DriverHomeContents.RiderPickUpLongitude,
      // DriverHomeContents.RiderDropUpLatitude,
      // DriverHomeContents.RiderPickUpLatitude,
    );
    // console.log("distance is:" + distance);
    //console.disableYellowBox = true;
    DriverHomeContents.RD_Price = this.calculatePrice();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // if (this.state.region !== prevProps.region) {
    //   //AppState.addEventListener("change", this.storeUserLocation());
    // }
  }

  componentWillUnmount() {
    //  this.isMounted = false;
    //  if(!this.state.isMounted){
    navigator.geolocation.clearWatch(this.watchID);
    // Toast.toastInstance = null;
    //  }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.state.region !== prevProps.region) {
      this.storeUserLocation();
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Toast ref={(toast) => (this.toast = toast)} />
          <View style={{ justifyContent: "center" }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              showsUserLocation={true}
              region={this.state.region}
              showsUserLocation={true}
              onRegionChange={(region) => this.setState({ region })}
              onRegionChangeComplete={(region) => this.setState({ region })}
            >
              <MapView.Marker
                coordinate={this.state.region}
                pinColor="black"
                title={"Driver"}
              >
                <Text style={styles.driverText}>You are here</Text>
                {/* <Image
                  source={require("../../assets/images/driver/car.png")}
                  style={{ width: 50, height: 50 }}
                /> */}
              </MapView.Marker>
            </MapView>

            {this.state.isModalVisible ? (
              <Card style={styles.MainAcceptView}>
                <View style={styles.RiderDetails}>
                  {/* <Image
                    source={require("../Images/avatar.png")}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      marginTop: 20,
                      marginLeft: 7,
                    }}
                  /> */}
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 18,
                      marginLeft: 15,
                      color: "#636e72",
                      fontWeight: "bold",
                    }}
                  >
                    Passenger's name:
                    {DriverHomeContents.Firstname + " "}
                    {DriverHomeContents.Lastname}
                  </Text>
                </View>
                <View style={styles.riderLocationTitle}>
                  <Text style={{ fontSize: 14, color: "#636e72" }}>
                    Pickup:
                  </Text>
                  <Text style={{ fontSize: 14, color: "black" }}>Dropoff:</Text>
                </View>
                <View style={styles.riderLocationValue}>
                  <Text style={{ fontSize: 14, color: "black" }}>
                    {DriverHomeContents.RiderPickUpName}
                  </Text>
                  <Text style={{ fontSize: 14, color: "black" }}>
                    {DriverHomeContents.RiderDropUpName}
                  </Text>
                </View>
                <View style={styles.riderPayments}>
                  <Text
                    style={{ marginTop: 50, fontSize: 15, fontWeight: "bold" }}
                  >
                    {DriverHomeContents.PaymentMode}
                  </Text>
                  {/* <Image
                    source={require("../Images/cash.png")}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      marginTop: 20,
                      marginLeft: 7,
                    }}
                  /> */}
                </View>
                <View style={styles.distancePriceView2}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Distance :{DriverHomeContents.RD_Distance.toFixed(2)}
                    KM
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 20, marginLeft: 7 }}
                  >
                    Price: {DriverHomeContents.RD_Price}
                  </Text>
                </View>
                <View style={styles.AcceptDeclineView}>
                  <TouchableOpacity
                    style={styles.AcceptButton}
                    onPress={this.AcceptRequest}
                  >
                    <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.DeclineButton}
                    onPress={this.DeclineRequest}
                  >
                    <Text style={{ color: "#42A5F5", fontWeight: "bold" }}>
                      Decline
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ) : null}

            {this.state.isModal2Visible ? (
              <Card style={styles.MainAcceptView}>
                <View style={styles.RiderDetails}>
                  {/* <Image
                    source={require("../Images/avatar.png")}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      marginTop: 20,
                      marginLeft: 7,
                    }}
                  /> */}
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 18,
                      marginLeft: 15,
                      color: "#636e72",
                      fontWeight: "bold",
                    }}
                  >
                    {/* {DriverHomeContents.D_Firstname +
                      "" +
                      DriverHomeContents.D_Lastname} */}
                  </Text>
                </View>
                <View style={styles.riderLocationTitle}>
                  <Text style={{ fontSize: 14 }}>Pickup:</Text>
                  <Text style={{ fontSize: 14 }}>Dropoff:</Text>
                </View>
                <View style={styles.riderLocationValue}>
                  <Text style={{ fontSize: 14, color: "#42A5F5" }}>
                    {DriverHomeContents.RiderPickUpName} {/*D_RiderPickName*/}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#42A5F5" }}>
                    {DriverHomeContents.RiderDropUpName} {/*D_RiderDropUpName*/}
                  </Text>
                </View>
                <View style={styles.riderPayments}>
                  <Text
                    style={{ marginTop: 20, fontSize: 15, fontWeight: "bold" }}
                  >
                    {DriverHomeContents.PaymentMode}
                  </Text>
                  {/* <Image
                    source={require("../Images/cash.png")}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      marginTop: 20,
                      marginLeft: 7,
                    }}
                  /> */}
                </View>
                <View style={styles.distancePriceView}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Distance :{DriverHomeContents.RD_Distance.toFixed(2)}
                    KM
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", fontSize: 20, marginLeft: 7 }}
                  >
                    {DriverHomeContents.RD_Price}
                  </Text>
                </View>
                <View style={styles.AcceptDeclineView2}>
                  {this.state.isStartTripButtonVisible ? (
                    <TouchableOpacity
                      style={styles.DirverButton}
                      onPress={this.StartTrip}
                      //disabled={!this.isModal2Visible}
                      // style={{
                      //   backgroundColor: !this.isModal2Visible
                      //     ? "grey"
                      //     : "blue",
                      //   padding: 15,
                      // }}
                    >
                      <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                        START TRIP
                      </Text>
                    </TouchableOpacity>
                  ) : null}

                  {this.state.isStopTripButtonVisible ? (
                    <TouchableOpacity
                      style={styles.DirverButton}
                      onPress={this.DoneTrip}
                    >
                      <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                        Done
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </Card>
            ) : null}
          </View>
        </Content>
      </Container>
    );
  }
  pickUpLocation = async () => {
    //this.props.navigation.navigate('pickUpLocation');
    //alert(this.state.region.latitude);
  };

  StartTrip = async () => {
    Alert.alert(
      "Trip Confirm",
      "Are you sure you want to drive?",
      [
        //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: this.StartDriving },
      ],
      { cancelable: false }
    );
  };
  StartDriving = async () => {
    alert("Are you ready to drive?");

    this.setState({ isStartTripButtonVisible: false });
    this.setState({ isStopTripButtonVisible: true });
    AsyncStorage.getItem("driverId")
      .then((driverID) =>
        //riderId=result,s

        firebase
          .database()
          .ref("Ride_History/" + DriverHomeContents.RiderID + "/") //
          .set({
            riderID: DriverHomeContents.RiderID, //added
            driverID: driverID,
          })
          .then(
            () => {},
            (error) => {
              this.toast.show(error.message, 500);
            }
          )
      )
      .catch((e) => console.log("err", e));

    //store driver information
    AsyncStorage.getItem("driverId")
      .then((
        result // driverID***
      ) =>
        //riderId=result,

        firebase
          .database()
          .ref("Ride_History/" + result + "/") // driverID***
          .push({
            riderID: DriverHomeContents.RiderID,
            riderpickname: DriverHomeContents.RiderPickUpName,
            riderdropname: DriverHomeContents.RiderDropUpName,
            riderpickuplatitude: DriverHomeContents.RiderPickUpLatitude,
            riderpickuplongitude: DriverHomeContents.RiderPickUpLongitude,
            riderDropofflatitude: DriverHomeContents.RiderDropUpLatitude,
            riderdropofflongitude: DriverHomeContents.RiderDropUpLongitude,
            rideDate: DriverHomeContents.RideDate,
            rideDistance: DriverHomeContents.RD_Distance,
            ridePrice: DriverHomeContents.RD_Price,
          })
          .then(
            () => {
              this.setState({ isModal2Visible: false });
            },
            (error) => {
              //Toast.show(error.message,Toast.SHORT);
              console.error("error:" + error);
            }
          )
      )
      .catch((e) => console.log("err", e));
  };

  getRiderRequestDetails = () => {
    driverId = firebase.auth().currentUser.uid;
    // AsyncStorage.getItem("driverId") //**driverId
    //   .then((result) =>
    firebase
      .database()
      .ref("Ride_Request/" + driverId)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          DriverHomeContents.RiderID = snapshot.child("riderID").val();
          DriverHomeContents.RiderPickUpName = snapshot
            .child("pickUpName")
            .val();
          DriverHomeContents.RiderDropUpName = snapshot
            .child("dropOffName")
            .val();
          DriverHomeContents.RiderPickUpLatitude = snapshot
            .child("pickupLatitude")
            .val();
          DriverHomeContents.RiderPickUpLongitude = snapshot
            .child("pickupLongitude")
            .val();
          DriverHomeContents.RiderDropUpLatitude = snapshot
            .child("dropOffLatitude")
            .val();
          DriverHomeContents.RiderDropUpLongitude = snapshot
            .child("dropOffLongitude")
            .val();
          DriverHomeContents.RideDate = firebase.database.ServerValue.TIMESTAMP;
          // DriverHomeContents.RideDate =
          //   firebase.database.ServerValue.TIMESTAMP;
        } else {
          this.toast.show("No ride requests", 500);
          // this.setState({ isModal2Visible: false });
          // this.setState({ isModalVisible: false });
        }
      })

      .then(
        () => {
          console.log(
            "Drop Address: " +
              DriverHomeContents.RiderDropUpName +
              " " +
              "Pick Up Address: " +
              DriverHomeContents.RiderPickUpName
          );
          if (!DriverHomeContents.RiderID == "") {
            this.setState({ isModalVisible: true });
          }

          firebase
            .database()
            .ref("RiderIds/" + DriverHomeContents.RiderID + "/Details")
            .once("value")
            .then(function (snapshot) {
              DriverHomeContents.Firstname = snapshot.child("firstname").val();
              DriverHomeContents.Lastname = snapshot.child("lastname").val();
            })
            .then(
              () => {
                console.log(
                  "Rider's name :" +
                    " " +
                    DriverHomeContents.Lastname +
                    " " +
                    "Rider's first name :" +
                    " " +
                    DriverHomeContents.Firstname
                );
              },
              (error) => {
                // console.error("error"+error);
                // console.log("the user id:"+userId);
              }
            );
        },
        (error) => {
          console.error("error" + error);
          //console.log("the user id:"+userId);
        }
      );
    // );
  };

  getRiderAcceptDetails = () => {
    driverId = firebase.auth().currentUser.uid;
    // AsyncStorage.getItem("driverId") //**driverId */

    firebase
      .database()
      .ref("Ride_Confirm/" + driverId)
      .once("value")
      .then(function (snapshot) {
        if (snapshot.exists()) {
          DriverHomeContents.D_RiderID = snapshot.child("riderID").val();
          DriverHomeContents.D_RiderPickUpName = snapshot
            .child("riderpickname")
            .val();
          DriverHomeContents.D_RiderDropUpName = snapshot
            .child("riderdropname")
            .val();
        }
      })
      .then(
        () => {
          console.log(
            "this is RiderID's ID " + " " + DriverHomeContents.D_RiderID
          );
          if (!DriverHomeContents.D_RiderID == "") {
            this.setState({ isModal2Visible: true });
          }

          firebase
            .database()
            .ref("RiderIds/" + DriverHomeContents.D_RiderID + "/Details")
            .once("value")
            .then(function (snapshot) {
              DriverHomeContents.D_Firstname = snapshot
                .child("firstname")
                .val();
              DriverHomeContents.D_Lastname = snapshot.child("lastname").val();
            })
            .then(
              () => {
                console.log(
                  "(Previous) Rider's first name: " +
                    DriverHomeContents.D_Firstname
                );
              },
              (error) => {
                console.error("error" + error);
                // console.log("the user id:"+userId);
              }
            );
        },
        (error) => {
          console.error("error" + error);
          console.log("the user id:" + userId);
        }
      );
  };
  AcceptRequest = () => {
    //store driver information
    AsyncStorage.getItem("driverId")
      .then((driverID) =>
        //riderId=result,

        firebase
          .database()
          .ref("Ride_Confirm/" + driverID + "/")
          .set({
            riderID: DriverHomeContents.RiderID,
            riderpickname: DriverHomeContents.RiderPickUpName,
            riderdropname: DriverHomeContents.RiderDropUpName,
            riderpickuplatitude: DriverHomeContents.RiderPickUpLatitude,
            riderpickuplongitude: DriverHomeContents.RiderPickUpLongitude,
            riderDropofflatitude: DriverHomeContents.RiderDropUpLatitude,
            riderdropofflongitude: DriverHomeContents.RiderDropUpLongitude,
            rideDate: DriverHomeContents.RideDate,
            rideDistance: DriverHomeContents.RD_Distance,
            ridePrice: DriverHomeContents.RD_Price,
          })
          .then(
            () => {
              this.setState({ isModalVisible: false });
            },
            (error) => {
              //Toast.show(error.message,Toast.SHORT);
              console.error("error:" + error);
            }
          )
      )
      .catch((e) => console.log("err", e));

    AsyncStorage.getItem("driverId")
      .then(
        (result) =>
          firebase
            .database()
            .ref("Ride_Request/" + result)
            .remove(),
        firebase
          .database()
          .ref("Ride_Request/" + DriverHomeContents.RiderID)
          .remove(),
        this.setState({ isModalVisible: false })
      )
      .catch((e) => console.log("err", e));

    AsyncStorage.getItem("driverId")
      .then((driverID) =>
        //riderId=result,

        firebase
          .database()
          .ref("Ride_Confirm/" + DriverHomeContents.RiderID)
          .set({
            driverID: driverID,
            confirmed: true,
          })
          .then(
            () => {},
            (error) => {
              this.toast.show(error.message, 500);
            }
          )
      )
      .catch((e) => console.log("err", e));
  };

  storeUserLocation() {
    //var userLatitude=this.state.region.latitude;
    //var userLongitude=this.state.region.longitude;
    //if(userLatitude>0 && userLongitude>0){

    AsyncStorage.getItem("driverId")
      .then((result) =>
        firebase
          .database()
          .ref(`Drivers/${result}/DriversCurrentLocation/`)
          .set({
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
          })
          .then(
            () => {
              //firebase.database().ref(`Payments/${RiderID}/PaymentsHistory`);
              //Toast.show("payments updated successfully",Toast.SHORT);
              // console.log("latitude:"+this.state.region.latitude +"   longitude:"+this.state.region.longitude);
            },
            (error) => {
              //Toast.show(error.message,Toast.SHORT);
              console.log("error with location:" + error);
            }
          )
      )
      .catch((e) => console.log("err", e));

    /*RiderID=firebase.auth().currentUser.uid;
    if(RiderID){
    firebase.database().ref(`Drivers/${RiderID}/DriversCurrentLocation/`).set({
     latitude:this.state.region.latitude,
     longitude: this.state.region.longitude
     }).then(()=>{
      //firebase.database().ref(`Payments/${RiderID}/PaymentsHistory`);
      //Toast.show("payments updated successfully",Toast.SHORT);
      console.log("latitude:"+this.state.region.latitude +"   longitude:"+this.state.region.longitude);
     },(error)=>{
      //Toast.show(error.message,Toast.SHORT);
      console.log("error with location:"+error);
     });
    }
}*/
  }

  DeclineRequest = () => {
    //alert("decline");

    AsyncStorage.getItem("driverId")
      .then(
        (result) =>
          firebase
            .database()
            .ref("Ride_Request/" + result)
            .remove(),
        firebase
          .database()
          .ref("Ride_Request/" + DriverHomeContents.RiderID)
          .remove(),
        this.setState({ isModalVisible: false })
      )
      .catch((e) => console.log("err", e));
  };
  DoneTrip = () => {
    //alert("done trip")
    this.setState({ isModalVisible: false });
  };

  toRad = (Value) => {
    return (Value * Math.PI) / 180;
  };
  GetDriverRiderDistance = (lat1, lon1, lat2, lon2) => {
    //haversine formula
    var R = 6371; // Earth's radius
    var dLat = this.toRad(lat2 - lat1);
    var dLon = this.toRad(lon2 - lon1);
    var lat1 = this.toRad(lat1);
    var lat2 = this.toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    console.log("the distance is:" + d);
    return d;
  };
  calculatePrice() {
    let priceKm = 2.15;
    let finalPrice =
      this.GetDriverRiderDistance(
        DriverHomeContents.RiderPickUpLatitude,
        DriverHomeContents.RiderPickUpLongitude,
        DriverHomeContents.RiderDropUpLatitude,
        DriverHomeContents.RiderPickUpLongitude
      ).toFixed(2) * priceKm;
    return finalPrice;
  }

  // getPaymentMethod = () => {
  //   driverId = firebase.auth().currentUser.uid;

  //   firebase
  //     .database()
  //     .ref("Ride_History/" + DriverHomeContents.RiderID)
  //     .once("value", function (snapshot) {
  //       rider = snapshot.child("riderID").val();
  //       //console.log(snapshot.val());
  //     });

  //   firebase
  //     .database()
  //     .ref("Payments/" + rider + "/PaymentsMode") //use id to check details
  //     .once("value", function (snapshot) {
  //       DriverHomeContents.PaymentMode = snapshot.child("Card").val();
  //       //console.log(snapshot.val());
  //     });
  // };
}

DriverHomeContents.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton} color="white">
        <Item
          color={Platform.OS == "android" ? "white" : "black"}
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
  containerView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  footer: {
    backgroundColor: "#ffffff",
    height: 80,
  },
  map: {
    flex: 1,
    height: 600,
    marginTop: 0,
  },
  MainAcceptView: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 400,
    height: 180,
    position: "absolute",
    top: 410,
    left: 3,
    borderRadius: 5,
    elevation: 8,
  },
  searchIcon: {
    color: "#42A5F5",
    marginTop: 12,
    marginLeft: 10,
  },
  DropUpLocation: {
    alignSelf: "stretch",
    width: 200,
    paddingBottom: 2,
    marginTop: 3,
    marginLeft: 5,
    backgroundColor: "#fff",
  },
  DeclineButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    height: 50,
    width: 155,
    borderColor: "#42A5F5",
    borderWidth: 0.4,
    borderRadius: 5,
    marginLeft: 5,
  },

  AcceptButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#42A5F5",
    height: 50,
    width: 155,
    borderRadius: 5,
    marginLeft: 3,
  },
  AcceptDeclineView: {
    flexDirection: "row",
    position: "absolute",
    left: 10,
    top: 110,
  },
  AcceptDeclineView2: {
    flexDirection: "row",
    position: "absolute",
    left: 10,
    top: 110,
  },
  RiderDetails: {
    flexDirection: "row",
    position: "absolute",
  },
  riderLocationTitle: {
    position: "absolute",
    top: 50,
    left: 70,
  },
  riderLocationValue: {
    position: "absolute",
    top: 50,
    left: 120,
  },
  riderPayments: {
    marginLeft: 200,
    flexDirection: "row",
  },
  driverText: {
    position: "absolute",

    elevation: 10,
    fontWeight: "bold",
    color: "black",
    fontSize: 18,
  },
  DirverButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#42A5F5",
    height: 50,
    width: 320,
    borderRadius: 5,
    marginLeft: 3,
  },
  distancePriceView: {
    position: "absolute",
    flexDirection: "row",
    marginTop: 87,
    marginLeft: 100,
  },
  distancePriceView2: {
    position: "absolute",
    flexDirection: "row",
    marginTop: 87,
    marginLeft: 100,
  },
});
AppRegistry.registerComponent("RiderHomeContents", () => RiderHomeContents);
