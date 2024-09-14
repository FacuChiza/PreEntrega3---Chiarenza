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

    console.log("Formulario enviado");

    // Validación del correo (solo Gmail)
    if (!EsGmail(correo)) {
        resultado.textContent = "Solo se aceptan correos de Gmail.";
        resultado.style.color = "red";  // Mostrar en rojo si es un error
        console.log("Correo no válido");
        return;
    }

    // Crear objeto para almacenar la información del formulario
    const contacto = {
        nombre: nombre,
        celular: celular,
        correo: correo,
        mensaje: mensaje
    };

    console.log("Datos del contacto a guardar:", contacto);

    // Comprobamos si localStorage está disponible
    if (typeof(Storage) !== "undefined") {
        try {
            // Guardar en localStorage
            localStorage.setItem("contacto", JSON.stringify(contacto));
            console.log("Datos guardados en localStorage");

            // Mensaje de éxito
            resultado.textContent = `Gracias ${nombre}, tu mensaje ha sido enviado correctamente y los datos se han almacenado.`;
            resultado.style.color = "green";  // Mostrar en verde si es un éxito
        } catch (e) {
            console.error("Error al intentar guardar en localStorage:", e);
            resultado.textContent = "Hubo un error al intentar almacenar los datos.";
            resultado.style.color = "red";
        }
    } else {
        console.log("localStorage no está disponible");
        resultado.textContent = "El almacenamiento en localStorage no está disponible en tu navegador.";
        resultado.style.color = "red";
    }
});


