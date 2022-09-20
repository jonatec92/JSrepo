const registrados = [{usuario:"ian",clave:"tutor"}]
const usuario = {usuario:"",clave:""}
let msg
let valido
let bandera

function users (usuario,clave) {
    this.usuario = usuario;
    this.clave = clave
}

function menu (cant,o1,o2,o3,o4,o5) {

    switch (cant) {
        
        case 2:
            msg = `Elija una opcion
            1. ${o1}
            2. ${o2}`
            break;
        case 3:
            msg = `Elija una opcion
            1. ${o1}
            2. ${o2}
            3. ${o3}`
            break;
        case 4:
            msg = `Elija una opcion
            1. ${o1}
            2. ${o2}
            3. ${o3}
            4. ${o4}`
            break;
        case 5:
            msg = `Elija una opcion
            1. ${o1}
            2. ${o2}
            3. ${o3}
            4. ${o4}
            5. ${o5}`
            break
        default:
            console.log ("ingrese la cantidad de opciones entre 2 y 5")
            break;
    }
    
    return (msg)

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

function valida() {
    
    do {
        bandera = 0
        usuario.usuario = prompt ("Ingrese su usuario o esc para salir")
        if (usuario.usuario == "esc"){
            valido = false
            break;
        }else;
        usuario.clave = prompt ("Ingrese su clave")

        for (const registrado of registrados) {
            if (registrado.usuario == usuario.usuario && registrado.clave == usuario.clave) {bandera = 1}
        }

        if (bandera == 1) {
            valido = true
        }
        else {
            valido = false
            alert ("Usuario o Clave invalido!")
        }

    } while (!valido);
}

menu (2,"Ingresar","Registro",0,0,0)
let eleccion = parseInt (prompt (`Bienvenido a JECMUSIC! 
Para operar en nuestro sitio debe contar con un usuario.
${msg}`))

while (eleccion !== 1 && eleccion !== 2) {
     alert ("Ingrese una opcion valida")
     eleccion = parseInt (prompt (`Bienvenido a JECMUSIC! 
     Para operar en nuestro sitio debe contar con un usuario.
     ${msg}`))
}

if (eleccion == 1) {
    valida ()
}
else if (eleccion == 2) {
    SolUsuario()
}
else;

if (valido) {
    alert (`Proceso exitoso!`)
    const exito = document.querySelector(".main")
    exito.innerHTML = `<h1>Bienvenido ${usuario.usuario} </h1>`

}else {
    alert ('Hasta pronto!')
}

