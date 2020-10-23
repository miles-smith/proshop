import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_DETAILS,
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingDetails: {} }, action) => {
  switch(action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => item.product === cartItem.product);

      if(existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(
            cartItem => cartItem.product === existingItem.product ? item : cartItem
          )
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.product !== action.payload
        )
      }
    case CART_SAVE_SHIPPING_DETAILS:
      return { ...state, shippingAddress: action.payload }
    default:
      return state;
  }
};
