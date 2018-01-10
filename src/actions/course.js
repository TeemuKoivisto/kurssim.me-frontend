export const PERIOD_TOGGLE = 'PERIOD_TOGGLE'
export const COURSE_GET_ALL = 'COURSE_GET_ALL'
export const COURSE_SET_SELECTED = 'COURSE_SET_SELECTED'
export const COURSE_SET_SEARCHED = 'COURSE_SET_SEARCHED'
export const COURSE_SET_SHOWN = 'COURSE_SET_SHOWN'

// export const getCourses = () => ({
//   type: COURSE_GET_ALL,
//   payload: {
//     request: {
//       method: 'get',
//       url: '/course',
//     }
//   }
// })

export const togglePeriod = (period) => ({
  type: PERIOD_TOGGLE,
  payload: period
})

export const getCourses = () => ({
  type: COURSE_GET_ALL,
  payload: {
    fetch: {
      exec() {
        return fetch('hy_courses.json')
          .then(res => res.text())
          .then(data => JSON.parse(data))
      }
    }
  }
})

export const setSelectedCourses = (courses) => ({
  type: COURSE_SET_SELECTED,
  payload: courses,
})

export const setSearchedCourse = (searchInput) => ({
  type: COURSE_SET_SEARCHED,
  payload: searchInput,
})

export const setShownCourses = (courses) => ({
  type: COURSE_SET_SHOWN,
  payload: courses,
})