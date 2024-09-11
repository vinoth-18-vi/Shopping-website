const btncart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnclose = document.querySelector("#cart-close");

btncart.addEventListener("click",()=>{
    cart.classList.add("cart-active")
})

btnclose.addEventListener("click",()=>{
    cart.classList.remove("cart-active")
})

document.addEventListener("DOMContentLoaded",loadFood)

function loadFood(){
    loadContent();
}

function loadContent (){
    //Remove Food Items From Cart
    let btnRemove = document.querySelectorAll(".cart-remove")
    btnRemove.forEach((btn)=>{
        btn.addEventListener("click",removeItem)
    })

    //Product Item Change Event
    let qtyElements = document.querySelectorAll(".cart-quantity")
    qtyElements.forEach((input)=>{
        input.addEventListener("change",changeQty)
    })

    //Prodict Cart

    let cartBtns=document.querySelectorAll('.add-cart')
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart)
    })

    updateTotal();
}

//Remove Item
function removeItem (){
    if(confirm("Are Your Sure to Remove")){
        let title= this.parentElement.querySelector(".cart-food-title").innerHTML
        itemList=itemList.filter(el=>el.title!=title)
    this.parentElement.remove();
    loadContent()
    }
}

//Change Quantity
function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1
    }
    loadContent()
}

let itemList=[]

//addCart
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;

    let newProduct={title,price,imgSrc}
    
    //Check Product already Exist Cart
    if(itemList.find((el)=>el.title==newProduct.title)){
        alert('Product Already addad in Cart')
        return
    }else{
        itemList.push(newProduct)
    }

    let newProductElement = createCartProduct(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    
    let cartBasket = document.querySelector('.cart-content'); 
    cartBasket.appendChild(element);
    loadContent() 
}

function createCartProduct(title, price, imgSrc) {
    return `
    <div class="cart-box">
        <img src="${imgSrc}" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
            </div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>
    `;
}

function updateTotal (){
    const cartItems=document.querySelectorAll(".cart-box")
    const totalValue=document.querySelector(".total-price")

    let total=0

    cartItems.forEach(product=>{
        let priceElement=product.querySelector(".cart-price")
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""))
        let qty=product.querySelector(".cart-quantity").value
        total+=(price*qty)
        product.querySelector(".cart-amt").innerHTML="Rs."+(price*qty)
    })
    totalValue.innerHTML='Rs.'+total

    //add product count in cart icon
    let cartCount=document.querySelector(".cart-count")
    let count=itemList.length
    cartCount.innerHTML=count

    if(count==0){
        cartCount.style.display="none"
    }else{
        cartCount.style.display="block"
    }
}

const btn_buy=document.querySelector(".btn-buy")
btn_buy.addEventListener("click", thanks)

function thanks(){
    alert("Your Order Placed ! Successlly,Thanks You for Your Valuable Order.")
}