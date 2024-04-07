import { Router } from "express";
// import { users } from "../data";
import jwt from "jsonwebtoken";
import expressAsyncHandler from 'express-async-handler'
import {User, UserModel } from "../models/user.model";
import bcrypt from 'bcryptjs';

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
    const user = await UserModel.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.send(generateToken(user));
    } else {
        res.status(400).send("Email or password is invalid!")
    }
}))

router.post(`/register`, expressAsyncHandler ( async (req, res) => {

    const {name, email, password} = req.body;

    const user = await UserModel.findOne({email});

    if (user) {
        res.status(400).send(`User is already exist!`);
        return;
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const newUser:User = {
        id:'',
        name,
        email: email.toLowerCase(),
        password: encryptedPass,
        forSale: [],
        boughtItems: [],
    }

    const createUser = await UserModel.create(newUser);
    res.send(generateToken(createUser));
}))

const generateToken = (user:User) => {

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