import { useParams } from "react-router";
// import Product from "../../components/product/Product"
import ProductDetailsComps from "../../components/productDetails/ProductDetailsComps";
import Comments from "../../components/comments/Comments";


export default function ProductDinamicPage() {
  const { id } = useParams<{ id: any }>();
  console.log(id)
  return (
    <div>
      <ProductDetailsComps id_product={id} />
      <Comments productId={id} />
    </div>
  )
}
