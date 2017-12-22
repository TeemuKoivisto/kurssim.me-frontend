import React, { Component } from 'react'
import { connect } from 'react-redux'
import debounce from 'lodash/debounce'

import {
  getCourses,
  setSelectedCourses,
  setShownCourses
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
      periods: [
        { name: 'Periodi I', selected: true },
        { name: 'Periodi II', selected: true },
        { name: 'Periodi III', selected: true },
        { name: 'Periodi IV', selected: true },
        { name: 'Periodi V', selected: true }
      ],
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
      this.props.setShownCourses(
        this.filterCourseIds(this._searchInput.value, filteredCourses)
      )
    } else {
      const filteredCourses = courses.filter(c => c.study_field === fieldId)
      this.props.setSelectedCourses(filteredCourses)
      this.props.setShownCourses(
        this.filterCourseIds(this._searchInput.value, filteredCourses)
      )
    }
  }

  filterCourseIds(input, courses) {
    const includes = text => text.toLowerCase().includes(input)
    const listIncludes = list => list.some(current => includes(current))

    return courses
      .filter(
        c =>
          includes(c.name) ||
          includes(c.tag) ||
          includes(c.type) ||
          includes(c.format) ||
          includes(c.start_date) ||
          includes(c.end_date) ||
          includes(c.credits.toString()) ||
          listIncludes(c.teachers)
      )
      .map(c => c.id)
  }

  componentDidMount() {
    this.props.getCourses()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.courses !== this.props.courses) {
      this.setSelectedCourses(newProps, this.state.selected.study_field.id)
    }
  }

  handleClick(type, e) {
    if (type === 'selectList') {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.view = 'list'
      this.setState(stateChange)
    } else if (type === 'selectTable') {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.view = 'table'
      this.setState(stateChange)
    } else if (type === 'togglePeriod') {
      console.log('toggling period!')
    }
  }

  handleFieldChange(e) {
    const stateChange = Object.assign({}, this.state)
    stateChange.selected.study_field = e.target.value
    this.setSelectedCourses(this.props, this.state.selected.study_field)
  }

  onSearch = debounce(
    () => {
      const { setShownCourses, selectedCourses } = this.props
      const searched = this._searchInput.value.toLowerCase()
      setShownCourses(this.filterCourseIds(searched, selectedCourses))
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
    const { periods } = this.state.selected
    return (
      <div className="period__container">
        {periods.map((period, i) => (
          <button
            key={period.name}
            className="btn-active"
            onClick={this.handleClick.bind(this, 'togglePeriod')}
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
  shownCourseIds: state.course.shownCourseIds
})

const mapDispatchToProps = dispatch => ({
  getCourses() {
    dispatch(getCourses())
  },
  setSelectedCourses(courses) {
    dispatch(setSelectedCourses(courses))
  },
  setShownCourses(courses) {
    dispatch(setShownCourses(courses))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)
