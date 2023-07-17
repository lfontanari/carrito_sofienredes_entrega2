document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.forEach((itemCarrito) => carritoHTML(itemCarrito));
  modalCarrito.classList.add("modal-oculto");
  carritoVisible = false;
  actualizarCarrito();
});

class Producto {
  constructor(id, categoria, nombre, precio, imagen) {
    this.id = id;
    this.categoria = categoria;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}


const productos = [
  new Producto(
    1,
    "E-BOOKS",
    "Master en Planificacion",
    1800,
    "./assets/img/SR_MasterEnPlanificacion.png"
  ),
  new Producto(
    2,
    "PLANTILLAS EDITABLES",
    "Planner en Sheets",
    1800,
    "./assets/img/SR_VERDE.png"
  ),
  new Producto(  
    3,
     "PLANTILLAS EDITABLES",
     "Planner en Notion",
    2500,
     "./assets/img/SR_PlannerNotion.png"
  ),
  new Producto(
    4,
    "PRESETS",
    "Pack Minimalista",
    1500,
    "./assets/img/SR_VERDE.png"
  ),
  new Producto(
   
    5,
    "SERVICIOS",
    "Gestion de Redes Sociales",
    6500,
    "./assets/img/SR_MarketingDigital.png"
  ),
  new Producto(  
    6,
    "SERVICIOS",
    "Branding",
    8000,
    "./assets/img/Servicios.png"
  ),
  new Producto(  
    7,
    "SERVICIOS",
    "Asesorias 1:1",
    5500,
    "./assets/img/SR_VERDE.png"
  ),
];

let carrito = [];
const modalCarrito = document.querySelector(".carrito-container");
const botonCarrito = document.querySelector("#carrito");
const contenedor = document.querySelector("#product-container");
let contenedorCarrito;
let carritoVisible = false;


function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
//FUNCION PARA MOSTRAR PRODUCTOS
function mostrarProductos(productos) {
  contenedor.innerHTML = "";
  productos.forEach(function (producto) {
      const contenedorProductos = document.createElement("div");
      contenedorProductos.classList.add("tarjeta");
      contenedorProductos.innerHTML = `
                <img src="${producto.imagen}">
                <h6>${producto.categoria} : ${producto.nombre}</h6>
                <p>$${producto.precio}</p>
                <button class='agregar_carrito' id='${producto.id}'>Agregar al carrito</button>`;
      contenedor.appendChild(contenedorProductos);
      const imagen = contenedorProductos.querySelector("img");
    }
  );
  //AGREGAR AL CARRITO
  const botonAgregar = document.querySelectorAll(".agregar_carrito");
  botonAgregar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      modalCarrito.classList.add("modal-oculto");
      carritoVisible = false;
      const botonId = parseInt(this.id);
      const productoAgregado = productos.find(
        (producto) => producto.id === botonId
      );
      carrito.push(productoAgregado);
      guardarCarrito(carrito);

      Swal.fire({
        text: "Producto agregado al carrito!",
        imageUrl: productoAgregado.imagen,
        imageWidth: 350,
        imageHeight: 300,
        imageAlt: "foto de producto",
        confirmButtonText: "OK",
      });
      actualizarCarrito();
    });
  });
}

//MOSTRAR CARRITO
botonCarrito.addEventListener("click", function () {
  if (carritoVisible) {
    modalCarrito.innerHTML = "";
    modalCarrito.classList.add("modal-oculto");
    carritoVisible = false;
  } else {
    modalCarrito.innerHTML = "";
    carrito.forEach(carritoHTML);
    modalCarrito.classList.remove("modal-oculto");
    carritoVisible = true;
    if (carrito.length === 0) {
      Toastify({
        text: "El carrito esta vacio!",
        className: "info",
        duration: 3000,
        position: "center",
      }).showToast();
    } else {
      const btnVaciarCarrito = document.createElement("button");
      btnVaciarCarrito.id = "vaciar-carrito";
      btnVaciarCarrito.textContent = "Vaciar Carrito";
      btnVaciarCarrito.addEventListener("click", vaciarCarrito);
      modalCarrito.appendChild(btnVaciarCarrito);
    }
  }
});
//GENERAR HTML DEL CARRITO
function carritoHTML(itemCarrito) {
  contenedorCarrito = document.createElement("div");
  contenedorCarrito.classList.add("item-carrito");
  contenedorCarrito.innerHTML = `
            <img src='${itemCarrito.imagen}'>
            <div class="item-texto">
            <h6>${itemCarrito.categoria} : ${itemCarrito.nombre}</h6>
            <p>$${itemCarrito.precio}</p>
            </div>
            `;
  modalCarrito.appendChild(contenedorCarrito);
  const separador = document.createElement("hr");
  modalCarrito.appendChild(separador);
}

function actualizarCarrito() {
  modalCarrito.innerHTML = "";
  carrito.forEach(function (itemCarrito) {
    carritoHTML(itemCarrito);
  });
  if (carrito.length === 0) {
    modalCarrito.classList.add("modal-oculto");
    carritoVisible = false;
  }
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito(carrito);
  actualizarCarrito();
  modalCarrito.classList.add("modal-oculto");
  carritoVisible = false;
}

mostrarProductos(productos);
