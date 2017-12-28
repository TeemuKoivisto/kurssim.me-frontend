import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import {
  togglePeriod,
  getCourses,
  setSelectedCourses,
  setSearchedCourse
} from '../actions/course'

import CourseTable from '../components/CourseTable'

import './FrontPage.scss'

class FrontPage extends Component {
  state = {
    selected: {
      study_field: {
        id: 'all',
        name: 'Kaikki'
      },
      view: 'list'
    },
    study_fields: [
      {
        id: 'all',
        name: 'Kaikki'
      },
      {
        id: 'tkt_kandi',
        name: 'Tietojenkäsittelytieteen kandiohjelma, 2017-18'
      },
      {
        id: 'tkt_maisteri',
        name: 'Tietojenkäsittelytieteen maisteriohjelma, 2017-18'
      },
      {
        id: 'data_maisteri',
        name: 'Datatieteen maisteriohjelma, 2017-18'
      }
    ]
  }

  setSelectedCourses(props, fieldId) {
    const { courses } = props
    if (fieldId === 'all') {
      // Filter duplicate courses since some courses belong to multiple study-fields
      let uniqueIds = []
      let filteredCourses = []
      courses.forEach(c => {
        if (!uniqueIds.includes(c.id)) {
          filteredCourses.push(c)
          uniqueIds.push(c.id)
        }
      })
      this.props.setSelectedCourses(filteredCourses)
    } else {
      const filteredCourses = courses.filter(c => c.study_field === fieldId)
      this.props.setSelectedCourses(filteredCourses)
    }
  }

  componentDidMount() {
    this.props.getCourses()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.courses !== this.props.courses) {
      this.setSelectedCourses(newProps, this.state.selected.study_field.id)
    }
  }

  handleClick(type, value, e) {
    if (type === 'selectList') {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.view = 'list'
      this.setState(stateChange)
    } else if (type === 'selectTable') {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.view = 'table'
      this.setState(stateChange)
    } else if (type === 'togglePeriod') {
      this.props.togglePeriod(value.name)
    }
  }

  handleFieldChange(e) {
    const stateChange = Object.assign({}, this.state)
    stateChange.selected.study_field = e.target.value
    this.setSelectedCourses(this.props, this.state.selected.study_field)
  }

  onSearch = debounce(
    () => {
      const searched = this._searchInput.value.toLowerCase()
      this.props.setSearchedCourse(searched)
    },
    500,
    { leading: true }
  )

  renderStudyFieldDropdown() {
    const { study_fields } = this.state
    const { study_field } = this.state.selected
    return (
      <div className="studyfield__container">
        <div className="studyfield__input-group">
          <select
            onChange={this.handleFieldChange.bind(this)}
            value={study_field.name}
            className="dropdown-default"
          >
            {study_fields.map(f => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
          <i className="fa fa-caret-down" aria-hidden="true" />
        </div>
      </div>
    )
  }

  renderPeriods() {
    const { periods } = this.props
    return (
      <div className="period__container">
        {periods.map((period, i) => (
          <button
            key={period.name}
            className={period.selected ? "btn-active" : "btn-inactive"}
            onClick={this.handleClick.bind(this, 'togglePeriod', period)}
          >
            {period.name}
          </button>
        ))}
      </div>
    )
  }

  renderSelectTableType() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this, 'selectList')}>
          Lista
        </button>
        <button onClick={this.handleClick.bind(this, 'selectTable')}>
          Taulukko
        </button>
      </div>
    )
  }

  renderSearch() {
    // const { searchInput } = this.props
    return (
      <div className="search__container">
        <div className="search__input-group">
          <input
            className="input-default"
            onChange={this.onSearch}
            ref={ref => (this._searchInput = ref)}
            placeholder={'Hae..'}
          />
          <i className="fa fa-search search__icon" aria-hidden="true" />
        </div>
      </div>
    )
  }

  render() {
    const { selectedCourses, shownCourseIds } = this.props
    return (
      <div className="front-page__container">
        <h1 className="main-header">Kurssimme</h1>
        <div className="front-page__top-container">
          {this.renderStudyFieldDropdown()}
          {this.renderPeriods()}
          {this.renderSearch()}
          <p style={{ margin: 0 }}>
            Kursseja valittu/yhteensä:{' '}
            {shownCourseIds.length + '/' + selectedCourses.length}
          </p>
        </div>
        <CourseTable />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  courses: state.course.courses,
  selectedCourses: state.course.selectedCourses,
  searchInput: state.course.searchInput,
  shownCourseIds: state.course.shownCourseIds,
  periods: state.course.periods
})

const mapDispatchToProps = dispatch => ({
  togglePeriod(period) {
    dispatch(togglePeriod(period))
  },
  getCourses() {
    dispatch(getCourses())
  },
  setSelectedCourses(courses) {
    dispatch(setSelectedCourses(courses))
  },
  setSearchedCourse(searchInput) {
    dispatch(setSearchedCourse(searchInput))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
