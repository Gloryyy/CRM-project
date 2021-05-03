import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

export default function ConfirmationBox({
  showAlert,
  handleShowAlert,
  message
}) {
  const [displayAlert, setDisplayAlert] = useState(false)
  const [thisMessage, setThisMessage] = useState(
    'Are you sure you want to proceed?'
  )

  useEffect(() => {
    setDisplayAlert(showAlert)
    if (message) {
      setThisMessage(message)
    }
  }, [showAlert, message])

  const handleAlert = (state, response) => {
    handleShowAlert(state, response)
    setDisplayAlert(state)
  }

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Nein"
          icon="pi pi-times"
          onClick={() => {
            handleAlert(false, false)
          }}
          className="p-button-text"
        />
        <Button
          label="Ja"
          icon="pi pi-check"
          onClick={() => handleAlert(false, true)}
          autoFocus
        />
      </div>
    )
  }

  return (
    <Dialog
      header="Konfirmation"
      visible={displayAlert}
      modal
      style={{ width: '350px' }}
      footer={renderFooter('displayAlert')}
      onHide={() => handleAlert(false, false)}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle p-mr-3"
          style={{ fontSize: '2rem' }}
        />
        <span>{thisMessage}</span>
      </div>
    </Dialog>
  )
}

ConfirmationBox.propTypes = {
  showAlert: PropTypes.bool,
  handleShowAlert: PropTypes.func,
  message: PropTypes.string
}
