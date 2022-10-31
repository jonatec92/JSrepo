let dry = []
let fp = []
const artCart = JSON.parse(localStorage.getItem('carrito'))
let userAct = localStorage.getItem('userAct')
if (artCart !== null && userAct !== null){
    let tieneCart = 0
    for (const art of artCart) {if (art.idCart == userAct){tieneCart =  1}}
    if (tieneCart == 1) {
        const msgNoCart = document.querySelector("#msgNoCart")
        msgNoCart.className = "d-none"
        let i = -1
        let cartSubTotal = 0
        for (const art of artCart) {
            i++
            if (art.idCart == userAct){
                localStorage.setItem (`mod-item ${art.item}`,i)
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
                const elimArt = document.querySelector(`#del-${art.idArt}`)
                const index = parseInt(localStorage.getItem(`mod-item ${art.item}`))
                elimArt.addEventListener("click", () => {
                        const delCarrito = JSON.parse(localStorage.getItem('carrito'))
                        if (delCarrito.length > 1) {
                        delCarrito.splice(index,1)
                        localStorage.removeItem(`mod-item ${art.item}`)
                        for (const delArt of delCarrito) {
                            if(delArt.idCart == userAct && delArt.item > art.item){
                                localStorage.removeItem(`mod-item ${delArt.item}`)
                                delArt.item --
                            }
                        }
                        const delCarritoStrify = JSON.stringify(delCarrito)
                        localStorage.setItem('carrito' , delCarritoStrify)
                        }else{
                            localStorage.removeItem('carrito')
                        }
                        window.location.reload()
                    })
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
        const SubTotal = document.querySelector("#subTotal")
        const resSubTotal = document.querySelector("#resSubTotal")
        const resTotal = document.querySelector("#resTotal")
        SubTotal.innerHTML =`<strong>$ ${cartSubTotal}</strong>`
        resSubTotal.innerHTML =`<strong>$ ${cartSubTotal}</strong>`
        resTotal.innerHTML =`<strong>$ ${cartSubTotal}</strong>`
        localStorage.setItem('cartSubTotal',cartSubTotal)
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
        const tblCart = document.querySelector("#cartSteps")
        tblCart.className = "d-none"
    }
}else{
    const tblCart = document.querySelector("#cartSteps")
    tblCart.className = "d-none"
}

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
    opFromasStrify = JSON.stringify([dry[0],fp])
    localStorage.setItem('opFormas',opFromasStrify)
    cartTotalStrify = JSON.stringify(cartSubTotal)
    localStorage.setItem('cartTotal',cartTotalStrify) 
}





