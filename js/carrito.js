let dry = []
let fp = []
const artCart = JSON.parse(localStorage.getItem('carrito'))
let userAct = localStorage.getItem('userAct')

// Valida si hay usuario activo y si el carrito existe
if (artCart !== null && userAct !== null){
    let tieneCart = 0
    // verifica si el usuario tiene articulos en el carrito
    for (const art of artCart) {if (art.idCart == userAct){tieneCart =  1}}
    // Si tiene arma el carrito y lo muestra
    if (tieneCart == 1) {
        const msgNoCart = document.querySelector("#msgNoCart")
        msgNoCart.className = "d-none"
        let i = -1
        let cartSubTotal = 0
        for (const art of artCart) {
            i++
            if (art.idCart == userAct){
                // Sube al localStore el index de cara item para modificarlo de ser necesario
                localStorage.setItem (`mod-item ${art.item}`,i)
                // Arma el listado de articulos del carrito
                const carrito = document.querySelector("#carrito")
                let subtotal = art.precio * art.cantidad
                const producto = document.createElement("tr")
                producto.className = "CartProduct"
                producto.id =`item-${art.item}`
                producto.innerHTML = `<td class="CartProductThumb hidden-xs">
                                        <img src="./assets/images/${art.imagen}">
                                    </td>
                                    <td class="car-nombre">
                                        <div class="CartDescription">
                                            <h4><b>${art.nombre}</b></h4>
                                            <small class="carrito_cod hidden-xs">(Cód. ${art.idArt})</small>
                                        </div>
                                    </td>
                                    <td class="car-precio"><div class="price" id="precio_${art.item}"><span>$ ${art.precio}</span></div></td>
                                    <td class="car-cant">
                                        <input type="number" name="cant_${art.item}" id="cant_${art.item}" size="4" min="1" data-bind="value:cantidad" value="${art.cantidad}" class="cantidades">
                                    </td>
                                    <td class="car-subt" id="subtotal_${art.item}" nowrap="">$ ${subtotal}</td>                      
                                    <td class="delete" id="del-${art.idArt}"><a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td>`;
                carrito.appendChild(producto);
                // Arma el evento para eliminar items del carrito
                const elimArt = document.querySelector(`#del-${art.idArt}`)
                const index = parseInt(localStorage.getItem(`mod-item ${art.item}`))
                elimArt.addEventListener("click", () => {
                        const delCarrito = JSON.parse(localStorage.getItem('carrito'))
                        if (delCarrito.length > 1) {
                        delCarrito.splice(index,1)
                        localStorage.removeItem(`mod-item ${art.item}`)
                        // Renombra el numero de item que quedan en carrito de ese usuario
                        for (const delArt of delCarrito) {
                            if(delArt.idCart == userAct && delArt.item > art.item){
                                localStorage.removeItem(`mod-item ${delArt.item}`)
                                delArt.item --
                            }
                        }
                        // Vuelve a subir el carrito al localStorage
                        const delCarritoStrify = JSON.stringify(delCarrito)
                        localStorage.setItem('carrito' , delCarritoStrify)
                        }else{
                            localStorage.removeItem('carrito')
                        }
                        window.location.reload()
                    })
                // Modifica las cantidades si el usuario las modifica en el carrito    
                const modCant = document.querySelector(`#cant_${art.item}`)
                modCant.addEventListener("change" , () => {
                        const modCantArt = JSON.parse(localStorage.getItem('carrito'))
                        modCantArt[index].cantidad = parseInt(modCant.value)
                        const modCarritoStrify = JSON.stringify(modCantArt)
                        localStorage.setItem('carrito' ,modCarritoStrify)
                        window.location.reload()
                })
                cartSubTotal += subtotal
            }
        }
        // Arma los datos de subtotal,total en el dom
        const SubTotal = document.querySelector("#subTotal")
        const resSubTotal = document.querySelector("#resSubTotal")
        const resTotal = document.querySelector("#resTotal")
        SubTotal.innerHTML =`<strong>$ ${cartSubTotal}</strong>`
        resSubTotal.innerHTML =`<strong>$ ${cartSubTotal}</strong>`
        resTotal.innerHTML =`<strong>$ ${cartSubTotal}</strong>`
        localStorage.setItem('cartSubTotal',cartSubTotal)
        // Escucha el boton de confirmar compra, elimina el carrito de ese usuario al grabar el pedido
        const confirmar = document.querySelector("#compra")
        confirmar.addEventListener("submit",(e) => {
            e.preventDefault()
            let toDel =[]
            for (let index = 0; index < artCart.length; index++) {
                const i = localStorage.getItem(`mod-item ${index+1}`) || -1;
                if (i>=0) {
                    toDel.push(i)
                    localStorage.removeItem(`mod-item ${index+1}`)
                }
            }
            toDel.reverse()
            for (const art of toDel) {
                artCart.splice(art,1)
            }
            artCartStrify = JSON.stringify(artCart)
            localStorage.setItem('carrito',artCartStrify)
            window.location.href ="./confirmacion.html"
        })
    }else{
        // muestra mensaje de carrito vacio
        const tblCart = document.querySelector("#cartSteps")
        tblCart.className = "d-none"
    }
}else{
    // muestra mensaje de carrito vacio
    const tblCart = document.querySelector("#cartSteps")
    tblCart.className = "d-none"
}

// Graba las formas de entrega y pago elegidas
function opFormas(opcion){
    switch (opcion) {
        case 1:
            dry = ["Retiro en Local",1]
            break;
        case 2:
            dry = ["Coordinar con el vendedor",2]
            break;
        case 3:
            dry = ["Envio a domicilio",3]
            break;
        case 4:
            fp = "Efectivo"
            break;
        case 5:
            fp = "Transferencia Bancaria"
            break;
        case 6:
            fp = "Coordinar con el vendedor"
            break;     
        ;default:
            break;
    }
    // añade al resumen de compra los datos de delivery,pago y total
    const resDry = document.querySelector("#resDry")
    const resTotal = document.querySelector("#resTotal")
    let cartSubTotal = JSON.parse(localStorage.getItem('cartSubTotal'))
    if (dry[1] == 3) {
        resDry.innerHTML = "<strong>$ 800</strong>"
        cartSubTotal += 800 
        resTotal.innerHTML = `<strong>$ ${cartSubTotal}</strong>`

    }else{
        resDry.innerHTML = "<strong>$ 0</strong>"
        resTotal.innerHTML =`<strong>$ ${cartSubTotal}</strong>`
    }
    //sube al localstorage los datos relevantes
    opFromasStrify = JSON.stringify([dry[0],fp])
    localStorage.setItem('opFormas',opFromasStrify)
    cartTotalStrify = JSON.stringify(cartSubTotal)
    localStorage.setItem('cartTotal',cartTotalStrify) 
}





