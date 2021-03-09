import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
const Logo = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        style={styles.logo}
        source={require("../assets/images/whitelogo.jpg")}
      />
      <Text style={styles.logoText}> BLINK </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: { left: 20, top: 30, width: 50, height: 50, alignItems: "center" },
  logoText: {
    top: 30,
    fontSize: 30,
    color: Colors.purple,
    fontFamily: "PostNoBills",
    left: 30,
  },
});

export default Logo;
