const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    serialNum: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    product1: {
        type: String,
        required: true,
        default: "-"
    },
    product2: {
        type: String,
        required: true,
        default: "-"
    },
    product3: {
        type: String,
        required: true, 
        default: "-"
    },
    product4: {
        type: String,
        required: true,
        default: "-"
    },
    product5: {
        type: String,
        required: true,
        default: "-"
    }

});

module.exports = mongoose.model('Customer', customerSchema);