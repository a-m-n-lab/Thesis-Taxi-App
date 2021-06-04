import React from "react";
import {
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
  Alert,
  View,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { ThemeContext } from "../../Themes/dark";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "react-native-option-picker";
import MainButton from "../../components/MainButton";
import { Dimensions } from "react-native";
const data = [
  { id: "1", title: "Economy", selected: false },
  { id: "2", title: "SUV", selected: false },
  { id: "3", title: "Minivan", selected: false },
];
export default class DriverManageCar extends React.Component {
  //  static navigationOptions = {};
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      brand: "",
      year: "",
      plate: "",
      data: [],
    };
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(ApiKeys.FirebaseConfig);
    // }
  }

  async componentDidMount() {
    await this.renderFunction();
  }
  static contextType = ThemeContext;

  _onPress = async (elem) => {
    var carType = await elem.title;
    console.log("carType" + carType);
    this.setState({ type: carType });
    console.log("car state" + this.state.type);
  };
  addToDatabase = () => {
    var currentUser = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref("Drivers/" + currentUser + "/CarInfo")
      .update({
        type: this.state.type,
        brand: this.state.brand,
        year: this.state.year,
        plate: this.state.plate,
      });
    this.toast.show("Car added", 800);
  };
  renderFunction = async () => {
    var currentUser = firebase.auth().currentUser.uid;
    await firebase
      .database()
      .ref("Drivers/" + currentUser + "/CarInfo")
      .once(
        "value",
        function (snapshot) {
          var type = snapshot.child("type").val();
          var brand = snapshot.child("brand").val();
          var year = snapshot.child("year").val();
          var plate = snapshot.child("plate").val();
          this.setState({
            type,
            brand,
            year,
            plate,
          });
        }.bind(this)
      );

    // this.state.data.forEach((item, index) => {
    //   console.log(this.state.data);
    //   if (this.state.data[index].title == this.state.type) {
    //     this.state.data[index].selected = true;
    //   }
    // });
  };
  componentDidUpdate() {}
  render() {
    console.log("render" + this.state.type);
    const { dark, theme, toggle } = this.context;
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
        }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={100}
        // style={{
        //   flex: 1,
        //   backgroundColor: "white",
        //   height: Dimensions.get("screen").height,
        // }}
      >
        <ScrollView>
          <Toast ref={(toast) => (this.toast = toast)} />
          <View>
            <Text style={styles.paymentTitle}> Add your car </Text>
            <Text style={styles.paymentSubTitle}>
              Please add details about your car
            </Text>
          </View>
          {this.state.type == "Economy" ? (
            <Image
              style={styles.car}
              source={require("../../assets/images/driver/eco2.png")}
            />
          ) : null}
          {this.state.type == "SUV" ? (
            <Image
              style={styles.car}
              source={require("../../assets/images/driver/SUV2.png")}
            />
          ) : null}
          {this.state.type == "Minivan" ? (
            <Image
              style={styles.car}
              source={require("../../assets/images/driver/minivan.png")}
            />
          ) : null}

          <Picker
            selectedValue={this.state.type}
            data={data}
            onPress={this._onPress}
            style={styles.pickerStyle}
            optionStyle={styles.optionStyle}
            selectedOptionStyle={styles.selectedOptionStyle}
            optionTextStyle={styles.optionTextStyle}
            selectedOptionTextStyle={styles.selectedOptionTextStyle}
          />
          <View style={styles.textInputView}>
            <Text style={styles.text}>BRAND</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({ brand: text })}
            >
              {this.state.brand}
            </TextInput>
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.text}>YEAR</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.textInput}
              onChangeText={(text) => this.setState({ year: text })}
            >
              {this.state.year}
            </TextInput>
          </View>

          <View style={styles.textInputView}>
            <Text style={styles.text}>LICENSE PLATE</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="characters"
              maxLength={7}
              onChangeText={(text) => this.setState({ plate: text })}
            >
              {this.state.plate}
            </TextInput>

            <MainButton
              style={{
                backgroundColor: "#131435",
                width: 150,
                /// justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: 18,
                alignSelf: "center",
              }}
              onPress={this.addToDatabase}
            >
              Add
            </MainButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  addPayments = async () => {
    //alert("Mobile Money:"+this.state.MobileMoney+"  Cash"+this.state.Cash);
    Alert.alert(
      "Payments Confirm",
      "Your payments status is going to be updated ",
      [
        //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: this.addPaymentsToRiderDatabase },
      ],
      { cancelable: false }
    );
  };

  //addPayments to the database
  addPaymentsToRiderDatabase = async () => {
    AsyncStorage.getItem("riderId")
      .then((riderID) =>
        firebase
          .database()
          .ref(`Payments/${riderID}/PaymentsMode/`)
          .set({
            Cash: this.state.Cash,
            Card: this.state.Card,
          })
          .then(
            () => {
              //firebase.database().ref(`Payments/${RiderID}/PaymentsHistory`);
              this.toast.show("Payment method has been successfully updated ");
            },
            (error) => {
              this.toast.show(error.message);
            }
          )
      )
      .catch((e) => console.log("err", e));
  };

  retrivePaymentMethod() {
    riderID = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("Payments/" + riderID + "/PaymentsMode")
      .once("value")
      .then(function (snapshot) {
        cashDat = snapshot.child("Cash").val();
        cardDat = snapshot.child("Card").val();
      })
      .then(
        () => {
          this.setState({ Cash: cashDat, Card: cardDat });
          console.log("CASH" + this.state.Cash);
        },
        (error) => {
          // console.error("error"+error);
          // console.log("the user id:"+userId);
        }
      );
  }
}
DriverManageCar.navigationOptions = (navData) => {
  return {
    headerTitle: () => {
      "";
    },
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
  paymentSubTitle: {
    padding: 10,
    color: "gray",
  },
  paymentTitle: {
    fontWeight: "bold",
    padding: 5,
    fontSize: 50,
  },
  cash: {
    flexDirection: "row",
    padding: 20,
    margin: 10,
    shadowColor: "gray",
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.26,
    elevation: 2,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  card: {
    flexDirection: "row",
    padding: 20,
    margin: 10,
    shadowColor: "gray",
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 3,
    shadowOpacity: 0.26,
    elevation: 2,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "gray",
    width: 100,
  },

  //picker style
  optionStyle: {
    margin: 5,
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#E9EFFE",
  },
  selectedOptionStyle: {
    margin: 5,
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#5b5bb0",
  },
  optionTextStyle: {
    color: "#7b79cc",
  },
  selectedOptionTextStyle: {
    color: "#ffffff",
  },
  textInputView: {
    padding: 10,
    backgroundColor: "white",
    fontSize: 20,
  },
  textInput: {
    backgroundColor: "#eaecf9",
    height: 50,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    fontFamily: "Lato3",
    padding: 15,
    fontSize: 17,
    borderRadius: 10,
    // width: Dimensions.get("window").width / 1.5,
  },
  text: { padding: 10, fontSize: 20, fontWeight: "bold" },
  car: { width: 350, height: 150, alignSelf: "center" },
});
