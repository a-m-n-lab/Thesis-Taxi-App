import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import AuthScreen from "../screens/AuthScreen";
import DriverLoginScreen from "../screens/driver/DriverLoginScreen";
import DriverRegisterScreen from "../screens/driver/DriverRegisterScreen";
import UserLoginScreen from "../screens/user/UserLoginScreen";
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
    UserSignup: {
      screen: AuthScreen,
      navigationOptions: {
        headerTitle: "Passenger Registration",
      },
    },
    UserLogin: { screen: UserLoginScreen },
    DriverSignup: { screen: DriverRegisterScreen },
    DriverLogin: { screen: DriverLoginScreen },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

export default WelcomeNavigator;
