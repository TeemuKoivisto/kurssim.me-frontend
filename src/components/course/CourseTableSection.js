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

  renderRow(courseRow) {
    return(
      <div className="course-table__row">
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
        { coursesInRowsOf3.map((courseRow) => 
          this.renderRow(courseRow)
        )}
      </div>
    )
  }
}

export default CourseTableSection
