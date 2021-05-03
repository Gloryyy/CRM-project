import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Panel } from 'primereact/panel'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Calendar } from 'primereact/calendar'
import { SelectButton } from 'primereact/selectbutton'
import { AutoComplete } from 'primereact/autocomplete'
import { Creators as addDataPanelActions } from '../../../redux/ducks/addDataPanel'
import { Creators as userActions } from '../../../redux/ducks/users'
import ConfirmationBox from '../../../components/ConfirmationBox'
import { alertMessages } from '../../../helpers/alertMessages'

const cities = [
  { name: 'Düsseldorf', code: 'r.' },
  { name: 'Köln', code: 'r.' },
  { name: 'Berlin', code: 'r.' },
  { name: 'Leipzig', code: 'r.' },
  { name: 'Dortmund', code: 'r.' },
  { name: 'München', code: 'r.' }
]

function UserPanel({ auth, user, addDataPanelClose, userActions }) {
  const thisRef = useRef()
  const [isAddPanel, setIsAddPanel] = useState(false)
  const [editable, setEditable] = useState(false)
  // Hooks to control alert messages
  const [showAlert, setShowAlert] = useState(false)
  const [alertResponse, setAlertResponse] = useState(false)
  const [message, setMessage] = useState()
  // This Hook handles all inputs
  const [formUser, setFormUser] = useState({
    photo: {
      value: user ? user.photo : '/assets/images/no_photo.png',
      valid: true
    },
    name: { value: user ? user.name : '', valid: true },
    position: { value: user ? user.position : '', valid: true },
    code: { value: user ? user.code : '', valid: true },
    email: { value: user ? user.email : '', valid: true },
    salary: { value: user ? user.salary : 0, valid: true },
    admin: { value: user ? user.admin : false, valid: true },
    active: { value: user ? user.active : true, valid: true },
    starting_date: {
      value: user ? user.starting_date : new Date(),
      valid: true
    },
    birthdate: {
      value: user ? user.birthdate : '0',
      valid: true
    }
  })
  // To find out if this component is being rendered from the AddDataPanel component.
  useEffect(() => {
    if (thisRef.current.parentNode.className === 'p-panel-content') {
      setIsAddPanel(true)
      setEditable(true)
    }
  }, [])

  // To handle the user decisions from the messagebox.
  useEffect(() => {
    if (alertResponse) {
      switch (message) {
        case alertMessages.BLOCK_USER(user.name):
        case alertMessages.UNLOCK_USER(user.name):
          blockUser()
          break

        case alertMessages.RESET_KEY(user.name):
          userActions.resetKey(user._id, auth.token)
          break

        case alertMessages.DELETE_USER(user.name):
          userActions.deleteUser(user._id, auth.token)
          break

        default:
          break
      }
    }
    return () => {
      setAlertResponse(false)
    }
  }, [alertResponse, message, userActions, user, auth.token])

  // If the user cancels the edition it will return to the previous states.
  const cancelEdition = () => {
    for (const key in user) {
      setFormUser((prevState) => ({
        ...prevState,
        [key]: { value: user[key] }
      }))
    }
  }

  const handleInput = (input) => {
    setFormUser({
      ...formUser,
      [input.currentTarget.name]: {
        value: input.currentTarget.value,
        valid: true
      }
    })
  }

  // This function creates a formated user to send to the backend.
  const createUser = () => {
    const newUser = {}
    for (const key in formUser) {
      newUser[key] = formUser[key].value
    }
    return newUser
  }

  const addNewUser = () => {
    userActions.addUser(createUser(), auth.token)
  }

  const editUser = async () => {
    await userActions
      .updateUser(createUser(), user._id, auth.token)
      .then((result) => {
        if (!result) {
          cancelEdition()
        }
      })
  }

  // Function to lock and unlock users
  const blockUser = async () => {
    await userActions
      .updateUser({ active: !formUser.active.value }, user._id, auth.token)
      .then((result) => {
        if (result) {
          setFormUser({
            ...formUser,
            active: { value: !formUser.active.value }
          })
        }
      })
  }

  // This handle the response from the confirmationBox component
  const handleShowAlert = (state, response) => {
    setShowAlert(state)
    setAlertResponse(response)
  }

  // Button groups to display in the menu bar
  const leftContents = (
    <>
      <div className="p-fluid">
        <div className="p-field">
          <InputText
            style={!editable ? { fontWeight: '700', background: 'none' } : null}
            type="text"
            placeholder="Name"
            value={formUser.name.value}
            name="name"
            disabled={!editable}
            onChange={handleInput}
          />
        </div>
      </div>
    </>
  )

  // AutoCompleteInput
  const centerContents = (
    <>
      <div className="p-fluid">
        <div className="p-field">
          <InputText
            style={!editable ? { fontWeight: '700', background: 'none' } : null}
            type="text"
            placeholder="Name"
            value={formUser.name.value}
            name="name"
            disabled={!editable}
            onChange={handleInput}
          />
        </div>
      </div>
      {/* <AutoComplete
        className=""
        value={[
          'teste2',
          'teste2',
          'test1',
          'teste2',
          'test1',
          'teste2',
          'test1',
          'teste2'
        ]} 
        field="name"
        multiple
        //  suggestions={this.state.filteredItems}
        //  completeMethod={this.searchItem}
        //  onChange={(e) => this.setState({ selectedItems: e.value })}
      /> */}
    </>
  )

  const rightContents = () => {
    if (editable) {
      return (
        <>
          {/* Button to accept changes. */}
          <Button
            className="p-button-outlined p-button-success p-mr-1"
            icon="pi pi-check"
            onClick={() => {
              if (formUser.active.value) {
                setEditable(false)
                editUser()
              }
            }}
          />
          {/* Button to cancel changes. */}
          <Button
            className="p-button-outlined p-button-help p-mr-1"
            icon="pi pi-times"
            onClick={() => {
              setEditable(false)
              cancelEdition()
            }}
          />
          {/* Button to delete the user. */}
          <Button
            className="p-button-outlined p-button-danger p-mr-1"
            icon="pi pi-trash"
            onClick={() => {
              setMessage(alertMessages.DELETE_USER(user.name))
              setShowAlert(true)
            }}
          />
        </>
      )
    }
    return (
      <>
        {/* Button to edit the user key. */}
        <Button
          className="p-button-outlined  p-mr-1"
          icon="pi pi-pencil"
          onClick={() => {
            if (formUser.active.value) {
              setEditable(true)
            }
          }}
        />

        {/* Button to reset the user key. */}
        <Button
          className="p-button-outlined p-button-help p-mr-1"
          icon="pi pi-key"
          onClick={() => {
            setMessage(alertMessages.RESET_KEY(user.name))
            setShowAlert(true)
          }}
        />

        {/* Button to block user. */}
        <Button
          className={`p-button-outlined p-mr-1 ${
            formUser.active.value ? 'p-button-secondary' : 'p-button-danger'
          } `}
          icon={`pi ${formUser.active.value ? 'pi-unlock' : 'pi-lock'}`}
          onClick={() => {
            if (formUser.active.value) {
              setMessage(alertMessages.BLOCK_USER(user.name))
            } else {
              setMessage(alertMessages.UNLOCK_USER(user.name))
            }
            setShowAlert(true)
          }}
        />
      </>
    )
  }

  // Create new user mode.
  const rightContentsAddPanel = (
    <>
      <Button
        className="p-button-outlined p-button-success p-mr-1"
        icon="pi pi-check"
        onClick={() => {
          addNewUser()
        }}
      />
      <Button
        className="p-button-outlined p-button-danger"
        icon="pi pi-times"
        onClick={() => {
          if (isAddPanel) {
            addDataPanelClose()
          }
        }}
      />
    </>
  )

  return (
    <div id="user-panel" ref={thisRef}>
      <ConfirmationBox
        showAlert={showAlert}
        handleShowAlert={handleShowAlert}
        message={message}
      />

      {/* Toolbar */}
      <div className="userpanel-toolbar p-grid">
        <div className="toolbar-left-contents p-col-2">{leftContents}</div>
        <div className="toolbar-center-contents p-col">{centerContents}</div>
        <div className="toolbar-right-contents p-col-fixed p-d-flex p-ai-center p-jc-end ">
          {isAddPanel ? rightContentsAddPanel : rightContents()}
        </div>
      </div>

      <Panel header={null}>
        <div className="p-grid p-justify-between">
          {/*  Image section */}
          <div className="img-container p-d-flex p-flex-column p-col-12 p-md-6 p-lg-2">
            <img
              className="p-as-center"
              src={formUser.photo.value}
              alt=""
              srcSet=""
            />
          </div>
          {/*  1. section */}
          <div className="p-col-12 p-md-6 p-lg-3">
            <div className="p-field p-grid">
              <label
                htmlFor={`user-panel-id${user ? '-' + user._id : ''}`}
                className="p-col-fixed"
                style={{ width: '100px' }}
              >
                ID:
              </label>
              <div className="p-col">
                <InputText
                  id={`user-panel-id${user ? '-' + user._id : ''}`}
                  value={formUser.code.value}
                  disabled={!editable}
                  name="code"
                  type="text"
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="p-field p-grid">
              <label
                htmlFor={`user-panel-email${user ? '-' + user._id : ''}`}
                className="p-col-fixed"
                style={{ width: '100px' }}
              >
                E-Mail:
              </label>
              <div className="p-col">
                <InputText
                  id={`user-panel-email${user ? '-' + user._id : ''}`}
                  value={formUser.email.value}
                  disabled={!editable}
                  name="email"
                  type="email"
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="p-field p-grid">
              <label
                className="p-col-fixed"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  alert('Anhänge etwas [not yet implemented...]')
                }}
              >
                <i className="pi pi-paperclip p-mr-1 p-mt-1"></i>
                Anhänge
              </label>
            </div>
          </div>
          {/*  2. section */}
          <div className="p-col-12 p-md-6 p-lg-3">
            <div className="p-field p-grid">
              <label
                htmlFor={`user-panel-position${user ? '-' + user._id : ''}`}
                className="p-col-fixed"
                style={{ width: '100px' }}
              >
                Position:
              </label>
              <div className="p-col">
                <InputText
                  id={`user-panel-position-${user ? '-' + user._id : ''}`}
                  value={formUser.position.value}
                  disabled={!editable}
                  name="position"
                  type="text"
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="p-field p-grid">
              <label
                className="p-col-fixed"
                htmlFor={`user-panel-role${user ? '-' + user._id : ''}`}
                style={{ width: '100px' }}
              >
                Role:
              </label>
              <div className="p-col">
                <SelectButton
                  id={`user-panel-role${user ? '-' + user._id : ''}`}
                  value={formUser.admin.value ? 'Admin' : 'User'}
                  disabled={!editable}
                  options={['Admin', 'User']}
                  name="admin"
                  onChange={(e) => {
                    let admin = false
                    if (e.value === 'Admin') {
                      admin = true
                    }
                    handleInput({
                      currentTarget: { value: admin, name: e.target.name }
                    })
                  }}
                />
              </div>
            </div>
          </div>
          {/*  3. section */}
          <div className="p-col-12 p-md-6 p-lg-3">
            <div className="p-field p-grid">
              <label
                htmlFor="user-panel-salary"
                className="p-col-fixed"
                style={{ width: '100px' }}
              >
                Gehalt:
              </label>
              <div className="p-col">
                <InputNumber
                  id="user-panel-salary"
                  value={+formUser.salary.value}
                  disabled={!editable}
                  showButtons={editable}
                  min={0}
                  name="salary"
                  mode="currency"
                  currency="EUR"
                  locale="de-DE"
                  onChange={(e) => {
                    handleInput({
                      currentTarget: { value: e.value, name: 'salary' }
                    })
                  }}
                />
              </div>
            </div>
            <div className="p-field p-grid">
              <label
                htmlFor="user-panel-starting_date"
                className="p-col-fixed"
                style={{ width: '100px' }}
              >
                Einstellung:
              </label>
              <div className="p-col">
                <Calendar
                  id="user-panel-starting_date"
                  value={new Date(formUser.starting_date.value)}
                  name="starting_date"
                  disabled={!editable}
                  showIcon={editable}
                  onChange={(e) => {
                    handleInput({
                      currentTarget: e.target
                    })
                  }}
                ></Calendar>
              </div>
            </div>
            <div className="p-field p-grid">
              <label
                htmlFor="user-panel-birthdate"
                className="p-col-fixed"
                style={{ width: '100px' }}
              >
                Geburtstag:
              </label>
              <div className="p-col">
                <Calendar
                  id="user-panel-birthdate"
                  value={new Date(formUser.birthdate.value)}
                  name="birthdate"
                  disabled={!editable}
                  showIcon={editable}
                  monthNavigator
                  yearNavigator
                  yearRange="1950:2100"
                  onChange={(e) => {
                    handleInput({
                      currentTarget: e.target
                    })
                  }}
                ></Calendar>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

UserPanel.propTypes = {
  auth: PropTypes.object,
  user: PropTypes.object,
  addDataPanelClose: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.authReducer
})

const mapDispatchToProps = (dispatch) => ({
  addDataPanelClose: () => dispatch(addDataPanelActions.closePanel()),
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)
