import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { ProductType } from "../../logic/ProductType";
import Product from "../product/Product";

interface Props {
  category: string;
  products: ProductType[];
  filteredProducts: ProductType[];
  setFilteredProducts: Dispatch<SetStateAction<ProductType[]>>;
}

export default function Products({ category, products, filteredProducts, setFilteredProducts }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let filtered = products;

    // סינון לפי קטגוריה
    if (category.toLowerCase() !== "all") {
      filtered = products.filter((product) => product.category === category);
    }

    // סינון לפי חיפוש
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filtered.length === 0) {
      setMessage(`${searchTerm || category} not found`);
    } else {
      setMessage("");
    }

    setFilteredProducts(filtered);
  }, [category, searchTerm, products, setFilteredProducts]);

  return (
    <div className="comp-products">
      {/* חיפוש */}
      <div>
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => {
            setMessage("");
            setSearchTerm(e.target.value);
          }}
        />
      </div>

      {/* הודעה אם אין תוצאות */}
      {message && <p>{message}</p>}

      {/* מוצרים */}
      <div className="products-list">
        {filteredProducts.map((product) => (
          <Product key={product._id} id_product={product._id} />
        ))}
      </div>
    </div>
  );
}
