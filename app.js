const fs = require('fs')
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./Routes/tourRoutes')
const userRouter = require('./routes/userRoutes');
const placeRouter = require('./Routes/placeRoutes');


// const { request } = require('http');
// const { create } = require('domain');
const app = express();

// 1) MIDDLEWARE

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log('Hello from middleware');
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();

})

// 3) ROUTES
    app.use('/api/v1/tours', tourRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/places', placeRouter);

    module.exports = app;

// 4)START SERVER
