

function EsGmail(correo){
    const Casilla = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return Casilla.test(correo);
}

function aplicarDescuento(monto){
    let descuento;

    switch (true) {
        case (monto > 200000):
            descuento = 0.45;
            break;
        case (monto > 150000):
            descuento = 0.35;
            break;
        case (monto > 100000):
            descuento = 0.25;
            break;
        case (monto > 50000):
            descuento = 0.15;
            break;
        case (monto > 25000):
            descuento = 0.05;
            break;
        default:
            descuento = 0;
            break;
}
    return monto - (monto * descuento);
}

function ConIva(MontoConDescuento){
    let TotalConIva = MontoConDescuento + MontoConDescuento * 0.21;
    return TotalConIva;
}


alert("Bienvenido a mi página web");

let HacerPedido = prompt("¿Te gustaría realizar un pedido? (Responder SI o NO)").toUpperCase();

console.log(HacerPedido);

while(HacerPedido !=="SI" && HacerPedido !=="NO"){
    alert("Respuesta invalida, sólo son posibles las respuestas SI o NO");
    HacerPedido = prompt("¿Te gustaría realizar un pedido? (Responder SI o NO)").toUpperCase();
}

if(HacerPedido == "SI"){
    let monto

    do {
        monto = Number(prompt("¿Cuánto es el monto que desea invertir? Tenga en cuenta que al monto final se le hará un descuento en base a la cantidad de su inversión y también se le agregará IVA"));
        console.log(monto);

        if (isNaN(monto) || monto <= 0) {
            alert("Respuesta inválida, debe colocar un número positivo");
        } else if (monto < 25000) {
            alert("El monto es muy poco dinero y no se podrá realizar la compra");
        }
    } while (isNaN(monto) || monto <= 0 || monto < 25000);
    
    let ConDescuento = aplicarDescuento(monto);
    let PrecioFinal = ConIva(ConDescuento);
    PrecioFinal = Math.ceil(PrecioFinal);
    alert (`El monto a pagar es de $${PrecioFinal}`);+
    alert ("Muchas gracias por su compra");
}

else if (HacerPedido == "NO"){
    let HacerInicio = prompt("OK. Y te gustaría iniciarte (Responder SI o NO)").toUpperCase();

    while (HacerInicio !== "SI" && HacerInicio !=="NO"){
        alert("Respuesta invalida, sólo son posibles las respuestas SI o NO");
        HacerInicio = prompt("OK. Y te gustaría iniciarte (Responder SI o NO").toUpperCase();
    }

    if (HacerInicio == "SI"){
        let gmail = prompt("Ingresa tu gmail:");
        console.log(gmail);
        let ComprovasionDeGmail = EsGmail(gmail);

        while (!ComprovasionDeGmail) {
            alert("Gmail inválido, ingreselo nuevamente");
            gmail = prompt("Ingresa tu email:");
            ComprovasionDeGmail = EsGmail(gmail);
        }
        alert("Muchas gracias, en unos minutos recibirá un correo con las indicaciones para iniciarse");
    }

    else if (HacerInicio == "NO"){
        alert("OK. Gracias por responder");
    }
}