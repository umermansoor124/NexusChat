import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { sidebarOpen: true, activeModal: null },
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen },
    setModal: (state, action) => { state.activeModal = action.payload }
  }
})

export const { toggleSidebar, setModal } = uiSlice.actions
export default uiSlice.reducer