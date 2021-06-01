import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/HeaderButton";
import { Icon } from "native-base";

const AboutUsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          padding: 5,
          fontSize: 50,
        }}
      >
        FAQ
      </Text>

      <Collapse style={styles.collapse}>
        <CollapseHeader>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.questionText}>
              1. How easy is it to book taxi?
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
          <Text style={{ fontSize: 16, fontStyle: "italic" }}>Very easy!</Text>
        </CollapseBody>
      </Collapse>

      <Collapse style={styles.collapse}>
        <CollapseHeader>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.questionText}>2. How much does it cost?</Text>
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
        <CollapseHeader>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.questionText}>
              3. What if I can not find the driver?
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
      {/* <AccordionList /> */}
    </View>
  );
};

AboutUsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "About Us",
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
  };
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    // alignItems: "center",
  },
  collapse: {
    margin: 10,
  },
});

export default AboutUsScreen;
