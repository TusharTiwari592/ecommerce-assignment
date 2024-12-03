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
    cart.products.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Updated Cart:", cart);
};

const removeFromStorage = (id:string) => {
    const cart = JSON.parse(localStorage.getItem("cart")!) || {
        counter: 0,
        products: []
    };

    cart.products = cart.products.filter((product: Product) => product.id !== id);

    if (cart.counter > 0) {
        cart.counter = cart.counter - 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    return cart
};

export { setStorage, removeFromStorage };
