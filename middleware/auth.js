import jwt from "jsonwebtoken";

// verify if the token of the user is valid
export function verifyUser(req, res, next) {
    let token = req.headers["auth_token"];
    // let token = req.cookies["auth_token"];

    if (!token) {
        return res.status(403).send("Login Please!");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

// verify if the user is an admin
export function admin(req, res, next) {
    if (req.user.role === "admin" || req.user.role === "superAdmin")
        return next();
    else return res.status(401).send("Not Authorized");
}

// verify if the user is a super admin
export function superAdmin(req, res, next) {
    if (req.user.role === "superAdmin") return next();
    else return res.status(401).send("Not Authorized");
}
