import React, { useState, useEffect } from 'react'
import TextEditor from '../../components/TextEditor/TextEditor'

export default function Report() {
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
    <div className="company-info-panel">
      <div className="p-grid p-dir-col p-m-4">
        <div className="p-col p-shadow-2 radius">
          <div className="p-text-bold p-grid p-justify-center p-mt-1 card-title">
            Aktuelle Vakanzen
          </div>
          <TextEditor />
        </div>
        <div className="p-col p-mt-5 p-shadow-2 radius">
          <label className="p-grid p-justify-center p-text-bold p-mt-1 card-title">
            Infos zum Unternehmen
          </label>
          <TextEditor />
        </div>
      </div>
    </div>
  )
}
