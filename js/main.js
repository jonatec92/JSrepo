let usuario1 = "ian"
let clave1 = "tutor"
let usuario
let clave
let msg
let valido

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
    usuario = prompt ("Ingrese usuario")
    clave = prompt ("Ingrese Clave")
    valido = true
    return (usuario,clave)
}

function valida() {
    
    do {
        usuario = prompt ("Ingrese su usuario o esc para salir")
        if (usuario == "esc"){
            valido = false
            break;
        }else;
        clave = prompt ("Ingrese su clave")
        if (usuario == usuario1 && clave == clave1) {
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
    usuario1 = usuario
    clave1 = clave
}
else;

if (valido) {
    alert (`Bienvenido ${usuario}!`)
}else {
    alert ('Hasta pronto!')
}

