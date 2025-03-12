
import Message from '../models/Message.model.js'

export const getAllMessages = async (req, res) => {
    const myId = req.user.id.toString()
    const { id: otherUserId } = req.params

    const messages = await Message.find({
        $or: [
            { senderId: myId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: myId }
        ]
    })

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
    res.status(201).json(newMessage)

}