interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
  }

const setStorage = (product:Product) => {
    const cart = JSON.parse(localStorage.getItem("cart")!) || {
        counter: 0,
        products: []
    };

    cart.counter = cart.counter + 1;
    const isAvailable = cart.products.find((prod: Product)=> prod.id === product.id)
 
    if(!isAvailable){
        cart.products.push({...product , quntity:1});
    }else{
        cart.products.map((prod)=> {
        if (prod.id === product.id){
            return prod.quntity += 1
        }
        
        })
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart)



    return cart
};

const getCart = ()=>{
    const cart = JSON.parse(localStorage.getItem("cart")!)
    return cart
}


const removeFromStorage = (id: string) => {
    const cart = JSON.parse(localStorage.getItem("cart")!) || {
        counter: 0,
        products: []
    };

    const productIndex = cart.products.findIndex((product: Product) => product.id === id);

    if (productIndex !== -1) {
        const product = cart.products[productIndex];

        if (product.quntity > 1) {
            product.quntity -= 1;
        } else {
            cart.products.splice(productIndex, 1);
        }

        cart.counter = cart.products.reduce((total: number, prod: Product) => total + prod.quntity, 0);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    return cart;
};


export { setStorage, removeFromStorage  , getCart};
