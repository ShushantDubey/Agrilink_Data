const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userID: String,
    marketID: String,
    marketName: String,
    cmdtyID: String,
    marketName: String,
    marketType: String,
    cmdtyName: String,
    priceUnit: String,
    convFactor: Number,
    price: Number,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;