import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Creators as addDataPanelActions } from '../../redux/ducks/addDataPanel'
import { TabView, TabPanel } from 'primereact/tabview'
import { Button } from 'primereact/button'
import Toolbar from '../../navigation/Toolbar/Toolbar'
import UsersPanel from './UsersPanel/UsersPanel'
import SchlagwortePanel from './SchlagwortePanel/SchlagwortePanel'
import { PATHS } from '../../helpers/constants'

import ConfirmationBox from '../../components/ConfirmationBox'

function Admin({ addDataPanelOpen }) {
  const tabViewRef = createRef()
  const [activePanel, setActivePanel] = useState(1)

  useEffect(() => {
    // To remove the header from the panel because it isn't needed here.
    tabViewRef.current.nav.remove()
  }, [tabViewRef])

  // Buttons to control the pages in the admin page p-pt-2 p-pb-4
  const buttons = (
    <div className=" p-d-flex p-jc-center p-flex-column">
      <div className="admin-button-group  ">
        <Button
          className="p-button-text btn-schagworte"
          label="Schlagworte"
          icon="pi pi-tags"
        />
        <Button
        className="btn-ad-tag p-mr-2"
        icon="pi pi-plus-circle"
        onClick={() => {
          setActivePanel(0)
        }}
        />
        <Button
          className="btn-users p-button-text"
          label="Benutzer"
          icon="pi pi-users"
          onClick={() => {
            setActivePanel(1)
          }}
        />
        <Button
          className="btn-add-user p-button-text p-mr-2"
          icon="pi pi-user-plus"
          onClick={() => {
            addDataPanelOpen(PATHS.ADMIN)
          }}
        />
      </div>
    </div>
  )

  return (
    <div id="admin-page">
      <Toolbar Subcomponent={buttons} />
      <ConfirmationBox />
      <div className="card">
        <TabView
          ref={tabViewRef}
          activeIndex={activePanel}
          onTabChange={(e) => {
            setActivePanel(e.index)
          }}
        >
          {/* This panel shows tags administration */}
          <TabPanel className="user-admin-panel">
            <SchlagwortePanel />
          </TabPanel>
          {/* This panel shows users administration */}
          <TabPanel className="tag-admin-panel">
            <UsersPanel />
          </TabPanel>
        </TabView>
      </div>
    </div>
  )
}
Admin.propTypes = {
  addDataPanelOpen: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  addDataPanelOpen: (path) => dispatch(addDataPanelActions.openPanel(path))
})

export default connect(null, mapDispatchToProps)(Admin)
