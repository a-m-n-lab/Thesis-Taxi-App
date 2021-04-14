import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "native-base";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 48.8555, lng: 2.3181 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 48.8478, lng: 2.3202 } },
};

const GooglePlacesInput = (props) => {
  return (
    <GooglePlacesAutocomplete
      {...props}
      placeholder={props.placeholder}
      minLength={2}
      autoFocus={props.autoFocus}
      returnKeyType={"search"}
      listViewDisplayed="auto"
      fetchDetails={true}
      renderDescription={(row) => row.description}
      onPress={props.onPress}
      getDefaultValue={() => ""}
      query={{
        key: "AIzaSyCdiPwD9bgFbv7yBGA4qNIL236PVTKaqP8",
        language: "en",
        types: "geocode",
        radius: 2000,
      }}
      styles={{
        textInputContainer: {
          width: "100%",
        },
        description: {
          fontWeight: "bold",
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
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
        "administrative_area_level_3",
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[homePlace, workPlace]}
      debounce={200}
      renderLeftButton={props.renderLeftButton}
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
});

export default GooglePlacesInput;
