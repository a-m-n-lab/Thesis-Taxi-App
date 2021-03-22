import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import UserNavigator from "./navigation/UserNavigator";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import usersReducer from "./store/reducers/users";
import { enableScreens } from "react-native-screens";

enableScreens(); //performance reasons

const rootReducer = combineReducers({
  users: usersReducer,
});
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    // returns a promise
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
  const [fontLoaded, setFontLoaded] = useState(false); //first time running the app the fonts won't be loaded
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts} //function executed when component first rendered
        onFinish={() => setFontLoaded(true)} //after starting, set state to true
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <Provider store={store}>
      <UserNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
