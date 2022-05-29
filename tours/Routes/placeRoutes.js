const express = require('express');
const {getAllPlaces,createPlace,UpdatePlace,DeletePlace,getAPlace, getAplace} =  require('../controllers/placeController');
const fs = require('fs')



const placeRouter = express.Router();    
placeRouter
    .route('/')
    .get(getAllPlaces)
    .post(createPlace)

 placeRouter
    .route('/:id')
    .patch(UpdatePlace)
    .delete(DeletePlace)
    .get(getAplace);

module.exports = placeRouter;