import { Router } from "express";
// import { users } from "../data";
import jwt from "jsonwebtoken";
import expressAsyncHandler from 'express-async-handler'
import { UserModel } from "../models/user.model";

const router = Router();


// router.get(`/seed`, expressAsyncHandler( async (req, res) => {

//     const usersCount = await UserModel.countDocuments();
//     if(usersCount > 0){
//         res.send("Seed is already done");
//         return;
//     }

//     await UserModel.create(users);
//     res.send(`Seed is Done`);

// }))

router.post('/login', expressAsyncHandler( async (req, res) => {

    const {email, password} = req.body;
    const user = await UserModel.findOne({email, password})

    if(user){
        res.send(generateToken(user));
    } else {
        res.status(400).send("Email or password is invalid!")
    }
}))

const generateToken = (user:any) => {

    const token = jwt.sign({
        id: user.id, email:user.email
    }, "lkasdlkjlkrkceoj", {
        expiresIn: "30d"
    });

    
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        token: token
      };

}

export default router;