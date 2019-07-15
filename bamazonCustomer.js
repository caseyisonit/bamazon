var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What item would you like to purchase?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?",
                }
            ])
            .then(function (answer) {

                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                };

                if (chosenItem.stock_quantity > parseInt(answer.quantity)) {

                    var stockUpdate = (chosenItem.stock_quantity - parseInt(answer.quantity));

                    var total = (parseInt(answer.quantity) * chosenItem.price)

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockUpdate
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log(`Purchase Successful! You owe ${total}`);
                            start();
                        }
                    );
                }
                else {
                    console.log("Sorry there are not enough items in stock.");
                    start();
                }
            });
    });
};

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // readProducts();
    start();
})