import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  AppRegistry,
  AsyncStorage,
  LogBox,
  Image,
} from "react-native";
import { Content, Container, Card } from "native-base";
import Toast, { DURATION } from "react-native-easy-toast";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import API from "../../constants/API";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import fromIcon from "../../assets/images/user/from.png";
import toIcon from "../../assets/images/to.png";
import HeaderButton from "../../components/HeaderButton";
import lightMapStyle from "../../Themes/lightMapStyle.json";
import Dash from "react-native-dash";
import { Icon } from "react-native-elements";
let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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

  map = null;
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      ready: true,
      isModalVisible: false,
      isModal2Visible: false,
      isStartTripButtonVisible: true,
      isStopTripButtonVisible: false,
      isMounted: false,
      requests: false,
      hasTripStarted: false,
      originData: [],
      destinationData: [],
      price: false,
      name: "",
      destOrigSet: false,
      userToken: null,
      userPayment: "",
    };
    // this.callFunc = this.callFunc.bind(this);

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  // callFunc() {
  //   if (this.isModalVisible) {
  //     this.setState({ isModalVisible: false });
  //     console.log("callFunc");
  //   } else {
  //     this.setState({ isModalVisible: true });
  //     console.log("callFunc");
  //   }
  // }

  async componentDidMount() {
    LogBox.ignoreAllLogs();
    this.setState({ isMounted: true });

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

    // await this.getRiderAcceptDetails();
    // console.log("getRiderAccept called");

    await this.getRiderRequestDetails();
    console.log("getRiderRequestDetails called");
    // //when a new request is added

    //disable the warnings in yellow box
    LogBox.ignoreAllLogs();
  }

  async componentDidUpdate(prevProps, prevState) {
    //  console.log("update");
    //if (DriverHomeContents.RD_Distance != prevProps.DriverHomeContents.RD_Distance){
    // }
    if (this.state.isModalVisible !== prevState.isModalVisible) {
      console.log(this.state.isModalVisible);
      await this.getRiderRequestDetails();

      this.setState({ latitudine: this.state.originData[0].latitude });
      this.setState({ longitudine: this.state.originData[0].longitude });

      this.setState({ latitudineDest: this.state.destinationData[0].latitude });
      this.setState({
        longitudineDest: this.state.destinationData[0].longitude,
      });
    }
    if (this.state.region !== prevProps.region) {
      this.storeUserLocation();
    }
    // await this.getRiderAcceptDetails();
    //  console.log("getRiderAccept update");
    //  await this.getRiderRequestDetails();
    //  console.log("getRiderRequestDetails update");
    // Typical usage (don't forget to compare props):
    // if (this.state.region !== prevProps.region) {
    //   //AppState.addEventListener("change", this.storeUserLocation());
    // }
  }

  componentWillUnmount() {
    // this.setState({ price: false });
    //  this.isMounted = false;
    //  if(!this.state.isMounted){
    navigator.geolocation.clearWatch(this.watchID);
    // Toast.toastInstance = null;
    //  }
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):

  // }

  onMapReady = (e) => {
    if (!this.state.ready) {
      this.setState({ ready: true });
    }
  };

  onRegionChange = (region) => {
    // console.log("onRegionChange", region);
  };

  onRegionChangeComplete = (region) => {
    // console.log("onRegionChangeComplete", region);
  };
  render() {
    console.log("render");
    return (
      // <Container>
      // <Content>

      <View style={{ justifyContent: "center", flex: 1 }}>
        <Toast ref={(toast) => (this.toast = toast)} />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          ref={(map) => {
            this.map = map;
          }}
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
          zoomEnabled
          zoomControlEnabled={true}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          //showsUserLocation={true}
          // onRegionChange={(region) => this.setState({ region })}
          // onRegionChangeComplete={(region) => this.setState({ region })}
          customMapStyle={lightMapStyle}
        >
          {this.state.originData
            ? [
                // <MapView.Marker
                //   key={1}
                //   image={fromIcon}
                //   coordinate={this.state.originData[0]}
                // />,
                <MapViewDirections
                  origin={this.state.originData[0]}
                  destination={this.state.destinationData[0]}
                  apikey={API.apiKey} // insert your API Key here
                  strokeWidth={4}
                  strokeColor="#9484d4"
                />,
                <MapView.Marker
                  image={fromIcon}
                  coordinate={{
                    latitude: this.state.latitudine,
                    longitude: this.state.longitudine,
                  }}
                />,
                <MapView.Marker
                  image={toIcon}
                  coordinate={{
                    latitude: this.state.latitudineDest,
                    longitude: this.state.longitudineDest,
                  }}
                />,
              ]
            : null}

          {/* {this.state.destOrigSet ? (
                <View>
                 
                </View>
              ) : null} */}
        </MapView>
        {this.state.isModalVisible ? (
          <Card style={styles.MainAcceptView}>
            <View style={styles.RiderDetails}>
              <Image
                source={require("../../assets/images/user/user.jpg")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 200,
                  margin: 5,
                }}
              />
              <View>
                {this.state.price && this.state.isModalVisible ? (
                  <Text
                    style={{
                      marginTop: 20,
                      fontSize: 18,
                      marginLeft: 15,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {DriverHomeContents.Firstname} {DriverHomeContents.Lastname}
                  </Text>
                ) : null}
                {this.state.userPayment == "Cash" ? (
                  <View
                    style={{
                      // flexDirection: "row",
                      backgroundColor: "#89cff0",
                      borderRadius: 20,
                      marginLeft: 15,
                      alignItems: "center",
                      padding: 2,
                      width: 90,
                    }}
                  >
                    <Text
                      style={{
                        //marginTop: 10,
                        fontSize: 18,
                        marginLeft: 2,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Cash
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      // flexDirection: "row",
                      backgroundColor: "#e6b8e0",
                      borderRadius: 20,
                      marginLeft: 15,
                      alignItems: "center",
                      padding: 2,
                      width: 90,
                    }}
                  >
                    <Text
                      style={{
                        //marginTop: 10,
                        fontSize: 18,
                        marginLeft: 2,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Card
                    </Text>
                  </View>
                )}
              </View>
              {this.state.price && this.state.isModalVisible ? (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginLeft: 7,
                    margin: 3,
                    top: 5,
                    left: 100,
                  }}
                >
                  {this.state.setPrice} RON
                </Text>
              ) : null}
              {/* {this.state.price == "set" ? ( */}
              <View style={styles.distancePriceView2}>
                <Text style={{ fontSize: 17 }}>
                  {this.state.setDistance}
                  KM
                </Text>
              </View>
              {/* ) : null} */}
            </View>
            <View style={styles.riderLocationTitle}>
              <View style={styles.pickupIcon}>
                <Image
                  source={require("../../assets/images/user/from.png")}
                  style={{ width: 20, height: 20, top: 25 }}
                />
                <View
                  style={{
                    padding: 15,
                    //  borderBottomWidth: 1,
                    // borderBottomColor: "#adadad",
                    //  width: "100%",
                  }}
                >
                  <Text style={{ fontSize: 14, color: "#636e72", bottom: 7 }}>
                    PICK UP
                  </Text>
                  <Text style={{ fontSize: 17, color: "black" }}>
                    {DriverHomeContents.RiderPickUpName}
                  </Text>
                </View>
              </View>
              <Dash style={styles.dash} />
              <View style={styles.dropOffIcon}>
                <Image
                  source={require("../../assets/images/to.png")}
                  style={{ width: 20, height: 20, top: 10 }}
                />
                <View style={styles.dropOffView}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#636e72",
                    }}
                  >
                    DROP OFF
                  </Text>
                  <Text style={{ fontSize: 17, color: "black", top: 7 }}>
                    {DriverHomeContents.RiderDropUpName}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.riderPayments}>
              <Text style={{ marginTop: 50, fontSize: 15, fontWeight: "bold" }}>
                {DriverHomeContents.PaymentMode}
              </Text>
            </View>

            <View style={styles.AcceptDeclineView}>
              <TouchableOpacity
                style={styles.DeclineButton}
                onPress={async () => {
                  await this.DeclineRequest(), this.sendDeclineNotification();
                }}
              >
                <Text
                  style={{
                    color: "#adadad",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Decline
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.AcceptButton}
                onPress={async () => {
                  await this.StartDriving(), this.sendPushNotification();
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Accept
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        ) : null}

        {/* (
              <Card style={styles.MainAcceptView}>
                <View style={styles.RiderDetails}>
                  <Text style={{ color: "blue", fontWeight: "bold" }}>
                    There are no requests for you
                  </Text>
                </View>
              </Card>
            ) */}
      </View>
      // </Content>
      // </Container>
    );
  }
  pickUpLocation = async () => {
    //this.props.navigation.navigate('pickUpLocation');
    //alert(this.state.region.latitude);
  };

  sendPushNotification = async () => {
    console.log("userToken" + this.state.userToken);
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: this.state.userToken,
        sound: "default",
        title: "Ride confirmed",
        body: "The driver has confirmed your request",
      }),
    });
  };
  sendDeclineNotification = async () => {
    console.log("userToken" + this.state.userToken);
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: this.state.userToken,
        sound: "default",
        title: "Ride declined",
        body: "The driver has declined your request",
      }),
    });
  };

  StartDriving = async () => {
    //alert("Are you ready to drive?");

    this.setState({ isStartTripButtonVisible: false });
    this.setState({ isStopTripButtonVisible: true });
    // AsyncStorage.getItem("driverId")
    //   .then((driverID) =>
    //     //riderId=result,s

    await firebase
      .database()
      .ref("Ride_History/" + DriverHomeContents.RiderID + "/") //
      .push({
        riderID: DriverHomeContents.RiderID, //added
        driverID: driverId,
      })
      .then(
        () => {},
        (error) => {
          this.toast.show(error.message, 500);
        }
      );
    // )
    // .catch((e) => console.log("err", e));

    //store driver information
    // AsyncStorage.getItem("driverId")
    //   .then(
    //     (
    //       result // driverID***
    //     ) =>
    //       //riderId=result,

    await firebase
      .database()
      .ref("Ride_History/" + driverId + "/") // driverID***
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
      );
    // )
    // .catch((e) => console.log("err", e));
    await this.AcceptRequest();
  };
  AcceptRequest = async () => {
    //store driver information
    driverId = firebase.auth().currentUser.uid;

    //riderId=result,

    await firebase
      .database()
      .ref("Ride_Confirm/" + driverId + "/")
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
          console.log(this.state.isModalVisible);
          this.setState({ hasTripStarted: true });
        },
        (error) => {
          //Toast.show(error.message,Toast.SHORT);
          console.error("error:" + error);
        }
      );
    // )
    // .catch((e) => console.log("err", e));

    // AsyncStorage.getItem("driverId")
    //   .then(
    //     (result) =>
    await firebase
      .database()
      .ref("RiderIds/" + DriverHomeContents.RiderID + "/Details/token")
      .once(
        "value",
        function (snapshot) {
          var userToken = snapshot.child("data").val();
          this.setState({ userToken: userToken });
          console.log("first user token state" + userToken);
        }.bind(this)
      );
    await firebase
      .database()
      .ref("Ride_Request/" + driverId)
      .remove();
    firebase
      .database()
      .ref("Ride_Request/" + DriverHomeContents.RiderID)
      .remove();
    this.setState({ isModalVisible: false });
    console.log(this.state.isModalVisible);
    // )
    // .catch((e) => console.log("err", e));

    // AsyncStorage.getItem("driverId")
    //   .then((driverID) =>
    //     //riderId=result,

    await firebase
      .database()
      .ref("Ride_Confirm/" + DriverHomeContents.RiderID)
      .set({
        driverID: driverId,
        confirmed: true,
      })
      .then(
        () => {},
        (error) => {
          this.toast.show(error.message, 500);
        }
      );
    // await firebase
    //   .database()
    //   .ref("RiderIds/" + DriverHomeContents.RiderID + "/Details/token") //use id to check details
    //   .once(
    //     "value",
    //     function (snapshot) {
    //       var userToken = snapshot.child("data").val();
    //       // this.setState({ userToken: userToken });
    //       console.log("first user token state" + userToken);
    //       //console.log(snapshot.val());
    //     }.bind(this)
    //   );
  };

  getRiderRequestDetails = async () => {
    driverId = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("Ride_Request/")
      .on("value", (snapshot) => {
        if (snapshot.hasChild(driverId)) {
          DriverHomeContents.RiderID = snapshot
            .child(driverId + "/riderID")
            .val();
          DriverHomeContents.RiderPickUpName = snapshot
            .child(driverId + "/pickUpName")
            .val();
          DriverHomeContents.RiderDropUpName = snapshot
            .child(driverId + "/dropOffName")
            .val();
          DriverHomeContents.RiderPickUpLatitude = snapshot
            .child(driverId + "/pickupLatitude")
            .val();
          DriverHomeContents.RiderPickUpLongitude = snapshot
            .child(driverId + "/pickupLongitude")
            .val();
          DriverHomeContents.RiderDropUpLatitude = snapshot
            .child(driverId + "/dropOffLatitude")
            .val();
          DriverHomeContents.RiderDropUpLongitude = snapshot
            .child(driverId + "/dropOffLongitude")
            .val();
          DriverHomeContents.RideDate = firebase.database.ServerValue.TIMESTAMP;

          if (!DriverHomeContents.RiderID == "") {
            this.setState({ isModalVisible: true });
            // this.setState({ requests: true });
            // this.setState({ destOrigSet: true });
            // this.setState({ price: "set" });
          }
        } else {
          this.setState({ isModalVisible: false });
          console.log(this.state.isModalVisible);
          //  this.setState({ price: "" });
          //  this.toast.show("No ride requests", 500); //added before I fucked up xD
        }
      });
    var latLongObj = {
      latitude: parseFloat(DriverHomeContents.RiderPickUpLatitude),
      longitude: parseFloat(DriverHomeContents.RiderPickUpLongitude),
    };
    // this.setState((prevState) => ({
    //   destinationData: [...prevState.destinationData, latLongObj],
    // }));
    this.setState({
      destinationData: [latLongObj],
    });
    var latLongObj1 = {
      latitude: parseFloat(DriverHomeContents.RiderDropUpLatitude),
      longitude: parseFloat(DriverHomeContents.RiderDropUpLongitude),
    };

    this.setState({
      originData: [latLongObj1],
    });
    firebase
      .database()
      .ref("RiderIds/" + DriverHomeContents.RiderID + "/Details")
      .on("value", (snapshot) => {
        DriverHomeContents.Firstname = snapshot.child("firstname").val();
        DriverHomeContents.Lastname = snapshot.child("lastname").val();
        // if (DriverHomeContents.Firstname) {
        //   this.setState({ name: "set" });
        // }
      });
    firebase
      .database()
      .ref("Payments/" + DriverHomeContents.RiderID + "/PaymentsMode")
      .on("value", (snapshot) => {
        var card = snapshot.child("Card").val();
        var cash = snapshot.child("Cash").val();
        console.log(card);
        if (card) {
          this.setState({ userPayment: "Card" });
          this.setState({ price: true });
          this.setState({ name: "set" });
        } else {
          this.setState({ userPayment: "Cash" });
          this.setState({ price: true });
          this.setState({ name: "set" });
        }
      });
    DriverHomeContents.RD_Distance = await this.GetDriverRiderDistance(
      DriverHomeContents.RiderPickUpLatitude,
      DriverHomeContents.RiderPickUpLongitude,
      DriverHomeContents.RiderDropUpLatitude,
      DriverHomeContents.RiderDropUpLongitude
    );
    this.setState({ setDistance: DriverHomeContents.RD_Distance.toFixed(2) });

    DriverHomeContents.RD_Price = this.calculatePrice();
    this.setState({ setPrice: DriverHomeContents.RD_Price.toFixed(2) }); //added before I fucked up xD

    // );
  };
  getDetails = async () => {};
  // getRiderAcceptDetails = async () => {
  //   driverId = firebase.auth().currentUser.uid;
  //   // AsyncStorage.setItem("driverId", driverId); //**driverId */

  //   await firebase
  //     .database()
  //     .ref("Ride_Confirm/" + driverId)
  //     .once("value")
  //     .then(function (snapshot) {
  //       if (snapshot.exists()) {
  //         DriverHomeContents.D_RiderID = snapshot.child("riderID").val();
  //         DriverHomeContents.D_RiderPickUpName = snapshot
  //           .child("riderpickname")
  //           .val();
  //         DriverHomeContents.D_RiderDropUpName = snapshot
  //           .child("riderdropname")
  //           .val();
  //       }
  //     })
  //     .then(
  //       () => {
  //         console.log(
  //           "this is RiderID's ID " + " " + DriverHomeContents.D_RiderID
  //         );
  //         console.log("this is Drivers' ID " + " " + driverId);
  //         if (!DriverHomeContents.D_RiderID == "") {
  //           this.setState({ isModal2Visible: true });
  //         }

  //         firebase
  //           .database()
  //           .ref("RiderIds/" + DriverHomeContents.D_RiderID + "/Details")
  //           .once("value")
  //           .then(function (snapshot) {
  //             DriverHomeContents.D_Firstname = snapshot
  //               .child("firstname")
  //               .val();
  //             DriverHomeContents.D_Lastname = snapshot.child("lastname").val();
  //           })
  //           .then(
  //             () => {
  //               console.log(
  //                 "(Previous) Rider's first name: " +
  //                   DriverHomeContents.D_Firstname
  //               );
  //             },
  //             (error) => {
  //               console.error("error" + error);
  //               // console.log("the user id:"+userId);
  //             }
  //           );
  //       },
  //       (error) => {
  //         console.error("error" + error);
  //         console.log("the user id:" + userId);
  //       }
  //     );
  // };

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

  DeclineRequest = async () => {
    //alert("decline");
    await firebase
      .database()
      .ref("RiderIds/" + DriverHomeContents.RiderID + "/Details/token")
      .once(
        "value",
        function (snapshot) {
          var userToken = snapshot.child("data").val();
          this.setState({ userToken: userToken });
          console.log("first user token state" + userToken);
        }.bind(this)
      );
    try {
      await firebase
        .database()
        .ref("Ride_Request/" + driverId)
        .remove();
      await firebase
        .database()
        .ref("Ride_Request/" + DriverHomeContents.RiderID)
        .remove();
      this.setState({ isModalVisible: false });
      console.log(this.state.isModalVisible);
      this.setState({ userPayment: "" });
      this.setState({ originData: [] });
      this.setState({
        latitudine: 0,
        longitude: 0,
        latitudineDest: 0,
        longitudineDest: 0,
      });

      DriverHomeContents.Firstname = "";
      DriverHomeContents.Lastname = "";
      DriverHomeContents.RiderID = "";
      //originData, //destOrigSet
    } catch (e) {
      console.log("err", e);
    }
  };

  toRad = (Value) => {
    return (Value * Math.PI) / 180;
  };
  GetDriverRiderDistance = async (lat1, lon1, lat2, lon2) => {
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
  calculatePrice = () => {
    let priceKm = 3.15;
    let finalPrice = DriverHomeContents.RD_Distance.toFixed(2) * priceKm;
    console.log("finalPrice" + finalPrice);
    return finalPrice;
  };

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
    headerTitle: () => {},
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
    height: Dimensions.get("window").height,
    marginTop: 0,
  },
  MainAcceptView: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 380,
    height: 310,
    position: "absolute",
    top: 350,
    left: 15,
    borderRadius: 10,
    //marginLeft: 3,
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
    borderRadius: 5,
    marginLeft: 5,
  },

  AcceptButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#453d6c",
    // backgroundColor: "#a698d9",
    // backgroundColor: "#272e4a",
    height: 50,
    width: 155,
    borderRadius: 30,
    marginLeft: 3,
  },
  AcceptDeclineView: {
    flexDirection: "row",
    position: "absolute",
    left: 40,
    top: 240,
  },
  AcceptDeclineView2: {
    flexDirection: "row",
    position: "absolute",
    left: 10,
    top: 110,
    //  borderBottomColor: "black",
    //  borderBottomWidth: 1,
  },
  RiderDetails: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ededed",
    width: "100%",
    borderRadius: 11,
  },
  riderLocationTitle: {
    position: "absolute",
    top: 75,
    padding: 7,
    borderBottomColor: "#d6d6d6",
    borderBottomWidth: 1,
    width: "100%",
  },
  riderLocationValue: {
    position: "absolute",
    top: 150,
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
    marginLeft: 80,
  },
  distancePriceView2: {
    position: "absolute",
    top: 30,
    marginLeft: 310,
  },
  pickupIcon: {
    flexDirection: "row",
  },
  dropOffView: {
    paddingLeft: 15,
    paddingBottom: 15,
    // padding: 15,
    // borderBottomWidth: 1,
    //  borderBottomColor: "#adadad",
    width: "100%",
  },
  dropOffIcon: {
    flexDirection: "row",
  },
  dash: {
    width: 1,
    height: 35,
    left: 10,
    flexDirection: "column",
  },
});
AppRegistry.registerComponent("DriverHomeContents", () => DriverHomeContents);
