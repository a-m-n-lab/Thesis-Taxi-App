import React from "react";
import { View, StyleSheet, FlatList, Button, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";

import UserItem from "../components/userprofile/UserItem";

const UserProfileScreen = (props) => {
  const users = useSelector((state) => state.users.availableUsers); //takes a function which receives the redux state and retrives data from there
  const editProfileHandler = (id) => {
    props.navigation.navigate("EditProfile", { id: id }); //setParams
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <UserItem
            image={itemData.item.imageUrl}
            firstName={itemData.item.firstName}
            lastName={itemData.item.lastName}
            phone={itemData.item.phone}
            // onSelect={() => {
            //   editProfileHandler(itemData.item.id);
            // }}
          >
            <Button
              color="black"
              title="Edit"
              onPress={() => {
                editProfileHandler(itemData.item.id);
              }}
            />
          </UserItem>
        )} //itemData is in ReactNative, along with item prop       // imageUrl : users-> users to users from App reducer->reducer to model
      />
    </View>
  );
};
UserProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "User Profile",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color={Platform.OS === "android" ? "white" : "black"}
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color={Platform.OS === "android" ? "white" : "black"}
          title="Edit"
          iconName="create-outline"
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProfileScreen;
