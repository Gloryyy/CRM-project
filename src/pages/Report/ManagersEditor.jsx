import React, { useState, useEffect } from 'react'
import TextEditor from '../../components/TextEditor/TextEditor'
import { Button } from 'primereact/button'

function ManagersEditor() {
  const [editors] = useState({
    edited: true
  })

  useEffect(() => {
    return () => {
      if (editors.edited) {
        alert('saving...')
      }
    }
  }, [editors.edited])
  return (
    <div className="company-managers-panel">
      <div className="p-grid p-dir-col p-m-4">
        <div className="p-col p-shadow-2 radius">
          <div className="p-text-bold p-grid p-justify-center p-mt-1 card-title">
            Konditionen
          </div>
          <TextEditor />
          <div className="upload">
            <button
              className=""
              style={{
                border: 'none',
                padding: '6px',
                marginLeft: '96%',
                borderRadius: '6px',
                width: '45px'
              }}
            >
              <strong
                className="pi pi-cloud-upload"
                style={{ fontSize: '20px' }}
              ></strong>
            </button>
          </div>

          {/* <Button
              className="pi pi-cloud-upload"
              style={{
                marginLeft: '96%',
                fontSize: '20px',
                borderRadius: '8px'
              }}
            /> */}

          <div className="p-grid p-justify-even">
            <div className="p-col-2 file-1 p-mt-4 p-mb-3">
              <span className="pi pi-file-pdf pdf-icon"></span>{' '}
              Rahmenvertrag.pdf
            </div>
            <div className="p-col-2 file-2 p-mt-4 p-mb-3">
              <span className="pi pi-file-pdf pdf-icon"></span>{' '}
              Sonderkondition.pdf
            </div>
          </div>
        </div>
        <div className="p-col p-shadow-2 p-mt-4 radius">
          <div className="p-text-bold p-grid p-justify-center p-mt-1 card-title">
            Business Coordination
          </div>

          <TextEditor />
        </div>
      </div>
    </div>
  )
}

export default ManagersEditor
