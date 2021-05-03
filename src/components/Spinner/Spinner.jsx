import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Dialog } from 'primereact/dialog'

// <ProgressSpinner className="p-dialog-mask p-component-overlay p-dialog-visible p-dialog-center" />

function Spinner({ authState, usersState }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (authState.isLoading || usersState.isLoading) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [authState.isLoading, usersState.isLoading])

  return (
    <Dialog
      id="modal-spinner"
      modal={true}
      visible={visible}
      header={null}
      footer={null}
      showHeader={false}
      onHide={() => setVisible(false)}
    >
      <ProgressSpinner />
    </Dialog>
  )
}

Spinner.propTypes = {
  authState: PropTypes.object,
  usersState: PropTypes.object
}

const mapStatToProps = (state) => ({
  authState: state.authReducer,
  usersState: state.usersReducer
})

export default connect(mapStatToProps, null)(Spinner)
