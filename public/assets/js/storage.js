class ProductStorage {
    constructor() {
        this.products = [
            {
                id: 101, name: "hansel", price: 7.00, quantity: 10
            },
            {
                id: 102, name: "fita", price: 7.00, quantity: 5
            },
            {
                id: 103, name: "choco-mucho", price: 10.00, quantity: 8
            },
            {
                id: 104, name: "cream-o", price: 8.00, quantity: 30
            },
            {
                id: 105, name: "mik-mik", price: 3.00, quantity: 12
            },
            {
                id: 106, name: "muncher", price: 3.00, quantity: 20
            },
            {
                id: 107, name: "safari", price: 3.00, quantity: 4
            },
            {
                id: 108, name: "lumpia", price: 2.00, quantity: 50
            },
            {
                id: 109, name: "tira-tira", price: 4.00, quantity: 23
            },
            {
                id: 1010, name: "cloud-9", price: 12.00, quantity: 11
            },
        ]
    }
    getAllProducts() {
        return this.products;
    }
    addToCart(product_id) {
        let carts = JSON.parse(localStorage.getItem("carts"));

        if(carts) {
            if(carts.filter(cart => cart.id == product_id).length > 0){
                carts.map(cart => {
                    if(cart.id == product_id)
                        cart.quantity = cart.quantity+1;
                    return cart
                });
                localStorage.setItem("carts", JSON.stringify(carts));
                return ;
            }
            //else execute here!
            const product = this.products.filter(product => product.id == product_id)[0];
            carts.push({
                id: product_id,
                name: product.name,
                price: product.price,
                quantity: 1
            });

            localStorage.setItem('carts', JSON.stringify(carts));
            
            return ;
        }
        carts = [];
        const prodLen = this.products.length;
        
        for(let i = 0; i < prodLen; i++) {
            if(this.products[i].id == product_id) {
                carts.push({
                    id: product_id,
                    name: this.products[i].name,
                    price: this.products[i].price,
                    quantity: 1
                })
                break;
            }
        }

        localStorage.setItem("carts", JSON.stringify(carts));
    }
    checkIFProductIsAddedAlready(product_id) {
        const carts = JSON.parse(localStorage.getItem("carts"));
        if(carts && carts.filter(cart => cart.id == product_id).length > 0)
            return true;
        return false;
    }
    getAllCartsItem() {
        return JSON.parse(localStorage.getItem("carts"))?JSON.parse(localStorage.getItem("carts")):[];
    }
    updateCartQuantity(product_id, new_qty) {
        if(new_qty == 0 || new_qty < 0)
            return "can't process request!.";
        var carts = JSON.parse(localStorage.getItem("carts"));

        var cartLen = carts.length;
        for(let i = 0; i < cartLen; i++) {
            if(carts[i].id === product_id){
                carts[i].quantity = new_qty;
                localStorage.setItem("carts", JSON.stringify(carts));
                break;
            }
        }
        return "quantity update!.";
    }
    removeCartItem(product_id) {
        var carts = JSON.parse(localStorage.getItem("carts"));
        carts = carts.filter(cart => cart.id !== product_id)
        localStorage.setItem("carts", JSON.stringify(carts));
    }
}