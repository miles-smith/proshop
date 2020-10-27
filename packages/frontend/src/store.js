import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
} from './reducers/userReducers';

import {
  productListReducer,
  productDetailReducer
 } from './reducers/productReducers';

 import {
   cartReducer,
 } from './reducers/cartReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPaymentReducer,
  orderListReducer,
} from './reducers/orderReducers';

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingDetailsFromStorage = localStorage.getItem("shippingDetails")
  ? JSON.parse(localStorage.getItem("shippingDetails"))
  : {};

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
  cart: {
    cartItems: cartItemsFromStorage,
    shippingDetails: shippingDetailsFromStorage
  },
};
const middleware = [thunk];

const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  orderList: orderListReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPayment: orderPaymentReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

export default store;
