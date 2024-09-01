import { mongoose } from "mongoose";

const nftSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    catagory:String,
    email: String,
    address: String,
    image: String,
    createdAt:{
        type:Date,
        default: Date.now(),
    }
});

const NFT = mongoose.model("NFT",nftSchema);

export default NFT;