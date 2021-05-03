import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './ducks/auth'
import statusMessagesReducer from './ducks/statusMessages'
import tabmenuReducer from './ducks/tabmenu'
import addDataPanelReducer from './ducks/addDataPanel'
import usersReducer from './ducks/users'

// Dev tools
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducers = combineReducers({
  authReducer,
  usersReducer,
  addDataPanelReducer,
  statusMessagesReducer,
  tabmenuReducer
})

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
