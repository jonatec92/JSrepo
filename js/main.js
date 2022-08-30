let usuario1 = "jonatan"
let clave1 = "alumno"
let usuario2 = "ian"
let clave2 = "tutor"
let valido
let usuario


do {
    usuario = prompt ("Ingrese un Usuario valido")
    let clave = prompt ("Ingrese su Clave")

    if (usuario == usuario1 && clave == clave1 || usuario == usuario2 && clave == clave2) {
        valido = true
    }
    else {
        valido = false
        alert ("Usuario o Clave invalido!")
    }


} while (!valido);


alert (`Bienvenido ${usuario}`)
