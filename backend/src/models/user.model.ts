import mongoose, {Schema, model} from 'mongoose';
import { Types } from 'mongoose';

export interface User{
    id:string;
    email:string;
    name:string;
    password:string;
    forSale:Types.ObjectId[];
    boughtItems:Types.ObjectId[];
}

export const UserSchema = new Schema<User>(
    {
        name: {type:String, required:true},
        email: {type: String, required:true, unique:true},
        password: {type: String, required: true},
        forSale: [{type: Schema.Types.ObjectId, ref: 'Item'}],
        boughtItems: [{type: Schema.Types.ObjectId, ref: 'Item'}]
    },{
        timestamps: true,
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        }
    }
);

export const UserModel = model<User>('user', UserSchema)