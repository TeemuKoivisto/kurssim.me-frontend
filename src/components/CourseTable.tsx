// import * as React from 'react'
// import CourseTableSection from './CourseTableSection'

// import './CourseTable.css'

// class CourseTable extends React.Component {

//   state = {
//     types: ['Perusopinnot', 'Aineopinnot', 'Syventävät Opinnot', 'Seminaari'],    
//   }

//   groupCoursesByType(courses) {
//     const { types } = this.state
//     const basicCourses = courses.filter(course => course.type.toLowerCase() === types[0].toLowerCase())
//     const fieldCourses = courses.filter(course => course.type.toLowerCase() === types[1].toLowerCase())
//     const advancedCourses = courses.filter(course =>
//       // Include only advancedCourses but not seminars
//       course.type.toLowerCase() === types[2].toLowerCase() && course.format.toLowerCase() !== types[3].toLowerCase()
//     )
//     const seminars = courses.filter(course => course.format.toLowerCase() === types[3].toLowerCase())
//     return [basicCourses, fieldCourses, advancedCourses, seminars]
//   }

//   render() {
//     const { courses } = this.props
//     const { types } = this.state
//     const groupedCourses = this.groupCoursesByType(courses)
//     return (
//       <div className="course-table">
//         <CourseTableSection title={types[0]} courses={groupedCourses[0]}/>
//         <CourseTableSection title={types[1]} courses={groupedCourses[1]}/>
//         <CourseTableSection title={types[2]} courses={groupedCourses[2]}/>
//         <CourseTableSection title={types[3]} courses={groupedCourses[3]}/>
//       </div>
//     )
//   }
// }

// export default CourseTable
