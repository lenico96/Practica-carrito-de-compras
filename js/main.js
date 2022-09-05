
//variables iniciales
let shoppingCartArray = [];
let total = 0;
let productoContainer = document.querySelector('.shop-items');
let totalElement = document.querySelector('.cart-total-title');





//petision de productos al servidor
let res = await fetch('js/data.json')
let data = await res.json()


//poner un limite de productos que se imprimen
let productsArray = data.slice(0,4)
console.log(productsArray)




//imprimir productos en pantalla los productos de la tienda
productsArray.forEach(product => {
    productoContainer.innerHTML += `
    <div class="shop-item" id="${product.id}">
                    <span class="shop-item-title">${product.title}</span>
                    <img class="shop-item-image" src="${product.img}">
                    <div class="shop-item-details">
                        <span class="shop-item-price">$${product.price}</span>
                        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
                    </div>
                </div>

    `
    
});

//boton add evento

let botonAdd = document.querySelectorAll('.shop-item-button');

botonAdd = [...botonAdd]; //propiedad para transformar a un array(de nodelist a array)

let cartContainer = document.querySelector('.cart-items');

botonAdd.forEach(btn => {
    btn.addEventListener('click', event => {
    
        
////////////////AGREGAR PRODUCTOS AL CARRO/////////////////////

//buscar id del producto
let actualID = parseInt(event.target.parentNode.parentNode.id);

///////////////////////////////////////////////////////////////
console.log(actualID)

//con el id encontrar objeto actual
let actualProduct = productsArray.find(item => item.id == actualID)


/////////////////////////////////////////////////////////////////


//preguntar si el producto que estoy agregando existe
if(shoppingCartArray.includes(actualProduct)){
    actualProduct.cantidad++;
}else{
    shoppingCartArray.push(actualProduct)
}

///////////////////////////////////////////////////////////////

console.log(shoppingCartArray)

//dubujar en el dom el array de compras actualizado
    drawItems()

//actualizar valor total
    getTotal()
//actualizar input number
    updateNumerOfItems()
//eliminar con el boton remove
    removeItems()

//////////////////////////////////////////////////////////////
    })
})



////////////////FUNCIONES////////////////////////////////////
//total
function getTotal(){
    let sumTotal
    let total = shoppingCartArray.reduce((sum, item) =>{
        sumTotal = sum + item.cantidad*item.price
        return sumTotal
    } , 0 )
    totalElement.innerText = `$${total}`
}
//dibujar en el modal del carro
function drawItems(){
    cartContainer.innerHTML = '';
shoppingCartArray.forEach(item => {
    cartContainer.innerHTML += `
    <div class="cart-row">
                    <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${item.img}" width="100" height="100">
                        <span class="cart-item-title">${item.title}</span>
                    </div>
                    <span class="cart-price cart-column">$${item.price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" min="1" type="number" value="${item.cantidad}">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>
                </div>`

});
removeItems()
}

//INPUT NUMBER DEL CARRITO

function updateNumerOfItems(){
    let inputNumber = document.querySelectorAll('.cart-quantity-input');
    inputNumber = [...inputNumber]

    inputNumber.forEach(item => {
        item.addEventListener('click', event=> {
            //conseguir titulo del producto
            let actualProductTitle = event.target.parentElement.parentElement.childNodes[1].innerText
            let actualProductCantidad = parseInt(event.target.value);
            console.log(actualProductCantidad)
            //busco el objeto con ese titulo
            let actualProductObject = shoppingCartArray.find(item => item.title == actualProductTitle)
            console.log(actualProductObject) 

            //actualizar el numero de la propiedad cantidad
            actualProductObject.cantidad = actualProductCantidad

            //actualizar el precio total
            getTotal()
        })
    })
    
    
}

function removeItems(){
    let removeBtns = document.querySelectorAll('.btn-danger');
    removeBtns = [...removeBtns];
    removeBtns.forEach(btn =>{
        btn.addEventListener('click', event => {
            //conseguir titulo del producto
            let actualProductTitle = event.target.parentElement.parentElement.childNodes[1].innerText

            //busco el objeto con ese titulo
            let actualProductObject = shoppingCartArray.find(item => item.title == actualProductTitle)
            
            //remove del array del cart
            shoppingCartArray = shoppingCartArray.filter(item => item != actualProductObject)
            console.log(shoppingCartArray)

            //alctualizar total
            drawItems()
            getTotal()
            updateNumerOfItems()


        });

    });
    

}
