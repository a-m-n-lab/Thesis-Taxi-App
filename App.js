import React, { useState } from "react";
import { StyleSheet, LogBox } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import AppNavigator from "./navigation/AppNavigator";
import firebase from "firebase";

import ApiKeys from "./constants/ApiKeys";
import { Root } from "native-base";

enableScreens();
//performance reasons

// const rootReducer = combineReducers({
//   users: usersReducer,
//   auth: authReducer,
// });
// const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
  if (!firebase.app.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
    const database = firebase.database();
  }
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

  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <Root>
      {/* <Provider store={store}> */}
      <AppNavigator />
      {/* </Provider> */}
    </Root>
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
