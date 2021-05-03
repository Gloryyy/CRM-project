import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Panel } from 'primereact/panel'
import { connect } from 'react-redux'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'

import { Creators as addDataPanelActions } from '../../../redux/ducks/addDataPanel'
import Report from '../../Report/Report'
import ManagersEditor from './../../Report/ManagersEditor'

function CompanyPanel({ data, addDataPanelClose }) {
  const history = useHistory()
  const [displayInfo, setDisplayInfo] = useState(true)
  const [editable, setEditable] = useState(false)
  const [formCompany, setFormCompany] = useState({
    name: { value: data ? data.name : '', valid: true },
    image: {
      value: data ? data.img : '/assets/images/no_photo.png',
      valid: true
    },
    tags: { value: data ? data.tags : '', valid: true },
    location: { value: data ? data.location : '', valid: true },
    linkToLocal: { value: data ? data.linkToLocal : '', valid: true },
    select: { value: data ? data.select : false, valid: true },
    web: { value: data ? data.web : '', valid: true },
    email: { value: data ? data.email : '', valid: true },
    protokoll: { value: data ? data.protokoll : '', valid: true },
    info: { value: data ? data.info : '', valid: true },
    business: { value: data ? data.business : '', valid: true }
  })

  console.log(formCompany)
  const handleInput = (input) => {
    console.log(input.currentTarget.name)
    setFormCompany({
      ...formCompany,
      [input.currentTarget.name]: {
        value: input.currentTarget.value,
        valid: true
      }
    })
  }
  const handleBodyInput = (input) => {
    setFormCompany({
      ...formCompany,
      [input.currentTarget.name]: {
        value: input.currentTarget.value,
        valid: true
      }
    })
  }

  // If the user cancels the edition it will return to the previous states.
  const cancelEdition = () => {
    for (const key in user) {
      setFormCompany((prevState) => ({
        ...prevState,
        [key]: { value: user[key] }
      }))
    }
  }
  const [displayManagers, setDisplayManagers] = useState(true)

  const leftContents = (
    <>
      <div className="p-field-name">
        <InputText
          className={editable ? 'showInput' : 'hiddenBorder'}
          type="text"
          name="name"
          placeholder="Give name of company"
          value={formCompany.name.value}
          onChange={handleInput}
        />
      </div>
    </>
  )
  const centerContents = (
    <>
      <div className="p-fluid">
        <div className="p-field-local-tech p-ml-4 p-mr-4">
          <InputText
            className={editable ? 'showInput' : 'hiddenBorder'}
            /* style={!editable ? { fontWeight: '700', background: 'none' } : null} */
            type="text"
            placeholder="Name"
            value={formCompany.tags.value}
            name="tags"
            onChange={handleInput}
          />
        </div>
      </div>
    </>
  )
  const rightContents = (
    <>
      <div className="p-field-button p-mr-1">
        <Button
          className="p-button-outlined p-button-secondary p-mr-2 "
          icon="pi pi-pencil"
          onClick={() => {
            setEditable(!editable)
          }}
        />
        <Button
          className={'p-button-outlined p-button-secondary'}
          icon={'pi pi-times'}
          onClick={() => {
            cancelEdition()
          }}
        />
      </div>
    </>
  )
  return (
    <div className="company-panel">
      <Panel header={null} className="p-m-5 ">
        {/* Toolbar */}
        <div className="company-panel-toolbar p-grid">
          <div className="toolbar-left-contents p-col-2 ">{leftContents}</div>
          <div className="toolbar-center-contents p-col">{centerContents}</div>
          <div className="toolbar-right-contents p-col-fixed p-d-flex p-ai-center p-jc-end">
            {rightContents}
          </div>
        </div>

        {/* Body Part */}
        <div className="mainContainer p-grid p-col-12">
          {/* First Part : thumbs up and checkbox****************************************** */}
          <div className="checkBoxThumbsPart p-col-1 p-d-flex p-flex-column p-jc-evenly">
            <div className="thumbsDiv p-ml-4">
              <i className="pi pi-thumbs-up"></i>
            </div>
            <div className="checkBoxDiv p-ml-4">
              <Checkbox></Checkbox>
            </div>
          </div>
          {/* Image Part ************************************************************** */}
          <div className="imagePart p-col-2 p-d-flex p-flex-column p-jc-evenly">
            <div className="img-container p-m-2">
              <img
                src={`/assets/images/companies/${
                  formCompany ? formCompany.image.value : 'Image not uploaded'
                }`}
                alt=""
                srcSet=""
              />
            </div>
          </div>
          {/* Company web site and its Protokoll Part ******************************** */}
          <div className="WebProtokolPart p-col-3 p-d-flex p-flex-column p-jc-evenly">
            <div className="siteDiv ">
              <i className={editable ? 'hidden' : 'showIcon pi pi-cloud p-mr-2'}></i>
              <a
                href={formCompany.web.value}
                className={editable ? 'hidden' : 'shown'}
              >
                Website / Jobpage
              </a>
              <label className={editable ? 'showIcon p-mr-2' : 'hidden'}>
                Web Page: 
              </label>
              <InputText
                className={editable ? 'showInput' : 'hiddenInput'}
                value={formCompany ? formCompany.web.value : 'value not loaded'}
                name="web"
                type="text"
                onChange={handleInput}
              />
            </div>
            <div>
              <i className={editable ? 'hidden' : 'showIcon pi pi-users p-mr-2'}></i>
              <a href={null} className={editable ? 'hidden' : 'shown'}>
                Protokoll & Manager
              </a>
              <label className={editable ? 'showIcon p-mr-4' : 'hidden'}>Name:</label>
              <InputText
                className={
                  editable ? 'showInput p-mt-2 p-ml-3 p-mr-5' : 'hiddenInput'
                }
                value={
                  formCompany ? formCompany.name.value : 'value not loaded'
                }
                name="adresse"
                type="text"
                onChange={handleInput}
              />  
            </div>
          </div>
          {/* Company local and its information Part ******************************** */}
          <div className="localInfoPart p-col-3 p-d-flex p-flex-column p-jc-evenly">
            <div>
              <i
                className={editable ? 'hidden' : 'showIcon pi pi-globe p-mr-2'}
              ></i>
              <a
                href={formCompany.linkToLocal.value}
                className={editable ? 'hidden' : 'shown'}
              >
                {formCompany.location.value.region}
              </a>
              
              <label className={editable ? 'showIcon p-mr-2' : 'hidden'}>
                Address:
              </label>
              <InputText
                className={editable ? 'showInput p-mt-2 p-mr-6' : 'hiddenInput'}
                value={
                  formCompany
                    ? formCompany.location.value.address
                    : 'value not loaded'
                }
                name="adresse"
                type="text"
                onChange={(e) => {
                  const newLocation = formCompany.location.value
                  handleInput({
                    currentTarget: {
                      name: 'address',
                      value: Object.assign(newLocation, {
                        address: e.target.value
                      })
                    }
                  })
                }}
              />
            </div>
            <div>
              <i className={editable ? 'hidden' : 'showIcon pi pi-exclamation-circle p-mr-2'}></i>
              <a
                href="#"
                className={editable ? 'hidden' : 'shown'}
                onClick={() => {
                  setDisplayInfo(!displayInfo)
                }}
              >
                Infos zum Unternehmen
              </a>
              <label className={editable ? 'showIcon p-mr-2' : 'hidden'}>
                PosCod:
              </label>
              <InputText
                className={editable ? 'showInput p-mt-2 p-mr-6' : 'hiddenInput'}
                value={
                  formCompany
                    ? formCompany.location.value.postalCode
                    : 'value not loaded'
                }
                name="postalCode"
                type="text"
                onChange={(e) => {
                  const newLocation = formCompany.location.value
                  handleInput({
                    currentTarget: {
                      name: 'postalCode',
                      value: Object.assign(newLocation, {
                        postalCode: e.target.value
                      })
                    }
                  })
                }}
              />
            </div>
          </div>

          {/*  3. section------------------------------------------------------------------------------------------------ */}
          <div className="emailPart p-col-3 p-d-flex p-flex-column p-jc-evenly">
            <div className="siteDiv ">
                <i className={editable ? 'hidden' : 'showIcon pi pi-plus-circle p-mr-2'}></i>
                <a
                  href={null}
                  className={editable ? 'hidden' : 'shown'}
                >
                  jobs@valtech-mobility.com
                </a>

              <label className={editable ? 'showIcon p-mr-2' : 'hidden'}>
                City:
              </label>
              <InputText
                className={editable ? 'showInput p-mt-1 p-ml-4' : 'hiddenInput'}
                value={
                  formCompany
                    ? formCompany.location.value.region
                    : 'value not loaded'
                }
                name="region"
                type="text"
                onChange={(e) => {
                  const newLocation = formCompany.location.value
                  handleInput({
                    currentTarget: {
                      name: 'location',
                      value: Object.assign(newLocation, {
                        region: e.target.value
                      })
                    }
                  })
                }}
              />
            </div>
            <div>
              <i className={editable ? 'hidden' : 'showIcon pi pi-envelope p-mr-2'}></i>
              <a
                href="#"
                className={editable ? 'hidden' : 'shown'}
                onClick={() => {
                  setDisplayManagers(!displayManagers)
                }}
              >
                Business Coordination
              </a>
            </div>
            
          </div>
        </div>
        <Panel
          className="sliding-panel"
          toggleable
          collapsed={displayInfo}
          onToggle={(e) => {
            setDisplayInfo(e.value)
          }}
        >
          <Report />
        </Panel>

        <Panel
          className="sliding-panel"
          toggleable
          collapsed={displayManagers}
          onToggle={(e) => {
            setDisplayManagers(e.value)
          }}
        >
          <ManagersEditor />
        </Panel>
      </Panel>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addDataPanelClose: () => dispatch(addDataPanelActions.closePanel())
})

export default connect(null, mapDispatchToProps)(CompanyPanel)
