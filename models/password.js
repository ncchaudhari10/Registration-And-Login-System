const crypto = require('crypto');

function hashPassword(password) {
    var salt = crypto.randomBytes(15).toString('base64');

    var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('base64');

    return {
        salt: salt,
        hash: hash,

    };
}
function verifyhashPassword(dbhash, salt, password) {
 

   var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('base64');

    if (dbhash === hash) {

        return true;

    }
    else {
        return false;
    }

}

function changehashPassword( salt, password) {
 

    var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('base64');

    return {
        hash:hash
    };

}





module.exports = {
    hashPassword, verifyhashPassword
}


function validPassword(password) {
    var hash = crypto.pbkdf2Sync(password.password,
        password.salt, 1000, 64, 'sha512').toString('base64');

    if (hash === db.hash) {
        return true
    } else {
        return "NOT VALID USER"
    }
};

