import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  AppRegistry,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  LogBox,
  Platform,
  Button,
} from "react-native";
import { Content, Container, Card } from "native-base";
import MapView, {
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Animated,
  Callout,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
//import Toast from "react-native-simple-toast";
import lightMapStyle from "../../Themes/lightMapStyle.json";
import darkMapStyle from "../../Themes/darkMapStyle.json";
import marker from "../../assets/images/user/marker3.png";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import API from "../../constants/API";
import fromIcon from "../../assets/images/user/from.png";
import toIcon from "../../assets/images/to.png";
import MapButton from "../../components/userprofile/MapButton";
import { ThemeContext } from "../../Themes/dark";
import { Icon } from "react-native-elements";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class UserHomeContents extends React.Component {
  map = null;
  static DriverID;
  static Firstname = "";
  static Lastname = "";
  static longitude = "";
  static latitude = "";

  static driverId = "";
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
      addressName: "",
      isModalVisible: false,
      isConfirmButton: false,
      isMounted: false,
      coordonates: [],
      lightTheme: "",
      orderStatus: "",
      driverIdToDelete: "",
      distance: null,
      price: null,
      driverName: "",
      carBrand: "",
      carPlate: "",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  static contextType = ThemeContext;

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    //only ask if permission have not already been determined, because
    //iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    try {
      //Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      firebase
        .database()
        .ref("RiderIds/" + this.currentUser + "/Details/token")
        .set(token);
    } catch (error) {
      console.log(error);
    }
  };
  async componentDidMount() {
    this.setState({ isMounted: true });
    this.currentUser = firebase.auth().currentUser.uid;
    await this.registerForPushNotificationsAsync();
    //this.isMounted = true;
    LogBox.ignoreAllLogs();

    navigator.geolocation.getCurrentPosition(
      //get current position
      (position) => {
        getMyData = async () => {
          return fetch(
            "https://maps.googleapis.com/maps/api/geocode/json?key= " +
              API.apiKey +
              "&address=" +
              position.coords.latitude +
              "," +
              position.coords.longitude
          )
            .then((response) => response.json())
            .then((responseJson) => {
              responseJson = responseJson["results"][0].formatted_address;
              return responseJson;
            })
            .catch((err) => console.error(err));
        };

        // const getData = async () => { const response = await fetch(someUrl, {}, {}); return response;}
        getMyData().then((myCoordonates) => {
          this.setState({
            addressName: myCoordonates,
          });
        });

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
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
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

    // await this.getDriverRequestDetails();

    LogBox.ignoreLogs(["Encountered an error loading page"]);
    LogBox.ignoreAllLogs();
    console.log("CDM");
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    setTimeout(
      function () {
        this.setState({ orderStatus: "accepted" });
      }.bind(this),
      30000
    );
    // if (this.state.orderStatus !== prevState.orderStatus) {
    //   await this.orderNotAccepted();
    // }
    //   }
    // this._getRiderAcceptDetails();
    // Typical usage (don't forget to compare props):
    if (this.state.region !== prevProps.region) {
      this.storeUserLocation();
      //   // AppState.addEventListener("change", this.storeUserLocation());
    }
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
    //  this.isMounted = false;
    //  if(!this.state.isMounted){
    navigator.geolocation.clearWatch(this.watchID);
    //Toast.toastInstance = null;
    //  }
  }

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
    const { dark, theme, map, toggle } = this.context;
    // console.log(theme);
    return (
      // <Container>
      // <Content>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          showsBuildings={true}
          ref={(map) => {
            this.map = map;
          }}
          showsMyLocationButton={true}
          // onMapReady={this.onMapReady}
          showsPointsOfInterest={true}
          zoomEnabled
          zoomControlEnabled={true}
          //showsTraffic={true}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          // onRegionChange={(region) => this.setState({ region })}
          // onRegionChangeComplete={(region) => this.setState({ region })}
          customMapStyle={
            theme.backgroundColor == "#151618" ? darkMapStyle : lightMapStyle
          }
        >
          {/* <MapView.Marker
                //  image={marker}
                color="black"
                coordinate={this.state.region}
                tracksViewChanges={true}
              >
                <Callout tooltip>
                  <View>
                    <View style={styles.bubble}>
                      <Text style={styles.name}>{this.state.addressName}</Text>
                      {/* <Text>{UserHomeContents.longitude}</Text> */}
          {/* </View>
                    <View style={styles.arrowBorder}></View>
                    <View style={styles.arrow}></View>
                  </View>
                </Callout>
              </MapView.Marker>  */}
          {this.state.coordonates ? (
            <MapViewDirections
              origin={this.state.coordonates[0]} // optional
              destination={this.state.coordonates[1]} // optional
              // destination={[
              //   { latitude: 48.8478, longitude: 2.3202 }, // optional
              // ]}
              apikey={API.apiKey} // insert your API Key here
              strokeWidth={4}
              strokeColor="#9484d4"
            />
          ) : null}
          {/* {[
                { latitude: 48.8555, longitude: 2.3181 }, // optional
                ...this.state.region,
                { latitude: 48.8478, longitude: 2.3202 }, // optional
              ]} */}
          {/* {this.state.coordonates ? (
                <View>
                  <MapView.Marker
                    image={fromIcon}
                    coordinate={this.state.coordonates[0]}
                  />
                  <MapView.Marker
                    image={toIcon}
                    coordinate={this.state.coordonates[1]}
                  />
                </View>
              ) : null} */}
        </MapView>
        <View style={styles.historyButton}>
          <Icon
            raised
            name="time-outline"
            type="ionicon"
            color="#7c6ccc"
            onPress={() => this.props.navigation.navigate("History")}
          />
        </View>
        {/* {this.state.orderStatus == "notAccepted" &&
            this.state.coordonates[0] ? (
              <View style={styles.declineCard}>
                <Text>
                  The driver has not yet accepted your request. Do you want to
                  cancel?
                </Text>
                <Button title="Cancel" onPress={this.cancelTrip.bind(this)} />
              </View>
            ) : ( */}
        {this.state.price ? (
          <Card style={styles.MainAcceptView}>
            <View style={styles.RiderDetails}>
              <Image
                source={require("../../assets/images/driver/driver.jpg")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 200,
                  margin: 5,
                }}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  marginLeft: 15,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {this.state.driverName}
              </Text>
              <View style={styles.carDetailsView}>
                <Text
                  style={{
                    //  top: 5,
                    fontSize: 18,
                    // marginLeft: 10,
                    color: "#838BC2",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.carBrand} {this.state.carPlate}
                </Text>
              </View>
              <View style={styles.priceView}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    //  marginLeft: 7,
                    //  margin: 3,
                    //  top: 5,
                    // left: 90,
                  }}
                >
                  {this.state.price.toFixed(2)} RON
                </Text>
              </View>
              <View style={styles.distancePriceView2}>
                <Text style={{ fontSize: 17 }}>
                  {this.state.distance.toFixed(2)}
                  KM
                </Text>
              </View>
            </View>
            {this.state.orderStatus == "notAccepted" ? (
              <View style={styles.declineView}>
                <Text>
                  You have 30 seconds to cancel your trip. Do you want to
                  cancel?
                </Text>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={async () => await this.cancelTrip()}
                >
                  <Text
                    style={{
                      color: "#adadad",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            ) : // <View>
            //   <Text>
            //     You have 15 seconds to cancel your trip. Do you want to
            //     cancel?
            //   </Text>
            //   <Button
            //     title="Cancel"
            //     onPress={this.cancelTrip.bind(this)}
            //   />
            // </View>
            null}
            {/* <Text>
                  Price: {this.state.price.toFixed(2)} RON Distance:
                  {this.state.distance.toFixed(2)} KM Driver's name:
                  {this.state.driverName}
                </Text> */}
          </Card>
        ) : (
          <View style={styles.searchBoxView}>
            <Text style={styles.fromText}>From: {this.state.addressName}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.purpleDot}></View>
              <TextInput
                style={styles.pickupText}
                placeholder="Where to?"
                underlineColorAndroid="#ffffff"
                selectionColor="#42A5F5"
                placeholderTextColor="#000000"
                onFocus={() =>
                  this.props.navigation.navigate("Address", {
                    returnData: this.returnData.bind(this),
                  })
                }
              />
            </View>
          </View>
        )}
        {/* )} */}
        {/* {this.state.orderStatus == "notAccepted" &&
            this.state.coordonates ? (
              <View>
                <Text> You can still cancel</Text>
              </View>
            ) : null} */}
        {/* <Footer style={styles.footerContainer}> */}
        {/* {this.state.isConfirmButton ? (
                <TouchableOpacity
                  style={styles.DoneButton}
                  onPress={() => this.props.navigation.navigate("Address")}
                >
                  <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                    CONFIRM
                  </Text>
                </TouchableOpacity>
              ) : null} */}
        {/* {this.state.isModalVisible ? ( //!this.state.isModalVisible
                  <View
                    style={{
                      width: 100,
                      height: 90,
                      backgroundColor: "#ffffff",
                      position: "absolute",
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/user/user.jpg")}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        marginTop: 10,
                        marginLeft: 7,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        marginTop: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {UserHomeContents.Firstname +
                        " " +
                        UserHomeContents.Lastname}
                    </Text>
                    <Text style={{ fontSize: 18, color: "#42A5F5" }}>
                      Accepted
                    </Text>
                  </View>
                ) : null} */}
        {/* </Footer> */}
      </View>
      // </Content>
      //</Container>
    );
  }
  cancelTrip = async () => {
    riderId = firebase.auth().currentUser.uid;
    await firebase
      .database()
      .ref("Ride_Request/" + riderId)
      .once("value")
      .then((snapshot) => {
        //if (snapshot.exists()) {
        UserHomeContents.driverId = snapshot.child("driverID").val();
        console.log("cancelTrip");
        // }
      })
      .catch((e) => console.log("err", e));

    firebase
      .database()
      .ref("Ride_Request/" + riderId)
      .remove(),
      firebase
        .database()
        .ref("Ride_Request/" + UserHomeContents.driverId)
        .remove()
        .then(() => {
          this.setState({ orderStatus: "accepted" });
          this.setState({ price: null });
          this.setState({ coordonates: null });
        });
  };
  // async orderNotAccepted() {
  //   riderId = firebase.auth().currentUser.uid;
  //   await firebase
  //     .database()
  //     .ref("Ride_Request/" + riderId)
  //     .once("value")
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         orderRequest = snapshot.child("riderID").val();
  //         console.log("orderNotAccepted");
  //         this.setState({ orderStatus: "notAccepted" });
  //       } else {
  //         this.setState({ orderStatus: "accepted" });
  //       }
  //     })
  //     .catch((e) => console.log("err", e));
  // }
  returnData(
    coord,
    price,
    distance,
    driverName,
    orderStatus,
    carBrand,
    carPlate
  ) {
    this.setState(
      {
        coordonates: coord,
        price: price,
        distance: distance,
        driverName: driverName,
        orderStatus: orderStatus,
        carBrand: carBrand,
        carPlate: carPlate,
      },
      () => {
        // console.log(this.state.coordonates);
      }
    );
  }
  pickUpLocation = async () => {
    //this.props.navigation.navigate('pickUpLocation');
    //alert(this.state.region.latitude);
  };
  getDriverRequestDetails = async () => {
    riderId = firebase.auth().currentUser.uid;

    // AsyncStorage.getItem("riderId")
    //   .then(
    //     (result) =>
    await firebase
      .database()
      .ref("Ride_Request/" + riderId)
      .once("value")
      .then(function (snapshot) {
        if (snapshot.exists()) {
          UserHomeContents.DriverID = snapshot.child("driverID").val();
        }
      })
      .then(
        () => {
          if (!UserHomeContents.DriverID == "") {
            this.setState({ isModalVisible: true });
          }

          firebase
            .database()
            .ref("Drivers/" + UserHomeContents.DriverID + "/Details")
            .once("value")
            .then(function (snapshot) {
              UserHomeContents.Firstname = snapshot.child("firstname").val();
              UserHomeContents.Lastname = snapshot.child("lastname").val();
            })
            .then(
              () => {
                console.log("firstname" + UserHomeContents.Firstname);
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
      )
      //  )
      .catch((e) => console.log("err", e));

    await firebase
      .database()
      .ref("Ride_confirm/" + riderId)
      .once("value")
      .then(function (snapshot) {
        if (snapshot.exists()) {
          this.setState({ isModalVisible: true });
        }
      })

      .catch((e) => console.log("err", e));
  };

  storeUserLocation() {
    //var userLatitude=this.state.region.latitude;
    //var userLongitude=this.state.region.longitude;
    //if(userLatitude>0 && userLongitude>0){

    UserHomeContents.RiderID = firebase.auth().currentUser.uid;
    if (UserHomeContents.RiderID) {
      firebase
        .database()
        .ref(`RiderIds/${UserHomeContents.RiderID}/RiderCurrentLocation/`)
        .set({
          latitude: this.state.region.latitude,
          longitude: this.state.region.longitude,
        })
        .then(
          () => {
            UserHomeContents.latitude = this.state.region.latitude;
            UserHomeContents.longitude = this.state.region.longitude;
            console.log(
              "latitude:" +
                this.state.region.latitude +
                "longitude:" +
                this.state.region.longitude
            );
          },
          (error) => {
            //Toast.show(error.message,Toast.SHORT);
            console.log("error with location:" + error);
          }
        )
        .catch((e) => {
          console.log("err", e);
        });
    }

    // }
  }

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
  calculatePrice = async () => {
    let priceKm = 3.15;
    let finalPrice = this.state.distance.toFixed(2) * priceKm;
    console.log("finalPrice" + finalPrice);
    return finalPrice;
  };
}

UserHomeContents.navigationOptions = (navData) => {
  return {
    // headerTitle: false,
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
        {/* <Icon
          // raised
          name="menu-outline"
          type="ionicon"
          color={Platform.OS == "android" ? "white" : "black"}
          title="Menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        /> */}
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  containerView: {
    height: Dimensions.get("window").height,
    // flex: 1,
    // backgroundColor: Colors.purple,
  },
  footerContainer: {
    //  backgroundColor: "white",
    //  height: 185,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    // marginTop: 0,
  },
  searchBoxView: {
    paddingLeft: 20,
    justifyContent: "center",
    backgroundColor: "#eaecf9",
    width: "80%",
    minHeight: 55,
    position: "absolute",
    top: 550,
    alignSelf: "center",
    borderRadius: 45,
  },
  searchIcon: {
    color: "#42A5F5",
    marginTop: 12,
    marginLeft: 10,
  },
  DropUpLocation: {
    alignSelf: "stretch",
    width: 280,
    paddingBottom: 2,
    marginTop: -3,
    marginLeft: 8,
    backgroundColor: "#fff",
    fontSize: 17,
  },
  pickupImage: {
    marginLeft: 8,
    marginTop: 10,
    width: 25,
    height: 25,
  },
  DoneButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#42A5F1",
    height: 50,
    width: 350,
    marginTop: 5,
    marginLeft: 3,
  },
  bubble: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  name: {
    fontSize: 15,
    marginBottom: 5,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "white",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  fromText: {
    fontSize: 12,
  },
  pickupText: {
    fontSize: 22,
  },
  purpleDot: {
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#7c6ccc",
    marginRight: 10,
  },
  historyButton: {
    bottom: 185,
    left: 35,
  },
  MainAcceptView: {
    flex: 1,
    //flexDirection: "row",
    backgroundColor: "white",
    width: 380,
    height: 200,
    position: "absolute",
    top: 440,
    left: 20,
    borderRadius: 10,
    marginLeft: 3,
  },
  RiderDetails: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "#ededed",
    width: "100%",
    borderRadius: 11,
  },
  declineCard: {
    bottom: 250,
    justifyContent: "center",
    width: "80%",
    paddingLeft: 20,
    backgroundColor: "white",
    minHeight: 60,
    position: "absolute",
    top: 550,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 45,
    elevation: 5,
  },
  carDetailsView: {
    // paddingTop: 10,
    position: "absolute",
    marginLeft: 83,
    top: 40,
  },
  priceView: {
    marginLeft: 300,
    //  margin: 3,
    marginTop: 10,
    // left: 90,
    position: "absolute",
  },
  distancePriceView2: {
    flex: 1,
    // justifyContent: "flex-end",
    position: "absolute",
    top: 40,
    marginLeft: 310,
  },
  declineView: {
    // flexDirection: "row",
    // position: "absolute",
    //left: 40,
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  declineButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ededed",
    height: 50,
    width: 155,
    borderRadius: 5,
    marginLeft: 5,
  },
});
AppRegistry.registerComponent("UserHomeContents", () => UserHomeContents);
