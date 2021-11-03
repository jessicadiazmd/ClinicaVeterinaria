//MOSTRAR ANIMALES EN ADOPCION

fetch("http://localhost:3000/mascotas/listado")
  .then((res) => res.json())
  .then((data) => {
    let mostrarAnimales = "";
    for (let i = 0; i < data.results.length; i++) {
      mostrarAnimales += `<div class="animalAdopcion"><h3>${data.results[i].nombre}</h3>
            <p><strong>Tipo de animal: </strong>${data.results[i].animal}</p><p><strong>Raza: </strong>${data.results[i].raza}</p><p><strong>Edad: </strong>${data.results[i].edad}</p>
            <form action="/mascotas/adoptar"><input type="hidden" value="${data.results[i].nombre}" name="nombre">
            <button id="botonAdoptar" type=“submit”>Adoptar</button>
            </form>
            </div>`;
    }
    document.getElementById("listadoMascotas").innerHTML = `${mostrarAnimales}`;
  });

//REGISTRARSE

function registro() {
  let nuevoCliente = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    mascota: document.getElementById("mascota").value,
    password: document.getElementById("password").value,
  };

  if (
    //las contraseñas coinciden
    document.getElementById("password").value ===
    document.getElementById("secondpassword").value
  ) {
    fetch("/clientes/alta", {
      method: "POST",
      body: JSON.stringify(nuevoCliente),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.altaOK == true) {
          document.getElementById("clientesRegistro").innerHTML = " ";
          document.getElementById("clientesRegistro").style.display = "none";
        } else {
          document.getElementById("errorContraseña").innerHTML = data.mensaje;
        }
      });
  } else {
    //las contraseñas no coinciden

    document.getElementById(
      "errorContraseña"
    ).innerHTML = `<p class="falloRegistro">Las contraseñas no coinciden</p>`;
  }
}

//LOGIN DEL CLIENTE PARA PEDIR CITA

function logear() {
  let clavesLogin = {
    email: document.getElementById("emailLogin").value,
    password: document.getElementById("passwordLogin").value,
  };
  fetch("/clientes/login", {
    method: "POST",
    body: JSON.stringify(clavesLogin),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error === false) {
        document.getElementById("inicioSesion").style.display = "none";
        document.getElementById(
          "mensajeAlta"
        ).innerHTML = `¡Gracias por confiar en Clinica VetPet! Ya puedes pedir tu cita`;

        document.getElementById("reservaCita").style.display = "flex";
        document.getElementById("sesionCita").style.display = "none";
      } else {
        document.getElementById("mensajeError").innerHTML = data.mensaje;
      }
    });
}

//CITAS

function citaNueva() {
  /*  let data = parseInt(getParameterByName("tarjeta")); */

  let nuevaCita = {
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
    especialidad: document.getElementById("especialidad").value,
  };

  fetch("/citas/nueva", {
    method: "POST",
    body: JSON.stringify(nuevaCita),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error === false) {
        document.getElementById("reservaCita").style.display = "none";
        document.getElementById("reservaCita").style.display = "flex";
        document.getElementById("mensajeCita").innerHTML = data.mensaje;
      } else {
        document.getElementById("mensajeError").innerHTML = data.mensaje;
      }
    });
}

//BAJA DE USUARIO

function baja() {
  let email = {
    email: document.getElementById("emailbaja").value,
  };
  fetch("/clientes/baja", {
    method: "DELETE",
    body: JSON.stringify(email),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error === false) {
        document.getElementById(
          "mensajeBaja"
        ).innerHTML = `<p class="mensajeBajaOk">Usuario dado de baja correctamente</p>`;
      } else {
        document.getElementById("mensajeErrorBaja").innerHTML = data.mensaje;
      }
    });
}

//MODIFICAR USUARIO

function modificarUsuario() {
  let nuevosDatos = {
    nombre: document.getElementById("modificarNombre").value,
    email: document.getElementById("modificarEmail").value,
    mascota: document.getElementById("modificarMascota").value,
  };
  fetch("/clientes/modificar", {
    method: "PUT",
    body: JSON.stringify(nuevosDatos),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error === false) {
        document.getElementById(
          "mensajeModificado"
        ).innerHTML = `<p class="mensajeBajaOk">Tus datos han sido modificados</p>`;
      } else {
        document.getElementById("mensajeErrorModificado").innerHTML =
          data.mensaje;
      }
    });
}
