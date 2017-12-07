// Require NPM packages mysql and inquirer for db operations and user prompting
var mysql = require('mysql');
var inquirer = require('inquirer');

// Connect to MySQL DB, use Env Vars so it works well between machines.
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //To DO, use env vars
    password: 'mikesucks', //To Do, use Env vars
    // database: 'bamazon' 
});
// Create initial connection to db
connection.connect(function (err, res) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    // promptUser();
});
// Select the appropriate DB to use
connection.query('USE bamazon', function (err, res) {
    if (err) throw err;
    console.log(res);
});
// Print all current products in DB to screen
connection.query('SELECT * FROM products', function (err, res) {
    if (err) throw err;
    console.log(res);
});
promptUser()

connection.end();
function promptUser() {
    inquirer
    .prompt([
        {
            type: 'confirm',
            message: "Would you like to buy something?",
            name: "userResponse"
        }
    ])
    .then(function (inquirerResponse) {
        if ('inquirerResponse.userResponse' == "Yes") {
            console.log("He said yes!");
        }
        else {
            console.log("He said no!");
        };  
    });
};

