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
const DriverLoginScreen = (props) => {
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
  const driverLoginHandler = () => {
    dispatch(
      authActions.driverLogin(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
    props.navigation.navigate("Driver");
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
    <View style={styles.driverLoginContainer}>
      <Logo />
      <Subtitle>
        {` LOG IN 
- DRIVER - `}
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
          onInputChange={inputChangeHandler}
          autoCapitalize="none"
        />

        <View style={styles.loginButtonContainer}>
          <MainButton style={styles.loginButton} onPress={driverLoginHandler}>
            LOGIN
          </MainButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  driverLoginContainer: {
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

export default DriverLoginScreen;
