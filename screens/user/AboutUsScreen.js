import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert, Image } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Subtitle from "../../components/Subtitle";
import * as firebase from "firebase";
export default class AboutUsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [],
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    firebase
      .database()
      .ref("Questions/")
      .on("value", (snapshot) => {
        var questions = [];
        snapshot.forEach((childSnapshot) => {
          var key = childSnapshot.key;
          var q = snapshot.child(key + "/question").val();
          var a = snapshot.child(key + "/answer").val();
          questions.push({
            question: q,
            answer: a,
          });

          this.setState({
            question: questions,
          });

          return false;
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {}
  // const [question, setQuestion] = useState([]);
  // useEffect(() => {
  //   var questions = [];
  //   firebase
  //     .database()
  //     .ref("Questions/")
  //     .on("value", (snapshot) => {
  //       snapshot.forEach(function (child) {
  //         questions.push(child);
  //       });
  //       setQuestion(questions);
  //       console.log(question);
  //     });
  // }, [snapshot]);

  // useEffect(() => {
  //   // THIS WILL RUN WHEN THERE'S A CHANGE IN 'quotes'
  //   if (question.length > 0) {
  //     console.log("2nd useEff");
  //     //setSomeOtherState();   // YOU CAN USE IT TO SET SOME OTHER STATE
  //   }
  // }, [question]);
  render() {
    console.log(this.state.question);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.aboutTitle}>About us</Text>

          <Text style={styles.faqSubtitle}>
            Blink development is one such service which saves your time & cost
            by providing you user-friendly apps in your mobile phones{" "}
          </Text>
          <View>
            <Text style={styles.faqTitle}>FAQ</Text>
            <Text style={styles.faqSubtitle}>Press + to add a question</Text>
            <Collapse style={styles.collapse}>
              <CollapseHeader style={styles.collapseHeader}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.questionText}>
                    How easy is it to book taxi?
                  </Text>
                  <Icon
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "right",
                    }}
                    name="keyboard-arrow-down"
                    type="MaterialIcons"
                  />
                </View>
              </CollapseHeader>

              <CollapseBody>
                <Text style={styles.bodyText}>
                  Booking a taxi with Blink is very easy. All you have to do is
                  have the app installed locally on your mobile device.
                </Text>
              </CollapseBody>
            </Collapse>
            <Collapse style={styles.collapse}>
              <CollapseHeader style={styles.collapseHeader}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.questionText}>
                    How much does it cost?
                  </Text>
                  <Icon
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "right",
                    }}
                    name="keyboard-arrow-down"
                    type="MaterialIcons"
                  />
                </View>
              </CollapseHeader>

              <CollapseBody>
                <Text style={styles.bodyText}>
                  Having our app installed is absolutely free.
                </Text>
              </CollapseBody>
            </Collapse>
            <Collapse style={styles.collapse}>
              <CollapseHeader style={styles.collapseHeader}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.questionText}>
                    What if I can not find the driver?
                  </Text>
                  <Icon
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "right",
                    }}
                    name="keyboard-arrow-down"
                    type="MaterialIcons"
                  />
                </View>
              </CollapseHeader>

              <CollapseBody>
                <Text style={styles.bodyText}>
                  If our app is under maintenance and you want to contact our
                  service you can still call our number and we will redirect
                  your order to one of our drivers.
                </Text>
              </CollapseBody>
            </Collapse>
            {this.state.question.length > 0
              ? this.state.question.map((u, i) => {
                  return (
                    <Collapse key={i} style={styles.collapse}>
                      <CollapseHeader style={styles.collapseHeader}>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.questionText}>{u.question}</Text>
                          <Icon
                            style={{
                              alignItems: "center",
                              // left: 150,
                              justifyContent: "center",
                              textAlign: "right",
                            }}
                            name="keyboard-arrow-down"
                            type="MaterialIcons"
                          />
                        </View>
                      </CollapseHeader>
                      <CollapseBody>
                        {u.answer ? (
                          <Text style={styles.bodyText}>{u.answer}</Text>
                        ) : (
                          <Text style={[styles.bodyText, { color: "gray" }]}>
                            **Our employees are working on finding the answer to
                            this question**
                          </Text>
                        )}
                      </CollapseBody>
                    </Collapse>
                  );
                })
              : null}
          </View>
          <View style={styles.review}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                margin: 20,
              }}
            >
              Customers review
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.card}>
                <Icon
                  raised
                  name="quote-left"
                  type="font-awesome"
                  color="#ac8bd6"
                />
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                </View>
                <Text
                  style={{
                    padding: 20,
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Blink is an awesome app. I've been using it for a long time
                  now and it works perfectly.
                </Text>

                <View style={{ flexDirection: "row", padding: 10 }}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 200,
                      marginLeft: 10,
                    }}
                    source={require("../../assets/images/user/un.jpg")}
                  />
                  <View>
                    <Text style={{ padding: 10, fontSize: 16, color: "white" }}>
                      Ana
                    </Text>
                    <Text style={{ padding: 10, fontSize: 16, color: "white" }}>
                      Blink customer
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.card}>
                <Icon
                  raised
                  name="quote-left"
                  type="font-awesome"
                  color="#ac8bd6"
                />
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                </View>
                <Text
                  style={{
                    padding: 20,
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  This app deserves 5 stars.
                </Text>
                <View style={{ flexDirection: "row", padding: 10 }}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 200,
                      marginLeft: 10,
                    }}
                    source={require("../../assets/images/user/nick.jpg")}
                  />
                  <View>
                    <Text style={{ padding: 10, fontSize: 16, color: "white" }}>
                      Daniel
                    </Text>
                    <Text style={{ padding: 10, fontSize: 16, color: "white" }}>
                      Blink customer
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.card}>
                <Icon
                  raised
                  name="quote-left"
                  type="font-awesome"
                  color="#ac8bd6"
                />
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                </View>
                <Text
                  style={{
                    padding: 20,
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Great experience so far. Taxi on time and good drivers.
                </Text>

                <View style={{ flexDirection: "row", padding: 10 }}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 200,
                      marginLeft: 10,
                    }}
                    source={require("../../assets/images/user/download.jpg")}
                  />
                  <View>
                    <Text style={{ padding: 10, fontSize: 16, color: "white" }}>
                      Paula
                    </Text>
                    <Text style={{ padding: 10, fontSize: 16, color: "white" }}>
                      Blink customer
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.card}>
                <Icon
                  raised
                  name="quote-left"
                  type="font-awesome"
                  color="#ac8bd6"
                />
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                  <Icon name="star" type="font-awesome" color="#ffdd6e" />
                </View>
                <Text
                  style={{
                    padding: 20,
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  Great application, very useful and accurate.
                </Text>
                <View style={{ flexDirection: "row", padding: 10 }}>
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 200,
                      marginLeft: 10,
                    }}
                    source={require("../../assets/images/user/day.jpg")}
                  />
                  <View>
                    <Text style={{ padding: 10, fontSize: 16, color: "white" }}>
                      Diana
                    </Text>
                    <Text style={{ padding: 10, fontSize: 16, color: "white" }}>
                      Blink customer
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* <AccordionList /> */}
        </View>
      </ScrollView>
    );
  }
}

AboutUsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "FAQ",
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color={Platform.OS === "android" ? "white" : "black"}
          title="add"
          iconName="add-outline"
          onPress={() => {
            Alert.prompt("Ask a question", "Please add your question", [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: (question) => {
                  console.log("OK Pressed, question: " + question),
                    firebase
                      .database()
                      .ref("Questions/")
                      .push({ question: question });
                },
              },
            ]);
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
    // justifyContent: "center",
    // alignItems: "center",
  },
  collapse: {
    margin: 10,
    //  backgroundColor: "#89cff0",
  },
  review: {
    // backgroundColor: "gray",
    // margin: 10,
  },
  aboutTitle: { fontWeight: "bold", padding: 5, fontSize: 50 },
  faqTitle: { fontWeight: "bold", padding: 5, fontSize: 30 },
  faqSubtitle: {
    padding: 10,
    color: "gray",
  },
  questionText: { fontSize: 20, fontWeight: "bold" },
  collapseHeader: { padding: 10 },
  bodyText: { fontSize: 16, paddingLeft: 10 },
  card: {
    flex: 1,
    margin: 10,
    width: Dimensions.get("screen").width / 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#ac8bd6",
  },
});
