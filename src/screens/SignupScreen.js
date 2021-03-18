import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm  from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {NavigationEvents} from 'react-navigation';

const SignupScreen = ({navigation}) => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);

    console.log(state);

    
    return (
        <View style={styles.container}>
            <NavigationEvents 
                onWillBlur={clearErrorMessage}
            />
            <AuthForm
                headerText = "Sign Up"
                errorMessage = {state.errorMessage}
                onSubmit = {signup}
                submitButtonText = "Sign Up"
            />
            <NavLink 
                text = "Already have an account? Sign In instead!"
                routeName = "Signin">

            </NavLink>
           
        </View>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        borderColor : 'red',
        borderWidth: 10,
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    }
});

export default SignupScreen;