import React from "react";
import { Platform, SafeAreaView, Button, View, Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import DriverHome from "../screens/DriverHome";
//import DriverPageScreen from "../screens/DriverPageScreen";
import DriverLogout from "../screens/DriverLogout";
import DriverHistory from "../screens/driver/DriverHistory";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItem } from "react-navigation-drawer";
import CustomDrawerContentComponent from "../components/navigation/CustomDrawerContent";
import Colors from "../constants/Colors";

import DriverHomeContents from "../screens/driver/DriverHomeContents";

const defaultNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "black" : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "black",
};

const DriverNavigator = createStackNavigator(
  {
    //DriverHomePage: { screen: DriverHome },
    DriversPage: {
      screen: DriverHomeContents,
      navigationOptions: {
        headerTitle: "Driver",
      },
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        // <AntDesign name="login" size={24} color="black" />
        <Image
          source={require("../assets/images/user/profile.jpg")}
          style={{ height: 24, width: 24 }}
        />
      ),
      title: "Driver",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const DriversHistory = createStackNavigator(
  {
    DriverHistory,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Image
          source={require("../assets/images/navigation/history.png")}
          style={{ width: 24, height: 24 }}
        />
        // <MaterialCommunityIcons
        //   name="information-outline"
        //   size={24}
        //   color="black" //"drawerConfig.tintColor"
        // />
      ),
      headerTitle: "History",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const DriverLogOut = createStackNavigator(
  {
    Logo: { screen: DriverLogout },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        // <AntDesign name="login" size={24} color="black" />
        <Image
          source={require("../assets/images/navigation/logout.png")}
          style={{ height: 24, width: 24 }}
        />
      ),
      headerTitle: "Logout",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const DriverMainNavigator = createDrawerNavigator(
  {
    Driver: {
      screen: DriverNavigator,
    },
    History: DriversHistory,
    Logout: { screen: DriverLogOut },
  },

  {
    contentOptions: {
      activeTintColor: Colors.purple,
    },

    // contentOptions: {
    //   activeTintColor: Colors.purple,
    // },
    initialRouteName: "Driver",
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);
export default createAppContainer(DriverMainNavigator);
