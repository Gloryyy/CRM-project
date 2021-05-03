import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Toast } from 'primereact/toast'
import { Creators as statusMessages } from '../../redux/ducks/statusMessages'

function ToastMessage({ statusMessage, clearMessage }) {
  const warningToast = useRef()
  const successToast = useRef()

  useEffect(() => {
    if (statusMessage.status) {
      switch (statusMessage.status.toString()[0]) {
        case '2': {
          warningToast.current.clear()
          successToast.current.show({
            severity: 'success',
            summary: null,
            detail: statusMessage.message,
            life: 1800
          })
          break
        }
        case '4':
          warningToast.current.show({
            severity: 'warn',
            summary: null,
            detail: statusMessage.message,
            life: 10000
          })
          break
        case '5':
          warningToast.current.show({
            severity: 'error',
            summary: `Error: ${statusMessage.status}`,
            detail: statusMessage.message,
            life: 8000
          })
          break
        default:
          break
      }
    }
  }, [statusMessage])

  const handleDeleteMessage = () => {
    if (statusMessage.status) {
      clearMessage()
    }
  }

  return (
    <div>
      <Toast ref={warningToast} onRemove={handleDeleteMessage} />
      <Toast
        className="p-toast-top-left"
        ref={successToast}
        onRemove={handleDeleteMessage}
      />
    </div>
  )
}

ToastMessage.propTypes = {
  statusMessage: PropTypes.object,
  clearMessage: PropTypes.func
}

const mapStateToProps = (state) => ({
  statusMessage: state.statusMessagesReducer
})

const mapDispatchToProps = (dispatch) => ({
  clearMessage: () => dispatch(statusMessages.clearMessage())
})

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage)
