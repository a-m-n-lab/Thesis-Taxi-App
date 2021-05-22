import React from "react";
import { Image, Text, StyleSheet, Switch, View } from "react-native";
import {
  Content,
  Container,
  Header,
  Left,
  Icon,
  Footer,
  Body,
} from "native-base";

import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";

const CustomDrawerSwitchComponent = (props) => (
  <View style={styles.container}>
    <Switch />
  </View>
);

const styles = StyleSheet.create({
  profileText: {
    width: 120,
    height: 50,
    backgroundColor: "#99aab5",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomDrawerSwitchComponent;
