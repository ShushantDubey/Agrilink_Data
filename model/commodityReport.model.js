const mongoose = require('mongoose');

const commodityReportSchema = new mongoose.Schema({
    _id: String,
    cmdtyName: String,
    cmdtyID: String,
    marketID: String,
    marketName: String,
    users: [String],
    timestamp: Number,
    priceUnit: String,
    price: Number,
});

const CommodityReport = mongoose.model('CommodityReport', commodityReportSchema);

module.exports = CommodityReport;