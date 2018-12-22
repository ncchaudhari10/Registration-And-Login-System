const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const port = 33880;
const app = express();
const ejs = require('ejs');
const register = require('./routes/Register');
const login = require('./routes/Login');
const Delete = require('./routes/Delete');



app.set('view engine', 'ejs');
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get('/',(req,res)=>{

    res.send("Hello And Welcome");

});

app.use('/Register', register);
app.use('/Login', login);
app.use('/Delete',Delete);



// middlewares body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());






app.listen(port, () => {

    console.log("server has started on port " + port + "...");
}
)
