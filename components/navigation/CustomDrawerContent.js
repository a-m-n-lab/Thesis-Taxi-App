import React from "react";
import { Image, Text, StyleSheet } from "react-native";
import {
  Content,
  Container,
  Header,
  Left,
  Icon,
  Footer,
  Body,
} from "native-base";
import Colors from "../../constants/Colors";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={{ height: 200, backgroundColor: "black" }}>
      <Body style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../../assets/images/avatar.png")}
          style={{ width: 150, height: 150, borderRadius: 100 }}
        />

        <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}>
          {/* {this.firstname + " " + this.lastname} */}
        </Text>
      </Body>
    </Header>
    <Content>
      <DrawerNavigatorItems {...props} />
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  profileText: {
    width: 120,
    height: 50,
    backgroundColor: "#99aab5",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomDrawerContentComponent;
