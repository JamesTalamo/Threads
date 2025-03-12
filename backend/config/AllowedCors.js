import cors from 'cors';

const allowedCors = cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true
});

const AllowedCors = (req, res, next) => {
    allowedCors(req, res, next);
};

export default AllowedCors;
