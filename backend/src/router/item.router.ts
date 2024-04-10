import {Router} from 'express';
// import { items } from '../data'
import expressAsyncHandler from 'express-async-handler';
import { ItemModel } from '../models/item.model';
import { UserModel } from '../models/user.model';
import authMid from '../middleware/auth.mid';

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

router.get(`/details/:itemId` ,expressAsyncHandler( async (req, res) => {
    
    const item = await ItemModel.findById(req.params.itemId);
    res.send(item);

}));

router.use(authMid)

router.post(`/create`,  expressAsyncHandler( async (req: any, res: any) => {
    
    const requestCreate = req.body;

    const newOffer = new ItemModel({...requestCreate, owner: req.user.id});
    await newOffer.save();
    await UserModel.findByIdAndUpdate(req.user.id, { $push: {forSale: newOffer._id}});
    
    res.send(newOffer);
}));

router.get(`/delete/:itemId`, expressAsyncHandler( async (req, res) => {

    
    const item = await ItemModel.findByIdAndDelete(req.params.itemId);
    res.send(item)
}))

router.post(`/edit`, expressAsyncHandler ( async (req, res) => {

    const offerBody = req.body;

    const updateOffer = await ItemModel.findByIdAndUpdate(req.body._id, offerBody, { runValidators: true})
    res.send(updateOffer);
}))

async function isOwner(req: any, res: any, next:any) {
    
    const item = await ItemModel.findById(req.params.itemId);
    if (item!.owner != req.user?.id){
        return 
    }
    next();

}
export default router;