var mysql = require("mysql");
var inquirer = require("inquirer");

var sqlquery = "";

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "12345678",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});



function afterConnection() {
  sqlquery = "SELECT item_id,product_name FROM products";
  connection.query(sqlquery, function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " - " + res[i].product_name);
    }
    start();
  });
}

function start() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What item # would you like to buy? (enter q to quit)"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
      }
    ])
    .then(function(answer) {
      sqlquery = "SELECT stock_quantity,price FROM products WHERE item_id =" + answer.item;
      connection.query(sqlquery, function(err, res) {
        if (err) throw err;
        if (answer.quantity > res[0].stock_quantity){
          console.log("Insufficient Quantity!")
        }
        else{
          console.log("The cost of your purchase is " + (answer.quantity * res[0].price))
          sqlquery = "UPDATE products SET stock_quantity=" + (res[0].stock_quantity - answer.quantity) +" WHERE item_id=" + answer.item;
          connection.query(sqlquery, function(err, res) {
            checkQuit();
          });
        }

      });

    }); // End prompt/then
}

function checkQuit(){
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "quitresponse",
        type: "input",
        message: "Would you like to quit? (y/n) "
      }
    ])
    .then(function(answer) {
      if (answer.quitresponse == 'n'){
        start();
      }
      else{
        connection.end();
        return;
      }
    }); // End prompt/then
};
