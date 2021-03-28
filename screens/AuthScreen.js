import React, { useReducer, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../components/HeaderButton";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  const signupHandler = () => {
    dispatch(
      authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
    props.navigation.navigate("UserLogin");
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    // <KeyboardAvoidingView>
    <View style={styles.registerContainer}>
      <Logo />
      <Subtitle>
        {` SIGN UP 
- USER- `}
      </Subtitle>
      <View style={styles.loginContainer}>
        <View style={styles.usernameIconContainer}>
          <FontAwesome name="user-o" size={26} color="grey" />
        </View>
        <View>
          <Input
            id="email"
            autoFocus={true}
            placeholder="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
        </View>
        {/* <View style={styles.phoneIconContainer}>
          <Ionicons name="call-outline" size={28} color="grey" />
        </View>

        <Input
          id="phone"
          placeholder="Phone"
          keyboardType="default"
          required
          minLength={5}
          autoCapitalize="none"
          onInputChange={inputChangeHandler}
        /> */}
        <View style={styles.passwordIconContainer}>
          <Ionicons name="key-outline" size={28} color="grey" />
        </View>

        <Input
          id="password"
          placeholder="Password"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          onInputChange={inputChangeHandler}
        />

        <View style={styles.loginButtonContainer}>
          <MainButton style={styles.loginButton} onPress={signupHandler}>
            SIGNUP
          </MainButton>
        </View>
      </View>
    </View>
    // </KeyboardAvoidingView>
  );
};

// RegistrationScreen.navigationOptions = (navData) => {
//   return {
//     headerLeft: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton} color="white">
//         <Item
//           color="white"
//           title="Menu"
//           iconName="ios-menu"
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//   };
// };

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  loginContainer: {
    padding: 15,
    top: 60,
  },
  usernameIconContainer: {
    justifyContent: "center",
    top: 40,
  },
  passwordIconContainer: {
    marginVertical: 15,
    top: 60,
  },
  loginButtonContainer: {
    left: 190,
    top: 60,
    width: 150,
  },
  loginButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AuthScreen;
