import React from "react";
import { Image, Text } from "react-native";
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
      renderDescription={(row) => row.description}
      onPress={(data, details = null) => {
        console.log(data, details);
        (dropOffName = data.description), // selected address
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
        radius: 2000,
        location: "47.374934475629715, 24.659682324481643",
        strictbounds: true,
      }}
      styles={{
        textInputContainer: {
          width: "100%",
          backgroundColor: "#ffffff",
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
        "administrative_area_level_3",
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={props.predefinedPlaces}
      debounce={200}
      renderLeftButton={() => (
        <Image
          style={{ width: 25, height: 25, marginTop: 10, marginLeft: 15 }}
          source={require("../assets/images/user/drop.png")}
        />
      )}
      renderRightButton={() => <Text />}
    />
  );
};

export default GooglePlacesDropOff;
