//
let productos = {};

const productosEnLS = localStorage.getItem("productos");
let productosCarritoLista;

try {
    productosCarritoLista = productosEnLS ? JSON.parse(productosEnLS) : [];
} catch (error) {
    console.error("Error al parsear JSON desde localStorage:", error);
    productosCarritoLista = [];
}

// Contantes

const IVA = 0.21

localStorage.setItem("Status", "OK")
console.log("Status OK!")

document.addEventListener('DOMContentLoaded', cargarCarrito)
console.log("Carrito iniciado")

document.addEventListener('DOMContentLoaded', cargarProductos)
console.log("Carrito iniciado")

function cargarCarrito() {
    if (localStorage.getItem("carrito") == []) {
        localStorage.removeItem("carrito")
    } else { }
}

function cargarProductos() {
    if (localStorage.getItem("productos")) {
        productosCarrito = localStorage.getItem("productos")
    } else {
        localStorage.setItem("productos", [])
    }
}
let contadorProductosCarrito = 1;
// Cargar los productos en el carrito
const agregarProductoPagina = (
    nombreProducto,
    precioProducto
  ) => {
    const productosColumna1 = document.getElementById("columna1");
    const productosColumna2 = document.getElementById("columna2");
    const productosColumna3 = document.getElementById("columna3");

  
    if (!productosColumna1 || !productosColumna2 || !productosColumna3) {
      console.error("Error: No se encontraron los contenedores de productos.");
      return;
    }
  
    // Crear un contenedor para el nuevo producto
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("card");
    productoDiv.classList.add("shadow-sm");

  
    // Contenido del producto con valores dinámicos
    productoDiv.innerHTML = `
                  <div class="card-body text-center">
                    <h5 class="card-title">${nombreProducto}</h5>
                    <p class="card-text text-secondary">$ ${precioProducto}</p>
                    <p>Stock: <span id="stock-${nombreProducto}"
                        class="fw-bold">10</span></p>
                    <button class="btn btn-primary w-100"
                      onclick="agregarAlCarrito('${nombreProducto}')">Agregar al
                      Carrito</button>
                  </div>
      `;
  
    // Alternar entre los contenedores
    if (contadorProductosCarrito % 3 === 0) {
        productosColumna3.appendChild(productoDiv);
    } else {
      if(contadorProductosCarrito % 3 === 1){
        productosColumna1.appendChild(productoDiv);
      }else{
        productosColumna2.appendChild(productoDiv);
      }
    }
    contadorProductosCarrito++;
  
}


function agregarAlCarrito(productoKey) {
    const producto = productos[productoKey]
    console.log(producto)

    if (producto.stock <= 0) {
        alert('Sin stock')
        return
    }

    // obtener la info del carrito del LS
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
    console.log(`Carrito cargado!`)

    // agregar nuevo producto
    carrito.push({
        nombre: producto.nombre,
        precio: producto.precio,
        productoKey: productoKey
    })
    console.log(`Producto agregado`)

    // reducir stock
    producto.stock--
    document.getElementById(`stock-${productoKey}`).textContent = producto.stock
    console.log(`Stock Actualizado`)

    // Guardar en LS
    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(`Carrito actualizado!`)

    // actualizar la vista del carrito
    let precioCarrito = producto.precio
    let descuentoCarrito = precioCarrito * 0 // Por ahora todo con 0 descuento
    let ivaCarrito = (precioCarrito - descuentoCarrito) * 0.21

    console.log(precioCarrito, descuentoCarrito, ivaCarrito)

    renderizarCarrito(precioCarrito, descuentoCarrito, ivaCarrito)
}

function renderizarCarrito(subtotal, descuento, iva) {
    // Viejos valores
    let oldsubtotal = parseFloat(document.getElementById("subtotal-carrito").textContent)
    let olddescuento = parseFloat(document.getElementById("descuento-carrito").textContent)
    let oldiva = parseFloat(document.getElementById("iva-carrito").textContent)

    // To fixed
    console.log(`Subtotal: ${subtotal}`)
    subtotal = parseFloat(subtotal)
    descuento = parseFloat(descuento)
    iva = parseFloat(iva)

    console.log(subtotal, descuento, iva)


    // Calcular nuevos valores*
    subtotal += oldsubtotal
    descuento += olddescuento
    iva += oldiva
    console.log(subtotal, descuento, iva)


    // Renderizar carrito
    document.getElementById("subtotal-carrito").textContent = subtotal.toFixed(2)
    document.getElementById("descuento-carrito").textContent = descuento.toFixed(2)
    document.getElementById("iva-carrito").textContent = iva.toFixed(2)
    total = subtotal - descuento + iva
    document.getElementById("total-carrito").textContent = total.toFixed(2)
}

function vaciarCarrito() {

}

productosCarritoLista.forEach(element => {
    productos[element.nombre] = {
        nombre: element.nombre,
        precio: element.precio,
        stock: element.stock,
    }
    agregarProductoPagina(element.nombre,element.precio)
});