import React, { Component } from 'react'

import './CourseTable.css'

class CourseTable extends Component {

  renderTableItem(course) {
    const { id, tag, name, type, credits, events } = course
    return (
      <div>
        <a href={`https://weboodi.helsinki.fi/hy/opintjakstied.jsp?OpinKohd=${id}`}
          target="_blank">
          { name + " " + credits + " op"}
        </a>
        <div className="course-table__item__study-event--container">
          { events.map((studyEvent, i) => 
            <div key={studyEvent.id + i} className="course-table__item__study-event">
              { studyEvent.open ?
                <i className="fa fa-check" aria-hidden="true"></i>
                  : 
                <i className="fa fa-times" aria-hidden="true"></i>
              }
              <a href={`https://weboodi.helsinki.fi/hy/opettaptied.jsp?OpetTap=${studyEvent.id}&html=1`}
                target="_blank">
                { studyEvent.name + " " + studyEvent.credits + " op"}
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }

  render() {
    const { courses } = this.props
    return (
      <div>
        { courses.map((course, i) => 
          <div key={course.id + i} className="course__item">
            { this.renderTableItem(course) }
          </div>
        )}
      </div>
    )
  }
}

export default CourseTable
