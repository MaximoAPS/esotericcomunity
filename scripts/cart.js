// configuracion de productos con stock y dctos
const productos = {
    laptop: {
        nombre: 'Laptop',
        precio: 800,
        stock: 10,
        descuento: 0.1 
    },
    smartphone: {
        nombre: 'Smartphone',
        precio: 500,
        stock: 15,
        descuento: 0.05 
    },
    tablet: {
        nombre: 'Tablet',
        precio: 300,
        stock: 8,
        descuento: 0
    },
}

// Contantes

const IVA = 0.21

localStorage.setItem("Status", "OK")
console.log("Status OK!")

document.addEventListener('DOMContentLoaded', cargarCarrito)
console.log("Carrito iniciado")

function cargarCarrito(){
    if(localStorage.getItem("carrito")==[]){
        localStorage.removeItem("carrito")
    }else{}
}   
    
function agregarAlCarrito(productoKey) {
    const producto = productos[productoKey]
    console.log(`Agregar ${JSON.stringify(producto)}`)
    
    if(producto.stock <=0) {
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
    localStorage.setItem('carrito',JSON.stringify(carrito))
    console.log(`Carrito actualizado!`)
    
    // actualizar la vista del carrito
    let precioCarrito = producto.precio
    let descuentoCarrito = precioCarrito * producto.descuento
    let ivaCarrito = (precioCarrito - descuentoCarrito) * 0.21

    renderizarCarrito(precioCarrito, descuentoCarrito, ivaCarrito)
}
    
function renderizarCarrito(subtotal, descuento, iva){
    // Viejos valores
    let oldsubtotal= parseFloat(document.getElementById("subtotal-carrito").textContent)
    let olddescuento= parseFloat(document.getElementById("descuento-carrito").textContent)
    let oldiva= parseFloat(document.getElementById("iva-carrito").textContent)

    // Calcular nuevos valores
    subtotal += oldsubtotal
    descuento += olddescuento
    iva += oldiva

    // Renderizar carrito
    document.getElementById("subtotal-carrito").textContent = subtotal
    document.getElementById("descuento-carrito").textContent = descuento
    document.getElementById("iva-carrito").textContent = iva
    total = subtotal - descuento + iva
    document.getElementById("total-carrito").textContent = total
}

function vaciarCarrito(){
    
}
    