var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    firstQuery();
    promptUser();
    connection.end();
});

function firstQuery() {
    var query = 'SELECT * FROM products';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
    });
};
function promptUser() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Choice A", "Choice B"],
            name: "userGuess"
        }
    ])
    .then(function (inquirerResponse) {
        console.log(inquirerResponse.userGuess);
    });
};