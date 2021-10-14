const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

//getting all 
router.get('/', async (req, res) => {
    try{
        const customers = await Customer.find();
        res.json(customers);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
})


//getting one
router.get('/find', getCustomer, (req, res) => {
    res.json(res.customer);
})


//creating one
router.post('/', async (req, res) => {

    const customer = new Customer({
        name: req.body.name,
        serialNum: req.body.serialNum,
        address: req.body.address,
        city: req.body.city, 
        phone: req.body.phone, 
        product1: req.body.product1,  
        product2: req.body.product2, 
        product3: req.body.product3,
        product4: req.body.product4, 
        product5: req.body.product5 
    })

    try{
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    }
    catch (err){
        res.status(400).json({ message: err.message });
    }
    
})


//update one
router.patch('/update', getCustomer, async (req, res) => {
    if(req.body.name != null){
        res.customer.name = req.body.name;
    }
    if(req.body.address != null){
        res.customer.address = req.body.address;
    }
    if(req.body.city != null){
        res.customer.city = req.body.city;
    }
    if(req.body.phone != null){
        res.customer.phone = req.body.phone;
    }
    try{
        const updatedCustomer = await res.customer.save();
        res.json(updatedCustomer);

    }catch(err){
        res.status(400).json({ message: err.message });
    }
})


//delete one
router.delete('/delete', getCustomer, async (req, res) => {
    try{
        await res.customer.remove();
        res.json({ message: 'Deleted Customer' });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
})

//delete all
router.delete('/', async(req, res) => {
    try{

        Customer.deleteMany({}, function(err){
            if(err){
                throw err;
            }
            else{
                res.json({ message: 'Collection deleted' });
            }
        });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})

async function getCustomer(req, res, next){
    try{
        customer = await Customer.findOne(req.query);
        if(customer == null){
            return res.status(404).json({ message: 'Cannot find customer' });
        }
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
    res.customer = customer;
    next();
}


module.exports = router;
