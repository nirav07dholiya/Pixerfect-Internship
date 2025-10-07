import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (!token) return res.send("Unauthorized: No token provided");
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
            if (err) return res.status(401).send("Unauthorized: Invalid token");
            req.userId = payload.id;
            next();
        });
    } catch (error) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
}

export default verifyUser;