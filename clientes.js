const express = require("express"); //llamamos a express
const bcrypt = require("bcrypt");
const router = express.Router(); //declaramos la constante router, con la que operaremos en las páginas. más abajo la exportamos a la página principal con el module.exports
router.use(express.urlencoded({ extended: false })); //recoger archivos encoded del body
router.use(express.json()); //recoger archivos de tipo put
router.use(express.static("public")); //ir a los archivos estáticos

//Ruta /clientes/registrar para registrar cliente

router.post("/alta", (req, res) => {
  let contraseniaCifrada = bcrypt.hashSync(req.body.password, 10);
  let coincidencia = bcrypt.compareSync(req.body.password, contraseniaCifrada);

  req.app.locals.db
    .collection("clientes")
    .find({ email: req.body.email })
    .toArray((err, data) => {
      //Si hay un error de Mongo
      if (err) {
        res.send({
          error: true,
          data: data,
          mensaje: `<p class="falloRegistro">No se ha podido acceder a la base de datos</p>`,
        });
      }
      //Si no hay un error de Mongo
      else {
        //Si ya existe un usuario con ese correo
        if (data.length > 0) {
          res.send({
            error: true,
            data: data,
            mensaje: `<p class="falloRegistro">El usuario ${req.body.email} ya existe</p>`,
          });
        } //cierra if
        //Si no existe un usuario con ese correo y puede seguir con el registro
        else {
          if (coincidencia) {
            req.app.locals.db.collection("clientes").insertOne(
              {
                nombre: req.body.nombre,
                password: contraseniaCifrada,
                email: req.body.email,
                mascota: req.body.mascota,
              },
              (err1, data1) => {
                err1
                  ? //Si hay un error de Mongo
                    res.send({
                      altaOk: false,
                      data: data1,
                      mensaje: `<p class="falloRegistro">Ha habido un error, el usuario no se ha podido crear</p>`,
                    })
                  : //Aviso si todo ha ido bien
                    res.send({
                      altaOk: true,
                      data: data1,
                      mensaje: `<p class="mensajeRegistro">¡Registrado! </br> Ya formas parte de la familia PetVet</p>`,
                    });
              }
            ); //cierre de insert One
          }
        } //cierra else de el email no esta cogido
      } //cierra else de si se puede acceder a la BBDD
    }); //cierra el .toArray
}); //cierra el router.post

//Ruta /clientes/modificar para modificar cliente

router.put("/modificar", (req, res) => {
  let contraseniaCifrada = bcrypt.hashSync(req.body.password, 10);
  let coincidencia = bcrypt.compareSync(req.body.password, contraseniaCifrada);

  if (coincidencia) {
    req.app.locals.db.collection("clientes").updateOne(
      { email: req.body.email },
      {
        $set: {
          //se puede poner solo req.body
          nombre: req.body.nombre,
          password: req.body.password,
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
  } //cierre de if coincidencia
}); //cierra el router.put

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
}); //cierra el router.delete

module.exports = router;
