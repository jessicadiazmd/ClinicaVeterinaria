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
            <p id="animalAdoptado"></p>
            </div>`;
    }
    document.getElementById("listadoMascotas").innerHTML = `${mostrarAnimales}`;
  });

fetch("http://localhost:3000/clientes/registrar")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById(
      "formularioRegistro"
    ).innerHTML = `<form><input type="text" placeholder="Nombre" required/><input type="email" placeholder="Email" required/><input type="text" placeholder="Nombre de la mascota" required/><input id="enviar" type="submit" value"Registrar"/></form>`;
  });
