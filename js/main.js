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
        logueado()
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