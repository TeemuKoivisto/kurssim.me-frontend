import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCourses } from '../../actions/course'

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
    const { courses, bachelorCourses, masterCourses } = props
    if (selectedCourse === "tkt") {
      this.setState({ renderedCourses: courses })
    } else if (selectedCourse === "5323") {
      this.setState({ renderedCourses: bachelorCourses })      
    } else if (selectedCourse === "5351") {
      this.setState({ renderedCourses: masterCourses })      
    }
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
            <option value="tkt">Tietojenkäsittelytiede, 2017-18</option>
            <option value="5323">Tietojenkäsittelytieteen kandiohjelma, 2017-18</option>
            <option value="5351">Tietojenkäsittelytieteen maisteriohjelma, 2017-18</option>
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

  renderCourseListItem(course) {
    const { opintokohde, opetustapahtumat } = course
    return (
      <div>
        <a href={`https://weboodi.helsinki.fi/hy/opintjakstied.jsp?OpinKohd=${opintokohde.opintokohdeId}`}
          target="_blank">
          { opintokohde.opintokohteenNimi + " " + opintokohde.laajuusOp + " op"}
        </a>
        <div>
          { opetustapahtumat.map(studyEvent => 
            <div key={studyEvent.opetustapahtumaId}>
              { studyEvent.ilmoittautumiskelpoinen ?
                <i className="fa fa-check" aria-hidden="true"></i>
                  : 
                <i className="fa fa-times" aria-hidden="true"></i>
              }
              <a href={`https://weboodi.helsinki.fi/hy/opettaptied.jsp?OpetTap=${studyEvent.opetustapahtumaId}&html=1`}
                target="_blank">
                { studyEvent.opetustapahtumanNimi + " " + studyEvent.laajuusOp + " op" }
              </a>
              <div>
                <span>{ "Tyyppi: " + studyEvent.opetustapahtumanTyyppiSelite }</span>
                <br></br>
                <span>{ "Ilmoittautuminen alkaa: " + new Date(studyEvent.ilmAlkPvm).toLocaleString() }</span>
                <br></br>
                <span>{ "Ilmoittautuminen päättyy: " + new Date(studyEvent.ilmPaatPvm).toLocaleString() }</span>
                <br></br>
                <span>{ "Kurssi alkaa: " + new Date(studyEvent.alkuPvm).toLocaleString() }</span>
                <br></br>
                <span>{ "Kurssi loppuu: " + new Date(studyEvent.loppuPvm).toLocaleString() }</span>
                <br></br>
                <span>{ "Vastuuopettaja: " + studyEvent.vastuuopettaja }</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  renderCourseTableItem(course) {
    const { opintokohde, opetustapahtumat } = course
    return (
      <div>
        <a href={`https://weboodi.helsinki.fi/hy/opintjakstied.jsp?OpinKohd=${opintokohde.opintokohdeId}`}
          target="_blank">
          { opintokohde.opintokohteenNimi + " " + opintokohde.laajuusOp + " op"}
        </a>
        <div className="course-table__item__study-event--container">
          { opetustapahtumat.map(studyEvent => 
            <div key={studyEvent.opetustapahtumaId} className="course-table__item__study-event">
              { studyEvent.ilmoittautumiskelpoinen ?
                <i className="fa fa-check" aria-hidden="true"></i>
                  : 
                <i className="fa fa-times" aria-hidden="true"></i>
              }
              <a href={`https://weboodi.helsinki.fi/hy/opettaptied.jsp?OpetTap=${studyEvent.opetustapahtumaId}&html=1`}
                target="_blank">
                { studyEvent.opetustapahtumanTyyppiSelite + " " + studyEvent.laajuusOp + " op"}
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }

  renderCoursesList() {
    const { renderedCourses } = this.state
    return (
      <div>
        { renderedCourses.map((course, i) => 
          <div key={course.opintokohde.opintokohdeId + i} className="course__item">
            { this.renderCourseListItem(course) }
          </div>
        )}
      </div>
    )
  }

  renderCoursesTable() {
    const { renderedCourses } = this.state
    return (
      <div>
        { renderedCourses.map((course, i) => 
          <div key={course.opintokohde.opintokohdeId + i} className="course__item">
            { this.renderCourseTableItem(course) }
          </div>
        )}
      </div>
    )
  }

  renderCourses() {
    const { view } = this.state.selected
    if (view === "list") {
      return this.renderCoursesList()
    } else {
      return this.renderCoursesTable()      
    }
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
        { this.renderCourses() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const course_r = state.get('course')
  return {
    courses: course_r.get('courses').toJS(),
    bachelorCourses: course_r.get('bachelorCourses').toJS(),
    masterCourses: course_r.get('masterCourses').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCourses() {
    dispatch(getCourses())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage)