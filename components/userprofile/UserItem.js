import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const UserItem = (props) => {
  return (
    <View style={styles.userContainer}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <Text> {props.firstName}</Text>
      <Text>{props.lastName}</Text>
      <Text> {props.phone} </Text>
      <View>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {},
  image: {
    borderRadius: 400 / 2,
    width: 300,
    height: 300,
  },
});

export default UserItem;
