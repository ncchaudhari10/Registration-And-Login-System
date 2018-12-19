const register = require('express').Router();
const bodyParser = require('body-parser');
var sql = require("mssql");
const validator = require('../validator');
const executeQuery = require('../models/sql');
const hash = require('../models/password');

register.use(bodyParser.urlencoded({ extended: false }));
register.use(bodyParser.json());

register.get('/', (req, res) => {

    res.render('index');

});

register.post('/', (req, res) => {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;



    let valid = check(phone, email);

    if (valid === 0) {
        res.status(401).send("Provide valid email and phone no.");
    } else if (valid === 1) {
        res.status(401).send("Provide valid Phone no.");
    }
    else if (valid === 2) {
        res.status(401).send("Provide valid Email");
    }
    else if (valid === 3) {
        // database connection
        let uid = getUID();
        let date = new Date();
        date = validator.dateFormat(date, "isoDateTime")

        let cred = hash.hashPassword(password);
        // check whether the user is already registered or not
        let query1 = `select UID from [Users] where email ='${email}';`;
        //console.log(query1);
        try {
            let result1 = executeQuery.executeQuery(query1, (data) => {

                //console.log(typeof(data.recordset[0]))
                try {
                    if (typeof (data.recordset[0]) === 'object') {
                        //console.log(data.recordset[0].NAME);
                        res.status(401).send("User is already registered with email: " + email);
                    }

                    else {

                        let query = `INSERT INTO [Users] (uid,name,password,salt,email,phone,date_of_created) VALUES ('${uid}','${name}','${cred.hash}','${cred.salt}','${email}','${phone}','${date}');`;

                        try {
                            let result = executeQuery.executeQuery(query, (data) => {

                                if (data.rowsAffected == 1) {

                                    res.json("User added Successfully");
                                } else {
                                    res.json("can not add user");
                                }
                            });
                        } catch (e) {
                            res.send(e);
                        }




                    }


                } catch (err) {

                    console.log(err);
                }

            });
        }
        catch (e) {
            res.json(e);
        }







    }






});


function check(phone, email) {
    if (!validator.isPhoneValid(phone) && !validator.isEmailValid(email)) {

        return 0;
    }
    if (!validator.isPhoneValid(phone)) {
        return 1;
    }
    if (!validator.isEmailValid(email)) {
        return 2;
    }
    if (validator.isPhoneValid(phone) && validator.isEmailValid(email)) {
        return 3;
    }
}
function getUID(length = 32, chars = 'aA#') {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

module.exports = register;


