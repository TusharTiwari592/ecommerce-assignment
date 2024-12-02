const setStorage = (id: string) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {
        counter: 0,
        productIds: []
    };

    cart.counter = cart.counter + 1;
    cart.productIds.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Updated Cart:", cart);
};

const removeFromStorage = (id: string) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {
        counter: 0,
        productIds: []
    };

    cart.productIds = cart.productIds.filter((productId: string) => productId !== id);

    if (cart.counter > 0) {
        cart.counter = cart.counter - 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Updated Cart after removal:", cart);
};

export { setStorage, removeFromStorage };
