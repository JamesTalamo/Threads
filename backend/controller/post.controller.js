import User from '../models/User.model.js'
import Post from '../models/Post.model.js'

export const createPost = async (req, res) => {
    try {
        let { text, img } = req.body
        if (!text || !img) return res.status(400).json({ error: 'Text and Img Is Needed.' })


        const userId = req.user._id.toString()

        const user = await User.findById(userId).select('-password') // pang validate lang if nag eexist talaga yung user
        if (!user) return res.status(400).json({ error: 'User Doest Not Exist.' })


        let newPost = new Post({
            user: userId,
            text: text,
            img: img
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
