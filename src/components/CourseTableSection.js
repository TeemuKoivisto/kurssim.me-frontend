import React, { Component } from 'react'

import './CourseTable.css'

class CourseTableSection extends Component {

  state = {
    shownCourseDetail: {}
  }

  handleShowDetailClick(course, e) {
    console.log("he", course.id)
    if (this.state.shownCourseDetail[course.id]) {
      const stateChange = {...this.state}
      stateChange.shownCourseDetail[course.id] = undefined
      this.setState(stateChange)
    } else {
      const stateChange = {...this.state}
      stateChange.shownCourseDetail[course.id] = course
      this.setState(stateChange)
    }
  }

  renderCourse(course) {
    const { id, name, credits, open, startDate, endDate, enrolmentStartDate, enrolmentEndDate, teachers, format } = course
    // TODO?: display dates dd.mm.yyyy
    const start = new Date(startDate).toLocaleDateString()
    const end = new Date(endDate).toLocaleDateString()
    const enrolStart = new Date(enrolmentStartDate).toLocaleDateString()
    const enrolEnd = new Date(enrolmentEndDate).toLocaleDateString()

    const infoRow = this.state.shownCourseDetail[course.id] ? 
      <td className="course-table__item__info">
        <div className="course-table__item__format">{ format }</div>
        <div className="course-table__item__enrollment">{ `Ilmo: ${enrolStart}-${enrolEnd}`}</div>
        <ul className="course-table__item__teacher__list">
        { teachers.map(teacher => 
          <li className="course-table__item__teacher__item" key={`${course.id}-${teacher}`}>
            {teacher}
          </li>
        )}
        </ul>
      </td>
        :
      null

    return [
      <tr className="course-table__item" onClick={this.handleShowDetailClick.bind(this, course)} key={`${course.id}`}>
        <td className="course-table__item__body">
          <h5 className="course-table__item__header">
            { open ?
              <i className="fa fa-check" aria-hidden="true"></i>
                : 
              <i className="fa fa-times" aria-hidden="true"></i>
            }
            <span className="course-table__item__header-text">{ name }</span>
            <a href={`https://weboodi.helsinki.fi/hy/opettaptied.jsp?OpetTap=${id}&html=1`} target="_blank">
              <i className="fa fa-external-link" aria-hidden="true"></i>
            </a>
          </h5>
        </td>
        <td className="course-table__item__date">{ `${start}-${end}`}</td>
        <td className="course-table__item__credits">{ credits }</td>
      </tr>,
      infoRow
    ]
  }

  render() {
    const { title, courses } = this.props
    return (
      <div className="course-table-section">
        <h2>{ title }</h2>
        <table className="course-table__table">
          <thead>
            <tr>
              <td>Nimi</td>
              <td>Aika</td>
              <td>Nopat</td>
            </tr>
          </thead>
          <tbody>
            { courses.map((course) => this.renderCourse(course) )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CourseTableSection
