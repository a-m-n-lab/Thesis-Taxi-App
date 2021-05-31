import React from "react";
import { Platform, SafeAreaView, Button, View, Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import DriverHome from "../screens/DriverHome";
//import DriverPageScreen from "../screens/DriverPageScreen";
import DriverLogout from "../screens/DriverLogout";
import DriverHistory from "../screens/driver/DriverHistory";
import DriverCancelled from "../screens/driver/DriverCancelled";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItem } from "react-navigation-drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DriverProfileScreen from "../screens/driver/DriverProfileScreen";
import DriverCustomDrawerContentComponent from "../components/navigation/DriverCustomDrawerContent";
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
    },
    DriverProfile: { screen: DriverProfileScreen },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        // <AntDesign name="login" size={24} color="black" />
        <Image
          source={require("../assets/images/navigation/home.png")}
          style={{ height: 24, width: 24 }}
        />
      ),
      title: "Maps",
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

// const DriverTab = createMaterialTopTabNavigator();
// const Tab = function MyTabs() {
//   return (
//     <NavigationContainer>
//       <DriverTab.Navigator>
//         <DriverTab.Screen component={DriverHistory} />
//         <DriverTab.Screen component={DriverCancelled} />
//       </DriverTab.Navigator>
//     </NavigationContainer>
//   );
// };

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
    // Tab,
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
    contentComponent: DriverCustomDrawerContentComponent,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
  }
);
export default createAppContainer(DriverMainNavigator);
