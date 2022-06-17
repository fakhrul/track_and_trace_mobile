import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import { InputCustom, ActionButtonCustom } from "../components";
import { colors } from "../utils";

const SigninScreen = ({ navigation }) => {
  const { state: { errorMessage }, signinPatient, clearErrorMessage } = useContext(AuthContext);
  const [form, setForm] = new useState({
    email: "",
    password: "",
  });

  const sendData = () => {
    signinPatient({
      email: form.email,
      password: form.password
    });
  };

  const onInputChanged = (value, input) => {
    setForm({
      ...form,
      [input]: value,
    });
  };

  // useEffect(() => {
  //   clearErrorMessage();
  // });


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("../../assets/logo.png")}></Image>
      </View>
      <Text style={styles.title}>Track and Trace</Text>
      <Text style={styles.subTitle}>(A Blockchain Based App)</Text>
      <View style={{ height: 40 }}></View>
      <InputCustom
        placeholder="Email"
        value={form.email}
        onChangeText={(value) => onInputChanged(value, 'email')}
      ></InputCustom>
      <View style={{ height: 20 }}></View>
      <InputCustom
        placeholder="Password"
        value={form.password}
        onChangeText={(value) => onInputChanged(value, 'password')}
        secureTextEntry={true}
      ></InputCustom>
      {errorMessage != "" ? (
        <Text>{errorMessage}</Text>
      ) : (null)
      }
      <View style={{ height: 50 }}></View>
      <ActionButtonCustom title="Login" onPress={sendData}></ActionButtonCustom>
      <Text style={styles.subTitle}>(v3)</Text>
    </SafeAreaView >
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.default,
    maxWidth: 200,
    backgroundColor: "white",
    marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    color: colors.text.default,
    maxWidth: 200,
    backgroundColor: "white",
    marginTop: 10,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default SigninScreen;
