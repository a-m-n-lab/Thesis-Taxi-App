import { createAppContainer, createSwitchNavigator } from "react-navigation";
import UserNavigator from "./UserNavigator";
import DriverNavigator from "./DriverNavigator";
import WelcomeNavigator from "./WelcomeNavigator";
import LoadingScreen from "../screens/LoadingScreen";

const AppNavigator = createSwitchNavigator({
  // Auth: LoadingScreen,
  Welcome: WelcomeNavigator,
  User: UserNavigator,
  Driver: DriverNavigator,
});

export default createAppContainer(AppNavigator);
