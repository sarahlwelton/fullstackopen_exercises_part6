import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'This is a notification',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    notificationChange(state, action) {
      return action.payload
    }
  }
})

export const { setNotification, notificationChange } = notificationSlice.actions
export default notificationSlice.reducer;