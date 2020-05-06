import { createNamespacer } from "lib/reducers";
import axiosInstance from "api";
import { login as loginCall } from "api/login";

const authNameSpacer = createNamespacer("AUTH");

export const login = async (dispatch, data) => {
  try {
    const res = await loginCall(data);
    let access_token = `Bearer ${res.data.access_token}`;
    axiosInstance.defaults.headers.common["Authorization"] = access_token;
    localStorage.access_token = access_token;
    localStorage.auth_details = JSON.stringify(res.data);
    dispatch({
      type: authNameSpacer("SET_LOGGED_IN"),
      payload: {
        isLoggedIn: true,
        access_token
      }
    });
  } catch (ex) {
    throw ex;
  }
};

export const logout = dispatch => {
  localStorage.clear();
  dispatch({
    type: authNameSpacer("SET_LOGGED_IN"),
    payload: {
      isLoggedIn: false,
      access_token: null
    }
  });
};
