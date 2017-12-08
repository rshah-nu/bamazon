// Require NPM packages mysql and inquirer for db operations and user prompting
var mysql = require('mysql');
var inquirer = require('inquirer');
var easyTable = require('easy-table');

// Connect to MySQL DB, use Env Vars so it works well between machines.
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', //To Do, use env vars
    password: '', //To Do, use Env vars
    database: 'bamazon' 
});
// Create initial connection to db
connection.connect(function (err, res) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    printDataToPage();
});
// Print all current products in DB to screen, with associated row data
function printDataToPage() {
    connection.query('SELECT * FROM products', function (err, res) {
        var data = [];
        if (err) throw err;
        var t = new easyTable
        // Making use of the easy-table package to display items in table format
        res.forEach(function (product) {
            t.cell('Product ID', product.item_id)
            t.cell('Description', product.product_name)
            t.cell('Department', product.department_name)
            t.cell('Price', product.price)
            t.cell('Quantity in Stock', product.stock_quantity)
            t.newRow()
        });
        console.log(t.toString())
        // Had some spacing issues where inquirer covered up last item, therefore adding newline.
        console.log("\n");
    });
};

initialUserPrompt();
// Prompts the user to take a DB action
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
                console.log("Goodbye! Next time, spend some money. We have to keep the lights on.");
                connection.end();
            };
        });
};


function secondPrompt() {
    inquirer
        .prompt([
            {
                type: 'prompt',
                name: 'userRequestedID',
                message: "What is the ID of the product you want to buy?"
            },
            {
                type: 'prompt',
                name: 'userRequestedQuantity',
                message: 'How many units do you want to buy?'
            }
        ])
        .then(function (inquirerResponse) {
            connection.query('SELECT * FROM products WHERE item_id=?', [inquirerResponse.userRequestedID], function (err, res) {
                if (err) throw "Sorry, that item ID is not valid! Try harder next time!" + err;
                // quantInStock = res[0].stock_quantity;
                verifyStock(res, inquirerResponse);
            });
        });
};

function verifyStock(res, inquirerResponse) {
    if (res[0].stock_quantity < inquirerResponse.userRequestedQuantity) {
        console.log("********************************************************");
        console.log("Sorry, you want to buy more than we have. :-(");
        console.log("Buy something else, we need money. We are a small business.");
        console.log("********************************************************");
        initialUserPrompt();
    }
    else {
        var newQuantity = res[0].stock_quantity - inquirerResponse.userRequestedQuantity;
        connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [newQuantity, inquirerResponse.userRequestedID], function (err, res) {
            if (err) throw err;
            else {
                console.log("********************************************************");
                console.log("Thank you for your order! Have a nice day! Your credit card has been debited automatically, Michael and/or Peter");
                console.log("********************************************************");
                printDataToPage();
                connection.end();
            };
        });
    };
}


