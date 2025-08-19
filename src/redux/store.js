 
import { createStore } from 'redux';

// Reducer function
const counterReducer = (state = { route: "page" ,element2:"page"}, action) => {
  switch (action.type) {
    case 'changeyou':
      return {...state, route: action.payloade }
    case 'change2':
        return {...state,element2 : action.payloade}
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(counterReducer);

export default store;
