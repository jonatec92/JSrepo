const registrados = [{usuario:"ian",clave:"tutor"}]
const usuario = {usuario:"",clave:""}
let msg
let valido
let bandera
let logdo = 0

logueado()

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
    valida(usuario.usuario,usuario.clave)
    if (valido==1) {
        if (bandera == 1) {msj.classList.toggle("alert-danger");}
        msj.classList.toggle("alert-success");
        msj.innerText = "Login Exitoso!";
        setTimeout(() => {
            modal.classList.toggle("modal-close");
        },800)
        setTimeout(() => {
            modalC.style.visibility = "hidden";
        },1300)
        logdo = 1;
        logueado()
    }else{
        if (bandera !== 1){msj.classList.toggle("alert-danger");}
        msj.innerText = "Usuario/Clave incorrecto";
        formLogin.usuario.value = ""
        formLogin.clave.value = ""
        bandera=1
    }
})

const logout = document.querySelector(".logout")

logout.addEventListener("click",(e) => {
    logdo = 0;
    logueado()
})

function logueado(){
    const logIN = document.querySelector(".in")
    const logOUT = document.querySelector(".out")
    if (logdo == 1){
        logIN.classList.remove("on")
        logOUT.classList.add("on")
    }else{
        logIN.classList.add("on")
        logOUT.classList.remove("on")
    }
}

function SolUsuario() {
    bandera = 0
    while (bandera == 0) {
        usuario.usuario = prompt ("Ingrese usuario")
        for (const registrado of registrados) {
            if (registrado.usuario == usuario.usuario) {
                alert("El usuario ingresado ya existe, por favor ingrese otro")
            }
            else if(usuario.usuario == ""){
                alert("El usuario no puede estar vacio!")
            }
            else {bandera = 1}
        }
    }
    usuario.clave = prompt ("Ingrese Clave")
    registrados.push = new users(usuario.usuario,usuario.clave);
    console.log(registrados)
    valido = true
    return (usuario.usuario,usuario.clave)
    
}

function valida(user,pass) {
    valido = 0
    for (const registrado of registrados) {
        if (user == registrado.usuario && pass == registrado.clave) {valido = 1}
    return (valido);
}}

// menu (2,"Ingresar","Registro",0,0,0)
// let eleccion = parseInt (prompt (`Bienvenido a JECMUSIC! 
// Para operar en nuestro sitio debe contar con un usuario.
// ${msg}`))

// while (eleccion !== 1 && eleccion !== 2) {
//      alert ("Ingrese una opcion valida")
//      eleccion = parseInt (prompt (`Bienvenido a JECMUSIC! 
//      Para operar en nuestro sitio debe contar con un usuario.
//      ${msg}`))
// }

// if (eleccion == 1) {
//     valida ()
// }
// else if (eleccion == 2) {
//     SolUsuario()
// }
// else;

// if (valido) {
//     alert (`Proceso exitoso!`)
//     const exito = document.querySelector(".main")
//     exito.innerHTML = `<h1>Bienvenido ${usuario.usuario} </h1>`

// }else {
//     alert ('Hasta pronto!')
// }
