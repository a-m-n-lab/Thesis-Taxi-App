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
  AppState,
} from "react-native";
import { Content, Container, Footer, Card } from "native-base";
//import { YellowBox } from "react-native";

import Colors from "../../constants/Colors";
import Input from "../../components/Input";
import MapView, { PROVIDER_GOOGLE, AnimatedRegion } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
//import Toast from "react-native-simple-toast";
import GooglePlacesInput from "../../components/GooglePlacesInput";
import Toast, { DURATION } from "react-native-easy-toast";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class UserHomeContents extends React.Component {
  static navigationOptions = {};
  static DriverID;
  static Firstname = "";
  static Lastname = "";

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
      isConfirmButton: false,
      isMounted: false,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentDidMount() {
    //this.isMounted = true;
    LogBox.ignoreLogs(["Require cycle:"]);

    navigator.geolocation.getCurrentPosition(
      //get current position
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

    this._getDriverRequestDetails();

    LogBox.ignoreLogs(["Encountered an error loading page"]);
    LogBox.ignoreAllLogs();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this._getRiderAcceptDetails();
    // Typical usage (don't forget to compare props):
    if (this.state.region !== prevProps.region) {
      this.storeUserLocation();
      // AppState.addEventListener("change", this.storeUserLocation());
    }
  }

  //----------------------------------------------
  //----------------------------------------------

  componentWillUnmount() {
    //  this.isMounted = false;
    //  if(!this.state.isMounted){
    navigator.geolocation.clearWatch(this.watchID);
    //Toast.toastInstance = null;
    //  }
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ justifyContent: "center" }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              showsUserLocation={true}
              showsBuildings={true}
              region={this.state.region}
              onRegionChange={(region) => this.setState({ region })}
              onRegionChangeComplete={(region) => this.setState({ region })}
            >
              <MapView.Marker coordinate={this.state.region} pinColor="black">
                {/* <Image
                  source={require("../../assets/images/user/pin.png")}
                  style={{ width: 100, height: 100, borderRadius: 100 }}
                /> */}
              </MapView.Marker>

              <Image
                source={require("../../assets/images/driver/car.png")}
                style={{
                  width: 30,
                  height: 60,
                  position: "absolute",
                  top: 150,
                  left: 100,
                }}
              />
              <Text
                style={{
                  width: 30,
                  height: 60,
                  position: "absolute",
                  top: 150,
                  left: 100,
                  elevation: 10,
                }}
              ></Text>

              <Image
                source={require("../../assets/images/driver/car.png")}
                style={{
                  width: 30,
                  height: 60,
                  position: "absolute",
                  top: 150,
                  left: 100,
                }}
              />
              <Text
                style={{
                  width: 30,
                  height: 60,
                  position: "absolute",
                  top: 150,
                  left: 250,
                  elevation: 10,
                }}
              ></Text>
              {/* <Image
                source={require("../Images/driver_car.png")}
                style={{
                  width: 30,
                  height: 60,
                  position: "absolute",
                  top: 250,
                  left: 170,
                }}
              /> */}
              <Text
                style={{
                  width: 30,
                  height: 60,
                  position: "absolute",
                  top: 150,
                  left: 250,
                  elevation: 10,
                }}
              >
                {/* John*/}
              </Text>
            </MapView>
          </View>
          <Card style={styles.searchBoxView}>
            {/* <Image
              style={styles.pickupImage}
              source={require("../Images/pickup.png")}
            /> */}
            <TextInput
              style={styles.pickup}
              placeholder="Where to?"
              underlineColorAndroid="#ffffff"
              selectionColor="#42A5F5"
              placeholderTextColor="#000000"
              onFocus={() => this.props.navigation.navigate("Address")}
            />
          </Card>
        </Content>
        <Footer style={styles.footerContainer}>
          {this.state.isConfirmButton ? (
            <TouchableOpacity
              style={styles.DoneButton}
              onPress={() => this.props.navigation.navigate("Address")}
            >
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                CONFIRM
              </Text>
            </TouchableOpacity>
          ) : null}
          {this.state.isModalVisible ? ( //!this.state.isModalVisible
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
                source={require("../../Images/avatar.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginTop: 10,
                  marginLeft: 7,
                }}
              />
              <Text style={{ fontSize: 18, marginTop: 18, fontWeight: "bold" }}>
                {UserHomeContents.Firstname + " " + UserHomeContents.Lastname}
              </Text>
              <Text style={{ fontSize: 18, color: "#42A5F5" }}>Accepted</Text>
            </View>
          ) : null}
        </Footer>
      </Container>
    );
  }

  _pickUpLocation = async () => {
    //this.props.navigation.navigate('pickUpLocation');
    //alert(this.state.region.latitude);
  };
  _getDriverRequestDetails = async () => {
    AsyncStorage.getItem("riderId")
      .then((result) =>
        firebase
          .database()
          .ref("Ride_Request/" + result)
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
                  UserHomeContents.Firstname = snapshot
                    .child("firstname")
                    .val();
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
      )
      .catch((e) => console.log("err", e));

    AsyncStorage.getItem("riderId");
    firebase
      .database()
      .ref("/Ride_confirm/" + result)
      .once("value")
      .then(function (snapshot) {
        if (snapshot.exists()) {
          this.setState({ isModalVisible: true });
        }
      })
      .then(() => {})
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
            //firebase.database().ref(`Payments/${RiderID}/PaymentsHistory`);
            //Toast.show("payments updated successfully",Toast.SHORT);
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
}

UserHomeContents.navigationOptions = (navData) => {
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
    backgroundColor: Colors.purple,
  },
  footerContainer: {
    backgroundColor: "white",
    height: 185,
  },
  map: {
    height: 490,
    marginTop: 0,
  },
  searchBoxView: {
    flexDirection: "row",
    backgroundColor: "white",
    width: 320,
    minHeight: 50,
    position: "absolute",
    top: 10,
    left: 20,
    borderRadius: 5,
    elevation: 5,
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
});
AppRegistry.registerComponent("UserHomeContents", () => UserHomeContents);
