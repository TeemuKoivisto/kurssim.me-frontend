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

  formatDate(start, end) {
    return end ? `${start}-${end}` : start
  }

  renderCourse(course) {
    const { id, name, credits, open, start_date, end_date, enrollment_start_date, enrollment_end_date, teachers, format } = course
    // TODO?: display dates dd.mm.yyyy
    const date = this.formatDate(start_date, end_date)
    const enrollmentDate = this.formatDate(enrollment_start_date, enrollment_end_date)
    // const start = new Date(start_date).toLocaleDateString()
    // const end = new Date(end_date).toLocaleDateString()
    // const enrolStart = new Date(enrollment_start_date).toLocaleDateString()
    // const enrolEnd = new Date(enrollment_end_date).toLocaleDateString()

    const visibilityClass = this.state.shownCourseDetail[course.id] ? '' : 'hidden'
    // const visibilityClass = this.state.shownCourseDetail[course.id] ? 'slide-in' : 'slide-out'

    return [
      <li className="course-list__item" onClick={this.handleShowDetailClick.bind(this, course)} key={`${course.id}`}>
        <div className="course-list__item__body col--name">
          <h5 className="course-list__item__header">
            { open ?
              <i className="fa fa-check" aria-hidden="true"></i>
                : 
              <i className="fa fa-times" aria-hidden="true"></i>
            }
            <span className="course-list__item__header-text">{ name }</span>
            <a className="course-list__item__header__link" target="_blank" rel="noopener noreferrer"
              href={`https://weboodi.helsinki.fi/hy/opettaptied.jsp?OpetTap=${id}&html=1`}>
              <i className="fa fa-external-link" aria-hidden="true"></i>
            </a>
          </h5>
        </div>
        <div className="col--date">{ date }</div>
        <div className="col--credits">{ credits }</div>
      </li>,
      <li className={`course-list__item__info ${visibilityClass}`}>
        <div className="course-list__item__format">{ format }</div>
        <div className="course-list__item__enrollment">{ `Ilmo: ${enrollmentDate}`}</div>
        <ul className="course-list__item__teacher__list">
        { teachers.map(teacher => 
          <li className="course-list__item__teacher__item" key={`${course.id}-${teacher}`}>
            {teacher}
          </li>
        )}
        </ul>
      </li>
    ]
  }

  render() {
    const { title, courses } = this.props
    return (
      <div className="course-table-section">
        <h2 className="course-table-section__header"> { title }</h2>
        <div className="course-list__container">
          <div className="course-list__header">
            <span className="col--name">Nimi</span>
            <span className="col--date">Aika</span>
            <span className="col--credits">Nopat</span>
          </div>
          <ul className="course-list">
            { courses.map((course) => this.renderCourse(course) )}
          </ul>
        </div>
      </div>
    )
  }
}

export default CourseTableSection
