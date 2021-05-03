import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as TabmenuActions } from '../../redux/ducks/tabmenu'
import { TabMenu } from 'primereact/tabmenu'

function Tabmenu({ tabmenuState, tabmenuActions }) {
  const location = useLocation()
  const history = useHistory()
  const { model, activeTab } = tabmenuState
  const { setSelectedTab } = tabmenuActions

  useEffect(() => {
    setSelectedTab(location.pathname)
  }, [location, setSelectedTab])

  const handleActiveTab = (urlPath) => {
    history.push(urlPath)
  }

  return (
    <TabMenu
      id="topbar-tabmenu"
      model={model}
      activeItem={activeTab}
      onTabChange={(e) => handleActiveTab(e.value.path)}
    />
  )
}

Tabmenu.propTypes = {
  tabmenuState: PropTypes.object.isRequired,
  tabmenuActions: PropTypes.object.isRequired
}

// State mapping
const mapStateToProps = (state) => ({
  tabmenuState: state.tabmenuReducer
})

// Dispatch mapping
const mapDispatchToProps = (dispatch) => ({
  tabmenuActions: bindActionCreators(TabmenuActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabmenu)
