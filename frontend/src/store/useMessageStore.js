import { create } from 'zustand'
import { io } from 'socket.io-client'
import { toast } from 'react-hot-toast'

const socketUrl = import.meta.env.VITE_BACKEND_URI || 'http://localhost:3000'

const useMessageStore = create((set, get) => ({
    onlineUsers: [],

    currentUser: null,
    setCurrentUser: (user) => (set({ currentUser: user })),

    socket: null,

    isMessageLoading: false,

    selectedUser: null,
    setSelectedUser: (name) => {
        set({ selectedUser: name })
    },

    messageConnector: async () => {
        const { socket, messages } = get()
        const selectedUserId = get().selectedUser?._id
        if (!selectedUserId) return

        socket.on('newMessage', (message) => {
            set((state) => ({
                messages: [...state.messages, message] // Ensures the latest messages state is used
            }));
        });
    },

    messages: [],
    getMessages: async (selectedUserId) => {
        const { messageConnector } = get()

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
        const { messages } = get()
        console.log(socketUrl)
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

            set({ messages: [...messages, data] })
        } catch (error) {
            console.error("Error fetching messages:", error.message);
        }
    },

    connectSocket: async () => {
        const { currentUser, messageConnector } = get()


        if (currentUser !== null) {
            const socket = io(socketUrl, {
                query: {
                    userId: currentUser._id
                }
            })

            socket.connect()
            set({ socket: socket })

            socket.on('getOnlineUsers', (users) => {
                set({ onlineUsers: users })
            })

            socket.on('notification', (message) => {

                const data = { username: message?.username, text: message?.message?.text }
                console.log(data)

                toast.success(`NEW MESSAGE!\n ${data.username} : ${data.text}`, {
                    style: {
                        background: "#3b82f6", // Blue background
                        color: "#fff", // White text
                        fontWeight: "bold",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                    },
                    icon: null
                });
            })

            messageConnector()
        }

    },
    disconnectSocket: async () => {
        const { currentUser, socket } = get()

        if (currentUser === null && socket) {
            socket.disconnect();
            set({ socket: null });
        }
    }





}))

export default useMessageStore