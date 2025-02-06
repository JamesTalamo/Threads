import User from "../models/User.model.js"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'

export const getUserPorfile = async (req, res) => {

    let { username } = req.params

    try {

        let user = await User.findOne({ username })
        if (!user) return res.status(400).json({ error: 'User does not exist!' })

        return res.status(200).json(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Interanal Server Error.' })
    }
}

export const updateUserProfile = async (req, res) => {

    const { username, password, newPassword, bio, profilePicture } = req.body


    const authUser = req.user._id.toString()
    try {
        const user = await User.findById(authUser)
        if (!user) return res.status(400).json({ error: 'User does not exist!' })

        if (username && username !== user.username) {
            const userExist = await User.findOne({ username });
            if (userExist) return res.status(400).json({ error: 'Username is already taken.' });

            user.username = username;
        }

        if (!password && newPassword || password && !newPassword) return res.status(400).json({ error: 'Please provide both password and new Password' })

        let hashNewPassword = null

        if (password && newPassword) {

            if (newPassword.length < 6) {
                return res.status(400).json({ error: "Password must be 6 characters long." })
            }

            let passwordMatchWithPrev = await bcrypt.compare(password, user.password)
            if (!passwordMatchWithPrev) return res.status(400).json({ error: 'Password does not match.' })

            let salt = await bcrypt.genSalt(10)
            hashNewPassword = await bcrypt.hash(newPassword, salt) //
        }


        if (profilePicture) {
            const uploadResponse = await cloudinary.uploader.upload(profilePicture);
            user.profilePicture = uploadResponse.secure_url; 
        }

        // user.username = username || user.username
        user.password = hashNewPassword || user.password
        user.bio = bio || user.bio

        await user.save()

        return res.status(200).json({ 'success': user })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Interanal Server Error.' })
    }
}