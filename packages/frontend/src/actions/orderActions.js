import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(
      { type: ORDER_CREATE_REQUEST }
    );

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userInfo.token}`,
      }
    };

    const { data } = await axios.post("/api/orders", order, config);

    dispatch(
      { type: ORDER_CREATE_SUCCESS, payload: data }
    );
  } catch (e) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message
    });
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(
      { type: ORDER_DETAILS_REQUEST }
    );

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        "Authorization": `Bearer ${userInfo.token}`,
      }
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch(
      { type: ORDER_DETAILS_SUCCESS, payload: data }
    );
  } catch (e) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message
    });
  }
}
