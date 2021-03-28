import React from "react";
import { View, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const DriversPageScreen = (props) => {
  return (
    <View>
      <Text> Hello this is my text</Text>
    </View>
  );
};
// DriversPageScreen.navigationOptions = (navData) => {
//   return {
//     headerLeft: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton} color="white">
//         <Item
//           color="white"
//           title="Menu"
//           iconName="ios-menu"
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };
export default DriversPageScreen;
