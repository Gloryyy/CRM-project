import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Creators as authActions } from '../redux/ducks/auth'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

/* Components */
import ToastMessage from '../components/ToastMessage/ToastMessage'
import ProgressSpinner from '../components/Spinner/Spinner'
import Topbar from '../navigation/Topbar/Topbar'
import Admin from '../pages/Admin/Admin'
import Login from '../pages/Login/Login'
import Companies from '../pages/Companies/Companies'
import Candidates from '../pages/Candidates/Candidates'
import Map from '../pages/Map/Map'

function App({ auth, session }) {
  const { user, token } = auth
  let routes

  // Validates if there is a previous active session.
  useEffect(() => {
    session()
  }, [session])

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <div>
            <h4>Welcome back to the work {user.name}</h4>
          </div>
        </Route>
        {user.admin && <Route exact path="/admin" component={Admin} />}
        <Route exact path="/unternehmen" component={Companies} />
        <Route exact path="/kandidaten" component={Candidates} />
        <Route
          exact
          path="/unternehmen/:company/:coordinates"
          component={Map}
        />
        <Redirect to="/" />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Login} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div id="app">
      <ToastMessage />
      <ProgressSpinner />
      <header>
        <Topbar />
      </header>
      <main>{routes}</main>
    </div>
  )
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  session: PropTypes.func
}

const mapStateToProps = (state) => ({
  auth: state.authReducer
})

const mapDispatchToProps = (dispatch) => ({
  session: () => dispatch(authActions.session())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
