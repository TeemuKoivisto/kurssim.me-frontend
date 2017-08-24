import React, { Component } from 'react'

import './CourseTable.css'

class CourseTableSection extends Component {

  renderTableItem(course) {
    const { id, name, credits, open, startDate, endDate, format } = course
    // TODO?: display dates dd.mm.yyyy
    const start = new Date(startDate).toLocaleDateString()
    const end = new Date(endDate).toLocaleDateString()

    return (
      <div className="course-table__item__study-event--container">
        <div className="course-table__item__study-event__study-event">
          { open ?
            <i className="fa fa-check" aria-hidden="true"></i>
              : 
            <i className="fa fa-times" aria-hidden="true"></i>
          }
          <a href={`https://weboodi.helsinki.fi/hy/opettaptied.jsp?OpetTap=${id}&html=1`}
            target="_blank">
            { name + " " + credits + " op"}
          </a>
        </div>
      </div>
    )
  }

  renderCourse(course) {
    const { id, name, credits, open, startDate, endDate, format } = course
    // TODO?: display dates dd.mm.yyyy
    const start = new Date(startDate).toLocaleDateString()
    const end = new Date(endDate).toLocaleDateString()
    return (
      <div className="course-table__item">
        <h5 className="course-table__item__header">
          { open ?
            <i className="fa fa-check" aria-hidden="true"></i>
              : 
            <i className="fa fa-times" aria-hidden="true"></i>
          }
          { name }
        </h5>
        <div>{ `${start}-${end}`}</div>
      </div>
    )
  }

  render() {
    const { title, courses } = this.props
    return (
      <div className="course-table-section">
        <h2>{ title }</h2>
        <div className="course-table__row">
          { courses.slice(0, 3).map(course => 
            this.renderCourse(course)
          )}
        </div>
        <div className="course-table__row">
          { courses.slice(3, 6).map(course => 
            this.renderCourse(course)
          )}
        </div>
      </div>
    )
  }
}

export default CourseTableSection
