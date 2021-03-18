import React from 'react';

const walletReducer = (state, action) => {
    switch(action.type){
        case 'create_error':
                return { ...state, errorMessage: action.payload};
        case 'wallet_create':
            return { errorMessage : '', token: action.payload};
        default:
            return state;
    }
};


const create = dispatch => {
    return async ({name}) => {
        try{
            const response = await trackerApi.post('/walletCreate', {name});
            console.log(response.data);
            await AsyncStorage.setItem('token', response.data._id);
            dispatch({type: 'wallet_create', payload: response.data._id});
            navigate('Wallet');


        }catch (err){
            console.log(err.response.data);
            dispatch({type: 'create_error', payload: err});
        }
    };
};

const reload = dispatch => {
    return async ({email, password}) => {
        try{
            const response = await trackerApi.post('/signup', {email, password});
            console.log(response.data);
            await AsyncStorage.setItem('token', response.data.token);
            // await AsyncStorage.getItem('token');
            dispatch({type: 'signup', payload: response.data.token});
            
            navigate('Main');


        }catch (err){
            console.log(err.response.data);
            dispatch({type: 'add_error', payload: 'Something went wrong'});
        }
    };
};
