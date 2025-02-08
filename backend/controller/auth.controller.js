import User from '../models/User.model.js'
import bcrypt from 'bcrypt'
import { generateTokenAndSetCookie } from '../utils/generateCookie.js'

export const authRegister = async (req, res) => {
    let { email, username, password } = req.body

    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid Email Format." })
        }

        const userExist = await User.findOne({ username })
        if (userExist) {
            return res.status(400).json({ error: "User is already taken." })
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be 6 characters long." })
        }

        //Hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword
        })

        if (newUser) {

            newUser.profilePicture = 'https://i.pinimg.com/1200x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg'

            await newUser.save()
            res.status(201).json({ success: `${username} is now registered.` })
        } else {
            res.status(400).json({ error: 'Invalid user data.' })
        }


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error.' })
    }

}

export const authLogin = async (req, res) => {
    let { username, password } = req.body

    let user = await User.findOne({ username })
    if (!user) return res.status(400).json({ error: "User doesnt Exist." })


    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return res.status(400).json({ error: 'Password does not Match.' })

    generateTokenAndSetCookie(user._id, res)
    res.status(200).json({ user: username })
}


export const authLogout = async (req, res) => {
    try {
        res.cookie('jwt', '', {
            maxAge: 0,
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })

        res.status(200).json({ message: "Successfully Logout." })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error.' })
    }
}

export const authMe = async (req, res) => {
    try {

        let user = await User.findById(req.user._id).select('-password')
        if (!user) return res.status(400).json({ error: "You need to be logged in first." })

        res.status(200).json(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal Server Error.' })
    }
}


