const express = require("express")
// const transactionRouter = require("./routers/api/transaction")
const app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(express.json())
app.use("/api", require("./routers/transaction"))
module.exports = app