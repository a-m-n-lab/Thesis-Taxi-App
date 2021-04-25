import React, { useReducer, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";

const Input = (props) => {
  return (
    <View style={{ ...styles.inputText, ...props.style }}>
      {/* <Text>{props.label}</Text> */}
      <TextInput
        {...props}
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
    width: 300,
  },
});

export default Input;
