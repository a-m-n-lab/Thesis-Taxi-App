import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";

const Input = (props) => {
  return (
    <View style={{ ...styles.inputText, ...props.style }}>
      <TextInput
        autoFocus={props.autoFocus}
        placeholder={props.placeholder}
        style={{
          left: 10,
          height: 45,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {},

  inputText: {
    flexDirection: "row",
    left: 35,
    alignItems: "center",
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    width: 315,
  },
});

export default Input;
