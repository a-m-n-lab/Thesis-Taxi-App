import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Content,
  Container,
  Header,
  Left,
  Icon,
  Footer,
  Body,
  Card,
  CardItem,
} from "native-base";
import { CheckBox } from "react-native-elements";
import MainButton from "../../components/MainButton";
import Colors from "../../constants/Colors";
import Toast, { DURATION } from "react-native-easy-toast";
import * as firebase from "firebase";
import ApiKeys from "../../constants/ApiKeys";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";

export default class UserPayment extends React.Component {
  static navigationOptions = {};
  constructor(props) {
    super(props);
    this.state = {
      Cash: false,
      Card: false,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Toast ref={(toast) => (this.toast = toast)} />

        <Content>
          <Card>
            {/* {this.state.paymentData.map((opt) => (
              <CheckBox
                title={opt.title}
                checked={opt.checked}
                key={opt.title}
                onPress={() => {
                  opt.checked = !opt.checked;
                  this.setState({
                    paymentData: [...this.state.paymentData],
                  });
                }}
              />
            ))} */}

            <CardItem style={{ marginTop: 5 }}>
              <Body style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/images/user/cash.png")}
                  style={{ height: 50, width: 50 }}
                />
                <Text
                  style={{
                    color: "gray",
                    fontSize: 20,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                >
                  CASH
                </Text>
                <CheckBox
                  onPress={() => this.setState({ Cash: !this.state.Cash })}
                  checked={this.state.Cash}

                  //leftText={leftText}
                />
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{ marginTop: 5 }}>
              <Body style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/images/user/card.png")}
                  style={{ height: 50, width: 50 }}
                />
                <Text
                  style={{
                    color: "gray",
                    fontSize: 20,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                >
                  CARD
                </Text>
                <CheckBox
                  onPress={() => this.setState({ Card: !this.state.Card })}
                  checked={this.state.Card}

                  //leftText={leftText}
                />
              </Body>
            </CardItem>
          </Card>
          <MainButton style={styles.saveButton} onPress={this._addPayments}>
            SAVE
          </MainButton>
        </Content>
      </Container>
    );
  }

  _addPayments = async () => {
    //alert("Mobile Money:"+this.state.MobileMoney+"  Cash"+this.state.Cash);
    Alert.alert(
      "Payments Confirm",
      "If you accept, your payments status is going to be updated ",
      [
        //{text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: this._addPaymentsToRiderDatabase },
      ],
      { cancelable: false }
    );
  };

  //addPayments to the database
  _addPaymentsToRiderDatabase = async () => {
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
              this.toast.show("payments updated successfully");
            },
            (error) => {
              this.toast.show(error.message);
            }
          )
      )
      .catch((e) => console.log("err", e));
  };
}
UserPayment.navigationOptions = (navData) => {
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
  map: {
    height: 600,
    marginTop: 0,
  },
  saveButton: {
    backgroundColor: Colors.purple,
  },
});
