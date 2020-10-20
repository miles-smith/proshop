import axios from 'axios';

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAILURE
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/products');

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
}

export const fetchProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: PRODUCT_DETAIL_FAILURE,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message,
    });
  }
}
