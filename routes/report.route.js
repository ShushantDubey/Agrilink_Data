const Router = require('express').Router();
const controller = require('../controller/report.controller');

Router.post(
    '/reports',
    controller.createReport
)

Router.get(
    '/reports',
    controller.getReport
)

module.exports = Router;