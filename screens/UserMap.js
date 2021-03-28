import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const UserMap = (props) => {
  return (
    <ImageBackground
      source={require("../assets/maps.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}></View>
    </ImageBackground>
  );
};
UserMap.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton} color="white">
        <Item
          color="white"
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
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserMap;
