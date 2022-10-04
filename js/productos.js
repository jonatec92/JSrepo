let articulos = [
    {id:"DRUM-001",nombre:"Bateria DW X-SERIES",precio:5000,imagen:"DRUM-001.jpg"},
    {id:"DRUM-002",nombre:"Bateria DW X-SERIES",precio:5000,imagen:"DRUM-001.jpg"},
    {id:"DRUM-003",nombre:"Bateria DW X-SERIES",precio:5000,imagen:"DRUM-001.jpg"},
    {id:"DRUM-004",nombre:"Bateria DW X-SERIES",precio:5000,imagen:"DRUM-001.jpg"},
    {id:"DRUM-005",nombre:"Bateria DW X-SERIES",precio:5000,imagen:"DRUM-001.jpg"},
    {id:"DRUM-006",nombre:"Bateria DW X-SERIES",precio:5000,imagen:"DRUM-001.jpg"},
]

const productos = document.querySelector(".productos")

for (const articulo of articulos) {
const producto = document.createElement("div")
producto.className = "col-11 col-md-3 cajasOferta"
producto.innerHTML = `<div class ="product">
                            <div class="prod-img">
                                <img src="./assets/images/${articulo.imagen}" class="img-fluid" alt="${articulo.nombre}"> 
                            </div>
                            <div class="prod-nombre">
                                <h4>${articulo.nombre}</h4>
                                <span>${articulo.id}</span>
                            </div>
                            <div class="prod-precio">
                                <span>$ ${articulo.precio}</span>
                            </div>
                            <div class="cant-add mt-2">
                                <input type="number" name="cantidad" id="cantidad" min="1" class="cantidades mx-2" value="1" required="">
                                <input type="button" value="Comprar" id="add-${articulo.id}" class="btn btn-danger btn-compra" title="Sumar a su compra">
                            </div>
                        </div>`;
productos.appendChild(producto);

const addToCart = document.querySelector(`#add-${articulo.id}`)
addToCart.addEventListener("click",() => {
    console.log("llega")
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: `${articulo.nombre} Agregado al carrito!`
      })
})

}

