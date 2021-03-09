import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";

const AboutUsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text> The frequent asked questions are the following:</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AboutUsScreen;
