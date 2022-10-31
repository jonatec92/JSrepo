let categActiva = localStorage.getItem('categ-activa') || "productosFull"
if (categActiva == "productosFull"){
    const productos = document.querySelector(".productos")
    const cargarArticulosFull = async () => {
    const resp = await fetch('./data/articulos.json')
    const articulos = await resp.json()
    armaListaProductos(articulos,productos)
    }
    cargarArticulosFull()
}else{
    const catTitle = document.querySelector("#catTitle")
    catTitle.innerHTML =`<span><i class="fa-brands fa-audible"></i></span>${categActiva.toUpperCase()}!`
    const productos = document.querySelector(".productos")
    cargarArt(productos,categActiva)
}
