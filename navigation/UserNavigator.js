import React, { useState, useEffect, useContext } from "react";
import {
  Platform,
  SafeAreaView,
  Button,
  View,
  Image,
  Switch,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { DrawerNavigatorItem, createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItem } from "react-navigation-drawer";
//import UserHome from "../screens/UserHome";

import UserProfileScreen from "../screens/user/UserProfileScreen";
import AboutUsScreen from "../screens/user/AboutUsScreen";
import EditUserScreen from "../screens/user/EditUserScreen";
import CustomDrawerContentComponent from "../components/navigation/CustomDrawerContent";
import UserHomeContents from "../screens/user/UserHomeContents";
import UserPickup from "../screens/user/UserPickup";
import UserLogout from "../screens/user/UserLogout";
import UserPayment from "../screens/user/UserPayment";
import UserHistory from "../screens/user/UserHistory";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../Themes/dark";
//const { dark, theme, toggle } = useContext(ThemeContext);
const defaultNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "black" : "white",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  navigationOptions: {
    headerShown: false,
  },
  // headerTintColor: Platform.OS === "android" ? "white" : "black",
};

const UserNavigator = createStackNavigator(
  {
    //Home: { screen: UserHome },
    Maps: { screen: UserHomeContents },
    Address: { screen: UserPickup },
  },
  {
    navigationOptions: {
      headerShown: false,
      drawerIcon: (drawerConfig) => (
        // <AntDesign name="login" size={24} color="black" />
        <Image
          source={require("../assets/images/navigation/home.png")}
          style={{ height: 30, width: 30 }}
        />
      ),
      title: "Maps",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const UserDrawer = createStackNavigator(
  {
    UserProfile: { screen: UserProfileScreen },
    EditProfile: { screen: EditUserScreen },
  },
  {
    navigationOptions: {
      //title: "Edit your profile",
      drawerIcon: (drawerConfig) => (
        <Image
          source={require("../assets/images/navigation/edit.png")}
          style={{ width: 30, height: 30 }}
        />
      ),
      title: "Edit your profile",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const UserPaymentStack = createStackNavigator(
  {
    Pay: { screen: UserPayment },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Image
          source={require("../assets/images/navigation/payment.png")}
          style={{ width: 30, height: 30 }}
        />
      ),
      title: "Payment",
    },

    defaultNavigationOptions: defaultNavOptions,
  }
);
const UsersHistory = createStackNavigator(
  {
    UserHistory,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Image
          source={require("../assets/images/navigation/history.png")}
          style={{ width: 30, height: 30 }}
        />
        // <MaterialCommunityIcons
        //   name="information-outline"
        //   size={24}
        //   color="black" //"drawerConfig.tintColor"
        // />
      ),
      title: "History",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const AboutUs = createStackNavigator(
  {
    AboutUs: {
      screen: AboutUsScreen,
      title: "About us",
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Image
          source={require("../assets/images/navigation/info.png")}
          style={{ width: 30, height: 30 }}
        />
      ),
      title: "About Us",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const UserLogOut = createStackNavigator(
  {
    Logo: { screen: UserLogout },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        // <AntDesign name="login" size={24} color="black" />
        <Image
          source={require("../assets/images/navigation/logout.png")}
          style={{ height: 30, width: 30 }}
        />
      ),
      headerTitle: "Logout",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

export const UserMainNavigator = createDrawerNavigator(
  {
    UserMaps: {
      screen: UserNavigator,
    },
    Profile: UserDrawer,
    Payment: UserPaymentStack,
    History: UsersHistory,
    AboutUs: AboutUs,
    Logout: { screen: UserLogOut },
  },
  {
    contentOptions: {
      labelStyle: {
        color: "grey",
        // activeTintColor: "#c984f5",
      },
    },

    initialRouteName: "UserMaps",
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    drawerBackgroundColor: "black",
    drawerPosition: "left",
    drawerBackgroundColor: "#0000FF",
  }
);

export default createAppContainer(UserMainNavigator);
