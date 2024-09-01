import NFT from "../Model/nftModel";


const getAllNfts=async(req,res,next)=>{
    const nfts=await NFT.find();

    res.status(200).json({
        status:"Success",
        results:nfts.length,
        data:{
            nfts,
        }
    })
}

const getNft=async(req,res,next)=>{
    const nft=await NFT.findById(req.params.id);

    res.status(200).json({
        status:"Success",
        data:{
            nft,
        }
})
};

const createNft =async (req,res,next)=>{
    console.log(req.body);
    const newNft=await NFT.create(req.body);

    res.status(200).json({
        status:"Success",
        data:{
            nft:newNft,
        }
    })
    
}


export {
    getAllNfts,getNft,createNft
}