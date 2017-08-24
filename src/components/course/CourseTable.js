import React, { Component } from 'react'
import CourseTableSection from './CourseTableSection'

import './CourseTable.css'

class CourseTable extends Component {

  state = {
    types: ['Perusopinnot', 'Aineopinnot', 'Syventävät Opinnot', 'Seminaari']
  }

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
    const { courses } = this.props
    const { types } = this.state
    const basicCourses = courses.filter(course => course.type.toLowerCase() === types[0].toLowerCase())
    const fieldCourses = courses.filter(course => course.type.toLowerCase() === types[1].toLowerCase())
    const advancedCourses = courses.filter(course => course.type.toLowerCase() === types[2].toLowerCase())
    const seminars = courses.filter(course => course.format.toLowerCase() === types[3].toLowerCase())
    return (
      <div className="course-table">
        <CourseTableSection title={types[0]} courses={basicCourses}/>
        <CourseTableSection title={types[1]} courses={fieldCourses}/>
        <CourseTableSection title={types[2]} courses={advancedCourses}/>
        <CourseTableSection title={types[3]} courses={seminars}/>
      </div>
    )
    // return (
    //   <div>
    //     { courses.map((course, i) => 
    //       // Some course id's are undefined
    //       <div key={i} className="course__item">
    //         { this.renderTableItem(course) }
    //       </div>
    //     )}
    //   </div>
    // )
  }
}

export default CourseTable
