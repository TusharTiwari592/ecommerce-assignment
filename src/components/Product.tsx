import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setStorage } from "../utils/storageEvents";

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
}

function Product() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product>({
    id: "",
    image: "",
    title: "",
    price: 0,
    description: "",
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

  const handleAddToCart = (product: Product) => {
    setStorage({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    });
  };
  console.log(product);

  return (
    <div>
      <h1>Product Detail Page</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className=" flex flex-col  md:flex-row  justify-evenly bg-gray-300">
            <div>
              <img className="h-[300px] w-[200px]" src={product.image} />
            </div>
            <div>
              <p>Product Description</p>
              <p>{product.description}</p>
              <p>Product</p>
              <p>{product.title}</p>
              <p>Price</p>
              <p>{product.price}</p>
              <div
                className="bg-blue-600 p-4 text-white"
                onClick={(e) => {
                  handleAddToCart(product);
                }}
              >
                Add To Cart
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
