// Función para validar si es Gmail
function EsGmail(correo) {
    const Casilla = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return Casilla.test(correo);
}

// Función para manejar el envío del formulario
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitamos el envío tradicional del formulario

    // Recogemos los datos del formulario
    const nombre = document.getElementById("nombres").value;
    const celular = document.getElementById("celular").value;
    const correo = document.getElementById("correo").value;
    const mensaje = document.getElementById("mensaje").value;
    const resultado = document.getElementById("resultadoPedido");

    // Validación del correo (solo Gmail)
    if (!EsGmail(correo)) {
        resultado.textContent = "Solo se aceptan correos de Gmail.";
        resultado.style.color = "red";  // Mostrar en rojo si es un error
        return;
    }

    // Crear objeto para almacenar la información del formulario
    const contacto = {
        nombre: nombre,
        celular: celular,
        correo: correo,
        mensaje: mensaje
    };

    // Guardar en localStorage
    localStorage.setItem("contacto", JSON.stringify(contacto));

    // Mensaje de éxito
    resultado.textContent = `Gracias ${nombre}, tu mensaje ha sido enviado correctamente y los datos se han almacenado.`;
    resultado.style.color = "green";  // Mostrar en verde si es un éxito

    // Llamar a la función para mostrar los datos guardados
    mostrarDatosGuardados();
});

// Función para recuperar y mostrar los datos almacenados
function mostrarDatosGuardados() {
    const datosGuardados = localStorage.getItem("contacto"); // Recuperar la cadena JSON

    if (datosGuardados) { // Si existen datos guardados
        const contacto = JSON.parse(datosGuardados); // Convertir la cadena a un objeto
        const infoGuardada = document.getElementById("infoGuardada");

        // Mostrar los datos en el DOM
        infoGuardada.innerHTML = `
            <h3>Información Guardada:</h3>
            <p><strong>Nombre:</strong> ${contacto.nombre}</p>
            <p><strong>Celular:</strong> ${contacto.celular}</p>
            <p><strong>Correo:</strong> ${contacto.correo}</p>
            <p><strong>Mensaje:</strong> ${contacto.mensaje}</p>
        `;
    } else {
        console.log("No hay datos guardados en localStorage.");
    }
}

// Llamamos a la función al cargar la página para mostrar cualquier dato almacenado previamente
mostrarDatosGuardados();
