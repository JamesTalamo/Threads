
import Message from '../models/Message.model.js'
import { getReceiverSocketId, io } from '../config/socket.js'

export const getAllMessages = async (req, res) => {
    const myId = req.user.id.toString()
    const { id: otherUserId } = req.params

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: myId }
        ]
    })
        .populate('senderId', 'profilePicture username')
        .populate('receiverId', 'profilePicture username')

    res.status(200).json(messages)
}

export const sendMessage = async (req, res) => {


    const myId = req.user.id.toString()
    const { id: receiverId } = req.params

    const { text } = req.body

    const newMessage = new Message({
        senderId: myId,
        receiverId: receiverId,
        text: text
    })
    await newMessage.save()

    const populateNewMessage = await newMessage.populate([
        { path: "senderId", select: "profilePicture username" },
        { path: "receiverId", select: "profilePicture username" },
    ])

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", populateNewMessage);
        io.to(receiverSocketId).emit("notification", { username: req.user.username, message: newMessage })
    }
    res.status(201).json(populateNewMessage)

}