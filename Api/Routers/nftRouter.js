import express from "express";
import nftController from '../Controllers/nftController'
const router =express.router();

router.route('/').get(nftController.getAllNfts).post(nftController.createNft);

router.route('/:id').get(nftController.getNft);

export default router; 