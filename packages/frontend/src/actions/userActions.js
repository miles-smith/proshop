import axios from 'axios';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { data } = axios.post('/api/users/login', { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message
    });
  }
}
