import { createAppContainer, createSwitchNavigator } from "react-navigation";
import UserNavigator from "./UserNavigator";
import DriverNavigator from "./DriverNavigator";
import WelcomeNavigator from "./WelcomeNavigator";

const AppNavigator = createSwitchNavigator({
  Welcome: WelcomeNavigator,
  User: UserNavigator,
  Driver: DriverNavigator,
});

export default createAppContainer(AppNavigator);
