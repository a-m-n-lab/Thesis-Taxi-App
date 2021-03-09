import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const MainButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={props.onPress}
      style={styles.buttonContainer}
    >
      <View style={{ ...styles.button, ...props.style }}>
        <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: "Lato3",
    color: "#000",
    textAlign: "center",
  },
});

export default MainButton;
