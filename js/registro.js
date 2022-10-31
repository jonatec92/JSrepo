// Recibe los datos del registro y valida usuario clave, si esta ok crea el nuevo cliente dentro de los registrados
const registro = document.querySelector("#registro")
registro.addEventListener("submit", (e) => {
    e.preventDefault()
    const msjReg = document.querySelector(".msjReg")
    validaUsuarioClave(registro.email.value,0,1)
    let mismaClave = registro.clave.value == registro.clave2.value ? 1 : 0
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
            registrados.push (new cliente (registro.nombre.value,registro.apellido.value,registro.email.value,registro.telefono.value,registro.provincia.value,registro.pais.value,registro.clave.value))
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