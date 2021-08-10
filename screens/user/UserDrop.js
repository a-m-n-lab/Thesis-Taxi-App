import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  createDrawerNavigator,
  Image,
  TouchableHighlight,
} from "react-native";
import {
  Content,
  Container,
  Header,
  Left,
  Icon,
  Footer,
  Body,
} from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GooglePlacesInput from "../../components/GooglePlacesInput";
const homePlace = {
  description: "Home",
  geometry: { location: { lat: 47.368816531416826, lng: 24.67733126020572 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 47.374934475629715, lng: 24.659682324481643 } },
};
export default class UserDrop extends React.Component {
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#42A5F5", height: 75 }}>
          <Left>
            <TouchableHighlight
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
              onPress={() => this.props.navigation.navigate("")} // Home
            >
              <Icon name="arrow-back" style={{ color: "#ffffff" }} />
            </TouchableHighlight>
          </Left>
          <Body>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              PickUp
            </Text>
          </Body>
        </Header>

        <Content>
          <View style={{ justifyContent: "center" }}>
            <GooglePlacesInput
              placeholder="Search"
              autoFocus={false}
              onPress={(data, details = null) => {
                console.log(data, details);
              }}
              getDefaultValue={() => ""}
              query={{
                key: "AIzaSyCdiPwD9bgFbv7yBGA4qNIL236PVTKaqP8",
                language: "en",
                types: "geocode",
              }}
              debounce={200}
              renderLeftButton={() => (
                <Icon name="search" style={styles.searchIcon} />
              )}
              renderRightButton={() => <Text />}
              style={{ marginTop: 200 }}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  map: {
    height: 600,
    marginTop: 0,
  },
});
