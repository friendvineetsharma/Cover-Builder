const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');



router.post('/signup', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
      const newUser = await user.save();
      res.json({ status: 'success', message: "User created", data: newUser.email });
    } catch (err) {
        if(err.code === 11000){
            //Duplicate key error
            res.json({ status: 'error', message: 'user or email already exists' });
        }else {
          console.log(err);
          res.json({ status: "error", message: "Could not create user" });
        }
    }
})


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        })
        if (user) {
            if (user.password === req.body.password) {
                const token = jwt.sign({
                    username: user.username,
                }, 'clumsy von', {
                    expiresIn: 1000,
                }); 
                res.send({status: 'success' , token: token, user: user.username, auth: true });
            } else {
                res.json({status: 'fail'})
            }
        } else {
            res.json({status: 'fail'})
        }
    } catch (err) {
        res.json({status: 'fail'})
    }
})


module.exports = router;