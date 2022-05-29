const User = require('./../models/userModel');
const jwt = require('jsonwebtoken')


exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        console.log(req.requestTime)
        res.status('201').json({
            status: 'Success',
            data: {
                user: newUser
            }

        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: "something went wrong"
        })
        console.log(err.errmsg)
    }
};
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users
            }
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: "something went wrong"
        })
        console.log(err.errmsg)
    }
}

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };
  
  const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
      expires: new Date(
        Date.now() + 90 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
    cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);
  
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  };


  exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  };