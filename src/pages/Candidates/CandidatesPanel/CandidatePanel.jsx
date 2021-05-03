import React from 'react'
import { Panel } from 'primereact/panel'
import { connect } from 'react-redux'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { AutoComplete } from 'primereact/autocomplete'
import AutoCompleteInput from '../../../components/AutoCompleteInput/AutoCompleteInput'

import { Creators as addDataPanelActions } from '../../../redux/ducks/addDataPanel'

function CompanyPanel({ data, addDataPanelClose }) {
  const header = (
    <div className="p-grid ">
      <span className=" p-lg-2">
        <h3>{data ? data.name : null}</h3>
      </span>
      <span id="auto-span" className=" p-lg-8 p-ml-5">
        {
          <AutoComplete
            id="autocomplete-input-temp"
            value={data ? data.tags : null}
            field="name"
            multiple
            inputId="autocomplete-input"
          />
        }
      </span>
    </div>
  )

  const leftContents = (
    <>
      <div className="p-formgroup-inline">
        <div className="p-field p-mr-6">
          <label htmlFor="autoComp-2" className="" style={{ display: 'block' }}>
            Name des Kandidaten
          </label>
          <InputText id="firstname5" type="text" placeholder="" />
        </div>
        {!data ? null : (
          <div className="p-field p-ml-6">
            <label htmlFor="firstname5" className="">
              Adresse
            </label>
            <div id="autoComp-1" style={{ width: '500px' }}>
              <AutoCompleteInput />
            </div>
          </div>
        )}
        <div className="p-field">
          <label htmlFor="autoComp-2" className="">
            Technologien
          </label>
          <div id="autoComp-2" style={{ width: '500px' }}>
            <AutoCompleteInput />
          </div>
        </div>
      </div>
    </>
  )
  // Normal view
  const rightContents = (
    <>
      <Button
        className="p-button-outlined p-button-success p-mr-2"
        icon="pi pi-check"
        onClick={() => {
          addDataPanelClose()
        }}
      />
      <Button
        className={'p-button-outlined p-mr-2 p-button-danger'}
        icon={'pi pi-times'}
        onClick={() => {
          addDataPanelClose()
        }}
      />
    </>
  )

  return (
    <div id="candidate-panel">
      {data ? null : <Toolbar left={leftContents} right={rightContents} />}
      <Panel header={header}>
        <div className="p-grid p-justify-between">
          {/*  Image section */}
          <div className="img-container p-d-flex p-flex-column p-col-12 p-md-6 p-lg-2">
            <img
              className="p-as-center"
              src={`/assets/images/${data ? data.img : null}`}
              alt=""
              srcSet=""
            />
          </div>
          {/*  1. section */}
          <div className="p-col-12 p-md-6 p-lg-3">
            <div className="p-field p-grid">
              <label
                className="p-col-fixed"
                style={{ width: '100%' }}
                htmlFor="user-panel-name"
              >
                <i className="pi pi-envelope p-mr-2"></i>
                <span>{data ? data.name : 'E-mail'}</span>
              </label>
              {data ? null : (
                <div className="p-col">
                  <InputText
                    id="user-panel-name"
                    //   value={form.name.value}
                    //   disabled={!editable}
                    name="name"
                    type="text"
                    //  onChange={handleInput}
                  />
                </div>
              )}
            </div>
            <div className="p-field p-grid">
              <label
                htmlFor="user-panel-position"
                className="p-col-fixed"
                style={{ width: '100%' }}
              >
                <i className="pi pi-globe p-mr-2"></i>
                <span>{data ? data.local : 'Koordinaten'}</span>
              </label>
              {data ? null : (
                <div className="p-col">
                  <InputText
                    id="user-panel-name"
                    //   value={form.name.value}
                    //   disabled={!editable}
                    name="name"
                    type="text"
                    //  onChange={handleInput}
                  />
                </div>
              )}
            </div>

            {!data ? null : (
              <div className="p-field p-grid">
                <label className="p-col-fixed" style={{ cursor: 'pointer' }}>
                  <i className="pi pi-comments p-mr-2"></i>
                  <span>{data.contact}</span>
                </label>
              </div>
            )}
          </div>
          {/*  2. section */}
          <div className="p-col-12 p-md-6 p-lg-3">
            <div className="p-field p-grid">
              <label
                htmlFor="user-panel-id"
                className="p-col-fixed"
                style={{ width: '100px' }}
              >
                <i
                  className={`pi ${data ? 'pi-file-pdf' : 'pi-home'} p-mr-2`}
                ></i>
                <span>{data ? 'Verträge' : 'Adresse'}</span>
              </label>
              {data ? null : (
                <div className="p-col">
                  <InputText
                    id="user-panel-name"
                    //   value={form.name.value}
                    //   disabled={!editable}
                    name="name"
                    type="text"
                    //  onChange={handleInput}
                  />
                </div>
              )}
            </div>

            {data ? null : (
              <div className="p-field p-grid">
                <label
                  htmlFor="user-panel-id"
                  className="p-col-fixed"
                  style={{ width: '100px' }}
                >
                  <i className="pi pi-comments p-mr-2"></i>
                  <span>Kontakte</span>
                </label>
                {data ? null : (
                  <div className="p-col">
                    <InputText
                      id="user-panel-name"
                      //   value={form.name.value}
                      //   disabled={!editable}
                      name="name"
                      type="text"
                      //  onChange={handleInput}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="p-field p-grid">
              <label className="p-col-fixed" style={{ cursor: 'pointer' }}>
                <i className="pi pi-file p-mr-2"></i>
                <span>Resume</span>
              </label>
            </div>
          </div>
          {/*  3. section */}
          <div className="p-col-12 p-md-6 p-lg-3">
            <div className="p-field p-grid">
              <label
                htmlFor="user-panel-salary"
                className="p-col-fixed"
                style={{ width: '100%' }}
              >
                <i className="pi pi-plus-circle p-mr-2"></i>{' '}
                <span> Vertrag hochladen</span>
              </label>
              <div className="p-col"></div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  addDataPanelClose: () => dispatch(addDataPanelActions.closePanel())
})

export default connect(null, mapDispatchToProps)(CompanyPanel)
