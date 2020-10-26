import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_FAILURE,
  ORDER_PAYMENT_RESET,
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

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch(
      { type: ORDER_PAYMENT_REQUEST }
    );

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userInfo.token}`,
      }
    };

    const { data } = await axios.patch(`/api/orders/${id}/pay`, paymentResult, config);

    dispatch(
      { type: ORDER_PAYMENT_SUCCESS, payload: data }
    );
  } catch (e) {
    dispatch({
      type: ORDER_PAYMENT_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message
    });
  }
}
