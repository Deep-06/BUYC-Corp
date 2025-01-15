import axios from "axios";
import { LOGIN_POST_FAILURE, LOGIN_POST_REQUEST, LOGIN_POST_SUCCESS, REGISTER_POST_SUCCESS } from "../actionTypes";

const URL = "http://localhost:8080"

export const postUserRegistration = (newUserdata) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_POST_REQUEST })
        let res = await axios.post(`${URL}/auth/register`, newUserdata);
        dispatch({ type: REGISTER_POST_SUCCESS, payload: { msg: res.status } });
        return res.status
    } catch (error) {
        dispatch({ type: LOGIN_POST_FAILURE })
        console.log(error)
    }
}

export const postUserLogin = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_POST_REQUEST })
        let res = await axios.post(`${URL}/auth/login`, userdata);
        if(res.status===200){
            localStorage.setItem('token', JSON.stringify(res.data.token));
        }
        dispatch({ type: LOGIN_POST_SUCCESS, payload: { token: res.data.token, msg: res.data.msg } });
        return res.status
    } catch (error) {
        dispatch({ type: LOGIN_POST_FAILURE })
        console.log(error)
    }
}