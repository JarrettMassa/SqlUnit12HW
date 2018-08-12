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
  start();
}

function start() {
  // prompt for info about the item being put up for auction
  console.log("1 - View products for sale");
  console.log("2 - View low inventory");
  console.log("3 - Add to inventory");
  console.log("4 - Add new product");
  console.log("q - Quit");
  inquirer
    .prompt([
      {
        name: "selection",
        type: "input",
        message: "Make your choice you stupid manager! - "
      }
    ])
    .then(function(answer) {
      console.log(" ");
      if (answer.selection == '1'){
        displayProducts();
      }
      else if (answer.selection == '2') {
        displayLowInventory();
      }
      else if (answer.selection == '3') {
        addToInventory();
      }
      else if (answer.selection == '4') {
        addNewProduct();
      }
      else if (answer.selection == 'q') {
        quit();
      }

    }); // End prompt/then
}

function displayProducts(){
  sqlquery = "SELECT item_id,product_name,stock_quantity FROM products";
  connection.query(sqlquery, function(err, res) {
    if (err) throw err;
    console.log("");
    console.log("---------------");
    console.log("ID   QTY   Name");
    console.log("---------------");

    for (var i = 0; i < res.length; i++) {

      // Make output pretty
      var outputString = "";
      outputString +=res[i].item_id;

      if (res[i].item_id < 10){outputString += "    ";}
      else if (res[i].item_id < 100){outputString += "   ";}
      else if (res[i].item_id < 1000){outputString += "  ";}
      else if (res[i].item_id < 10000){outputString += " ";}

      outputString += res[i].stock_quantity;

      if (res[i].stock_quantity < 10){outputString += "     ";}
      else if (res[i].stock_quantity < 100){outputString += "    ";}
      else if (res[i].stock_quantity < 1000){outputString += "   ";}
      else if (res[i].stock_quantity < 10000){outputString += "  ";}
      else{outputString = " ";}

      outputString += res[i].product_name;

      console.log(outputString);

    }
    console.log("-----------------------------------------------------------------------");
    console.log(" ");
    start();
  });
};

function displayLowInventory(){
  sqlquery = "SELECT item_id,product_name,stock_quantity FROM products";
  connection.query(sqlquery, function(err, res) {
    if (err) throw err;
    console.log(" ");
    console.log(" ");
    console.log("Warning - Less than 50 left!")
    console.log("---------------");
    console.log("ID   QTY   Name");
    console.log("---------------");

    for (var i = 0; i < res.length; i++) {
      if (res[i].stock_quantity >= 50){continue;}

      // Make output pretty
      var outputString = "";
      outputString +=res[i].item_id;

      if (res[i].item_id < 10){outputString += "    ";}
      else if (res[i].item_id < 100){outputString += "   ";}
      else if (res[i].item_id < 1000){outputString += "  ";}
      else if (res[i].item_id < 10000){outputString += " ";}

      outputString += res[i].stock_quantity;

      if (res[i].stock_quantity < 10){outputString += "     ";}
      else if (res[i].stock_quantity < 100){outputString += "    ";}
      else if (res[i].stock_quantity < 1000){outputString += "   ";}
      else if (res[i].stock_quantity < 10000){outputString += "  ";}
      else{outputString = " ";}

      outputString += res[i].product_name;

      console.log(outputString);

    }
    console.log("-----------------------------------------------------------------------");
    console.log(" ");
    start();
  });

};

function addToInventory(){

  inquirer
  .prompt([
    {
      name: "selection",
      type: "input",
      message: "Select ID # of product to replenish -"
    },
    {
      name: "qty",
      type: "input",
      message: "How many more do you need? - "
    }
    ])
    .then(function(answer) {
      sqlquery = "SELECT stock_quantity FROM products WHERE item_id=" + answer.selection;
      // sqlquery = "UPDATE products SET stock_quantity = (stock_quantity + answer.qty) WHERE item_id =" + answer.selection;

      connection.query(sqlquery, function(err, res) {
        if (err) throw err;
        var newQty = parseInt(res[0].stock_quantity) + parseInt(answer.qty);
        sqlquery = "UPDATE products SET stock_quantity =" + newQty + " WHERE item_id =" + answer.selection;
        connection.query(sqlquery, function(err, res) {
          console.log("QTY Updated!");
          start();
        });  
        
      });
    }); // End prompt/then

};

function addNewProduct(){

  inquirer
  .prompt([
    {
      name: "name",
      type: "input",
      message: "What is the name of the new product? - "
    },
    {
      name: "dept",
      type: "input",
      message: "What department? - "
    },
    {
      name: "price",
      type: "input",
      message: "Price? - "
    },
    {
      name: "qty",
      type: "input",
      message: "How many are you adding to inventory? - "
    }
    ])
    .then(function(answer) {

      sqlquery = "INSERT INTO products (product_name,department_name,price, stock_quantity) " + 
                 "VALUES ('" + answer.name + "','" + answer.dept + "'," + answer.price + "," + answer.qty + ");";

      console.log(sqlquery);

      connection.query(sqlquery, function(err, res) {
        if (err) throw err;
        console.log("Product added!");
        start();        
      });
    }); // End prompt/then


};

function quit(){
  connection.end;
};
