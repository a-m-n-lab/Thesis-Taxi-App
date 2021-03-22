import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const AboutUsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text> The frequent asked questions are the following:</Text>
    </View>
  );
};

AboutUsScreen.navigationOptions = (navData) => {
  return {
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AboutUsScreen;
