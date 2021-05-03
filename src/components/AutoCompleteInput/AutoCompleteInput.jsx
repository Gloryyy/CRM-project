import React, { Component } from 'react'
import { AutoComplete } from 'primereact/autocomplete'

// Dummy Listbox models
const technologies = [
  { name: 'JavaScript', code: 't.' },
  { name: 'Java', code: 't.' },
  { name: 'PHP', code: 't.' },
  { name: 'Python', code: 't.' },
  { name: 'C', code: 't.' },
  { name: 'C++', code: 't.' },
  { name: 'C#', code: 't.' },
  { name: 'Java ee', code: 't.' },
  { name: 'Nodejs', code: 't.' },
  { name: 'Ruby on Rails', code: 't.' },
  { name: 'React.js', code: 't.' },
  { name: 'JBoss', code: 't.' },
  { name: 'Kubernets', code: 't.' },
  { name: 'Docker', code: 't.' },
  { name: 'Vue.js', code: 't.' }
]

const cities = [
  { name: 'Düsseldorf', code: 'r.' },
  { name: 'Köln', code: 'r.' },
  { name: 'Berlin', code: 'r.' },
  { name: 'Leipzig', code: 'r.' },
  { name: 'Dortmund', code: 'r.' },
  { name: 'München', code: 'r.' }
]

/* *******************************************************************************************/

export default class AutoCompleteInput extends Component {
  constructor() {
    super()
    this.state = {
      itemsList: [],
      selectedItems: [],
      filteredItems: null
    }
    this.searchItem = this.searchItem.bind(this)
  }

  componentDidMount() {
    this.setState((state) => ({
      itemsList: state.itemsList.concat(technologies, cities)
    }))
  }

  searchItem(event) {
    setTimeout(() => {
      let filteredItems
      if (!event.query.trim().length) {
        filteredItems = [...this.state.itemsList]
      } else {
        filteredItems = this.state.itemsList.filter((item) => {
          return item.name.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }

      this.setState({ filteredItems })
    }, 200)
  }

  render() {
    return (
      <AutoComplete
        id="autocomplete_input"
        value={this.state.selectedItems}
        field="name"
        multiple
        suggestions={this.state.filteredItems}
        completeMethod={this.searchItem}
        onChange={(e) => this.setState({ selectedItems: e.value })}
      />
    )
  }
}
