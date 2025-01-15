const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { DealerModel } = require('../model/dealer.model');
require('dotenv').config();

const dealerRouter = express.Router();

// For Signup
dealerRouter.post('/register', async(req, res)=>{
    const {username, email, password} = req.body;

    try {     
        let user = await DealerModel.find({email});

        if(!username || !email || !password){
            res.status(400).send({msg:"Please Enter All The Credentials"})
        }
        else if(user.length){
            res.status(401).send({msg:'User already exists'})
        }
        else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if(err){
                    res.status(500).send({msg:"Internal Server Error", err});
                }
                else{
                    let dealer = new DealerModel({username, email, password:hash});
                    await dealer.save();
                    res.status(200).send({msg:'User is created', 'Dealer':dealer})
                }
            });
        }
        
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error"})
    }
})

// For login
dealerRouter.post('/login', async(req, res)=>{
    const {email, password} = req.body;

    try {       
        if(!email || !password){
            res.status(400).send({msg:"Please Enter All The Credentials"})
        }else {
            const user = await DealerModel.findOne({email});
            if(!user){
                res.status(404).send({'msg':"User not found"});
            }else{
                // Use await for bcrypt.compare
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.status(500).send({ msg: "Internal Server Error", err });
                    }
                    if (result) {
                        const token = jwt.sign({ userid: user._id, username: user.username }, process.env.SECRET_KEY);
                        return res.status(200).send({ "msg": "Login successful!", "token": token });
                    } else {
                        return res.status(401).send({ 'msg': "Wrong Credentials" });
                    }
                });
            }
        }
    } catch (error) {
        res.status(500).send({msg:"Internal Server Error", error: error.message})
    }
})


module.exports = {
    dealerRouter
};

