const Delete = require('express').Router();
const bodyParser = require('body-parser');
var sql = require("mssql");
const validator = require('../validator');
const executeQuery = require('../models/sql');

//body-parser
Delete.use(bodyParser.urlencoded({ extended: false }));
Delete.use(bodyParser.json());


Delete.get('/:id', (req, res) => {

    let email = req.params.id;

    if (validator.isEmailValid(email)) {

        let query = `select UID from [Users] where email ='${email}';`;

        let result = executeQuery.executeQuery(query, (data) => {

            if (typeof (data.recordset[0]) === 'object') {

                let query1 = `delete from [Users] where email='${email}';`;

                let result1 = executeQuery.executeQuery(query1, (data1) => {

                    if (data.rowsAffected == 1) {

                        res.json("User Deleted Successfully");
                    } else {
                        res.json("can not Delete user");
                    }
                });


            } else {

                res.send(" User is not even registered")

            }

        });






    } else {

        res.status(401).send("provide valid email");
    }




});

module.exports = Delete;
