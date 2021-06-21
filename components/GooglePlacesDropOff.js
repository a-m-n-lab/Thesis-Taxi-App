import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesDropOff = (props) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="To:"
      minLength={2}
      autoFocus={false}
      returnKeyType={"search"}
      listViewDisplayed="auto"
      fetchDetails={true}
      renderDescription={(row) => row.description || row.vicinity}
      onPress={(data, details = null) => {
        // console.log(data, details);
        (dropOffName = data.description || data.vicinity), // selected address
          (dropOffLatitude = `${details.geometry.location.lat}`),
          (dropOffLongitude = `${details.geometry.location.lng}`),
          //storing data
          (GooglePlacesDropOff.dropOffLatitude = dropOffLatitude),
          (GooglePlacesDropOff.dropOffName = dropOffName),
          (GooglePlacesDropOff.dropOffLongitude = dropOffLongitude);
      }}
      getDefaultValue={() => ""}
      query={{
        key: "AIzaSyCdiPwD9bgFbv7yBGA4qNIL236PVTKaqP8",
        language: "en",
        types: "geocode",
        radius: 10000,
        location: "47.3641 24.6751",
        strictbounds: true,
      }}
      styles={{
        textInputContainer: {
          width: "90%",
          // backgroundColor: "#ffffff",
          borderRadius: 20,
        },
        description: {
          fontWeight: "bold",
        },
        predefinedPlacesDescription: {
          color: "#2c2f33",
          // borderRadius: 50,
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
      predefinedPlaces={props.predefinedPlaces}
      debounce={200}
      renderLeftButton={() => (
        <View>
          <Image
            source={require("../assets/images/to.png")}
            style={{ width: 20, height: 20, top: 10 }}
          />
        </View>
      )}
      renderRightButton={() => <Text />}
    />
  );
};

export default GooglePlacesDropOff;
