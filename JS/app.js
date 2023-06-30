class Producto {

    constructor(id, nombre, precio, description){
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.description = description;
    }
}

const productos = [

    new Producto(1, 'Branding basico', 7000 , 'El branding basico incluye logo y paleta de colores para tu marca'),
    new Producto(2, 'Asesorias', 1500 , 'Te asesoramos sobre marketing digital'),
    new Producto(3, 'Gestion de RRSS', 13000, 'Gestion de cualquier red social'),
    new Producto(4, 'Posicionamiento en el mercado', 9000 , 'Posicionamiento en el mercado'),
    new Producto(5, 'Branding Full', 35 , 'Bringamos un asesoramiento completo para el re lanzamiento de tu marca')
];

// console.log(productos);
// tomo los productos del div con id = product-containter
const productContainer = document.querySelector('#product-container');

 
// recorro el arreglo de productos y creo las cartas para mostrar en el front
productos.forEach(producto => {

  const productDiv = document.createElement('div');
 
  productDiv.classList.add("producto");

  productDiv.style.backgroundColor='#FFFFFF';

  //innerHTML

  productDiv.innerHTML = `

    <div class='card'>

      <h3>${producto.id}</h3>

      <h1>${producto.nombre}</h1>

      <p>${producto.precio}</p>

      <p>${producto.description}</p>

      <button class="agregar-carrito">Agregar al Carrito</button>
      <button class="eliminar-carrito">Eliminar del Carrito</button>

    </div>

  `;


  productContainer.appendChild(productDiv);

  const addButton = productDiv.querySelector('.agregar-carrito');
  addButton.addEventListener('click', () => {
    console.log("Se agrego al carrito!", producto.nombre);
    addCarrito(producto);
  });


  const deleteButton = productDiv.querySelector('.eliminar-carrito');
  addButton.addEventListener('click', () => {
    console.log("Se saco del carrito!", producto.nombre);
    eliminarCarrito(producto.id);
  });
})


let productosEnCarrito = [];

function addCarrito (producto) {
  productosEnCarrito.push(producto);
  console.log(productosEnCarrito);
}


// Función para eliminar un producto del carrito
function eliminarCarrito(id) {
  // Buscar el índice del producto en el carrito
  const indice = productosEnCarrito.findIndex(item => item.id === id);

  if (indice !== -1) {
    // Eliminar el producto del carrito
    const productoEliminado = productosEnCarrito.splice(indice, 1)[0];
    console.log(`El producto "${productoEliminado.nombre}" se eliminó del carrito.`);
  } else {
    console.log("El producto no existe en el carrito.");
  }
}

