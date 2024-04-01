import jwt from "jsonwebtoken";

const { verify } = jwt;

export const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Missing token" });
        }

        const decodedToken = verify(token, process.env.USER_JWT_SECRET);

        req.user = decodedToken;

        next();
    } catch (error) {
        console.error("Error during authentication verification:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

export const authenticateAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Missing token" });
        }

        const decodedToken = verify(token, process.env.ADMIN_JWT_SECRET);

        req.user = decodedToken;

        next();
    } catch (error) {
        console.error("Error during authentication verification:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};