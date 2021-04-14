import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
const Logo = (props) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Image
        style={styles.logo}
        source={require("../assets/images/whitelogo.jpg")}
      />
      <Text style={styles.logoText}> BLINK </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: { left: 10, top: 5, width: 40, height: 50, alignItems: "center" },
  logoText: {
    top: 5,
    alignSelf: "center",
    fontSize: 30,
    color: Colors.purple,
    fontFamily: "PostNoBills",
    left: 20,
  },
});

export default Logo;
