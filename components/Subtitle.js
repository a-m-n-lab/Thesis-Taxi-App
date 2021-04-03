import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Subtitle = (props) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitleText}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitleContainer: {
    padding: 30,
    alignItems: "center",
    top: 40,
  },
  subtitleText: { color: "#000", fontFamily: "Lato3", fontSize: 25 },
});

export default Subtitle;
