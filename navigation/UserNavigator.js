import React from "react";
import { Platform, SafeAreaView, Button, View, Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { DrawerNavigatorItem, createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItem } from "react-navigation-drawer";
import UserHome from "../screens/UserHome";
import UserMap from "../screens/UserHome";
import UserProfileScreen from "../screens/UserProfileScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import EditUserScreen from "../screens/EditUserScreen";
import Colors from "../constants/Colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

import CustomDrawerContentComponent from "../components/navigation/CustomDrawerContent";
import UserHomeContents from "../screens/user/UserHomeContents";
import UserPickup from "../screens/user/UserPickup";
import UserLogout from "../screens/user/UserLogout";

const defaultNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "black" : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "black",
};

const UserNavigator = createStackNavigator(
  {
    Home: { screen: UserHome },
    Maps: { screen: UserHomeContents },
    Address: { screen: UserPickup },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        // <AntDesign name="login" size={24} color="black" />
        <Image
          source={require("../assets/images/user/user.png")}
          style={{ height: 24, width: 24 }}
        />
      ),
      headerTitle: "Driver",
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
      title: "Edit your profile",
      drawerIcon: (drawerConfig) => (
        <MaterialCommunityIcons
          name="account-details"
          size={24}
          color="black" //"drawerConfig.tintColor"
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
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
        <Image
          source={require("../assets/images/user/info.jpg")}
          style={{ width: 24, height: 24 }}
        />
        // <MaterialCommunityIcons
        //   name="information-outline"
        //   size={24}
        //   color="black" //"drawerConfig.tintColor"
        // />
      ),
      headerTitle: "About Us",
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
          source={require("../assets/images/user/logout.png")}
          style={{ height: 24, width: 24 }}
        />
      ),
      headerTitle: "Driver",
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
    AboutUs: AboutUs,
    Logout: { screen: UserLogOut },
  },
  {
    // contentOptions: {
    //   activeTintColor: Colors.purple,
    // },
    initialRouteName: "UserMaps",
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);

export default createAppContainer(UserMainNavigator);
