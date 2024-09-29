const esGmail = correo => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(correo);

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();

    const nombre = document.getElementById("nombres").value;
    const celular = document.getElementById("celular").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;
    const resultado = document.getElementById("resultadoPedido");

    !esGmail(correo)
        ? (resultado.textContent = "Correo de Gmail invalido.", resultado.style.color = "red")
        : (
            localStorage.setItem("contacto", JSON.stringify({ nombre, celular, correo, mensaje })),
            resultado.textContent = `Gracias ${nombre}, tu mensaje ha sido enviado correctamente y los datos se han almacenado.`,
            resultado.style.color = "green",
            mostrarDatosGuardados()
          );
});

const mostrarDatosGuardados = () => {
    const datosGuardados = localStorage.getItem("contacto");

    if (datosGuardados) {
        const elemento = document.getElementById("infoGuardada");
        elemento.style.padding = "30px";
        elemento.innerHTML = `
            <h3>Información Guardada:</h3>
            <p><strong>Nombre:</strong> ${JSON.parse(datosGuardados).nombre}</p>
            <p><strong>Celular:</strong> ${JSON.parse(datosGuardados).celular}</p>
            <p><strong>Correo:</strong> ${JSON.parse(datosGuardados).correo}</p>
            <p><strong>Mensaje:</strong> ${JSON.parse(datosGuardados).mensaje}</p>
        `;
    } else {
        console.log("No hay datos guardados en localStorage.");
    }
};

mostrarDatosGuardados();