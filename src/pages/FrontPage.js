import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCourses } from '../actions/course'

import CourseTable from '../components/CourseTable'

import './FrontPage.css'

class FrontPage extends Component {

  state = {
    renderedCourses: [],
    selected: {
      course: "tkt",
      periods: [
       { name: "Periodi I", selected: true },
       { name: "Periodi II", selected: true },
       { name: "Periodi III", selected: true },
       { name: "Periodi IV", selected: true },
       { name: "Periodi V", selected: true },
      ],
      view: "list"
    }
  }

  setRenderedCourses(props, selectedCourse) {
    const { courses } = props
    this.setState({
      renderedCourses: courses,
    })
    // this.setState({ renderedCourses: this.filterCourses(courses) })
    // if (selectedCourse === "tkt") {
    // } else if (selectedCourse === "5323") {
    //   this.setState({ renderedCourses: bachelorCourses })      
    // } else if (selectedCourse === "5351") {
    //   this.setState({ renderedCourses: masterCourses })      
    // }
  }

  componentDidMount() {
    this.props.getCourses()
  }

  componentWillReceiveProps(newProps) {
    this.setRenderedCourses(newProps, this.state.selected.course)
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
    if (type === "selectCourse") {
      const stateChange = Object.assign({}, this.state)
      stateChange.selected.course = e.target.value
      this.setState(stateChange)
      this.setRenderedCourses(this.props, this.state.selected.course)
    }
  }

  renderSearch() {
    const { course } = this.state.selected
    return (
      <div className="course-search--container">
        <div>
          <select onChange={this.handleChange.bind(this, "selectCourse")}
            value={course}
          >
            <option value="all">Kaikki</option>
            <option value="tktl">Tietojenkäsittelytieteen laitos</option>
            <option value="kandi">Tietojenkäsittelytieteen kandiohjelma, 2017-18</option>
            <option value="maisteri">Tietojenkäsittelytieteen maisteriohjelma, 2017-18</option>
            <option value="data">Datatieteen maisteriohjelma, 2017-18</option>
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
    const { courses } = this.props
    return (
      <div className="front-page--container">
        { this.renderSearch() }
        { this.renderPeriods() }
        <div>
          <button onClick={this.handleClick.bind(this, "selectList")}>Lista</button>
          <button onClick={this.handleClick.bind(this, "selectTable")}>Taulukko</button>
        </div>
        <p>Kursseja yhteensä: { courses.length }</p>
        <p>Näytettyjä kursseja: { renderedCourses.length }</p>
        <h1>Kurssimme</h1>
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