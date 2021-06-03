import React from "react";
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

const AboutUsScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.faqTitle}>FAQ</Text>
        <Text style={styles.faqSubtitle}>About Blink </Text>
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
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>
              Very easy!
            </Text>
          </CollapseBody>
        </Collapse>
        <Collapse style={styles.collapse}>
          <CollapseHeader style={styles.collapseHeader}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.questionText}>How much does it cost?</Text>
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
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>
              Absolutely nothing!
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
            <Text style={{ fontSize: 16, fontStyle: "italic" }}>
              Call our number
            </Text>
          </CollapseBody>
        </Collapse>

        <View style={styles.review}>
          <Text
            style={{
              fontSize: 35,
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
                Blink is an awesome app. I've been using it for a long time now
                and it works perfectly.
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
};

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
            Alert.alert("Alert", "This feature will be soon available", [
              {
                text: "Cancel",
                onPress: () => {
                  console.log("Cancel Pressed");
                },
                style: "cancel",
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
  },
  review: {
    // margin: 10,
  },
  faqTitle: { fontWeight: "bold", padding: 5, fontSize: 50 },
  faqSubtitle: {
    padding: 10,
    color: "gray",
  },
  questionText: { fontSize: 20, fontWeight: "bold" },
  collapseHeader: { padding: 10 },
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

export default AboutUsScreen;
