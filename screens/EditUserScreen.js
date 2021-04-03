import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../store/actions/users";

const EditUserScreen = (props) => {
  return (
    <View style={styles.form}>
      <View style={styles.input}>
        {/* <Text> Image</Text>
        <TextInput
          value={image}
          onChangeText={(text) => setImage(text)}
        ></TextInput>
        <View></View> */}
        <Text>First Name: </Text>
        <TextInput />
        <Text>Last Name</Text>
        <TextInput />
        <Text>Phone</Text>
      </View>
    </View>
  );
};

EditUserScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Edit",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color={Platform.OS === "android" ? "white" : "black"}
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={() => {}}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  input: {
    padding: 2,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
});
export default EditUserScreen;
