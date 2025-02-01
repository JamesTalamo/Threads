import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // change to false in production
        sameSite: "None",
        secure: true,//change to true in production / 
        // kahit hindi na sa production!!!! LETS FUCKING GO ITO PALA PROBLEM 
        // // False if console testing yung mga endpoints, if i test mo sa frontend this needs to be TRUE
        path: '/'// change true to production
    })
}   
