import React, { Component } from 'react'

import './CourseTable.css'

class CourseTable extends Component {

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
          <p>{`${start} - ${end}`}</p>
          <p>{format}</p>
        </div>
      </div>
    )
  }

  render() {
    const { courses } = this.props
    return (
      <div>
        { courses.map((course, i) => 
          // Some course id's are undefined
          <div key={i} className="course__item">
            { this.renderTableItem(course) }
          </div>
        )}
      </div>
    )
  }
}

export default CourseTable
