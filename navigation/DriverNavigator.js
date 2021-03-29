import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import DriverPageScreen from "../screens/DriverPageScreen";
import DriverLogout from "../screens/DriverLogout";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItem } from "react-navigation-drawer";

import Colors from "../constants/Colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "black" : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "black",
};

const DriverNavigator = createStackNavigator(
  {
    DriversPage: {
      screen: DriverPageScreen,
      navigationOptions: {
        headerTitle: "Driver",
      },
    },
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const DriverMainNavigator = createDrawerNavigator(
  {
    Driver: {
      screen: DriverNavigator,
    },
    Logout: { screen: DriverLogout },
  },

  {
    contentOptions: {
      activeTintColor: Colors.purple,
    },
  }
);
export default createAppContainer(DriverMainNavigator);
