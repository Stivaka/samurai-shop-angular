import {Router} from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ItemModel } from '../models/item.model';
import { UserModel } from '../models/user.model';
import authMid from '../middleware/auth.mid';

const router = Router();


router.get(`/catalog`,expressAsyncHandler( async (req, res) => {
    const allItems = await ItemModel.find();
    res.send(allItems);
    
}));

router.get(`/details/:itemId` ,expressAsyncHandler( async (req, res) => {
    
    const item = await ItemModel.findById(req.params.itemId);
    res.send(item);

}));


router.get(`/checkout`, expressAsyncHandler( async (req, res) => {
    
    const items = await ItemModel.findById(`660dda2655091465133da6b5`);
    console.log(`whaaat`);
    
    res.send(items)
}));

router.use(authMid)

router.post(`/create`,  expressAsyncHandler( async (req: any, res: any) => {
    
    const requestCreate = req.body;

    const newOffer = new ItemModel({...requestCreate, owner: req.user.id});
    await newOffer.save();
    await UserModel.findByIdAndUpdate(req.user.id, { $push: {forSale: newOffer._id}});
    
    res.send(newOffer);
}));

router.get(`/delete/:itemId`, expressAsyncHandler( async (req:any, res:any) => {

    
    const item = await ItemModel.findByIdAndDelete(req.params.itemId);
    await UserModel.findByIdAndUpdate(req.user.id, {$pull: {forSale: req.params.itemId}});
    res.send(item)
}))

router.post(`/edit`, expressAsyncHandler ( async (req, res) => {

    const offerBody = req.body;

    const updateOffer = await ItemModel.findByIdAndUpdate(req.body._id, offerBody, { runValidators: true})
    res.send(updateOffer);
}))

router.get(`/offers`, expressAsyncHandler ( async (req:any, res:any) => {
    let offersList = [];
    const user = req.user.id;
    const userOffers = await UserModel.findById(user);

    for (let offer of userOffers!.forSale){
        const item = await ItemModel.findById(offer.valueOf());

        offersList.push(item);
        
    }
    res.send(offersList) 

}))

export default router;