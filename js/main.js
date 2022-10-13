const usuario = {usuario:"",clave:""}
let msg
let valido
let bandera

logueado()

// Mensaje sobre el icono del carrito
const registrese = document.querySelector(".cart")
registrese.addEventListener("mouseover",() => {
    const on = document.querySelector(".registrese")
    on.classList.remove("on")
})
registrese.addEventListener("mouseout",() => {
    const on = document.querySelector(".registrese")
    on.classList.add("on")
})

/* Modal */
const abrir = document.querySelector(".login")
const cerrar = document.querySelector(".cruze")
const modal = document.querySelector(".modal-login")
const modalC = document.querySelector(".modal-container")
const msj = document.querySelector(".msj")


abrir.addEventListener("click", (e) => {
    e.preventDefault()
    modalC.style.visibility = "visible";
    modal.classList.toggle("modal-close");
})

cerrar.addEventListener("click",() => {
    modal.classList.toggle("modal-close");
    setTimeout(() => {
        modalC.style.visibility = "hidden";
        if (bandera == 1) {
            msj.classList.toggle("alert-danger");
            msj.innerText = "Si Usted ya se encuentra registrado, por favor complete su Usuario y Clave.";
            bandera = 0
        }
    },500)
})

window.addEventListener("click", (e) => {
    if (e.target == modalC) {
        modal.classList.toggle("modal-close");
        setTimeout(() => {
            modalC.style.visibility = "hidden";
            if (bandera == 1) {
                msj.classList.toggle("alert-danger");
                msj.innerText = "Si Usted ya se encuentra registrado, por favor complete su Usuario y Clave.";
                bandera = 0
            }
        },500)
    }
})

const formLogin = document.querySelector("#formLogin")

formLogin.addEventListener("submit", (e) => {
    e.preventDefault()
    usuario.usuario = formLogin.usuario.value 
    usuario.clave = formLogin.clave.value
    validaUsuarioClave(usuario.usuario,usuario.clave,2)
    if (valido==1) {
        bandera == 1 && msj.classList.toggle("alert-danger");
        msj.classList.toggle("alert-success");
        msj.innerText = "Login Exitoso!";
        setTimeout(() => {
            modal.classList.toggle("modal-close");
        },800)
        setTimeout(() => {
            modalC.style.visibility = "hidden";
        },1300)
        localStorage.setItem('userAct',usuario.usuario)
        window.location.reload()
    }else{
        bandera !== 1 && msj.classList.toggle("alert-danger");
        msj.innerText = "Usuario/Clave incorrecto";
        formLogin.usuario.value = ""
        formLogin.clave.value = ""
        bandera=1
    }
})

const logout = document.querySelector(".logout")

logout.addEventListener("click",() => {
    localStorage.removeItem('userAct');
    location.reload()
})

function indexcart (userAct) {
    const cantCarrito = document.querySelector("#cant_carrito")
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
    let userCantCart = 0
    for (const cart of carrito) {
        userCantCart += cart.idCart == userAct && cart.cantidad
    }
    cantCarrito.innerText = userCantCart
}

function logueado(){
    
    let userAct = localStorage.getItem('userAct')
    const logIN = document.querySelector(".in")
    const logOUT = document.querySelector(".out")
    let nombre
    let apellido
    if (userAct !== null){
        logIN.classList.remove("on")
        logOUT.classList.add("on")
        const registrados = JSON.parse(localStorage.getItem('registrados')) || []
        for (const registrado of registrados) {
            if (registrado.email == userAct) { 
                nombre = registrado.nombre;
                apellido = registrado.apellido;
                break;
            }else {
                nombre = userAct
                apellido = ""
            }
        }
        const nombreUsuario = document.querySelector(".nombreUsuario")
        nombreUsuario.innerText = `${nombre} ${apellido}`
        indexcart(userAct)

    }else{
        logIN.classList.add("on")
        logOUT.classList.remove("on")
    }
}

function validaUsuarioClave(user,pass,num) {
    const registrados = obtenerInfoUsuarios()
    valido = 0
    if (num == 1) {
        for (const registrado of registrados) {
            valido = user == registrado.email && 1   
        }
        return (valido);
    }else if (num == 2){
        for (const registrado of registrados) {
            if (user == registrado.email && pass == registrado.clave) {valido = 1}   
        }
        return (valido);
    }
}

