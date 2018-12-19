const login = require('express').Router();
const bodyParser = require('body-parser');
var sql = require("mssql");
const validator = require('../validator');
const executeQuery = require('../models/sql');
const hash = require('../models/password');


login.use(bodyParser.urlencoded({ extended: false }));
login.use(bodyParser.json());

login.get('/', (req, res) => {

   res.render('login');

});

login.post('/', (req, res) => {

   let email = req.body.email;
   let password = req.body.password;
   //console.log((email));
   if (validator.isEmailValid(email)) {
      //database connection to get hashed password

      let query = `select EMAIL,PASSWORD,SALT from [Users] where email ='${email}';`;
      //console.log(query)
      let result = executeQuery.executeQuery(query, (data) => {
        // console.log(data.recordset[0]);
         if (typeof (data.recordset[0]) === 'object') {
            let login = hash.verifyhashPassword(data.recordset[0].PASSWORD, data.recordset[0].SALT, password)

            if (login) {
               // successful login  
               res.status(200).send("logged in successfully");
               //generate token, send it and redirect to '/'





            } else {
               res.status(401).send("Invalid Password");
            }

         } else {
            res.status(401).send("Invalid Credentials ");

         }

      });






   } else {

      res.send("Enter Valid Email");
   }

});

module.exports = login;

//console.log(user.hashPassword("12345"));
