import axios from "axios";
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
} from "../actionTypes";

const URL = "http://localhost:8080"

// Fetch Inventory Data
export const fetchInventory = (filters) => async (dispatch) => {
  dispatch({ type: FETCH_INVENTORY_REQUEST });

  try {
    const response = await axios.get(`${URL}/inventory/`, { params: filters });
    dispatch({ type: FETCH_INVENTORY_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_INVENTORY_FAILURE, error: error.message });
  }
};

export const fetchInventoryBYId = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_INVENTORY_REQUEST' });
  
      const response = await fetch(`${URL}/inventory/${id}`);
      const data = await response.json();
  
      dispatch({ type: 'FETCH_INVENTORY_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_INVENTORY_FAILURE', payload: error.message });
    }
  };
  
// Add Inventory Data
export const addInventory = (newItem) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}/inventory/add`, newItem);
    dispatch({ type: ADD_INVENTORY, payload: response.data });
  } catch (error) {
    console.error("Error adding inventory:", error.message);
  }
};

// Update Inventory Data
export const updateInventory = (id, updatedItem) => async (dispatch) => {
  try {
    const response = await axios.patch(`${URL}/inventory/${id}`, updatedItem);
    dispatch({ type: UPDATE_INVENTORY, payload: response.data });
  } catch (error) {
    console.error("Error updating inventory:", error.message);
  }
};

// Delete Inventory Data
export const deleteInventory = (id) => async (dispatch) => {
  try {
    await axios.delete(`${URL}/inventory/${id}`);
    dispatch({ type: DELETE_INVENTORY, payload: id });
  } catch (error) {
    console.error("Error deleting inventory:", error.message);
  }
};



// Fetch OEM Data
export const fetchOem = (model) => async (dispatch) => {
  dispatch({ type: FETCH_OEM_REQUEST });

  try {
    const response = await axios.get(`${URL}/oem/`, { params: { model } });
    dispatch({ type: FETCH_OEM_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_OEM_FAILURE, error: error.message });
  }
};

// // Add OEM Data
// export const addOem = (newOem) => async (dispatch) => {
//   try {
//     const response = await axios.post("/api/oem/add", newOem);
//     dispatch({ type: ADD_OEM, payload: response.data });
//   } catch (error) {
//     console.error("Error adding OEM:", error.message);
//   }
// };
