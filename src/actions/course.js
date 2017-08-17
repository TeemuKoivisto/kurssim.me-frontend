export const COURSE_GET_ALL = 'COURSE_GET_ALL'

export const getCourses = () => ({
  type: COURSE_GET_ALL,
  payload: {
    request: {
      method: 'get',
      url: '/course',
    }
  }
})
