const Update = require('express').Router();
const bodyParser = require('body-parser');
var sql = require("mssql");
const validator = require('../validator');
const executeQuery = require('../models/sql');
const hash = require('../models/password');



// middlewares body-parser
Update.use(bodyParser.urlencoded({ extended: false }));
Update.use(bodyParser.json());

Update.get('/:id',(req,res)=>{

    let email= req.params.id;

    
    if (validator.isEmailValid(email))
    {
        let query1 = `select UID from [Users] where email ='${email}';`;

        let result=executeQuery.executeQuery(query1,(data)=>{

            if (typeof (data.recordset[0]) === 'object')
            {
                    //res.send("true");
                      

            }else
            {
                res.send("not found");

            }



        });

    }
    else
    {
        res.send("Provide valid email");
    }

});
















module.exports=Update;