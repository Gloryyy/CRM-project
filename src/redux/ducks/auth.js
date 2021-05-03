import { Creators as messages } from './statusMessages'

// Store : Hold all the data that will be shared in the app.
// Actions: it describes what you wanna do, the definition of the action that will be taking
// Reducer : is going to check which action we did, and based on it going to transform our state, and do some modification

export const Types = {
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'auth/LOGOUT_SUCCESS',
  LOGIN_FAIL: 'auth/LOGIN_FAIL',
  USER_LOADING: 'auth/USER_LOADING',
  USER_LOADED: 'auth/USER_LOADED',
  SERVER_UNAVAILABLE: 'auth/SERVER_UNAVAILABLE'
}

// Reducer
const INITIAL_STATE = {
  isLoading: false,
  token: null,
  user: null
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.USER_LOADING:
      return { ...state, isLoading: true }

    case Types.USER_LOADED:
      return { ...state, isLoading: false }

    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token
      }

    case Types.LOGOUT_SUCCESS:
    case Types.LOGIN_FAIL:
    case Types.SERVER_UNAVAILABLE:
      return { ...state, isLoading: false, token: null, user: null }

    default:
      return state
  }
}

export const Creators = {
  login: (credencials) => {
    return async (dispatch, getState) => {
      dispatch({ type: Types.USER_LOADING })

      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_API}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credencials)
          }
        )

        const data = await response.json()
        if (response.ok) {
          const { user, token } = data
          localStorage.setItem('user', JSON.stringify({ user, token }))
          dispatch({
            type: Types.LOGIN_SUCCESS,
            payload: data
          })
          dispatch({ type: Types.USER_LOADED })
        } else {
          dispatch({
            type: Types.LOGIN_FAIL
          })
        }
        dispatch(
          messages.setMessage({
            status: response.status,
            message: data.message
          })
        )
      } catch (error) {
        dispatch({ type: Types.SERVER_UNAVAILABLE })
        dispatch(
          messages.setMessage({
            status: 503,
            message: 'Service unavailable when attempting to fetch resource.'
          })
        )
      }
    }
  },

  logout: () => {
    return (dispatch) => {
      localStorage.removeItem('user')
      dispatch({ type: Types.LOGOUT_SUCCESS })
    }
  },

  session: () => {
    return (dispatch) => {
      const data = JSON.parse(localStorage.getItem('user'))
      if (data) {
        dispatch({ type: Types.LOGIN_SUCCESS, payload: data })
      }
    }
  }
}
