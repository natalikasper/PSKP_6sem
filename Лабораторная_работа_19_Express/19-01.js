const express = require('express');
const app = express();
const mongo = require('mongodb');
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");
 
//установить handlebars в кач-ве движка представлений
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use("/users", userRouter);
app.use("/", homeRouter);
 
app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(3000);