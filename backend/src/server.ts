import express from "express";
import cors from "cors";
import { items } from "./data";

const app = express();

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

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port 3000...`);
    
})