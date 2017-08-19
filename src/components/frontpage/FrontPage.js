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
      ]
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

  renderCourseItem(course) {
    const { opintokohde } = course
    const opetustapahtuma = course.opetustapahtumat.length > 0 ? course.opetustapahtumat[0] : {}
    return (
      <div>
        { opetustapahtuma.ilmoittautumiskelpoinen ?
          <i className="fa fa-check" aria-hidden="true"></i>
            : 
            <i className="fa fa-times" aria-hidden="true"></i>
        }
        { opetustapahtuma.opetustapahtumaId ?
          <a href={`https://weboodi.helsinki.fi/hy/opettaptied.jsp?OpetTap=${opetustapahtuma.opetustapahtumaId}&html=1`}
            target="_blank"
          >
            { opintokohde.opintokohteenNimi + " " + opintokohde.laajuusOp + " op"}
          </a>
            :
          <a>{ opintokohde.opintokohteenNimi }</a>
        }
        <div>
          <span>{ "Tyyppi: " + opetustapahtuma.opetustapahtumanTyyppiSelite }</span>
          <br></br>
          <span>{ "Ilmoittautuminen alkaa: " + new Date(opetustapahtuma.ilmAlkPvm).toLocaleString() }</span>
          <br></br>
          <span>{ "Ilmoittautuminen päättyy: " + new Date(opetustapahtuma.ilmPaatPvm).toLocaleString() }</span>
          <br></br>
          <span>{ "Kurssi alkaa: " + new Date(opetustapahtuma.alkuPvm).toLocaleString() }</span>
          <br></br>
          <span>{ "Kurssi loppuu: " + new Date(opetustapahtuma.loppuPvm).toLocaleString() }</span>
          <br></br>
          <span>{ "Vastuuopettaja: " + opetustapahtuma.vastuuopettaja }</span>
        </div>
      </div>
    )
  }

  renderCourses() {
    const { renderedCourses } = this.state
    return (
      <div>
        { renderedCourses.map((course, i) => 
          <div key={course.opintokohde.opintokohdeId + i} className="course__item">
            { this.renderCourseItem(course) }
          </div>
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