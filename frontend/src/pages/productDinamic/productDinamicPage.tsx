import { useParams } from "react-router";
import Product from "../../components/product/Product"


export default function ProductDinamicPage() {
    const { id } = useParams<{ id:any }>();
    console.log(id)
  return (
    <div>
        <Product id_product={id}/>
    </div>
  )
}
