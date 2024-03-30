import express from "express";
import cors from "cors";
import { items, users } from "./data";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get(`/catalog`, (req, res) => {

    res.send(items);

});

app.get(`/details/:itemId`, (req, res) => {

    const itemId = req.params.itemId;
    const item = items.find(item => item.id == itemId);
    res.send(item);

})

app.post('/login', (req, res) => {

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

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port 3000...`);
    
})