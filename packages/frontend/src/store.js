import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  productListReducer,
  productDetailReducer
 } from './reducers/productReducers';

 import {
   cartReducer,
 } from './reducers/cartReducers';

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};
const middleware = [thunk];

const reducers = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

export default store;
