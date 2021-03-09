import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import UserLoginScreen from "../screens/UserLoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import DriverLoginScreen from "../screens/DriverLoginScreen";
import DriverPageScreen from "../screens/DriverPageScreen";
import UserMap from "../screens/UserMap";
import UserProfileScreen from "../screens/UserProfileScreen";
import AboutUsScreen from "../screens/AboutUsScreen";

const UserNavigator = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,

      navigationOptions: {
        //headerTitle:"blabla" -- this one has priority
      },
    },
    UserLogin: {
      screen: UserLoginScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? "black" : "white",
        },
        headerTitleAlign: "center",
        headerTitle: "Login",
        headerTintColor: Platform.OS === "android" ? "white" : "black",
      },
    },
    Maps: {
      screen: UserMap,
      navigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? "black" : "white",
        },
        headerTitleAlign: "center",
        headerTitle: "Maps",
      },
    },
    DriverLogin: {
      screen: DriverLoginScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? "black" : "white",
        },
        headerTitleAlign: "center",
        headerTitle: "Login",
        headerTintColor: Platform.OS === "android" ? "white" : "black",
      },
    },
    DriversPage: {
      screen: DriverPageScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? "black" : "white",
        },
        headerTitleAlign: "center",
        headerTitle: "Driver",
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? "black" : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : "black",
    },
  }
);

const MainDrawer = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    UserProfile: { screen: UserProfileScreen },
    AboutUs: { screen: AboutUsScreen },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? "black" : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : "black",
    },
  }
);
const MainNavigator = createDrawerNavigator({
  Welcome: {
    screen: UserNavigator,
  },
  Profile: MainDrawer,
});
export default createAppContainer(MainNavigator);
