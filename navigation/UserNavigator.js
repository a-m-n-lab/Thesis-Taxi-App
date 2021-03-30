import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
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

import CustomDrawerContent from "../components/navigation/CustomDrawerContent";
import UserHomeContents from "../screens/user/UserHomeContents";
import UserPickup from "../screens/user/UserPickup";

const defaultNavOptions = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? "black" : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : "black",
};

const UserNavigator = createStackNavigator(
  {
    //Home: { screen: UserHome },
    Maps: { screen: UserHomeContents },
    pickUpLocation: { screen: UserPickup },
    // Maps: {
    //   screen: UserMap,
    //   navigationOptions: {
    //     headerTitle: "Maps",
    //   },
    // },
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
// const customDrawerContentComponent = (props) => (
//   <Container>
//     <Header style={{ height: 200, backgroundColor: "#42A5F5" }}>
//       <Body style={{ alignItems: "center", justifyContent: "center" }}>
//         {/* <Image
//           source={require("../Images/avatar.png")}
//           style={{ width: 100, height: 100, borderRadius: 100 }}
//         /> */}
//         <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}>
//           {this.firstname + " " + this.lastname}
//         </Text>
//       </Body>
//     </Header>
//     <Content>
//       <DrawerItems {...props} />
//     </Content>
//   </Container>
// );
//drawerNavigator

// export const MyDrawerNav = createDrawerNavigator(
//   {
//     Home: UserNavigator,
//   }
// {
//   initialRouteName: "Home",
//   contentComponent: customDrawerContentComponent,
//   drawerOpenRoute: "DrawerOpen",
//   drawerCloseRoute: "DrawerClose",
//   drawerToggleRoute: "DrawerToggle",
// }
//);
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
export const UserMainNavigator = createDrawerNavigator(
  {
    UserMaps: {
      screen: UserNavigator,
    },
    //Profile: UserDrawer,
    AboutUs: AboutUs,
  },

  {
    contentOptions: {
      activeTintColor: Colors.purple,
    },
    // drawerContent: (props) => {
    //   const dispatch = useDispatch();
    //   return (
    //     <View style={{ flex: 1, paddingTop: 20 }}>
    //       <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
    //         <DrawerItem {...props} />
    //         <Button
    //           title="Logout"
    //           color={Colors.primary}
    //           onPress={() => {
    //             dispatch(authActions.logout());
    //             // props.navigation.navigate('Auth');
    //           }}
    //         />
    //       </SafeAreaView>
    //     </View>
    //   );
    //   // {/* <Button
    //   //   title="Logout"
    //   //   color={Colors.darkGrey}
    //   //   onPress={() => {
    //   //     dispatch(authActions.logout());
    //   //     props.navigation.navigate("Auth");
    //   //   }}
    //   // /> */
    // },
  }
);

export default createAppContainer(UserMainNavigator);
