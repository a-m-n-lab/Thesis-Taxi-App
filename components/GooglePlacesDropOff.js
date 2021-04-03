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
        //console.log(data, details);
        //set drop off data from google auto complete

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
        key: "AIzaSyB7hTq-te4Z7Wb6BN3KkQdGlMQXg8eOUTo",
        language: "en",
        types: "geocode",
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
