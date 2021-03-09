import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
} from "react-native";

const UserProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text> My profile page</Text>
      <Button
        title="About Us"
        onPress={() => {
          props.navigation.navigate({ routeName: "AboutUs" });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProfileScreen;
