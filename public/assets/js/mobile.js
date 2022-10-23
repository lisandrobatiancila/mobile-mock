var controller = new Controller();
var productStorage = new ProductStorage();

var CONTENT = document.getElementById('content');
var CONTAINER = document.getElementById('container');
var SCREEN = document.getElementById("mobile_screen");
var ECOMMERCE_CONTAINER = null;

CONTENT.className = "content";

CONTENT.appendChild(controller.showChargingUI());
CONTENT.appendChild(controller.dotHeartBeat());

function homeScreen() {
    SCREEN.className = "mobile-screen-white";

    while(CONTENT.children.length > 0) {
        CONTENT.removeChild(CONTENT.children[CONTENT.children.length-1]);
    }
    SCREEN.style.border = "1px solid var(--ddColor)";

    // WELCOMING SCREEN
    CONTENT.appendChild(controller.loadingScreen());
    SCREEN.style.backgroundColor = 'var(--ddColor)'
    const SI = setInterval(() => {
        SCREEN.classList.add('fade-in');
        CONTENT.removeChild(CONTENT.children[0]);
        const ssii = setInterval(() => {
            SCREEN.className = 'fade-in mobile-screen-white';
            SCREEN.style = ''
            SCREEN.style.border = "1px solid var(--ddColor)";

            clearInterval(ssii)
        }, 1500)
        clearInterval(SI)
    }, 3000);
    // END OF WELCOMING SCREEN

    const appSI = setInterval(() => { // opening the mobile applications lists
        CONTENT.appendChild(controller.homeScreenApps()); //display all applications
        ECOMMERCE_CONTAINER = document.getElementById("e_commerce_cotainer"); // eCommerceListener
        ECOMMERCE_CONTAINER.addEventListener("click", ecommerceContainerListener); // eCommerceListener

        let TIK_TAK_TOE_CONTAINER = document.getElementById("tik_tak_toe_container");
        TIK_TAK_TOE_CONTAINER.addEventListener("click", tikTakToeContainerListener)
        clearInterval(appSI);
    }, 5500);

} //open the home screen

function ecommerceContainerListener () {
    while(CONTENT.children.length > 0) {
        CONTENT.removeChild(CONTENT.children[CONTENT.children.length-1]);
    }
    CONTENT.appendChild(controller.eCommerceGUI()); //this display the eCommerceGUI app if user clicked it
    var CART_COUNT_CONTAINER = document.getElementById("cart-item-count"); // COUNT YOUR PRODUCT BOUGHT
    CART_COUNT_CONTAINER.textContent = productStorage.getAllCartsItem().length > 0?
        productStorage.getAllCartsItem().length:"0" //COUNT CART ITEM

    const si = setInterval(() => {
        const ADD_TO_CART_BTN_ARR = document.getElementsByTagName("button");
        const len = ADD_TO_CART_BTN_ARR.length
        for(let i = 0; i < len; i++) {
            ADD_TO_CART_BTN_ARR[i].addEventListener("click", addToCart)
        }
        clearInterval(si)
    }, 1000);

    const ec_gui_headerSI = setInterval(() => {
        const VIEW_HEADER_CART = document.getElementById("ec_header_gui");
        VIEW_HEADER_CART.addEventListener("click", viewCart)
        clearInterval(ec_gui_headerSI)
    }, 1000)
} //open the eCommerce Application

function addToCart() {
    const PRODUCT_ID = this.getAttribute("id");
    
    if(productStorage.checkIFProductIsAddedAlready(PRODUCT_ID)){
        productStorage.addToCart(PRODUCT_ID);
        var CART_COUNT_CONTAINER = document.getElementById("cart-item-count"); // COUNT YOUR PRODUCT BOUGHT
        CART_COUNT_CONTAINER.textContent = productStorage.getAllCartsItem().length > 0?
            productStorage.getAllCartsItem().length:"0" //COUNT CART ITEM
        CONTENT.appendChild(controller.ResponseMessages("quantity was updated!", "success"))
    }
    else{
        productStorage.addToCart(PRODUCT_ID);
        var CART_COUNT_CONTAINER = document.getElementById("cart-item-count"); // COUNT YOUR PRODUCT BOUGHT
        CART_COUNT_CONTAINER.textContent = productStorage.getAllCartsItem().length > 0?
            productStorage.getAllCartsItem().length:"0" //COUNT CART ITEM
        CONTENT.appendChild(controller.ResponseMessages("new product was added!", "success"));
    }

    const closeMessageSI = setInterval(() => {
        CONTENT.removeChild(CONTENT.lastChild)
        clearInterval(closeMessageSI)
    }, 2000); //Remove the ResponseMessage
}

function viewCart() {
    CONTENT.children[0].removeChild(CONTENT.children[0].children[1]) // this remove the product card lists
    CONTENT.children[0].appendChild(CONTENT.children[0].appendChild(controller.displayCartGUI()))

    var generic_view_cart_btn = document.getElementsByTagName("button");
    var gvcbLen = generic_view_cart_btn.length;
    for(let i = 0; i < gvcbLen; i++) {
        generic_view_cart_btn[i].addEventListener("click", viewCartGenericActions);
    }
}

function viewCartGenericActions() {
    const GENERIC_ID = this.getAttribute("id");
    const split = GENERIC_ID.split("-"); // tells the difference if update / remove actions

    if(split[0] === "update") { // this means update
        //this means update
        var inpt_qty = document.getElementById(`inpt-qty-${split[1]}`).value;

        const response = productStorage.updateCartQuantity(split[1], parseInt(inpt_qty));
        CONTENT.appendChild(controller.ResponseMessages(response, "success"));
    }
    else {
        productStorage.removeCartItem(split[1])
        var CART_COUNT_CONTAINER = document.getElementById("cart-item-count"); // COUNT YOUR PRODUCT BOUGHT
        CART_COUNT_CONTAINER.textContent = productStorage.getAllCartsItem().length > 0?
            productStorage.getAllCartsItem().length:"0" //COUNT CART ITEM
        CONTENT.appendChild(controller.ResponseMessages("cart item removed", "danger"));
        viewCart(); //--force redisplaying the view cart
    }
    const RMSI = setInterval(() => {
        CONTENT.removeChild(CONTENT.lastChild);
        clearInterval(RMSI)
    }, 1000)
}

function tikTakToeContainerListener() {
    CONTENT.appendChild(controller.ResponseMessages("on planning stage", "danger"));

    const responseMessageSI = setInterval(() => {
        CONTENT.removeChild(CONTENT.lastChild);
        clearInterval(responseMessageSI);
    }, 1500)
}