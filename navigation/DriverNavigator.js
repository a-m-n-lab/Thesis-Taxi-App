import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import DriverLoginScreen from "../screens/DriverLoginScreen";
import DriverPageScreen from "../screens/DriverPageScreen";

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

export default DriverNavigator;
