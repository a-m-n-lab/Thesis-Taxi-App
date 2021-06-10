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
      renderDescription={(row) => row.description}
      onPress={(data, details = null) => {
        // console.log(data, details);
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
        radius: 5000,
        location: "47.374934475629715, 24.659682324481643",
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
        <View style={styles.toDot}>
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

const styles = StyleSheet.create({
  toDot: {},
});
export default GooglePlacesDropOff;
