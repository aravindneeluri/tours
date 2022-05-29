const express = require('express');
const { getAllTours, createTour, UpdateTour, DeleteTour, getATour, getTourstats, getMonthlyTours } = require('../controllers/tourController');
//const tourController = require('../controllers/tourController');
const fs = require('fs')



const tourRouter = express.Router();
tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour)

tourRouter
    .route('/monthly-tours')
    .get(getMonthlyTours)

tourRouter
    .route('/tour-stats')
    .get(getTourstats)

tourRouter
    .route('/:id')
    .patch(UpdateTour)
    .delete(DeleteTour)
    .get(getATour);




module.exports = tourRouter;


