
class TiendaSofi {
  
  constructor() {
    const productContainer = document.querySelector('#product-container');
    this.carrito = [];
   
    this.productos = [];

    this.loadProductos();

    this.loadCartsHtml();

    const buttons = document.querySelectorAll('.btn.btn-primary');
    buttons.forEach(button => {
      button.addEventListener('click', (event) => {
        const nombre = event.target.id;
        const producto = this.getProductByName(nombre);
        this.getProductPrice(producto);
      });
    });
  }



 loadProductos() {
    const urlProductos = './json/productos.json';
    fetch(urlProductos)
      .then(response => response.json())
      .then(data => {
        this.productos = data;
      })
      .catch(error => {
        console.error('Error al cargar los productos:', error);
      });
  }

  // cargar los productos leidos del jason en las tarjetas del html
  loadCartsHtml() {
    // recorro el arreglo de productos y creo las cartas para mostrar en el front
    this.productos.forEach( producto => {
        const productDiv = document.createElement('div');
        productDiv.classList.add("producto");
        productDiv.style.backgroundColor='#FFFFFF';
        //innerHTML
        productDiv.innerHTML = `
         <div class='card'>
          <h3>${producto.ID}</h3>
          <h1>${producto.nombre}</h1>
          <p>${producto.precio}</p>
          <p>${producto.categoria}</p>
          <button class="agregar-carrito">Agregar al Carrito</button>
          <button class="eliminar-carrito">Eliminar del Carrito</button>
        </div> `;

        productContainer.appendChild(productDiv);

        const addButton = productDiv.querySelector('.agregar-carrito');
        addButton.addEventListener('click', () => {
          console.log("Se agrego al carrito!", producto.nombre);
          addCarrito(producto);
        });
      
      
        const deleteButton = productDiv.querySelector('.eliminar-carrito');
        addButton.addEventListener('click', () => {
          console.log("Se saco del carrito!", producto.nombre);
          eliminarCarrito(producto.ID);
        });
      })
    }

    
    getProductByName(nombre) {
      return this.productos.find(producto => producto.nombre === nombre);
    }

    getProductPrice(producto) {
      const  nombre = producto;

      Swal.fire({
        title: '¿Desea comprar este producto?',
        text: `No podrá revertir esta acción para el producto ${nombre}!`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.carrito.push({ producto: nombre });
          this.showAlert(`El producto ${nombre} agregado al carrito de compras.`);
          console.log(`Producto ${nombre} agregado al carrito.`);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.showAlert("La acción ha sido cancelada.");
        }
      });
    }


   

    showAlert(message) {
      Swal.fire({
        title: message,
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false
      });
    }
}




const tiendaSofi = new TiendaSofi();

//----------------------------------------------------------------
/*
let productosEnCarrito = [];

function addCarrito (producto) {
  productosEnCarrito.push(producto);
  console.log(productosEnCarrito);
  

  Swal.fire(
    'The Internet?',
    'That thing is still around?',
    'question'
  )


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
*/
