import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
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
      return state;
    default:
      return state;
  }
};
