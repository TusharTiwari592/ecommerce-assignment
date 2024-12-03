import { useEffect, useState } from "react";
import { removeFromStorage } from "../utils/storageEvents";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
}

function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")!);
    setProducts(cartData.products);
  }, []);

  const handleRemoveFromCart = (product: Product) => {
    const cart = removeFromStorage(product.id);
    setProducts(cart.products);
  };

  return (
    <div>
      <div>
        {products.length ? (
          products.map((product: Product) => (
            <>
              <div className="cursor-pointer bg-gray-300">
                <img className="h-[300px] w-[200px]" src={product.image} />
                <p>{product.title}</p>
                <p>{product.price}</p>
              </div>
              <div
                className="bg-blue-600 p-4 text-white"
                onClick={(e) => {
                  handleRemoveFromCart(product);
                }}
              >
                Remove from Cart
              </div>
            </>
          ))
        ) : (
          <div> No added Products yet</div>
        )}
      </div>
    </div>
  );
}

export default Cart;
