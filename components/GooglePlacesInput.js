import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "native-base";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 47.368816531416826, lng: 24.67733126020572 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 47.374934475629715, lng: 24.659682324481643 } },
};

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
      renderDescription={(row) => row.description}
      onPress={(data, details = null) => {
        console.log(data, details);
        //set pick up data from google auto complete
        (pickupName = data.description), // selected address
          (pickupLatitude = `${details.geometry.location.lat}`),
          (pickupLongitude = `${details.geometry.location.lng}`),
          //storing data
          (GooglePlacesInput.pickupLatitude = pickupLatitude),
          (GooglePlacesInput.pickupName = pickupName),
          (GooglePlacesInput.pickupLongitude = pickupLongitude);
      }}
      getDefaultValue={() => ""}
      query={{
        key: "AIzaSyCdiPwD9bgFbv7yBGA4qNIL236PVTKaqP8",
        language: "en",
        types: "geocode",
        radius: 2000,
        location: "47.368816531416826 24.67733126020572 ",
        strictbounds: true,
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
      renderLeftButton={() => (
        <Image
          style={{
            width: 25,
            height: 25,
            marginTop: 10,
            marginLeft: 15,
          }}
          source={require("../assets/images/user/from.png")}
        />
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
});

export default GooglePlacesInput;
