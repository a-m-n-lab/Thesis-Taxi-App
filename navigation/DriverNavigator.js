import { createStackNavigator } from "react-navigation-stack";
import DriverHome from "../screens/DriverHome";
//import DriverPageScreen from "../screens/DriverPageScreen";
import DriverLogout from "../screens/DriverLogout";
import { Platform, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItem } from "react-navigation-drawer";

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
    DriverHomePage: { screen: DriverHome },
    DriversPage: {
      screen: DriverHomeContents,
      navigationOptions: {
        headerTitle: "Driver",
      },
    },
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const DriverMainNavigator = createDrawerNavigator(
  {
    Driver: {
      screen: DriverNavigator,
    },
    DriverHomeC: { screen: DriverHomeContents },
    Logout: { screen: DriverLogout },
  },

  {
    contentOptions: {
      activeTintColor: Colors.purple,
    },
  }
);
export default createAppContainer(DriverMainNavigator);
