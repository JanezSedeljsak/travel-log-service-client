import {
    login as fetchLogin,
    register as fetchRegister,
    profileUpdate as fetchProfileUpdate
} from '../api';

const SET_USER = 'redux/users/SET_USER'
const LOG_OUT = 'redux/users/LOG_OUT'
const SIGN_IN = 'redux/users/SIGN_IN'
const SIGN_UP = 'redux/users/SIGN_UP'
const PROFILE_UPDATE = 'redux/users/PROFILE_UPDATE'
const PROFILE_UPDATE_COMPLETE = 'redux/users/PROFILE_UPDATE_COMPLETE'
const PROFILE_UPDATE_ERROR = 'redux/users/PROFILE_UPDATE_ERROR'
const SIGN_UP_COMPLETE = 'redux/users/SIGN_UP_COMPLETE'
const SET_LOGIN_ERROR = 'redux/users/SET_LOGIN_ERROR'
const SET_REGISTER_ERROR = 'redux/users/SET_REGISTER_ERROR'

const initialState = {
    profileName: null,
    isLoggedIn: false,
    isFetching: false,
    jwt: null,
    loginError: null,
    registerError: null,
    profileUpdateError: null
}

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                profileName: action.payload.email,
                isLoggedIn: true,
                isFetching: false,
                jwt: action.payload.jwt,
                loginError: null
            }
        case LOG_OUT:
            return initialState
        case SIGN_IN:
            return {
                ...state,
                isFetching: true,
                loginError: null
            }
        case SIGN_UP:
            return {
                ...state,
                isFetching: true,
                registerError: null
            }
        case SIGN_UP_COMPLETE:
            return {
                ...state,
                isFetching: false,
                registerError: null
            }
        case SET_LOGIN_ERROR:
            return {
                ...state,
                isFetching: false,
                loginError: action.payload.error
            }
        case SET_REGISTER_ERROR:
            return {
                ...state,
                isFetching: false,
                registerError: action.payload.error
            }
        case PROFILE_UPDATE:
            return {
                ...state,
                isFetching: true,
                profileUpdateError: null
            }
        case PROFILE_UPDATE_COMPLETE:
            return {
                ...state,
                isFetching: false,
                profileUpdateError: null
            }
        case PROFILE_UPDATE_ERROR:
            return {
                ...state,
                isFetching: false,
                profileName: action.payload.email,
                profileUpdateError: null
            }
        default:
            return state
    }
}

export default currentUser

const setUser = userObj => {
    return {
        type: SET_USER,
        payload: userObj
    }
}

const setLoginError = error => {
    return {
        type: SET_LOGIN_ERROR,
        payload: { error }
    }
}

const setRegisterError = error => {
    return {
        type: SET_REGISTER_ERROR,
        payload: { error }
    }
}

const login = user => async dispatch => {
    dispatch({ type: SIGN_IN });

    const response = await fetchLogin(user);
    if (response) {
        dispatch(setUser({
            email: user.email,
            jwt: response.data.token
        }))
    }
}

const register = user => async dispatch => {
    dispatch({
        type: SIGN_UP
    });

    const response = await fetchRegister(user);
    if (response) {
        dispatch({ type: SIGN_UP_COMPLETE })
        dispatch(login(user))
    }
}

const updatePorfile = (user, jwt) => async dispatch => {
    dispatch({
        type: PROFILE_UPDATE
    });

    const reponse = await fetchProfileUpdate(user, jwt);
    if (reponse) {
        dispatch({ type: PROFILE_UPDATE_COMPLETE, payload: { email: user.email } });
    } else {
        dispatch({ type: PROFILE_UPDATE_ERROR })
    }
}

const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const actions = {
    setUser,
    logOut,
    login,
    register,
    setLoginError,
    setRegisterError,
    updatePorfile
}
