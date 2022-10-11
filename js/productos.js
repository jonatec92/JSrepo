const productos = document.querySelector(".productos")
const cargarArticu = async () => {
    const resp = await fetch('../data/articulos.json')
    const articulos = await resp.json()
    armaListaProductos(articulos,productos)
}

cargarArticu()