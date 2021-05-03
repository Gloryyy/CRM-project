import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel } from 'primereact/panel'
import { Creators as addDataPanelActions } from '../../redux/ducks/addDataPanel'
import { PATHS } from '../../helpers/constants'
import UserPanel from '../../pages/Admin/UserPanel/UserPanel'

import CompanyPanel from '../../pages/Companies/CompanyPanel/CompanyPanel'
import CandidatePanel from '../../pages/Candidates/CandidatesPanel/CandidatePanel'

function AddDataPanel(props) {
  const { openPanel, closePanel } = props.thisActions
  const { thisState } = props
  //  const history = useHistory()
  const [innerComponent, setInnerComponent] = useState(null)

  // To trigger the closing method when other page is selected.
  /* useEffect(() => {
    // Listener to know the current page url

    const locationListener = history.listen((location, action) => {
      if (location.pathname !== thisState.path) {
        closePanel()
      } else {
        openPanel()
      }
      console.log(thisState)
    })
    return () => {
      locationListener()
    }
  }, [history, thisState.path, closePanel]) */

  // Decide with component should load.
  useEffect(() => {
    switch (thisState.path) {
      case PATHS.ADMIN:
        setInnerComponent(<UserPanel />)
        break

      case PATHS.UNTERNEHMEN:
        setInnerComponent(<CompanyPanel />)
        break

      case PATHS.KANDIDATEN:
        setInnerComponent(<CandidatePanel />)
        break

      default:
        break
    }

    return () => {
      if (thisState.path) {
        closePanel()
      }
    }
  }, [thisState.path, closePanel])

  return (
    <Panel
      id="add-data-panel"
      header={null}
      toggleable
      collapsed={thisState.collapsed}
      onToggle={(e) => {
        if (e.value) {
          closePanel()
        } else {
          openPanel()
        }
      }}
    >
      {innerComponent}
    </Panel>
  )
}

AddDataPanel.propTypes = {
  thisState: PropTypes.object.isRequired,
  thisActions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  thisState: state.addDataPanelReducer
})

// Dispatch mapping
const mapDispatchToProps = (dispatch) => ({
  thisActions: bindActionCreators(addDataPanelActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddDataPanel)
