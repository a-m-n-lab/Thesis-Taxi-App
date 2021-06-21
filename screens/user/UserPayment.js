import React from "react";
import {
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
  Alert,
  View,
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { ThemeContext } from "../../Themes/dark";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default class UserPayment extends React.Component {
  //  static navigationOptions = {};
  constructor(props) {
    super(props);
    this.state = {
      Cash: null,
      Card: null,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }
  componentDidMount() {
    this.retrivePaymentMethod();
  }
  static contextType = ThemeContext;
  render() {
    const { dark, theme, toggle } = this.context;
    return (
      <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
        <Toast ref={(toast) => (this.toast = toast)} />
        <View>
          <Text style={[styles.paymentTitle, { color: theme.color }]}>
            Payment{" "}
          </Text>
          <Text style={styles.paymentSubTitle}> PAYMENT METHODS </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.cash,
            {
              borderColor: this.state.Cash ? "#f57a8b" : "black",
              borderWidth: this.state.Cash ? 1 : 0,
              padding: 15,
              top: 35,
              backgroundColor: theme.backgroundCard,
            },
          ]}
          onPress={() => {
            this.setState({
              selectedButton: "button1",
              Cash: !this.state.Cash,
              Card: false,
            }),
              this.addPayments();
          }}
        >
          <Image
            source={require("../../assets/images/user/money.png")}
            style={{ height: 50, width: 50 }}
          />
          <Text
            style={{
              fontSize: 20,
              marginTop: 5,
              marginLeft: 5,
              padding: 14,
              fontWeight: "bold",
              color: theme.color,
            }}
          >
            Cash payment
          </Text>
          {/* {this.state.Cash ? (
            <Image
              source={require("../../assets/images/user/ok.png")}
              style={{
                left: 100,
                justifyContent: "space-even",
                width: 50,
                height: 50,
              }}
            />
          ) : null} */}
          {/* <CheckBox
            onPress={() => this.setState({ Cash: !this.state.Cash })}
            checked={this.state.Cash}
          /> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            {
              borderColor: this.state.Card ? "#fca4b0" : "black",
              borderWidth: this.state.Card ? 2 : 0,
              padding: 15,
              top: 50,
              backgroundColor: theme.backgroundCard,
            },
          ]}
          onPress={() => {
            this.setState({
              selectedButton: "button2",
              Card: !this.state.Card,
              Cash: false,
            }),
              this.addPayments();
          }}
        >
          <Image
            source={require("../../assets/images/user/card.png")}
            style={{ height: 50, width: 50 }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginTop: 5,
              marginLeft: 5,
              padding: 14,
              color: theme.color,
            }}
          >
            Card payment
          </Text>
          {/* {this.state.Card ? (
            <Image
              source={require("../../assets/images/user/ok.png")}
              style={{
                left: 100,
                justifyContent: "space-even",
                width: 25,
                height: 25,
              }}
            />
          ) : null} */}
          {/* <CheckBox
            onPress={() => this.setState({ Card: !this.state.Card })}
            checked={this.state.Card}

            //leftText={leftText}
          /> */}
        </TouchableOpacity>
      </View>
    );
  }

  addPayments = async () => {
    //alert("Mobile Money:"+this.state.MobileMoney+"  Cash"+this.state.Cash);
    Alert.alert(
      "Payment Method",
      "Your payment method is going to be updated ",
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
UserPayment.navigationOptions = (navData) => {
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
});
