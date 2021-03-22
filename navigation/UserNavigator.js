import React from "react";
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
import EditUserScreen from "../screens/EditUserScreen";
import Colors from "../constants/Colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

//1st stack
const UserNavigator = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "black",
        //headerTitle:"blabla" -- this one has priority
      },
    },
    UserLogin: {
      screen: UserLoginScreen,
      navigationOptions: {
        //   headerStyle: {
        //     backgroundColor: Platform.OS === "android" ? "black" : "white",
        //   },
        //   headerTitleAlign: "center",
        headerTitle: "Login",
        // headerTintColor: Platform.OS === "android" ? "white" : "black",
      },
    },
    Maps: {
      screen: UserMap,
      navigationOptions: {
        headerTitle: "Maps",
      },
    },
    DriverLogin: {
      screen: DriverLoginScreen,

      navigationOptions: {
        headerTitle: "Login",
        //   headerStyle: {
        //     backgroundColor: Platform.OS === "android" ? "black" : "white",
        //   },
        //   headerTitleAlign: "center",
        //
        //   headerTintColor: Platform.OS === "android" ? "white" : "black",
      },
    },
    DriversPage: {
      screen: DriverPageScreen,
      // navigationOptions: {
      //   headerStyle: {
      //     backgroundColor: Platform.OS === "android" ? "black" : "white",
      //   },
      //   headerTitleAlign: "center",
      // },
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <AntDesign name="login" size={24} color="black" />
      ),
      headerTitle: "Driver",
    },
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? "black" : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : "black",
    },
  }
);
//2nd stack
const UserDrawer = createStackNavigator(
  {
    UserProfile: { screen: UserProfileScreen },
    EditProfile: { screen: EditUserScreen },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <MaterialCommunityIcons
          name="account-details"
          size={24}
          color="black" //"drawerConfig.tintColor"
        />
      ),
    },
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? "black" : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : "black",
    },
  }
);
const AboutUs = createStackNavigator(
  {
    AboutUs: {
      screen: AboutUsScreen,
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <MaterialCommunityIcons
          name="information-outline"
          size={24}
          color="black" //"drawerConfig.tintColor"
        />
      ),
      headerTitle: "About Us",
    },
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? "black" : "white",
      },
      headerTintColor: Platform.OS === "android" ? "white" : "black",
    },
  }
);
const MainNavigator = createDrawerNavigator(
  {
    Welcome: {
      screen: UserNavigator,
    },
    Profile: UserDrawer,
    AboutUs: AboutUs,
  },

  {
    contentOptions: {
      activeTintColor: Colors.purple,
    },
  }
);
export default createAppContainer(MainNavigator);
