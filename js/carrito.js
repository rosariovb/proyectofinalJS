let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorVacio = document.querySelector("#carrito-vacio");
const contenedorProductos = document.querySelector("#carrito-productos");
const contenedorAccion = document.querySelector("#carrito-accion");
const contenedorComprado = document.querySelector("#carrito-comprado");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-accion-vaciar");
const botonFinalizar = document.querySelector("#carrito-accion-finalizar")
const contenedorTotal = document.querySelector("#total");

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorVacio.classList.add("oculto");
        contenedorProductos.classList.remove("oculto");
        contenedorAccion.classList.remove("oculto");
        contenedorComprado.classList.add("oculto");

        contenedorProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-produucto-imagen" src="${producto.imagen}" >
            <div class="carrito-producto-titulo">
                <small>Productos</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id= "${producto.id}"><i class="bi bi-trash3-fill"></i></button>            
            
        
        `;

            contenedorProductos.append(div);

        })

    } else {
        contenedorVacio.classList.remove("oculto");
        contenedorProductos.classList.add("oculto");
        contenedorAccion.classList.add("oculto");
        contenedorComprado.classList.add("oculto");
    }

    actualizarBotonEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

}

function eliminarDelCarrito(e) {

    const idBoton = +e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    Swal.fire({
        title: '¿Estas seguro?',
        icon: 'question',
        html:
          ' Se borraran todos los productos',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        duration: 3000
    }).then((result) => {
        
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
         
        }
      })
        
      }

 

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innertext = `$ ${totalCalculado} `;
}

botonFinalizar.addEventListener("click", finalizarCompra);
function finalizarCompra(e) {
    e.preventDefault();
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorVacio.classList.add("oculto");
    contenedorProductos.classList.add("oculto");
    contenedorAccion.classList.add("oculto");
    contenedorComprado.classList.remove("oculto");

}