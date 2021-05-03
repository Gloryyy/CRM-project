// Action types
export const Types = {
  OPEN_PANEL: 'addDataPanel/OPEN_PANEL',
  CLOSE_PANEL: 'addDataPanel/CLOSE_PANEL',
  SUBMIT: 'addDataPanel/SUBMIT',
  SUBMITTED: 'addDataPanel/SUBMITTED'
}

// Reducer
const INITIAL_STATE = {
  collapsed: true,
  // Path stores the component url from where this actions are called.
  path: null,
  submit: false
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.OPEN_PANEL:
      return { ...state, collapsed: false, submit: false, path: action.payload }

    case Types.SUBMITTED:
    case Types.CLOSE_PANEL:
      return { ...state, collapsed: true, path: null, submit: false }

    case Types.SUBMIT:
      return { ...state, submit: true }

    default:
      return state
  }
}

// Actions
export const Creators = {
  openPanel: (path) => {
    return (dispatch) => {
      dispatch({ type: Types.OPEN_PANEL, payload: path })
    }
  },
  closePanel: () => {
    return (dispatch) => {
      dispatch({ type: Types.CLOSE_PANEL })
    }
  },
  submit: () => {
    return (dispatch) => {
      dispatch({ type: Types.SUBMIT })
    }
  },
  submitted: () => {
    return (dispatch) => {
      dispatch({ type: Types.SUBMITTED })
    }
  }
}
