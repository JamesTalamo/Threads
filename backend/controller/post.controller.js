import User from '../models/User.model.js'
import Post from '../models/Post.model.js'

export const createPost = async (req, res) => {
    try {
        let { text, img } = req.body
        if (!text) return res.status(400).json({ error: 'Text Is Needed.' })



        const userId = req.user._id.toString()

        const user = await User.findById(userId).select('-password') // pang validate lang if nag eexist talaga yung user
        if (!user) return res.status(400).json({ error: 'User Doest Not Exist.' })



        let newPost = new Post({
            user: userId,
            text: text,
            img: ''
        })

        await newPost.save()

        res.status(200).json({ success: newPost })


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Interanal Server Error.' })
    }
}

export const deletePost = async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Interanal Server Error.' })
    }
}

export const getAllPost = async (req, res) => {

    let getAllPost = await Post.find({})
        .sort({ createdAt: -1 })
        .populate({
            path: 'user'
        })

    if (getAllPost.length === 0) return res.status(200).json([])

    res.status(200).json(getAllPost)
}