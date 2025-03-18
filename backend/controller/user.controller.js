import User from "../models/User.model.js"
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'

export const getUserPorfile = async (req, res) => {

    let { username } = req.params

    try {

        let user = await User.findOne({ username })
        if (!user) return res.status(400).json({ error: 'User does not exist!' })

        const populateData = await user.populate('followers', 'username profilePicture')

        return res.status(200).json(populateData)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Interanal Server Error.' })
    }
}

export const updateUserProfile = async (req, res) => {

    const { username, password, newPassword, bio } = req.body
    let profilePicture = req.body.profilePicture || null;


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


        if (profilePicture !== user.profilePicture) {
            if (user?.profilePicture) {
                await cloudinary.uploader.destroy(user.profilePicture.split('/').pop().split('.')[0]); // Delete old image
            }

            try {
                const uploadResponse = await cloudinary.uploader.upload(profilePicture);

                user.profilePicture = uploadResponse.secure_url; // Save in database

            } catch (cloudinaryError) {
                return res.status(500).json({ error: cloudinaryError.message });
            }
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

export const followUnfollowUser = async (req, res) => {
    const loggedUserId = req.user._id

    try {
        const { id } = req.params // id nung iffolow na user id

        const userToModify = await User.findById(id)
        const currentUser = await User.findById(loggedUserId)

        // //checks
        if (id === currentUser._id.toString()) return res.status(400).json({ error: 'You cannot follow/unfollow yourself' })
        if (!userToModify || !currentUser) return res.status(400).json({ error: 'Users not found' })

        const isFollowing = currentUser.following.includes(id)
        //FOR LOGIC ! ID lang dapat ipapasa mo. Not the mismong object
        if (isFollowing) { //Unfollow
            // await User.findByIdAndUpdate(id, { $pull: { followers: currentUser } }) OLD
            // await User.findByIdAndUpdate(currentUser, { $pull: { following: id } })

            await User.findByIdAndUpdate(id, { $pull: { followers: loggedUserId } })
            await User.findByIdAndUpdate(loggedUserId, { $pull: { following: id } })

        } else { //Follow

            await User.findByIdAndUpdate(id, { $push: { followers: loggedUserId } })
            await User.findByIdAndUpdate(loggedUserId, { $push: { following: id } })
        }

        res.status(200).json({ message: 'User Followed/Unfollowed Successfully' })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}