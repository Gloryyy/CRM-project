// Action types
export const Types = {
  UNTERNEHMEN_TAB: 'tabmenu/UNTERNEHMEN_TAB',
  KANDIDATEN_TAB: 'tabmenu/KANDIDATEN_TAB',
  UNKNOWN_TAB: 'tabmenu/UNKNOWN_TAB'
}

// Reducer
const INITIAL_STATE = {
  model: [
    {
      label: 'Unternehmen',
      icon: 'pi pi-fw pi-briefcase',
      path: '/unternehmen'
    },
    {
      label: 'Kandidaten',
      icon: 'pi pi-fw pi-users',
      path: '/kandidaten'
    }
  ],
  activeTab: {}
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.UNTERNEHMEN_TAB:
      return { ...state, activeTab: state.model[0] }

    case Types.KANDIDATEN_TAB:
      return { ...state, activeTab: state.model[1] }

    case Types.UNKNOWN_TAB:
      return { ...state, activeTab: {} }

    default:
      return state
  }
}

// Actions
export const Creators = {
  setSelectedTab: (url) => {
    const validPaths = {
      '/unternehmen': Types.UNTERNEHMEN_TAB,
      '/kandidaten': Types.KANDIDATEN_TAB
    }
    return (dispatch) => {
      if (validPaths[url]) {
        dispatch({ type: validPaths[url] })
      } else {
        dispatch({ type: Types.UNKNOWN_TAB })
      }
    }
  }
}
