import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "native-base";
import API from "../constants/API";

const GooglePlacesInput = (props) => {
  return (
    <GooglePlacesAutocomplete
      {...props}
      placeholder="From:"
      minLength={2}
      autoFocus={true}
      returnKeyType={"search"}
      listViewDisplayed="auto"
      fetchDetails={true}
      renderDescription={(row) => row.description || row.vicinity}
      onPress={(data, details = null) => {
        // console.log(data, details);
        //set pick up data from google auto complete
        (pickupName = data.description || data.vicinity), // selected address
          (pickupLatitude = `${details.geometry.location.lat}`),
          (pickupLongitude = `${details.geometry.location.lng}`),
          //storing data
          (GooglePlacesInput.pickupLatitude = pickupLatitude),
          (GooglePlacesInput.pickupName = pickupName),
          (GooglePlacesInput.pickupLongitude = pickupLongitude);
      }}
      getDefaultValue={() => ""}
      query={{
        key: "API_KEY",
        language: "en",
        types: "geocode",
        radius: 10000,
        location: "47.3641 24.6751",
        strictbounds: true,
      }}
      styles={{
        textInputContainer: {
          width: "90%",
          borderRadius: 20,
        },
        description: {
          fontWeight: "bold",
        },
        predefinedPlacesDescription: {
          color: "#2c2f33",
        },
      }}
      currentLocation={true}
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch"
      GoogleReverseGeocodingQuery={{}}
      GooglePlacesSearchQuery={{
        rankby: "distance",
        types: "food",
      }}
      filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_1",
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={props.predefinedPlaces}
      debounce={200}
      renderLeftButton={() => (
        <View style={styles.from}>
          <Image
            source={require("../assets/images/user/from.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
      )}
      renderRightButton={() => <Text />}
    />
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    color: "#42A5F5",
    marginTop: 8,
    marginLeft: 10,
  },
  fromToContainer: {
    alignItems: "center",
    width: 12,
    padding: 8,
  },
  from: {
    top: 15,
    //marginLeft: 8,
  },
});

export default GooglePlacesInput;
