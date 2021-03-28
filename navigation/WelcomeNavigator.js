import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "../screens/AuthScreen";
import DriverLoginScreen from "../screens/DriverLoginScreen";
import UserLoginScreen from "../screens/UserLoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const defaultNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "black" : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "black",
};
const WelcomeNavigator = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    UserLogin: { screen: UserLoginScreen },
    DriverLogin: { screen: DriverLoginScreen },
    UserSignup: { screen: AuthScreen },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

export default WelcomeNavigator;
