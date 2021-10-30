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
document
  .querySelector("#botonRegistrar")
  .addEventListener("click", function () {
    let nuevoCliente = {
      nombre: document.querySelector("#nombre").value,
      email: document.querySelector("#email").value,
      mascota: document.querySelector("#mascota").value,
      password: document.querySelector("#password").value,
    };

    if (
      //las contraseñas coinciden
      document.querySelector("#password").value ===
      document.querySelector("#secondpassword").value
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
            document.querySelector(".clientesRegistro").innerHTML = " ";
            document.querySelector(".clientesRegistro").style.display = "none";
          } else {
            document.querySelector("#errorContraseña").innerHTML = data.mensaje;
          }
        });
    } else {
      //las contraseñas no coinciden
      document.querySelector(
        "#errorContraseña"
      ).innerHTML = `<p class="falloRegistro">Las contraseñas no coinciden</p>`;
    }
  });
