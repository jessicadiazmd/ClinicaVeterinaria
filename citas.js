const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(express.static("public"));

router.post("/nueva", (req, res) => {
  let nuevaCita = {
    fecha: req.body.fecha,
    hora: req.body.hora,
    especialidad: req.body.especialidad,
    /*  tarjeta: req.body.tarjeta, */
  };
  req.app.locals.db.collection("citas").insertOne(nuevaCita, (err, data) => {
    if (err) {
      res.send({
        error: true,
        data: data,
        mensaje: `<p class="falloRegistro">No se ha podido acceder a la base de datos</p>`,
      });
    } else {
      res.send({
        error: false,
        data: data,
        mensaje: `<p class="mensajeRegistro"><strong>Cita reservada</strong> </br> Fecha: ${req.body.fecha}</br>Hora: ${req.body.hora}</br>Especialidad: ${req.body.especialidad}</p>`,
      });
    }
  });
});

module.exports = router;
