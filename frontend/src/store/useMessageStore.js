import { create } from 'zustand'

const useMessageStore = create((set) => ({
    messages: []
}))

export default useMessageStore