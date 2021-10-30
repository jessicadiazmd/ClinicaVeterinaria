const express = require("express");
const app = express();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

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

let clientes = require("./clientes");
app.use("/clientes", clientes);

let citas = require("./citas");
app.use("/citas", citas);

let mascotas = require("./mascotas");
app.use("/mascotas", mascotas);

app.listen(process.env.PORT || 3000);
