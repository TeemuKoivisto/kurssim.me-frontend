import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCourses } from '../actions/course'

import CourseTable from '../components/CourseTable'

import './FrontPage.css'

class FrontPage extends Component {

  state = {
    renderedCourses: [],
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

  setRenderedCourses(props, fieldId) {
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
      this.setState({
        renderedCourses: filteredCourses,
      })
    } else {
      const filteredCourses = courses.filter(c => c.study_field === fieldId)
      this.setState({
        renderedCourses: filteredCourses
      })
    }
  }

  componentDidMount() {
    this.props.getCourses()
  }

  componentWillReceiveProps(newProps) {
    this.setRenderedCourses(newProps, this.state.selected.study_field.id)
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
      this.setRenderedCourses(this.props, this.state.selected.study_field)
    }
  }

  renderSearch() {
    const { study_fields } = this.state
    const { study_field } = this.state.selected
    return (
      <div className="course-search--container">
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

  render() {
    const { renderedCourses } = this.state
    return (
      <div className="front-page--container">
        { this.renderSearch() }
        { this.renderPeriods() }
        <div>
          <button onClick={this.handleClick.bind(this, "selectList")}>Lista</button>
          <button onClick={this.handleClick.bind(this, "selectTable")}>Taulukko</button>
        </div>
        <p>Kursseja yhteensä: { renderedCourses.length }</p>
        <h1 className="main-header">Kurssimme</h1>
        <CourseTable courses={renderedCourses}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.course.courses
})

const mapDispatchToProps = (dispatch) => ({
  getCourses() {
    dispatch(getCourses())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)