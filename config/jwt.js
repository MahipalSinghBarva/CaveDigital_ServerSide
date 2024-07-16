import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

export const verifyJWT = async(req, res, next) => {
    let token;

    // Check for token in Authorization header
    const bearerToken = req.headers['authorization'];
    if (bearerToken && bearerToken.startsWith('Bearer ')) {
        token = bearerToken.split(' ')[1];
    }

    // Check for token in cookies if not found in header
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthorized: Invalid token',
                    status: false,
                    data: []
                });
            } else {
                req.user = decoded; // Assuming the payload contains user details
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized: Please provide a valid token',
            status: false,
            data: []
        });
    }};
