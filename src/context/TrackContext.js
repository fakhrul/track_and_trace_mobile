import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import moment from "moment";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "save_tracks":
      return { isFetching: true, hasError: false };
    case "save_tracks_success":
      return { isFetching: false, hasError: false };
    case "save_tracks_failed":
      return { isFetching: false, hasError: true, message: action.message };
    case "fetch_tracks":
      return { isFetching: true, hasError: false };
    case "fetch_tracks_success":
      return { isFetching: false, hasError: false, trailList: action.trailList, product: action.product };
    case "fetch_tracks_failed":
      return { isFetching: false, hasError: true, message: action.message };
    case "fetch_organization":
      return { ...state, isFetching: true, hasError: false };
    case "fetch_organization_success":
      return { ...state, isFetching: false, hasError: false, area: action.area, activity: action.activity };
    case "fetch_organization_failed":
      return { ...state, isFetching: false, hasError: true, message: action.message, area: action.area, activity: action.activity };
    default:
      return state;
  }
};

const fetchOrganization = (dispatch) => async ({ organizationId }) => {
  dispatch({ type: "fetch_organization" });
  try {
    const response = await trackerApi.get("/areaByOrganization/" + organizationId);
    var area = response.data.data;
    const responseActivity = await trackerApi.get("/activityByOrganization/" + organizationId);
    var activity = responseActivity.data.data;
    dispatch({ type: "fetch_organization_success", area: area, activity: activity });
  } catch (err) {
    dispatch({ type: "fetch_organization_failed", message: err });
  }
};

const fetchTracks = (dispatch) => async ({ productId }) => {
  dispatch({ type: "fetch_tracks" });
  try {
    const responseProduct = await trackerApi.get("/product/" + productId);
    var product = responseProduct.data.data;

    const response = await trackerApi.get("/trail/" + productId);
    var trailList = response.data.data.trailInfoList.reverse();

    dispatch({ type: "fetch_tracks_success", trailList: trailList, product: product });
  } catch (err) {
    dispatch({ type: "fetch_tracks_failed", message: err });
  }
};
const saveTrack = (dispatch) => {
  return async ({ productId, activityId, areaId, gps }) => {
    dispatch({ type: "save_tracks" });

    try {
      const profileId = await AsyncStorage.getItem("profileId");
      const data = {
        product: {
          id: productId
        },
        activity: {
          id: activityId
        },
        area: {
          id: areaId
        },
        profile: {
          id: profileId
        },
        gps: gps,
        remarks: "",
        customJsonData: ""

      };

      await trackerApi.post("/trail", data);

      dispatch({ type: "save_tracks_success" });

    } catch (err) {
      console.log(err.message);
      dispatch({ type: "save_tracks_failed" , message: err });
    }
  };
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, fetchOrganization, saveTrack },
  { isFetching: false, hasError: false, message: "",product:null, trailList: null, area: [], activity: [] }
);
