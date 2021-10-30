const express = require("express"); //llamamos a express
const app = express(); // guardamos express en cont app
const bcrypt = require("bcrypt"); //lamamos a bcrypt

const mongodb = require("mongodb"); //llamamos a mongo
const MongoClient = mongodb.MongoClient;

//Control de errores de Mongo
MongoClient.connect(
  "mongodb+srv://jessica:jessicaMongo@cluster0.zy09y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err, client) => {
    err
      ? (console.log("🔴 MongoDB no conectado"), console.log(`error: ${err}`))
      : ((app.locals.db = client.db("clinicaVeterinaria")),
        console.log("🟢 MongoDB está conectado"));
  }
);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let clientes = require("./clientes"); //llamamos al js clientes gracias al module exports = router
app.use("/clientes", clientes); //indicamos que el objeto router importado desde clientes.js se encargará de las peticiones a la ruta ‘/clientes.

let citas = require("./citas");
app.use("/citas", citas);

let mascotas = require("./mascotas");
app.use("/mascotas", mascotas);

app.listen(process.env.PORT || 3000);
