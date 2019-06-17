const express = require('express'); 
const router = express.Router(); 
const Zoa = require('../models/zoa'); 

const OK = 200; 
const CREATED = 201; 
const BAD_REQUEST = 400; 
const NOT_FOUND = 404; 
const SERVER_ERROR = 500; 

//Get a list of zoala users from database 
router.get('/', (req, res) => {
    try{
        Zoa.find({}, (error, zoa) => {
            if(error){  
                
                res.status(BAD_REQUEST).send({
                    error: error, 
                })
            }else{
                res.status(CREATED).send(zoa);
            }
        })
    } catch (error) {   
        res.status(SERVER_ERROR).send({
            error: error
        });
    }
}); 

//Get a list of zoala users from database 
router.get('/:id', (req, res) => {
    try{
        let id = req.params.id;
        Zoa.findById(id, (error, zoa) => {
            if(error){
                res.status(BAD_REQUEST).send({
                    error: error, 
                })
            }else{
                if(zoa==null){
                    res.status(NOT_FOUND).send({
                        error: error, 
                    })
                }else{
                    res.status(CREATED).send(zoa);
                }
        }
        })
    } catch (error) {
        console.log('not good'); 
        res.status(SERVER_ERROR).send({
            error: error
        });
    }
}); 

//Add a new zoa to database
router.post('/', (req, res, next) => {
    //create zoa and when promise is returned, render components
    try{
        Zoa.create(req.body, (error, zoa) => {
            if(error){
                res.status(BAD_REQUEST).send({
                    error: error, 
                })
            }else{
                res.status(CREATED).send(zoa);
            }
        }); 
    }  catch (error) {
        res.status(SERVER_ERROR).send({
            error: error
        })
    }
});

//Update zoa user information
router.put("/:id", (req, res, next) => {
    try {
        Zoa.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (error, zoa) => {
            if (error) {
                res.status(NOT_FOUND).send({
                    error: error
                });
            } else {
                res.status(OK).send(zoa);
            }
        });
    } catch (error) {
        res.status(SERVER_ERROR).send({
            error: error
        })
    }
});

//Delete a zoa user from the database
router.delete('/:id', (req, res, next) => {
    try{
        Zoa.findByIdAndRemove(req.params.id, (error, zoa) => {
            if(error) {
                res.status(NOT_FOUND).send({
                    message: "Could not find Zoa",
                    error: error,
                });
            }else {
                res.status(OK).send(zoa);
            }
        }); 
    } catch (error) {
        res.status(SERVER_ERROR).send({
            error: error
        })
    }
});

module.exports = router; 