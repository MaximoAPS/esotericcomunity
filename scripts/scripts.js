//Display del agregar producto
const elemento = document.querySelector('#agregar-producto');
elemento.style.display = "none";

function agregarProductoButton(){
	const elemento = document.querySelector('#agregar-producto');
	if (elemento) {
		let display = elemento.style.display
		if(display=="block"){
			elemento.style.display = 'none';
		}else{
			elemento.style.display = 'block';
		}
	}
	console.log("Agregar producto encontrado")
}

// Agregar producto

// Referencias a elementos

document.addEventListener('DOMContentLoaded', () => {
	const agregarProductoBtn = document.getElementById("agregar-producto-button");

	// Asignar evento al botón de agregar producto
	agregarProductoBtn.addEventListener('click', agregarProducto);

    console.log(agregarProductoBtn);
});

// Contador para asignar un ID único a cada producto
let contadorProductos = 1;

// Función para agregar un producto
const agregarProducto = () => {

	const productosImparContainer = document.getElementById('productos-impar');
	const productosParContainer = document.getElementById('productos-par');

	if (!productosImparContainer || !productosParContainer) {
        console.error("Error: No se encontraron los contenedores de productos.");
        return;
    }

	// Obtener valores del formulario
    const nombreProducto = document.getElementById("productoNombre").value;
    const descripcionProducto = document.getElementById("productoDescripcion").value;
    const precioProducto = document.getElementById("productoPrecio").value;
	const numeroProducto = document.querySelector('input[name="numeroProducto"]:checked').value; // Obtener el valor seleccionado

    if (!nombreProducto || !descripcionProducto || !precioProducto) {
        alert("Por favor, complete todos los campos del formulario.");
        return;
    }

    // Crear un contenedor para el nuevo producto
    const productoDiv = document.createElement('label');
    productoDiv.classList.add('container');
	productoDiv.classList.add(`producto${numeroProducto}`);
    productoDiv.setAttribute('id', `producto-${contadorProductos}`);

	console.log(productoDiv)

    // Contenido del producto con valores dinámicos
    productoDiv.innerHTML = `
                <div class="card mb-3">
                    <div class="row g-0">
						<div class="col-auto side-img${numeroProducto}"></div>
						<div class="col">
							<div class="card-body">
								<h4 class="card-title">${nombreProducto}</h4>
								<p class="card-text">
									${descripcionProducto}
								</p>
								<div class="rating">
									<span class="fa fa-star checked"></span> 4.7
								</div>
								<div class="price">$ ${parseFloat(precioProducto).toFixed(2)}</div>
								<p class="card-text">
									<small class="text-muted"
									>Por Jhon Doe</small
									>
								</p>
								<ul class="product-buttons">
									<li class="ver-perfil"><a href="" class="btn btn-secondary">Ver Perfil</a></li>
									<li class="carrito"><a href="" class="btn btn-secondary"><i class="fa-solid fa-cart-plus"></i></a></li>
								</ul>
							</div>
						</div>
                    </div>
                    <input type="radio" checked="checked" name="radio" />
                </div>
    `;

    // Alternar entre los contenedores impar y par
    if (contadorProductos % 2 === 0) {
        productosParContainer.appendChild(productoDiv);
    } else {
        productosImparContainer.appendChild(productoDiv);
    }

    // Incrementar el contador de productos
    contadorProductos++;

    // Resetear el formulario
    document.getElementById("agregarProductoForm").reset();
};

// Función para eliminar un producto
const eliminarProducto = (idProducto) => {
    const productoAEliminar = document.getElementById(idProducto);
    if (productoAEliminar) {
        productosContainer.removeChild(productoAEliminar);
    }
};

// Funcion para hacer un ID de longitud dada
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

console.log(makeid(10));