import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const UserMap = (props) => {
  return (
    <View style={styles.container}>
      <Text> This is my first stack</Text>
    </View>
  );
};

// UserMap.navigationOptions = {
//   headerTitle: "Maps",
//   headerRight: () => (
//     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
//       <Item title="drawer" iconName="ios-menu" />
//     </HeaderButtons>
//   ),
// };

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserMap;
