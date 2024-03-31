import {Router} from 'express';
import { items } from '../data';

const router = Router();


router.get(`/catalog`, (req, res) => {

    res.send(items);

});

router.get(`/details/:itemId`, (req, res) => {

    const itemId = req.params.itemId;
    const item = items.find(item => item.id == itemId);
    res.send(item);

})

export default router;