import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Searchbar from '../../components/Searchbar/Searchbar'
import AddDataPanel from '../../components/AddDataPanel/AddDataPanel'

function Toolbar({ Subcomponent }) {
  const location = useLocation()
  return (
    <div id="toolbar">
      <div className="toolbar-searchbar p-d-flex p-jc-between">
        <Searchbar currentPath={location.pathname} />
        {Subcomponent && Subcomponent}
      </div>
      <div className="toolbar-dropdown-panel">
        <AddDataPanel currentPath={location.pathname} />
      </div>
    </div>
  )
}

Toolbar.propTypes = {
  Subcomponent: PropTypes.object
}

export default Toolbar
