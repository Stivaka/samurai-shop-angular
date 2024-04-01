import mongoose, {Schema, model} from 'mongoose';
import { Types } from 'mongoose';

export interface Item{

    id:string;
    name:string;
    price:number;
    image:string;
    type:string;
    material:string;
    color:string;
    weight:number;
    durability:number;
    description:string;
    owner:Types.ObjectId,

}

export const ItemSchema = new Schema<Item>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String, required: true},
        type: {type: String, required: true},
        material: {type: String, required: true},
        color: {type: String, required: true},
        weight: {type: Number, required: true},
        durability: {type: Number, required: true},
        description: {type: String, required: true},
        owner: {type: Schema.Types.ObjectId, ref: 'User'},
    },{
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        },
        timestamps: true
    }
);

export const ItemModel = model<Item>('item', ItemSchema);