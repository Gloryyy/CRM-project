import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

export default function SchlagwortePanel() {
  const [data] = useState([
    { name: 'Düsseldorf', code: 'region' },
    { name: 'Köln', code: 'region' },
    { name: 'Berlin', code: 'region' },
    { name: 'Leipzig', code: 'region' },
    { name: 'Dortmund', code: 'region' },
    { name: 'München', code: 'region' },
    { name: 'JavaScript', code: 'technology' },
    { name: 'Java', code: 'technology' },
    { name: 'PHP', code: 'technology' },
    { name: 'Python', code: 'technology' },
    { name: 'C', code: 'technology' },
    { name: 'C++', code: 'technology' },
    { name: 'C#', code: 'technology' },
    { name: 'Java ee', code: 'technology' },
    { name: 'Nodejs', code: 'technology' },
    { name: 'Ruby on Rails', code: 'technology' },
    { name: 'React.js', code: 'technology' },
    { name: 'JBoss', code: 'technology' },
    { name: 'Kubernets', code: 'technology' },
    { name: 'Docker', code: 'technology' },
    { name: 'Vue.js', code: 'technology' }
  ])

  const rowEdit = () => {}
  return (
    <DataTable
      value={data}
      editMode="row"
      dataKey="id"
      onRowEditInit={rowEdit}
      //   onRowEditCancel={this.onRowEditCancel}
    >
      <Column
        field="name"
        header="Name"
        //  editor={(props) => this.codeEditor('products3', props)}
      ></Column>
      <Column
        field="code"
        header="Code"
        //  editor={(props) => this.nameEditor('products3', props)}
      ></Column>
    </DataTable>
  )
}
