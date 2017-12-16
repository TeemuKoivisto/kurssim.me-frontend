export const COURSE_GET_ALL = 'COURSE_GET_ALL'
export const COURSE_SET_SELECTED = 'COURSE_SET_SELECTED'
export const COURSE_SET_FILTERED = 'COURSE_SET_FILTERED'

// export const getCourses = () => ({
//   type: COURSE_GET_ALL,
//   payload: {
//     request: {
//       method: 'get',
//       url: '/course',
//     }
//   }
// })

export const getCourses = () => ({
  type: COURSE_GET_ALL,
  payload: {
    fetch: {
      exec() {
        return fetch('hy_courses.json')
          .then(res => res.text())
          .then(data => {
            const rows = data.split('\n')
            // There is an empty line at the end of the file
            if (rows[rows.length - 1].length < 10) {
              rows.splice(rows.length - 1, 1)
            } 
            const courses = rows.map(row => JSON.parse(row))
            return courses
          })
      }
    }
  }
})

export const setSelectedCourses = (courses) => ({
  type: COURSE_SET_SELECTED,
  payload: courses,
})

export const setFilteredCourses = (courses) => ({
  type: COURSE_SET_FILTERED,
  payload: courses,
})