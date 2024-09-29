document.addEventListener("DOMContentLoaded", function () {
    const apiProductos = '../javascript/APIs/stock/productos.json';
    const apiMonedas = '../javascript/APIs/monedas.json';

    let productos = [];
    let monedas = [];
    let monedaSeleccionada = { alias: 'ARS', valor: 1 }; 
    let monedasPocoComunes = ['JPY', 'CNY', 'KRW', 'INR', 'THB', 'RUB', 'ZAR', 'MYR'];

    fetch(apiProductos)
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
        })
        .catch(error => console.error("Error al cargar los productos: ", error));

    
    fetch(apiMonedas)
        .then(response => response.json())
        .then(data => {
            monedas = data?.MonedasDeCambio ?? []; 
            cargarMonedas(monedas); 
        })
        .catch(error => console.error("Error al cargar las monedas: ", error));

    
    function mostrarProductos(productos) {
        const contenedorProductos = document.getElementById('contenedor-productos');
        contenedorProductos.innerHTML = ""; 

        productos?.forEach(producto => { 
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');

            
            const imgProducto = document.createElement('img');
            imgProducto.src = producto?.imagen ?? '';
            imgProducto.alt = producto?.nombre ?? 'Producto sin nombre'; 
            imgProducto.classList.add('img-producto');

            
            const nombreProducto = document.createElement('h3');
            nombreProducto.textContent = producto?.nombre ?? 'Producto sin nombre'; 
            nombreProducto.classList.add('nombre-producto');

            const precioProducto = document.createElement('p');
            const precioConvertido = (producto?.precio / monedaSeleccionada?.valor)?.toFixed(2) ?? '0.00'; 
            precioProducto.textContent = `Precio: ${monedaSeleccionada?.alias ?? 'ARS'} ${precioConvertido}`;
            precioProducto.classList.add('precio-producto');

            // Agregar elementos al div del producto
            divProducto.appendChild(imgProducto);
            divProducto.appendChild(nombreProducto);
            divProducto.appendChild(precioProducto);

            contenedorProductos.appendChild(divProducto);
        });
    }

    // Función para cargar el menú desplegable con monedas
    function cargarMonedas(monedas) {
        const selectMoneda = document.getElementById('select-moneda');
        monedas?.forEach(moneda => { 
            const option = document.createElement('option');
            option.value = moneda?.alias ?? ''; 
            option.textContent = `${moneda?.nombre ?? 'Moneda desconocida'} (${moneda?.alias ?? 'N/A'})`;
            selectMoneda.appendChild(option);
        });
    }

    // Evento para cambiar la moneda seleccionada
    const selectMoneda = document.getElementById('select-moneda');
    selectMoneda.addEventListener('change', function () {
        const monedaAlias = this.value;
        const moneda = monedas?.find(m => m.alias === monedaAlias); 

        if (moneda) {
            monedaSeleccionada = { alias: moneda?.alias ?? 'ARS', valor: moneda?.valor ?? 1 };
            mostrarProductos(productos);

            // Verificar si la moneda seleccionada es poco común
            if (monedasPocoComunes?.includes(moneda?.alias)) {
                swal({
                    title: "Moneda poco común",
                    text: `Has seleccionado una moneda poco común en Occidente: ${moneda?.nombre ?? 'Desconocida'}`,
                    icon: "info",
                    timer: 3000,
                    buttons: false,
                    className: "custom-swal" 
                });
            }
        }
    });
});
