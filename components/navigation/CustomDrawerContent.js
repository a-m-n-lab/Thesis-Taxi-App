import { Button } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "react-navigation-drawer";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => {}} />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
