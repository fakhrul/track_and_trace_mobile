import React, { useState, useContext } from "react";
import { Text, Button, Input } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import Spacer from "./Spacer";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <View style={{backgroundColor: "white"}}>
        <Spacer>
          <Text h3>{headerText}</Text>
        </Spacer>
        <Input
          label="Email"
          value={email}
          onChangeText={(newEmail) => setEmail(newEmail)}
          autoCapitalize="none"
          autoCorrect={false}
        ></Input>
        <Spacer />
        <Input
          label="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(newPassword) => setPassword(newPassword)}
          autoCapitalize="none"
          autoCorrect={false}
        ></Input>
        <Spacer>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage} </Text>
          ) : null}
        </Spacer>
        <Spacer>
          <Button
            title={submitButtonText}
            onPress={() => onSubmit({ email, password })}
          ></Button>
        </Spacer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default AuthForm;
