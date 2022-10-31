const userAct = localStorage.getItem('userAct')
const registrados = JSON.parse(localStorage.getItem('registrados'))
const opFormas = JSON.parse(localStorage.getItem('opFormas'))
const cartTotal = JSON.parse(localStorage.getItem('cartTotal'))
let user
for (const person of registrados) {
    if (person.email == userAct) {user = person}
}
let pedido = JSON.parse(localStorage.getItem('pedido')) || 0
localStorage.setItem('pedido',pedido+1)
const msjConfirmacion = document.querySelector("#msjConfirmacion")
msjConfirmacion.innerHTML = `Gracias ${user.nombre} por tu Compra!`
const formConf = document.querySelector("#formConf")
formConf.children[0].children[0].innerHTML = `<strong>Pedido N° ${pedido+1}</strong>`
formConf.children[1].children[1].innerHTML = user.nombre
formConf.children[2].children[1].innerHTML = user.apellido
formConf.children[3].children[1].innerHTML = user.email
formConf.children[4].children[1].innerHTML = user.telefono
formConf.children[5].children[1].innerHTML = user.provincia
formConf.children[6].children[1].innerHTML = user.pais
formConf.children[7].children[1].innerHTML = opFormas[0]
formConf.children[8].children[1].innerHTML = opFormas[1]
formConf.children[9].children[1].innerHTML = `<strong>$ ${cartTotal}</strong>`