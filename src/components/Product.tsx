import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setStorage } from "../utils/storageEvents";

function Product() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    image: "",
    title: "",
    price: "",
  });
  const { id } = useParams();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("tushar is here");
  useEffect(() => {
    console.log(id);
    fetchProduct();
  }, []);

  const handleAddToCart = (id: string) => {
    setStorage(id);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="cursor-pointer bg-gray-300">
            <img className="h-[300px] w-[200px]" src={product.image} />
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
          <div
            className="bg-blue-600 p-4 text-white"
            onClick={(e) => {
              handleAddToCart(product.id);
            }}
          >
            Add To Cart
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
