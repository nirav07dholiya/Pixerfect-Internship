import jwt from "jsonwebtoken";

const verifyUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log({ token });
    try {
        if (!token) return res.send("Unauthorized: No token provided");
        jwt.verify(token, 'xxxx', (err, payload) => {
            if (err) return res.status(401).send("Unauthorized: Invalid token");
            console.log("Decoded payload:", payload);  // 👈 add this
            req.userId = payload.id;
            next();
        });
    } catch (error) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
}

export default verifyUser;