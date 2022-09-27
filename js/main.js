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
        if (bandera == 1) {msj.classList.toggle("alert-danger");}
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
        if (bandera !== 1){msj.classList.toggle("alert-danger");}
        msj.innerText = "Usuario/Clave incorrecto";
        formLogin.usuario.value = ""
        formLogin.clave.value = ""
        bandera=1
    }
})

const logout = document.querySelector(".logout")

logout.addEventListener("click",(e) => {
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

function validaUsuarioClave(user,pass,num) {
    const registrados = obtenerInfoUsuarios()
    valido = 0
    if (num == 1) {
        for (const registrado of registrados) {
            if (user == registrado.email) {valido = 1}   
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

const registro = document.querySelector("#registro")
registro.addEventListener("submit", (e) => {
    e.preventDefault()
    let mismaClave
    const msjReg = document.querySelector(".msjReg")
    console.log(registro.telefono.value)
    validaUsuarioClave(registro.email.value,0,1)
    if (registro.clave.value == registro.clave2.value) {mismaClave = 1}else{mismaClave=0}
    switch (true) {
        case valido == 1 && mismaClave == 1:
            msjReg.innerText = "El mail ya se encuentra registrado"
            break;
        case valido == 0 && mismaClave == 0:
            msjReg.innerText = "Las claves no coinciden, porfavor ingrese la misma clave"
            break;
        case valido == 1 && mismaClave == 0:
            msjReg.innerText = "El mail ya se encuentra registrado, ademas las claves no coinciden"
            break;
        case valido == 0 && mismaClave == 1:
            let registrados = JSON.parse(localStorage.getItem('registrados')) || []
            console.log(registrados)
            registrados.push (new cliente (registro.nombre.value,registro.apellido.value,registro.email.value,registro.telefono.value,registro.provincia.value,registro.pais.value,registro.clave.value))
            console.log(registrados)
            let registradosStrify = JSON.stringify(registrados)
            localStorage.setItem('registrados',registradosStrify)
            localStorage.setItem('userAct',registro.email.value)
            window.location.href="./index.html"
            logueado()
            break;   
        default:
            console.log("No se pudo chequear el usuario o la clave")
            break;
    }
})