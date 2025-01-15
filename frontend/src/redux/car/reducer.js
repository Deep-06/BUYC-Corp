import {
    FETCH_INVENTORY_REQUEST,
    FETCH_INVENTORY_SUCCESS,
    FETCH_INVENTORY_FAILURE,
    ADD_INVENTORY,
    UPDATE_INVENTORY,
    DELETE_INVENTORY,
    FETCH_OEM_REQUEST,
  FETCH_OEM_SUCCESS,
  FETCH_OEM_FAILURE,
  } from "../actions/actionTypes";
  
  // Initial state
  const initialState = {
    items: [],
    oems: [],
    status: "idle", 
    error: null,
  };
  
  // Reducer function
  const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_INVENTORY_REQUEST:
        return { ...state, status: "loading" };
  
      case FETCH_INVENTORY_SUCCESS:
        return { ...state, status: "succeeded", items: action.payload };
  
      case FETCH_INVENTORY_FAILURE:
        return { ...state, status: "failed", error: action.error };
  
      case ADD_INVENTORY:
        return { ...state, items: [...state.items, action.payload] };
  
      case UPDATE_INVENTORY:
        return {
          ...state,
          items: state.items.map((item) =>
            item._id === action.payload._id ? action.payload : item
          ),
        };
  
      case DELETE_INVENTORY:
        return {
          ...state,
          items: state.items.filter((item) => item._id !== action.payload),
        };
        case FETCH_OEM_REQUEST:
            return { ...state, status: "loading" };
      
          case FETCH_OEM_SUCCESS:
            return { ...state, status: "succeeded", oems: action.payload };
      
          case FETCH_OEM_FAILURE:
            return { ...state, status: "failed", error: action.error };
      default:
        return state;
    }
  };
  
  export default inventoryReducer;
  