var mongoose = require("mongoose");

function dbConfig() {
  mongoose
    .connect(
      "mongodb+srv://dhatrisriram:<db_password>@cluster0.4fgx9.mongodb.net/"
    )
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log("err");
    });
}
module.exports = { dbConfig };