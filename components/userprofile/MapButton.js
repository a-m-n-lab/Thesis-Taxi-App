import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const MapButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <Animated.View style={[styles.button, styles.menu]}>
          <Icon name="ios-menu" size={35} color="#000" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    alignItems: "center",
    position: "absolute",
  },
  button: {
    position: "absolute",
    width: 150,
    height: 45,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#2a2a2a",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
  },
  menu: {
    backgroundColor: "#fff",
  },
});
export default MapButton;
