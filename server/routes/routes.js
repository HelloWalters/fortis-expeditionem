const express = require('express');
const Model = require('../models/campaign');

const router = express.Router()

//Post Method
router.post('/createCampaign', (req, res) => {
    const data = new Model({
        name: req.body.name,
        description: req.body.description
    })

    try{

    }
    catch(error){
        
    }
})
//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
})

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;