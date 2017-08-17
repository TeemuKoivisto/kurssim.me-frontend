export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export const logIn = (data) => ({
  type: LOG_IN,
  payload: {
    request: {
      method: 'post',
      url: '/login',
      data
    }
  }
})

export const logOut = () => ({
  type: LOG_OUT
})