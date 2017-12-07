// Require NPM packages mysql and inquirer for db operations and user prompting
var mysql = require('mysql');
var inquirer = require('inquirer');

// Connect to MySQL DB, use Env Vars so it works well between machines.
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //To Do, use env vars
    password: 'mikesucks', //To Do, use Env vars
    // database: 'bamazon' 
});
// Create initial connection to db
connection.connect(function (err, res) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
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

initialUserPrompt()

function initialUserPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Would you like to buy something?",
                choices: ["Yes", "No"],
                name: "userResponse"
            }
        ])
        .then(function (inquirerResponse) {
            console.log(inquirerResponse.userResponse);
            if (inquirerResponse.userResponse == "Yes") {
                secondPrompt();
            }
            else {
                console.log("He said no!");
            };
        });
};


function secondPrompt() {
    inquirer
        .prompt([
            {
                type: 'prompt',
                name: 'idResponse',
                message: "What is the ID of the product you want to buy?"
            },
            {
                type: 'prompt',
                name: 'quantResponse',
                message: 'How many units do you want to buy?'
            }
        ])
        .then(function (inquirerResponse) {
            connection.query('SELECT * FROM products WHERE item_id=?', [inquirerResponse.idResponse], function (err, res) {
                if (err) throw "It's all broken :( ";
                quantInStock = res[0].stock_quantity;
                checkStuff(quantInStock, inquirerResponse);
            });
        });
};

function checkStuff(quant, inquirerResponse) {
    if (quant < inquirerResponse.quantResponse) {
        console.log("Sorry, you want to buy more than we have. Sadness");
        console.log("Buy something else, we need money. We are a small business.");
        secondPrompt();
    }
    else {
        quant =- inquirerResponse.quantResponse;
        connection.query('UPDATE stock_quantity WHERE item_id=?', [inquirerResponse.idResponse], function (err, res) {
            if (err) throw "It's totally broken!";
            else {
                console.log("DONE!");
            };
        });
    };
}


