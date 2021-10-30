const express = require("express");
const router = express.Router();

//Ruta /clientes/registrar para registrar cliente

router.post("/registrar", (req, res) => {
  req.app.locals.db
    .collection("clientes")
    //usar el email y no el nombre o mascota porque el email es único
    .find({ email: req.body.email })
    .toArray((err, data) => {
      //Si hay un error de Mongo
      if (err) {
        res.send({
          error: true,
          data: data,
          mensaje: "No se ha podido acceder a la base de datos",
        });
      } else {
        //Si ese email ya esta en la base de datos
        if (data.length > 0) {
          res.send({
            error: true,
            data: data,
            mensaje:
              "No se ha podido registrar, ya existe un cliente con ese email",
          });
        }
        //Si el email no esta registrado
        else {
          req.app.locals.db.collection("clientes").insertOne(
            {
              nombre: req.body.nombre,
              email: req.body.email,
              mascota: req.body.mascota,
            },
            (err1, data1) => {
              err1
                ? //Si hay un error de Mongo
                  res.send({
                    error: true,
                    data: data1,
                    mensaje: "error:" + err1,
                  })
                : //Aviso si todo ha ido bien
                  res.send({
                    error: false,
                    data: data1,
                    mensaje: "Cliente creado correctamente",
                  });
            }
          );
        }
      }
    });
});

//Ruta /clientes/modificar para modificar cliente

router.put("/modificar", (req, res) => {
  req.app.locals.db.collection("clientes").updateOne(
    { email: req.body.email },
    {
      $set: {
        //se puede poner solo req.body
        nombre: req.body.nombre,
        mascota: req.body.mascota,
      },
    },
    (err, data) => {
      //Si hay un error de Mongo
      if (err) {
        res.send({
          error: true,
          data: err,
          mensaje: "No se ha podido acceder a la base de datos",
        });
      } else {
        // Si el email introducido es correcto
        if (data.modifiedCount > 0) {
          res.send({
            error: false,
            data: data,
            mensaje: "Cliente actualizado correctamente",
          });
        }
        // Si el email no esta en la base de datos
        else {
          res.send({
            error: true,
            data: data,
            mensaje: "No se ha encontrado ningún cliente con ese email",
          });
        }
      }
    }
  );
});

//Ruta /clientes/baja para que un cliente se de de baja de la clínica

router.delete("/baja", (req, res) => {
  req.app.locals.db
    .collection("clientes")
    .deleteOne({ email: req.body.email }, (err, data) => {
      //Si hay un error de Mongo
      if (err) {
        res.send({
          error: true,
          data: err,
          mensaje: "No se ha podido acceder a la base de datos",
        });
      } else {
        // Si el email introducido es correcto, está en la BBDD
        if (data.deletedCount > 0) {
          res.send({
            error: false,
            data: data,
            mensaje: "El cliente ha sido dado de baja",
          });
        }
        // Si el email no esta en la base de datos
        else {
          res.send({
            error: true,
            data: data,
            mensaje: "No se ha encontrado ningún cliente con ese email",
          });
        }
      }
    });
});

module.exports = router;
