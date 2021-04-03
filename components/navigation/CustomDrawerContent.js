import React from "react";
import { Image, Text } from "react-native";
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

const CustomDrawerContentComponent = (props) => (
  <Container>
    <Header style={{ height: 200, backgroundColor: Colors.purple }}>
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

export default CustomDrawerContentComponent;
