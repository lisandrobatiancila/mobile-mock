class Controller {
    constructor() {
        this.productStorage = new ProductStorage();
    }
    showChargingUI() {
        var divContainer = document.createElement("div"); // parent
        var divChargeCell = document.createElement("div"); // a cell
        var percentageContainer = document.createElement("div");
        var percentagText = document.createElement("p");
        percentagText.textContent = "28%";
        percentagText.style.position = "abosulte";
        percentagText.style.bottom = 0;
        // percentagText.style.marginTop = "30px";
        
        percentageContainer.className = "charging_percentage";

        divChargeCell.className = "charging_cell";
        divContainer.className = "charging_container";
        percentageContainer.appendChild(percentagText);
        divContainer.appendChild(percentageContainer);
        divContainer.appendChild(divChargeCell);


        return divContainer
    }
    dotHeartBeat() {
        var divHeart = document.createElement("div");
        divHeart.className = "heart_beat";

        return divHeart;
    }
    loadingScreen() {
        var loadScreen = document.createElement("div");
        loadScreen.className = "loading-screen";

        return loadScreen;
    }
    homeScreenApps() {
        var appsContainer = document.createElement("div");
        appsContainer.className = 'app-screen-container'

        var eCommerceContainer = document.createElement("div"); // eCommerceContainer
        var eCommerceContent = document.createElement("div"); // eCommerceContent
        var eCommerceIcon = document.createElement("img"); // eCommerceIcon
        var eCommerceTitle = document.createElement("span"); // eCommerce title

        eCommerceIcon.src = "./public/assets/images/shopping-bag.png";
        eCommerceIcon.className = 'e-commerce-icon';
        eCommerceTitle.textContent = 'E-comm';
        eCommerceContent.className = 'e-commerce-content';
        eCommerceContainer.className = "e-commerce-container";
        eCommerceContainer.setAttribute("id", "e_commerce_cotainer")

        eCommerceContent.appendChild(eCommerceIcon);
        eCommerceContainer.appendChild(eCommerceContent);
        eCommerceContainer.appendChild(eCommerceTitle);
        eCommerceContainer.addEventListener('click', this.eCommerceFunctionality)

        var tikTakToeContainer = document.createElement("div"); //tik-tak-toe-container
        var tiktakToeContent = document.createElement("div"); //tik-tak-toe-content
        var tikTakToeIcon = document.createElement("img") // tik-tak-toe-icon
        var tiktakToeText = document.createElement('span'); //tik-tak-toe-title

        tikTakToeIcon.src = "./public/assets/images/tic-tac-toe.png";
        tikTakToeIcon.style.marginTop = '5px';
        tikTakToeIcon.style.marginLeft = '5px';
        tiktakToeText.textContent = "Tik-Tak-Toe";
        tikTakToeContainer.setAttribute("id", "tik_tak_toe_container");

        tikTakToeIcon.className = "tik-tak-toe-icon"
        tikTakToeContainer.className = 'tik-tak-toe-container';
        tiktakToeContent.className = 'tik-tak-toe-content';

        tiktakToeContent.appendChild(tikTakToeIcon);
        tikTakToeContainer.appendChild(tiktakToeContent);
        tikTakToeContainer.appendChild(tiktakToeText);

        appsContainer.appendChild(eCommerceContainer);
        appsContainer.appendChild(tikTakToeContainer);

        return appsContainer;
    }
    eCommerceGUI() {
        var eCommerceContainerGUI = document.createElement("div"); //eCommerceGUIContainer
        var ECHeaderGUI = document.createElement("div"); //eCommerceTopHeader
        var ECHeaderCartGUI = document.createElement("div"); //eCommerceCart
        var eCommerceContentGUI = document.createElement("div"); //eCommerceContentGUI

        eCommerceContainerGUI.className = 'e-commerce-gui-container'; //eCommerceGUIContainer [CSSclass]
        ECHeaderGUI.className = 'ec-gui-header'; //eCommerceTopHeader [CSSclass]
        eCommerceContentGUI.className = 'e-commerce-gui-content';
        ECHeaderCartGUI.setAttribute("id", "ec_header_gui");

        /*
            Setting the ECommerce Header GUI
        */
       var cartHomeTag = document.createElement("div");
       var cartHomeSpanTag = document.createElement("span");
        var cartPTag = document.createElement("p");
        var cartSpanTag = document.createElement("span");

        cartHomeTag.setAttribute("id", "ec_header_home_gui")
        cartHomeSpanTag.textContent = "Home";
        cartHomeTag.className = "ec-home-cart-gui-header";
        cartHomeTag.appendChild(cartHomeSpanTag);

        cartPTag.textContent = "Cart";
        cartSpanTag.style.fontSize = "12px";
        cartSpanTag.className = "badge badge-success";
        cartSpanTag.setAttribute("id", "cart-item-count");
        
        cartPTag.appendChild(cartSpanTag)
        ECHeaderCartGUI.className = "ec-cart-gui-header";
        ECHeaderCartGUI.appendChild(cartPTag);
        ECHeaderGUI.appendChild(cartHomeTag);
        ECHeaderGUI.appendChild(ECHeaderCartGUI);
        /*
            END OF Setting the ECommerce Header GUI
        */
       

        eCommerceContentGUI.className = 'e-commerce-gui-content';

        this.productStorage.getAllProducts().forEach((product) => {
            var ecCardHeader = document.createElement("div"); //eCommercedCardHeader
            var ecCardBody = document.createElement("div"); //eCommerceCardBody
            var ecCardActions = document.createElement("div");
            var eCCGUITitle = document.createElement("p"); //eCommerce Card GUI title
            var ECCGUIPrice = document.createElement("p"); //product price
            var eCCGUIQTY = document.createElement("p"); //product quantity
            var eCCAddTOCart = document.createElement("button");
            eCCAddTOCart.setAttribute("id", product.id)
            ecCardHeader.className = 'e-commerce-card-header';
            ecCardBody.className = 'e-commerce-card-body';
            ecCardActions.className = 'e-commerce-actions'

            eCCGUITitle.textContent = product.name;
            ECCGUIPrice.textContent = `Price: $ ${product.price}`;
            eCCGUIQTY.textContent = `Quantity: ${product.quantity}`
            eCCAddTOCart.textContent = 'add to cart'

            var eCommerceCardGUI = document.createElement("div"); //eCommerceCard
            eCommerceCardGUI.className = 'e-commerce-gui-card';

            ecCardHeader.append(eCCGUITitle);
            eCommerceCardGUI.appendChild(ecCardHeader);
            ecCardBody.appendChild(ECCGUIPrice);
            ecCardBody.appendChild(eCCGUIQTY);

            ecCardActions.appendChild(eCCAddTOCart);
            ecCardBody.appendChild(ecCardActions)

            eCommerceCardGUI.appendChild(ecCardBody);
            eCommerceContentGUI.appendChild(eCommerceCardGUI);
        });

        eCommerceContainerGUI.appendChild(ECHeaderGUI);
        eCommerceContainerGUI.appendChild(eCommerceContentGUI);

        return eCommerceContainerGUI
    }
    displayCartGUI() {
        var carts = JSON.parse(localStorage.getItem("carts"));
        var viewCartContainerGUI = document.createElement("div");
        var viewCartContentGUI = document.createElement("div");

        viewCartContentGUI.className = "e-commerce-gui-content";

        const cartLen = carts?carts.length:0;

        for(let i = 0; i < cartLen; i++) {
            var ecCardHeader = document.createElement("div"); //eCommercedCardHeader
            var ecCardBody = document.createElement("div"); //eCommerceCardBody
            var ecCardActions = document.createElement("div");
            var eCCGUITitle = document.createElement("p"); //eCommerce Card GUI title
            var ECCGUIPrice = document.createElement("p"); //product price
            var ECCGUILabelQTY = document.createElement("label"); //product quantity label
            var eCCGUIQTY = document.createElement("input"); //product quantity
            var eCCRemoveItem = document.createElement("button");
            var eCCUpdateItem = document.createElement("button");

            eCCGUIQTY.setAttribute("id", `inpt-qty-${carts[i].id}`)
            eCCRemoveItem.setAttribute("id", `remove-${carts[i].id}`)
            eCCUpdateItem.setAttribute("id", `update-${carts[i].id}`)
            ecCardHeader.className = 'e-commerce-card-header';
            ecCardBody.className = 'e-commerce-card-body';
            ecCardActions.className = 'e-commerce-actions'
            ecCardActions.style.width = "130px";
            ecCardActions.style.marginTop = "3px";

            eCCGUITitle.textContent = carts[i].name;
            ECCGUIPrice.textContent = `Price: $ ${carts[i].price}`;
            eCCGUIQTY.value = carts[i].quantity;
            ECCGUILabelQTY.textContent = 'Quantiy: '
            eCCRemoveItem.textContent = 'remove';
            eCCUpdateItem.textContent = 'update';

            eCCRemoveItem.className = 'remove-btn';
            eCCUpdateItem.className = 'update-btn';

            var eCommerceCardGUI = document.createElement("div"); //eCommerceCard
            eCommerceCardGUI.className = 'e-commerce-gui-card';

            ecCardHeader.append(eCCGUITitle);
            eCommerceCardGUI.appendChild(ecCardHeader);
            ecCardBody.appendChild(ECCGUIPrice);
            ecCardBody.appendChild(ECCGUILabelQTY);
            ecCardBody.appendChild(eCCGUIQTY);

            ecCardActions.appendChild(eCCUpdateItem);
            ecCardActions.appendChild(eCCRemoveItem);
            ecCardBody.appendChild(ecCardActions)

            eCommerceCardGUI.appendChild(ecCardBody);
            
            viewCartContentGUI.appendChild(eCommerceCardGUI)
        }
        viewCartContainerGUI.appendChild(viewCartContentGUI);

        return viewCartContainerGUI;
    }
    ResponseMessages(message, css_class) {
        var ResponseMessagesGUI = document.createElement("div");

        ResponseMessagesGUI.setAttribute("id", "response_message");
        ResponseMessagesGUI.className = `response-message ${css_class}`;
        ResponseMessagesGUI.textContent = message

        return ResponseMessagesGUI;
    }
}