class cliente {
    constructor(nombre, apellido, email, telefono, provincia, pais, clave) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.telefono = telefono
        this.provincia = provincia
        this.pais = pais
        this.clave = clave
    }
}

function obtenerInfoUsuarios(){
    let registrados = JSON.parse(localStorage.getItem('registrados'))
    if (registrados == null) {

        registrados = [
            new cliente ("admin","admin","admin@admin","1111111111","buenos aires","argentina","1234")
        ]
        let registradosStrify = JSON.stringify(registrados)
        localStorage.setItem('registrados',registradosStrify)
    }
    return registrados;
}

function armaListaProductos (articulos,listarEn) {
    for (const articulo of articulos) {
            const producto = document.createElement("div")
            producto.className = "col-11 col-md-3 cajasOferta"
            producto.innerHTML = `<div class ="product">
                                        <div class="prod-img">
                                            <img src="./assets/images/${articulo.imagen}" class="img-fluid" alt="${articulo.nombre}"> 
                                        </div>
                                        <div class="prod-nombre">
                                            <h4>${articulo.nombre}</h4>
                                            <span>${articulo.idArt}</span>
                                        </div>
                                        <div class="prod-precio">
                                            <span>$ ${articulo.precio}</span>
                                        </div>
                                        <div class="cant-add mt-2">
                                            <input type="number" name="cantidad" id="cant-${listarEn.classList[0]}-${articulo.idArt}" min="1" class="cantidades mx-2" value="1" required="">
                                            <input type="button" value="Comprar" id="add-${listarEn.classList[0]}-${articulo.idArt}" class="btn btn-danger btn-compra" title="Sumar a su compra">
                                        </div>
                                    </div>`;
           listarEn.appendChild(producto);
            let userAct = localStorage.getItem('userAct')
            if (userAct !== null) {
                const addProduct = document.querySelector(`#add-${listarEn.classList[0]}-${articulo.idArt}`)
                const cajaCant = document.querySelector(`#cant-${listarEn.classList[0]}-${articulo.idArt}`)
                addProduct.addEventListener("click",() => {
                    let cant = parseInt(cajaCant.value)
                    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
                    if (carrito == "") {
                        carrito =[{item:1,cantidad:cant,idCart:userAct,...articulo}]
                    }else{
                        let itemMax = i = 0
                        let otroIgual
                        for (const cart of carrito) {
                            if (userAct == cart.idCart){
                                if (articulo.idArt == cart.idArt) {
                                    cart.cantidad += cant 
                                    otroIgual=1
                                    break;
                                }else{
                                    itemMax = (itemMax < cart.item) && cart.item
                                    otroIgual = 0
                                }
                            }else{i += 1}
                        }
                        console.log(itemMax)
                        otroIgual == 0 && carrito.push({item:(itemMax + 1),cantidad:cant,idCart:userAct,...articulo})
                        i == carrito.length && carrito.push({item:1,cantidad:cant,idCart:userAct,...articulo})
                    }
                    console.log(carrito)
                    carritoStrify = JSON.stringify(carrito)
                    localStorage.setItem('carrito',carritoStrify)
                    indexcart(userAct)

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
            }else {
                const cantAdd = document.querySelector(".cant-add")
                cantAdd.className = "d-none"
            }
    }        
      
}

function cargarArt (listarEn,categoria){
const cargarArti = async () => {
    const arrayArt = await fetch('./data/articulos.json')
    const articulos = await arrayArt.json()
    const catArt = await fetch('./data/cat-articulos.json')
    const catArticulos = await catArt.json()
    artListar = filtraArt(articulos,catArticulos,categoria)
    armaListaProductos(artListar,listarEn)
}
cargarArti()

}

function filtraArt (articulos,artFiltrar,categ){
    let articulosMostrar = []
    for (const arti of articulos) {
        for (const articulo of artFiltrar) {
            if (articulo.categoria == categ && arti.idArt == articulo.idArt) {
                articulosMostrar.push(arti)
            }  
        }
    }
    return articulosMostrar
}
