import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { MegaMenu } from 'primereact/megamenu'
import { Creators as authActions } from '../../redux/ducks/auth'
import { Creators as addDataPanelActions } from '../../redux/ducks/addDataPanel'
import { PATHS } from '../../helpers/constants'

function MenuBar({ authState, authLogout, addDataPanelOpen }) {
  const history = useHistory()
  const [items] = useState([
    {
      label: 'neues Unternehmen',
      icon: 'pi pi-fw pi-calendar-plus',
      command: () => {
        history.push(PATHS.UNTERNEHMEN, { action: 'OPEN_ADD_PANEL' })
        addDataPanelOpen(PATHS.UNTERNEHMEN)
      }
    },
    {
      label: 'neuer Kandidat',
      icon: 'pi pi-fw pi-user-plus',
      command: () => {
        history.push(PATHS.KANDIDATEN, { action: 'OPEN_ADD_PANEL' })
        addDataPanelOpen(PATHS.KANDIDATEN)
      }
    },
    {
      label: 'Personalberater',
      icon: 'pi pi-fw pi-users'
    },
    {
      label: 'Deals',
      icon: 'pi pi-fw pi-money-bill'
    },
    {
      label: 'Active Academy',
      icon: 'pi pi-fw pi-bookmark',
      command: () => {
        window.open('https://www.active-it-recruitment.academy', '_blank')
      }
    },
    {
      label: 'Optionen',
      icon: 'pi pi-cog',
      items: [
        [
          {
            label: 'Einstellungen',
            items: [
              { label: 'Profil', icon: 'pi pi-fw pi-user' },
              {
                label: 'Admin',
                icon: 'pi pi-fw pi-th-large',
                command: () => {
                  history.push('/admin')
                }
              }
            ]
          },
          {
            label: 'Session',
            items: [
              {
                label: 'Logout',
                icon: 'pi pi-fw pi-sign-out',
                command: () => {
                  authLogout()
                }
              }
            ]
          }
        ]
      ]
    }
  ])

  useEffect(() => {
    if (!authState.user.admin) {
      // Path to the admin label inside of items
      delete items[5].items[0][0].items[1]
    }
  }, [authState, items])

  return <MegaMenu id="topbar-menubar" model={items} orientation="horizontal" />
}

MenuBar.propTypes = {
  authState: PropTypes.object.isRequired,
  authLogout: PropTypes.func.isRequired,
  addDataPanelOpen: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authState: state.authReducer
})

const mapDispatchToProps = (dispatch) => ({
  authLogout: () => dispatch(authActions.logout()),
  addDataPanelOpen: (path) => dispatch(addDataPanelActions.openPanel(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
