import React, { useReducer, useCallback, useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, ToastAndroid } from "react-native";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import ApiKeys from "../constants/ApiKeys";
import Toast from "react-native-simple-toast";
//import   firebase from 'react-native-firebase';
import * as firebase from "firebase";
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

const UserLoginScreen = (props) => {
  const [error, setError] = useState();

  const dispatch = useDispatch();

  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }
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

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const userLoginHandler = async () => {
    let action;
    action = authActions.userLogin(
      formState.inputValues.email,
      formState.inputValues.password
    );
    setError(null);
    try {
      await dispatch(action);
      props.navigation.navigate("User");
    } catch (err) {
      setError(err.message);
    }
  };
  // setError(null);
  // try {
  //   await dispatch(action);
  // }catch (err){
  //   setError(err.message);
  // } };
  firebase.initializeApp(ApiKeys.FirebaseConfig);
  const userLoginAsync = async () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(
        formState.inputValues.email,
        formState.inputValues.password
      )
      .then(
        () => {
          AsyncStorage.setItem("userId", firebase.auth().currentUser.id);
          props.navigation.navigate("Maps");
        },
        (error) => {
          Toast.show("error" + error.message, Toast.SHORT, Toast.TOP);
        }
      );
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
    <View style={styles.userLoginContainer}>
      <Logo />
      <Subtitle>
        {` LOG IN 
- USER - `}
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
          autoCapitalize="none"
          onInputChange={inputChangeHandler}
        />

        <View style={styles.loginButtonContainer}>
          <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          <MainButton style={styles.loginButton} onPress={userLoginAsync}>
            LOGIN
          </MainButton>
        </View>
      </View>
    </View>
  );
};

// UserLoginScreen.navigationOptions = {
//   headerTitle: "Login",
//   headerStyle: {},
// };
const styles = StyleSheet.create({
  userLoginContainer: {
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
    flexDirection: "row",
    top: 60,
    width: "100%",
  },
  forgotPasswordText: {
    color: "black",
    top: 30,
    marginHorizontal: 30,
  },
  loginButton: {
    color: "white",
    backgroundColor: Colors.darkGrey,
    width: 150,
    alignSelf: "center",
  },
});

export default UserLoginScreen;
