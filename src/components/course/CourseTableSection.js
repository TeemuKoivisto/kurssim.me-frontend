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
    return (
      <div className="course-table__item" onClick={this.handleShowDetailClick.bind(this, course)} key={`${course.id}`}>
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
        <div>{ `${start}-${end}`}</div>
        { this.state.shownCourseDetail[course.id] ? 
          <div>
            { format }
            <div>{ `Ilmo: ${enrolStart}-${enrolEnd}`}</div>
            <ul className="course-table__item__teacher__list">
            { teachers.map(teacher => 
              <li className="course-table__item__teacher__item" key={`${course.id}-${teacher}`}>
                {teacher}
              </li>
            )}
            </ul>
          </div>
            :
          null
        }
      </div>
    )
  }

  renderRow(courseRow, index) {
    return(
      <div className="course-table__row" key={`course-row-${index}`}>
        { courseRow.map(course => 
          this.renderCourse(course)
        )}
      </div>
    )
  }

  render() {
    const { title, courses } = this.props
    const coursesInRowsOf3 = []
    for(var i = 0; i < courses.length; i+=3) {
      coursesInRowsOf3.push(courses.slice(i, i+3))
    }
    return (
      <div className="course-table-section">
        <h2>{ title }</h2>
        { coursesInRowsOf3.map((courseRow, i) => 
          this.renderRow(courseRow, i)
        )}
      </div>
    )
  }
}

export default CourseTableSection
