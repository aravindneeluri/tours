const Tour = require('../models/tourModel');
const mongoose = require('mongoose')

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../tours-simple.json`)
// );
exports.getAllTours = async (req, res) => {

    try {
        //Build Query
        //1)Filtering
        const queryObj = { ...req.query };
        const excludeFeilds = ['page', 'sort', 'limit', 'fields'];
        excludeFeilds.forEach(el => delete queryObj[el]);

        //1A)Advance Filtering
        let querystr = JSON.stringify(queryObj);
        querystr = querystr.replace(/\b(gt|gte|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(querystr));
        const query = Tour.find(JSON.parse(querystr));

        //2)Sorting

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);

            query.sort(sortBy)
        }

        //3)Field limiting

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query.select(fields)
        }

        //4)Paging

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        console.log(query.skip(skip).limit(limit));
        query.skip(skip).limit(limit);

        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error('This page does not exist');
        }

        //5)Execute Query
        console.log({ query })
        const tours = await query

        //Send Response
        res.status(200).json({
            status: 'Success',
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getATour = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    };
}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status('201').json({
            status: 'Success',
            data: {
                tour: newTour
            }

        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'INVALID'
        })
    }
}


exports.UpdateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'Success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}





exports.DeleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: tour
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getTourstats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: '$difficulty',
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxprice: { $max: '$price' }
                }
            },
            {
                $sort: { avgRating: 1 }
            }
        ])
        res.status(200).json({
            status: 'Success',
            data: stats
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

};

exports.getMonthlyTours = async (req, res) => {
    try {
        // const year = req.params.year * 1;
        // console.log(year)
        const monthlyTours = await Tour.aggregate([
            {
                $unwind : '$startDates'
            },{
                $match : {
                    startDates: {
                        $gte : new Date(`2021-01-01`),
                        $lte : new Date(`2021-12-31`)
                    }
                }
            },{
               $group : {
                   _id : {$month : '$startDates'},
                   NumberOfTours : {$sum : 1},
                   tours : {$push : '$name'}
               } 
            },{
                $addFields : {month : '$_id'}
            },{
                $sort : { NumberOfTours : -1}
            },{
                $project : {
                    _id : 0
                }
            }
            
        ])
        res.status(200).json({
            status: 'Success',
            data: monthlyTours
        });

    }catch(err){
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
