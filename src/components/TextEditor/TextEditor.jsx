import React, { useState } from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Editor, EditorState, RichUtils } from 'draft-js'

export default function TextEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const makeBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const makeUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }

  const toolbarContentsLeft = (
    <>
      <span className="ql-formats">
        <button
          className="ql-bold"
          aria-label="Bold"
          onClick={makeBold}
          style={{
            border: 'none',
            padding: '6px',
            margin: '10px',
            fontSize: '15px',
            borderRadius: '6px',
            width: '35px'
          }}
        >
          <strong>B</strong>
        </button>
        <label
          className="ql-underline p-m-2"
          aria-label="Underline"
          onClick={makeUnderline}
        >
          <button
            style={{
              border: 'none',
              padding: '6px',
              fontSize: '15px',
              borderRadius: '6px',
              width: '35px',
              textDecoration: 'underline'
            }}
          >
            U
          </button>
        </label>
      </span>
    </>
  )

  return (
    <div id="editor">
      <Toolbar className="text-editor-toolbar" left={toolbarContentsLeft} />
      <div className="editor-content">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  )
}
