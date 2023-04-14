import { create } from 'zustand'

const useModalState = create((set) => ({
  modal: false,
  setIsOpen: (modal) => set({ modal }),
}))

export default useModalState
