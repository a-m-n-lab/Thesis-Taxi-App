import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { DrawerNavigatorItem, createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItem } from "react-navigation-drawer";

import UserMap from "../screens/UserMap";
import UserProfileScreen from "../screens/UserProfileScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import EditUserScreen from "../screens/EditUserScreen";
import Colors from "../constants/Colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

import CustomDrawerContent from "../components/navigation/CustomDrawerContent";
const defaultNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "black" : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "black",
};

const UserNavigator = createStackNavigator(
  {
    Maps: {
      screen: UserMap,
      navigationOptions: {
        headerTitle: "Maps",
      },
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <AntDesign name="login" size={24} color="black" />
      ),
      headerTitle: "Driver",
    },
    defaultNavigationOptions: defaultNavOptions,
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
        <MaterialCommunityIcons
          name="information-outline"
          size={24}
          color="black" //"drawerConfig.tintColor"
        />
      ),
      headerTitle: "About Us",
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);
const UserMainNavigator = createDrawerNavigator(
  {
    UserMaps: {
      screen: UserNavigator,
    },
    Profile: UserDrawer,
    AboutUs: AboutUs,
  },

  {
    contentOptions: {
      activeTintColor: Colors.purple,
    },
    drawerContent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItem {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
      // {/* <Button
      //   title="Logout"
      //   color={Colors.darkGrey}
      //   onPress={() => {
      //     dispatch(authActions.logout());
      //     props.navigation.navigate("Auth");
      //   }}
      // /> */
    },
  }
);

export default createAppContainer(UserMainNavigator);
