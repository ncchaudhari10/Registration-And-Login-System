const sql= require('mssql');

// data base config
var dbConfig = {
    user: "Neeraj",
    password: "************",       // password
    server: "*************",       // Server
    database: "IHS",
    port:******                    // port

};

//Function to connect to database and execute query
function executeQuery (query,callback) {

    sql.connect(dbConfig, function (err) {
        if (err) {
            console.log("Error while connecting database :- " + err);
            sql.close();
            return err;
        }
        else {
            // create Request object
             var request = new sql.Request();
            // query to the database
            request.query(query, function (err, answer) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    sql.close();
                    return err;
                }
                else {
                    sql.close();
                  //res.send(answer.recordset);
                   callback(answer);
                     
                }
            });
        }
    });
}


module.exports={
    executeQuery
};
