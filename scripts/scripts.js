let productos = {
  1: {
    tipo: 1,
    nombre: "Producto 1",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore at eius dicta quasi amet minima culpa numquam sunt commodi aliquid. Recusandae cumque eveniet a, possimus perferendis architecto! Enim, explicabo repellat!",
    precio: 800,
  },
  2: {
    tipo: 2,
    nombre: "Producto 2",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore at eius dicta quasi amet minima culpa numquam sunt commodi aliquid. Recusandae cumque eveniet a, possimus perferendis architecto! Enim, explicabo repellat!",
    precio: 500,
  },
  3: {
    tipo: 3,
    nombre: "Producto 3",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore at eius dicta quasi amet minima culpa numquam sunt commodi aliquid. Recusandae cumque eveniet a, possimus perferendis architecto! Enim, explicabo repellat!",
    precio: 300,
  },
  4: {
    tipo: 4,
    nombre: "Producto 4",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore at eius dicta quasi amet minima culpa numquam sunt commodi aliquid. Recusandae cumque eveniet a, possimus perferendis architecto! Enim, explicabo repellat!",
    precio: 550,
  },
  5: {
    tipo: 1,
    nombre: "Producto 5",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore at eius dicta quasi amet minima culpa numquam sunt commodi aliquid. Recusandae cumque eveniet a, possimus perferendis architecto! Enim, explicabo repellat!",
    precio: 800,
  },
  6: {
    tipo: 2,
    nombre: "Producto 6",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore at eius dicta quasi amet minima culpa numquam sunt commodi aliquid. Recusandae cumque eveniet a, possimus perferendis architecto! Enim, explicabo repellat!",
    precio: 500,
  },
  7: {
    tipo: 3,
    nombre: "Producto 7",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore at eius dicta quasi amet minima culpa numquam sunt commodi aliquid. Recusandae cumque eveniet a, possimus perferendis architecto! Enim, explicabo repellat!",
    precio: 300,
  },
  8: {
    tipo: 4,
    nombre: "Producto 8",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore at eius dicta quasi amet minima culpa numquam sunt commodi aliquid. Recusandae cumque eveniet a, possimus perferendis architecto! Enim, explicabo repellat!",
    precio: 550,
  },
};

// Contador para asignar un ID único a cada producto
if (localStorage.getItem("listaProductos")) {
  console.log("Hay lista de productos");
} else {
  console.log("No hay lista de productos");
  localStorage.setItem("contadorProductos", 1);
}

let contadorProductos = 1;

if (7 < localStorage.getItem("contadorProductos")) {
  productos = JSON.parse(localStorage.getItem("listaProductos"));
  localStorage.removeItem("listaProductos");
  localStorage.setItem("contadorProductos", contadorProductos);
} else {
  console.log("No hay productos agregados");
}

//Display del agregar producto
const elemento = document.querySelector("#agregar-producto");
elemento.style.display = "none";

function agregarProductoButton() {
  const elemento = document.querySelector("#agregar-producto");
  if (elemento) {
    let display = elemento.style.display;
    if (display == "block") {
      elemento.style.display = "none";
    } else {
      elemento.style.display = "block";
    }
  }
}

// Agregar producto

// Referencias a elementos

document.addEventListener("DOMContentLoaded", () => {
  const agregarProductoBtn = document.getElementById("agregar-producto-button");

  // Asignar evento al botón de agregar producto
  agregarProductoBtn.addEventListener("click", obtenerDatosFormulario);
});

// Agregar producto al carrito
const agregarProductoAlCarrito = (
  nombreProducto,
  precioProducto,
  stockProducto
) => {
    // Cargar productos del carrito
    console.log("Entro a la funcion correctamente")

    const productosEnLS = localStorage.getItem("productos");
    let productosCarrito;

    try {
        const productosEnLS = localStorage.getItem("productos");
        productosCarrito = productosEnLS ? JSON.parse(productosEnLS) : [];
    } catch (error) {
        console.error("Error al parsear JSON desde localStorage:", error);
        productosCarrito = [];
    }
    console.log("Cargo los productso del carrito")
    productosCarrito.push({
        nombre: nombreProducto,
        precio: precioProducto,
        stock: stockProducto,
    });
    console.log("Agrego el nuevo producto")
    // Guardar en LS
    localStorage.setItem("productos", JSON.stringify(productosCarrito));
    console.log("Se guardo en LS")
};

// Función para agregar un producto

const obtenerDatosFormulario = () => {
  // Obtener valores del formulario
  const nombreProducto = document.getElementById("productoNombre").value;
  const descripcionProducto = document.getElementById(
    "productoDescripcion"
  ).value;
  const precioProducto = document.getElementById("productoPrecio").value;
  const numeroProducto = document.querySelector(
    'input[name="numeroProducto"]:checked'
  ).value; // Obtener el valor seleccionado

  if (!nombreProducto || !descripcionProducto || !precioProducto) {
    alert("Por favor, complete todos los campos del formulario.");
    return;
  }
  agregarProducto(
    nombreProducto,
    descripcionProducto,
    precioProducto,
    numeroProducto
  );

  // Resetear el formulario
  document.getElementById("agregarProductoForm").reset();
};

const agregarProducto = (
  nombreProducto,
  descripcionProducto,
  precioProducto,
  numeroProducto
) => {
  const productosImparContainer = document.getElementById("productos-impar");
  const productosParContainer = document.getElementById("productos-par");

  if (!productosImparContainer || !productosParContainer) {
    console.error("Error: No se encontraron los contenedores de productos.");
    return;
  }

  // Crear un contenedor para el nuevo producto
  const productoDiv = document.createElement("label");
  productoDiv.classList.add("container");
  productoDiv.classList.add(`producto${numeroProducto}`);
  productoDiv.setAttribute("id", `producto-${contadorProductos}`);

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
									<li class="ver-perfil"><a href="#" class="btn btn-secondary">Ver Perfil</a></li>
									<li class="carrito" onclick="agregarProductoAlCarrito('${nombreProducto}', ${parseFloat(
                                        precioProducto
                                    ).toFixed(
                                        2
                                    )},10)"><a href="#" class="btn btn-secondary"><i class="fa-solid fa-cart-plus"></i></a></li>
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

  // Cargar productos del sitio
  try {
    listaProductos = JSON.parse(localStorage.getItem("listaProductos")) || {};
  } catch (e) {
    console.error("Error al parsear listaProductos desde localStorage", e);
    listaProductos = {}; // Reinicia el objeto si falla el parseo
  }
  listaProductos[contadorProductos] = {
    tipo: numeroProducto,
    nombre: nombreProducto,
    descripcion: descripcionProducto,
    precio: precioProducto,
  };

  // Guardar en LS
  localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
  console.log("Lista de productos guardada.");

  // Incrementar el contador de productos
  contadorProductos++;
  localStorage.setItem("contadorProductos", contadorProductos);
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
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

for (let id in productos) {
  agregarProducto(
    productos[id].nombre,
    productos[id].descripcion,
    productos[id].precio,
    productos[id].tipo
  );
}
