import cors from 'cors'

const AllowedCors = (req, res, next) => {
    const allowedOrigins = process.env.ALLOWED_ORIGIN.split(',').map((origin) => origin.trim())
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true
    })(req, res, next)

}

export default AllowedCors