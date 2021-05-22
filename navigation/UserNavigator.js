import React from "react";
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
import UserMap from "../screens/UserHome";
import UserProfileScreen from "../screens/UserProfileScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import EditUserScreen from "../screens/EditUserScreen";
import Colors from "../constants/Colors";

import CustomDrawerSwitchComponent from "../components/navigation/CustomDrawerSwitchComponent";
import CustomDrawerContentComponent from "../components/navigation/CustomDrawerContent";
import UserHomeContents from "../screens/user/UserHomeContents";
import UserPickup from "../screens/user/UserPickup";
import UserLogout from "../screens/user/UserLogout";
import UserPayment from "../screens/user/UserPayment";
import UserHistory from "../screens/user/UserHistory";

const defaultNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "black" : "white",
  },
  navigationOptions: {
    headerShown: false,
  },
  headerTintColor: Platform.OS === "android" ? "white" : "black",
};

const UserNavigator = createStackNavigator(
  {
    //Home: { screen: UserHome },
    Maps: { screen: UserHomeContents },
    Address: { screen: UserPickup },
  },
  {
    // headerMode: "none",
    navigationOptions: {
      // headerShown: false,
      drawerIcon: (drawerConfig) => (
        // <AntDesign name="login" size={24} color="black" />
        <Image
          source={require("../assets/images/navigation/home.png")}
          style={{ height: 24, width: 24 }}
        />
      ),
      title: "Maps",
      // headerMode: 'none',
      // navigationOptions: {
      //     headerVisible: false,
      // }
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
          style={{ width: 24, height: 25 }}
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
          style={{ width: 24, height: 24 }}
        />
        // <MaterialIcons name="payment" size={24} color="black" />
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
          source={require("../assets/images/navigation/info.png")}
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
          source={require("../assets/images/navigation/logout.png")}
          style={{ height: 24, width: 24 }}
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
      activeTintColor: "#c984f5",
    },

    initialRouteName: "UserMaps",
    // contentComponent: CustomDrawerSwitchComponent,
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
