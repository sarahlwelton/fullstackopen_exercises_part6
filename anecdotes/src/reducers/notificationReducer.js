import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { 
  newNotification,
  clearNotification 
} = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return dispatch => {
    dispatch(newNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, (timeout * 1000))
  }
}
export default notificationSlice.reducer;