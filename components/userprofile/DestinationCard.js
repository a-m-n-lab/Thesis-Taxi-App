import React from "react";
import { View, StyleSheet } from "react-native";

const DestinationCard = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    //shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 5 },
    //shadowRadius: 8,
    elevation: 5,
    // borderBottomWidth: 0.5,
    // borderBottomColor: "black",
    backgroundColor: "white",
  },
});

export default DestinationCard;
