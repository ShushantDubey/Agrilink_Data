const Report = require("../model/report.model");
const CommodityReport = require("../model/commodityReport.model");
const { v4: uuidv4 } = require('uuid');

const createReport = async (req, res) => {
  try {
    const response = {};
    const report = new Report({
      ...req.body,
    });
    await report.save();
    response.status = "success";
    response.reportID = report._id;
    res.status(201).send(response);
  } catch (error) {
    const errResponse = {};
    console.log(error);
    errResponse.status = "error";
    errResponse.message = error.message;
    return res.status(500).send(errResponse);
  }
};

module.exports.createReport = createReport;

const getReport = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.query.reportID });
    if (!report) {
      return res.status(404).send("report not found");
    }
    const id = uuidv4();
    const avgPrice = await Report.aggregate([
      {
        $match: {
            marketID: report.marketID,
            cmdtyID: report.cmdtyID
        },
      },
      {
        $group: {
          _id: id,
          totalConvFactor: { $sum: "$convFactor" },
          totalPrice: { $sum: "$price" },
          cmdtyName: {$first: "$cmdtyName" },
          cmdtyID: {$first: "$cmdtyID"},
          marketID: {$first: "$marketID"},
          marketName: {$first: "$marketName"},
          users: {$addToSet: "$userID"}
        },
      },
      {
        $project: {
          price: {
            $round: [{ $divide: ["$totalPrice", "$totalConvFactor"] }, 0],
          },
          timestamp: `${Date.now()}`,
          priceUnit: "Kg",
          cmdtyName: 1,
          cmdtyID: 1,
          marketID: 1,
          marketName: 1,
          users: 1,
        },
      },
      {
          $out: {
             db: "assignment",
             coll: "commodityreports"
          }
      }
    ]);
    const finalReport = await CommodityReport.findOne({_id: id});
    res.status(200).send(finalReport);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

module.exports.getReport = getReport;