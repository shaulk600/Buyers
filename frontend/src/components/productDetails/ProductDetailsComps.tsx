import type { UserRegister } from "../../logic/UserType";
import "./ProductDetailsComps.css";
import { useEffect, useState, type PropsWithChildren } from "react";

export default function ProductDetailsComps({ product }: ProductDetailsProps) {
    const [product, setProduct] = useState<UserRegister | string>('');

    const [status, setStatus] = useState("");

    useEffect(() => {
        setProduct(...props, props);
        // לעדכן את status בהתאם למצב ההזמנה
    }, []);

    return (
        <div>
            <div>{`The order status is: ${status}`}</div>

            <div>{product.}</div>
            {/* {window.location.href="" } */}
        </div>
    )
}
