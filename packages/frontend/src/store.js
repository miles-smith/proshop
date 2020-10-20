import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  dummy: (state = {}, action) => { return state }
});

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

export default store;
