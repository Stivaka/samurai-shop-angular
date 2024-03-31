import { Router } from "express";
import { users } from "../data";
import jwt from "jsonwebtoken";

const router = Router();


router.post('/login', (req, res) => {

    const body = req.body;
    const user = users.find(user => user.email === body.email && user.password === body.password);

    if(user){
        res.send(generateToken(user));
    } else {
        res.status(400).send("Email or password is invalid!")
    }
})

const generateToken = (user:any) => {

    const token = jwt.sign({
        email:user.email
    }, "lkasdlkjlkrkceoj", {
        expiresIn: "30d"
    });

    user.token = token;
    return user;

}

export default router;