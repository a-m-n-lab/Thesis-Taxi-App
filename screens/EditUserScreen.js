import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as userActions from "../store/actions/users";

const EditUserScreen = (props) => {
  const userId = props.navigation.getParam("id");

  const editedUser = useSelector((state) =>
    state.users.availableUsers.find((user) => user.id === userId)
  );

  // const userImage = useSelector((state) => state.users.availableUsers.imageUrl);
  const dispatch = useDispatch();

  const [image, setImage] = useState("");

  const [firstName, setFirstName] = useState(
    editedUser ? editedUser.firstName : ""
  );
  const [lastName, setLastName] = useState(
    editedUser ? editedUser.lastName : ""
  );
  const [phone, setPhone] = useState(editedUser ? editedUser.phone : "");

  const submitHandler = useCallback(() => {
    if (editedUser) {
      dispatch(userActions.editUser(userId, firstName, lastName, phone));
    }
  }, [dispatch, userId, image, firstName, lastName, phone]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);
  return (
    <View style={styles.form}>
      <View style={styles.input}>
        {/* <Text> Image</Text>
        <TextInput
          value={image}
          onChangeText={(text) => setImage(text)}
        ></TextInput>
        <View></View> */}
        <Text>First Name</Text>
        <TextInput
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Text>Last Name</Text>
        <TextInput
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <Text>Phone</Text>
        <TextInput value={phone} onChangeText={(text) => setPhone(text)} />
      </View>
    </View>
  );
};

EditUserScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Edit",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          color={Platform.OS === "android" ? "white" : "black"}
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  input: {
    padding: 2,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
});
export default EditUserScreen;
