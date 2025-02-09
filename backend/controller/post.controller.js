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

        let { id } = req.params

        let user = req.user._id.toString()
        let post = await Post.findById(id)

        if (post.user.toString() !== user) return res.status(400).json({ error: 'You are not allowed to delete this' })

        let postExist = await Post.findByIdAndDelete(id)
        if (!postExist) return res.status(400).json({ error: 'Post doesnt exist.' })

        res.status(200).json({ success: 'post deleted' })

    } catch (error) {
        res.status(500).json({ error: 'Interanal Server Error.' })
    }
}

export const getAllPost = async (req, res) => {
    try {

        let getAllPost = await Post.find({})
            .sort({ createdAt: -1 })
            .populate({
                path: 'user'
            })

        if (getAllPost.length === 0) return res.status(200).json([])

        res.status(200).json(getAllPost)

    } catch (error) {
        res.status(500).json({ error: 'Interanal Server Error.' })
    }
}

export const getUserPost = async (req, res) => {
    let { username } = req.params

    // let userPost = await Post.find(username)

    // res.status(200).json(userPost)

    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ error: 'User not found.' })

    const post = await Post.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate({
            path: 'user',
            select: '-password'
        })

    res.status(200).json(post)
}