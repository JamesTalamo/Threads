import { create } from 'zustand'

const useMessageStore = create((set, get) => ({

    isMessageLoading: false,

    selectedUser: null,
    setSelectedUser: (name) => {
        set({ selectedUser: name })
    },

    messages: [],
    getMessages: async (selectedUserId) => {
        set({ isMessageLoading: true })

        try {
            let res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/message/getAllMessage/${selectedUserId}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || `Error: ${res.statusText}`);
            }

            let data = await res.json();
            set({ messages: data })
            set({ isMessageLoading: false })


        }
        catch (error) {
            console.error("Error fetching messages:", error.message);
        }
    },

    sendMessages: async ({ text }) => {

        const selectedUserId = get().selectedUser._id

        try {
            let res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/message/sendMessage/${selectedUserId}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ text: text })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || `Error: ${res.statusText}`);
            }

            let data = await res.json();
        } catch (error) {
            console.error("Error fetching messages:", error.message);
        }
    }





}))

export default useMessageStore