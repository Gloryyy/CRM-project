import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete } from 'primereact/autocomplete'
import { Button } from 'primereact/button'

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
  { name: 'Dortmund', code: 'r.' }
]

export default class Searchbar extends Component {
  constructor() {
    super()
    this.state = {
      termsList: [],
      searchTerms: [],
      filteredTerms: null,
      currentPath: null,
      inputTextRef: createRef()
    }
    this.filterTerms = this.filterTerms.bind(this)
    this.addSearchTerms = this.addSearchTerms.bind(this)
    this.addFilteredTerms = this.addFilteredTerms.bind(this)
    this.deleteAllSearchTerms = this.deleteAllSearchTerms.bind(this)
    this.makeSearch = this.makeSearch.bind(this)
    this.deleteSearchTerm = this.deleteSearchTerm.bind(this)
  }

  componentDidMount() {
    this.setState((state, props) => ({
      currentPath: props.currentPath,
      termsList: state.termsList.concat(cities, technologies)
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerms } = this.state

    if (prevState.searchTerms !== searchTerms) {
      const tagElements = this.state.inputTextRef.current.container.children[0]
        .childNodes

      // Give classes to each tag in the search bar to change their colors.
      if (searchTerms.length > 0) {
        searchTerms.forEach((term, i) => {
          switch (term.code) {
            case 'operator':
              tagElements[i].classList.add('p-autocomplete-token-or')
              tagElements[i].classList.remove('p-autocomplete-token-freesearch')
              break

            case null:
              tagElements[i].classList.add('p-autocomplete-token-freesearch')
              tagElements[i].classList.remove('p-autocomplete-token-or')
              break

            default:
              tagElements[i].classList.remove(
                'p-autocomplete-token-freesearch',
                'p-autocomplete-token-or'
              )
              break
          }
        })
      }
      // Validation of the last inserted term to avoid unnecessary search parameters at the end.
      if (searchTerms[0]) {
        if (searchTerms[searchTerms.length - 1].code !== 'operator') {
          this.makeSearch()
        }
      }
    }
  }

  // To add search terms from the dropdown.
  addFilteredTerms(event) {
    this.setState({ searchTerms: event.value })
  }

  // To add search terms from the inputtext.
  addSearchTerms(event) {
    const { inputEl } = this.state.inputTextRef.current
    const { searchTerms } = this.state
    let newTag = null

    if (inputEl.value.length > 1 && event.key === 'Enter') {
      if (
        inputEl.value === 'OR' &&
        searchTerms.length !== 0 &&
        searchTerms[searchTerms.length - 1].code !== 'operator'
      ) {
        newTag = {
          name: 'OR',
          code: 'operator'
        }
      } else {
        if (!searchTerms.some((e) => e.name === inputEl.value)) {
          newTag = {
            name: inputEl.value,
            code: null
          }
        }
      }
      if (newTag) {
        this.setState((state) => ({
          searchTerms: state.searchTerms.concat(newTag)
        }))
      }
      inputEl.value = ''
    }
  }

  // To exclude search terms individually
  deleteSearchTerm(event) {
    let filtered = [...this.state.searchTerms]
    const index = filtered.findIndex((e) => e.name === event.value.name)
    filtered.splice(index, 1)

    // To exclude all operators followed and at the beginning.
    filtered = filtered
      .map((val, i, arr) => {
        if (val.code === 'operator' && i === 0) {
          return null
        } else if (val.code === 'operator' && arr[i - 1].code === val.code) {
          return null
        } else {
          return val
        }
      })
      .filter(Boolean)

    // To exclude all operators at the end.
    if (filtered[0]) {
      if (filtered[filtered.length - 1].code === 'operator') {
        filtered.pop()
      }
    }
    this.setState({ searchTerms: filtered })
  }

  deleteAllSearchTerms() {
    this.setState({
      searchTerms: []
    })
    const { inputEl } = this.state.inputTextRef.current
    inputEl.value = ''
  }

  // It fetches in the database with the chosen terms.
  makeSearch() {
    const terms = this.state.searchTerms.map((term) => {
      return term.name
    })
    console.log(
      `Searching for ${terms}  in ${this.state.currentPath.split('/')[1]}.....`
    )
  }

  // This function filter the termslist depending on the inserted characters.
  filterTerms(event) {
    setTimeout(() => {
      let searchResults

      if (event.query.length === 0) {
        searchResults = [...this.state.termsList]
      } else {
        searchResults = this.state.termsList.filter((term) => {
          return term.name.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }
      this.setState({ filteredTerms: searchResults })
    }, 200)
  }

  render() {
    return (
      <div id="searchbar" className="p-d-flex">
        <Button
          icon="pi pi-search"
          className="p-button-rounded p-button-secondary p-button-outlined"
        />
        <AutoComplete
          ref={this.state.inputTextRef}
          value={this.state.searchTerms}
          suggestions={this.state.filteredTerms}
          completeMethod={this.filterTerms}
          field="name"
          multiple
          autoFocus={true}
          dropdown={false}
          onChange={this.addFilteredTerms}
          onKeyPress={this.addSearchTerms}
          onUnselect={this.deleteSearchTerm}
        />
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-secondary p-button-outlined"
          onClick={this.deleteAllSearchTerms}
        />
      </div>
    )
  }
}

Searchbar.propTypes = {
  currentPath: PropTypes.string.isRequired
}
