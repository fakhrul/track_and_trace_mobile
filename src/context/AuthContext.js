import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../helper/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
    case "signup":
      return { errorMessage: "",token: action.token, profileId: action.profileId , profile: action.profile};
    case "signinPatient":
      return { errorMessage: "", token: action.token, profileId: action.profileId , profile: action.profile};
      break;
    case "signout":
      return { token: null, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const tokenValue = await AsyncStorage.getItem("token");
  const profileIdValue = await AsyncStorage.getItem("profileId");
  const profileValue =  await AsyncStorage.getItem("profile");
  const profileObj = JSON.parse(profileValue);
  if (tokenValue && profileIdValue && profileObj) {
    dispatch({ type: "signin", token: tokenValue, profileId: profileIdValue, profile: profileObj });
    navigate("Home");
  } else {
    navigate("anonymousFlow");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      // await AsyncStorage.getItem('token');
      dispatch({ type: "signup", payload: response.data.token });

      navigate("Main");
    } catch (err) {
      console.log(err.response.data);
      dispatch({ type: "add_error", payload: "Something went wrong" });
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      // await AsyncStorage.getItem('token');
      dispatch({ type: "signin", payload: response.data.token });

      navigate("Main");
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("profileId");
    await AsyncStorage.removeItem("profile");
    dispatch({ type: "signout" });
    navigate("anonymousFlow");
  };
};

const signinPatient = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post("/signin", {
        email,
        password,
      });
      if (response.data.status == "success") {
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("profileId", response.data.data.id);

        const jsonValue = JSON.stringify(response.data.data)
        await AsyncStorage.setItem("profile", jsonValue);

        dispatch({ type: "signinPatient", token: response.data.token, profileId: response.data.data.id, profile: response.data.data  });
        navigate("Home");
      }
      else
      {
        dispatch({
          type: "add_error",
          payload: "Something went wrong with sign in",
        });
        }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in",
      });
    }
  };
};

// const signoutPatient = (dispatch) => {
//     return async () => {
//         await AsyncStorage.removeItem('token');
//         dispatch({type: 'signout'});
//         navigate('anonymousFlow')
//     };
// };

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMessage, tryLocalSignIn, signinPatient },
  { token: null, errorMessage: "", profileId: null, profile: null }
);
