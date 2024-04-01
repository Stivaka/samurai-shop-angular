import {Router} from 'express';
import { items } from '../data'
import expressAsyncHandler from 'express-async-handler';
import { ItemModel } from '../models/item.model';

const router = Router();

// router.get(`/seed`, expressAsyncHandler( async (req, res) => {

//     const itemsCount = await ItemModel.countDocuments();
//     if(itemsCount > 0){
//         res.send("Seed is already done");
//         return;
//     }

//     await ItemModel.create(items);
//     res.send(`Seed is Done`);

// }))

router.get(`/catalog`,expressAsyncHandler( async (req, res) => {
    const allItems = await ItemModel.find();
    res.send(allItems);

}));

router.get(`/details/:itemId`,expressAsyncHandler( async (req, res) => {

    const item = await ItemModel.findById(req.params.itemId);
    res.send(item);

}));

export default router;