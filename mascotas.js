const express = require("express");
const router = express.Router();

//Ruta /mascotas/listado que ofrece un listado de mascotas/clientes de la clínica

router.get("/listado", (req, res) => {
  req.app.locals.db
    .collection("mascotas")
    .find()
    .toArray((err, data) => {
      err
        ? (console.log(err),
          res.send({ mensaje: "No se ha podido acceder a la base de datos" }))
        : (console.log(data), res.send({ results: data }));
    });
});

//Ruta /mascotas/adoptar ofrece en el listado opcion de adoptar

router.get("/adoptar", (req, res) => {
  req.app.locals.db
    .collection("mascotas")
    .find()
    .toArray((err, data) => {
      if (err) {
        res.send({
          error: true,
          data: data,
          mensaje: "No se ha podido acceder a la base de datos",
        });
      } else {
        for (let i = 0; i < data.length; i++) {
          if (data[i].nombre === req.query.nombre) {
            data.splice(i, 1);
            res.send(`${req.query.nombre} ha sido adoptado`);
            break;
          }
        }
      } //else
    }); //fin del toArray
}); //fin router.get

module.exports = router;
