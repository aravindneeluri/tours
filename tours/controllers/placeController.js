const place = require('../models/placeModel');


exports.getAllPlaces = async (req, res) => {
    try {

        const places = await place.find();
        res.status(200).json({
            status: 'success',
            result: places.length,
            data: {
                places
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getAplace = async (req, res) => {

    try {
        const place = await place.findById(req.params.id);
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
    }
}

exports.createPlace = async (req, res) => {
    console.log(req.body)
    try {
        const newPlace = await place.create(req.body);
        

        res.status('201').json({
            status: 'Success',
            data: {
                place : newPlace
            }

        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}


exports.UpdatePlace = async (req, res) => {
    try {
        const _place = await place.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'Success',
            data: {
                _place
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.DeletePlace = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: ' Invalid ID',
        })
    }
    return res.status(204).json({
        status: 'Success',
        data: 'Successfully deleted',
        message: 'Not'
    })
}
