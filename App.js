import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import UserNavigator from "./navigation/UserNavigator";

// import { enableScreens } from "react-native-screens";

// enableScreens(); //performance reasons

const fetchFonts = () => {
  return Font.loadAsync({
    //loads fonts before
    PostNoBills: require("./assets/fonts/PostNoBillsJaffna-Regular.ttf"),
    Prata: require("./assets/fonts/Prata-Regular.ttf"),
    Prata2: require("./assets/fonts/Prata400.ttf"),
    Lato1: require("./assets/fonts/Lato-Black.ttf"),
    Lato2: require("./assets/fonts/Lato-Thin.ttf"),
    Lato3: require("./assets/fonts/Lato-Regular.ttf"),
    OS: require("./assets/fonts/OpenSans-Light.ttf"),
    OS2: require("./assets/fonts/OpenSans-Regular.ttf"),
  });
};
export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false); //first time running the app the fonts won't be loaded
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)} //after starting, set state to true
        onError={(err) => console.log(err)}
      />
    );
  }
  return <UserNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
