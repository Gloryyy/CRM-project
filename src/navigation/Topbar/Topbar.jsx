import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import MenuBar from '../Menubar/Menubar'
import Tabmenu from '../Tabmenu/Tabmenu'

function Topbar({ auth }) {
  const { token } = auth
  const history = useHistory()

  const handleClickOnImg = () => {
    if (token) {
      history.push('/')
    }
  }

  return (
    <div id="topbar" className="p-grid">
      <div className="logo p-col-fixed p-d-flex p-jc-center">
        <img
          style={{ cursor: `${token ? 'pointer' : 'auto'}` }}
          className="p-as-center"
          src={'assets/images/Active-small.png'}
          alt=""
          onClick={handleClickOnImg}
        />
      </div>
      <div className="top-bar-menus p-col p-d-flex p-jc-end">
        <div className="p-d-flex p-flex-column p-jc-between">
          {token && <MenuBar />}
          {token && <Tabmenu />}
        </div>
      </div>
    </div>
  )
}

Topbar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.authReducer
})

export default connect(mapStateToProps, null)(Topbar)
