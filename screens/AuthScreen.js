import React, { useEffect } from "react";
import { View, StyleSheet, YellowBox, AsyncStorage, Text } from "react-native";
import Colors from "../constants/Colors";
import Logo from "../components/Logo";

import Subtitle from "../components/Subtitle";
import Input from "../components/Input";
import MainButton from "../components/MainButton";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-simple-toast";
import * as firebase from "firebase";
import "firebase/firestore";
import ApiKeys from "../constants/ApiKeys";
import { useState } from "react/cjs/react.development";

const firestore_ref = firestore().collection("Users");

const AuthScreen = (props) => {
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FirebaseConfig);
  }
  const submitValue = () => {
    const details = {
      password: password,
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
    };
    console.log(details);
  };

  async function RegisterUser() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then((loggeduser) => {
        const userdata = firestore_ref.doc(loggeduser.user.uid);
        userdata
          .set({
            name: fullname,
            email: email,
            phonenumber: phoneNumber,
          })
          .then(() => {
            alert("sucesss");
          });
      })
      .catch((error) => {
        alert(error);
      });
  }

  //this.firestoreUnsubscriber = this.ref.onSnapshot(this.onCollectionUpdate)

  return (
    <View style={styles.registerContainer}>
      <Logo />
      <Subtitle>
        {` SIGN UP 
- USER- `}
      </Subtitle>
      <View style={styles.loginContainer}>
        <Input
          id="firstname"
          autoFocus={true}
          placeholder="First-Name"
          onChangeText={(text) => {
            setFirstName(text);
          }}
          value={firstname}
        />
        <Input
          id="lastname"
          autoFocus={true}
          placeholder="Last-Name"
          onChangeText={(text) => setLastName(text)}
          initialValue=""
          value={lastname}
        />
        <Input
          id="phone"
          autoFocus={true}
          placeholder="Phone"
          autoCapitalize="none"
          onChangeText={(text) => setPhone(text)}
          initialValue=""
          value={phone}
        />
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
            onChangeText={(text) => setEmail(text)}
            initialValue=""
            value={email}
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
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <View style={styles.loginButtonContainer}>
          <MainButton style={styles.loginButton} onPress={RegisterUser}>
            <MainButton onPress={submitValue}>Let's go </MainButton>
            SIGNUP
          </MainButton>
        </View>
      </View>
    </View>
  );
};
// _VerifyAsync = async () => {
//   //await AsyncStorage.setItem('userToken', 'rider');
//   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (
//     firstname.trim() === "" ||
//     email.trim() === "" ||
//     mobile.trim() === "" ||
//     lastname.trim() === "" ||
//     password.length == ""
//   ) {
//     Toast.show(
//       "All inputs must be filled!",
//       Toast.SHORT,
//       Toast.TOP,
//       ToastStyle
//     );
//     return;
//   }
//   if (reg.test(email) === false) {
//     Toast.show("INVALID EMAIL!", Toast.SHORT, Toast.TOP, ToastStyle);
//     return;
//   }

//   firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then(
//       (authData) => {
//         //create a rider node with:firstname,lastname,phone,profile

//         if (firebase.auth().currentUser) {
//           userId = firebase.auth().currentUser.uid;
//           if (userId) {
//             AsyncStorage.setItem("userId", userId);
//             firebase
//               .database()
//               .ref(`Users/${userId}/Details`)
//               .set({
//                 firstname: firstname,
//                 lastname: lastname,
//                 email: email,
//                 phone: phone,
//                 profile_image: "default",
//               })
//               .then(
//                 () => {
//                   Toast.show("rider added successfully", Toast.SHORT);
//                   this.setState({ color: "#ffffff" });
//                   this.props.navigation.navigate("UserLogin");
//                 },
//                 (error) => {
//                   Toast.show(error.message, Toast.SHORT);
//                 }
//               );
//           }
//         }

//         //this.props.navigation.navigate('App1');
//       },
//       (error) => {
//         Toast.show("error:" + error.message, Toast.SHORT, Toast.TOP);
//       }
//     );
//};

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
