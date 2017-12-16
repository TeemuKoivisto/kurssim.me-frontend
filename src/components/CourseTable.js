import React, { Component } from 'react'
import { connect } from 'react-redux'

import CourseTableSection from './CourseTableSection'

import './CourseTable.scss'

class CourseTable extends Component {

  state = {
    types: ['Perusopinnot', 'Aineopinnot', 'Syventävät Opinnot', 'Seminaari'],    
  }

  groupCoursesByType(courses) {
    const { types } = this.state
    const basicCourses = courses.filter(course => course.type.toLowerCase() === types[0].toLowerCase())
    const fieldCourses = courses.filter(course => course.type.toLowerCase() === types[1].toLowerCase())
    const advancedCourses = courses.filter(course =>
      // Include only advancedCourses but not seminars
      course.type.toLowerCase() === types[2].toLowerCase() && course.format.toLowerCase() !== types[3].toLowerCase()
    )
    const seminars = courses.filter(course => course.format.toLowerCase() === types[3].toLowerCase())
    return [basicCourses, fieldCourses, advancedCourses, seminars]
  }

  render() {
    const { filteredCourses } = this.props
    const { types } = this.state
    const groupedCourses = this.groupCoursesByType(filteredCourses)

    return (
      <div className="course-table">
        {types.map((type, i) => (
          <CourseTableSection title={type} courses={groupedCourses[i]} key={i}/>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedCourses: state.course.selectedCourses,
  filteredCourses: state.course.filteredCourses
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseTable)
