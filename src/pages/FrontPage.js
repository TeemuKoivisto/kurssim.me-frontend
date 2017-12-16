import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCourses, setSelectedCourses, setFilteredCourses } from '../actions/course'

import CourseTable from '../components/CourseTable'

import './FrontPage.scss'

class FrontPage extends Component {

  state = {
    searchInput: "",
    selected: {
      study_field: {
        id: "all",
        name: "Kaikki"
      },
      periods: [
       { name: "Periodi I", selected: true },
       { name: "Periodi II", selected: true },
       { name: "Periodi III", selected: true },
       { name: "Periodi IV", selected: true },
       { name: "Periodi V", selected: true },
      ],
      view: "list"
    },
    study_fields: [{
      id: "all",
      name: "Kaikki"
    }, {
      id: "tkt_kandi",
      name: "Tietojenkäsittelytieteen kandiohjelma, 2017-18"
    }, {
      id: "tkt_maisteri",
      name: "Tietojenkäsittelytieteen maisteriohjelma, 2017-18"
    }, {
      id: "data_maisteri",
      name: "Datatieteen maisteriohjelma, 2017-18"
    }],
  }

  setSelectedCourses(props, fieldId) {
    const { courses } = props
    if (fieldId === "all") {
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
      this.props.setFilteredCourses(this.filterCourseIds(this.state.searchInput, filteredCourses))
    } else {
      const filteredCourses = courses.filter(c => c.study_field === fieldId)
      this.props.setSelectedCourses(filteredCourses)
      this.props.setFilteredCourses(this.filterCourseIds(this.state.searchInput, filteredCourses))
    }
  }

  filterCourseIds(input, courses) {
    return courses.filter(c => c.name.toLowerCase().includes(input) || c.tag.toLowerCase().includes(input)
      || c.type.toLowerCase().includes(input) || c.format.toLowerCase().includes(input) || c.start_date.toLowerCase().includes(input)
      || c.end_date.toLowerCase().includes(input) || c.credits.toString().includes(input)).map(c => c.id)
  }

  componentDidMount() {
    this.props.getCourses()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.courses !== this.props.courses) {
      this.setSelectedCourses(newProps, this.state.selected.study_field.id)
      this.setState({
        searchInput: "",
      })
    }
  }

  handleClick(type, e) {
    if (type === "selectList") {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.view = "list"
      this.setState(stateChange)
    } else if (type === "selectTable") {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.view = "table"
      this.setState(stateChange)
    }
  }

  handleChange(type, e) {
    if (type === "selectStudyField") {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.study_field = e.target.value
      this.setState(stateChange)
      this.setSelectedCourses(this.props, this.state.selected.study_field)
    } else if (type === "search") {
      const searched = e.target.value.toLowerCase()
      this.setState({
        searchInput: searched,
      })
      this.props.setFilteredCourses(this.filterCourseIds(searched, this.props.selectedCourses))
    }
  }

  renderStudyFieldDropdown() {
    const { study_fields } = this.state
    const { study_field } = this.state.selected
    return (
      <div className="studyfield__container">
        <div>
          <select onChange={this.handleChange.bind(this, "selectStudyField")}
            value={study_field.name}
          >
          { study_fields.map(f => 
            <option key={f.id} value={f.id}>{f.name}</option>
          )}
          </select>
        </div>
      </div>
    )
  }

  renderPeriods() {
    const { periods } = this.state.selected
    return (
      <div>
        { periods.map((period, i) => 
          <button key={period.name}>{ period.name }</button>
        )}
      </div>
    )
  }

  renderSelectTableType() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this, "selectList")}>Lista</button>
        <button onClick={this.handleClick.bind(this, "selectTable")}>Taulukko</button>
      </div>
    )
  }

  renderSearch() {
    const { searchInput } = this.state
    return (
      <div className="search__form-group">
        <h3>Hae</h3>
        <input className="search__form-group__input" onChange={this.handleChange.bind(this, "search")}
          value={searchInput}/>
      </div>
    )
  }

  render() {
    const { selectedCourses, shownCourseIds } = this.props
    return (
      <div className="front-page__container">
        <h1 className="main-header">Kurssimme</h1>      
        <div className="front-page__top-container">
          { this.renderStudyFieldDropdown() }
          { this.renderPeriods() }
          { this.renderSearch() }
          <p style={{"margin": 0}}>Kursseja valittu/yhteensä: { shownCourseIds.length + '/' + selectedCourses.length }</p>
        </div>
        <CourseTable />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  selectedCourses: state.course.selectedCourses,
  shownCourseIds: state.course.shownCourseIds
})

const mapDispatchToProps = (dispatch) => ({
  getCourses() {
    dispatch(getCourses())
  },
  setSelectedCourses(courses) {
    dispatch(setSelectedCourses(courses))
  },
  setFilteredCourses(courses) {
    dispatch(setFilteredCourses(courses))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)